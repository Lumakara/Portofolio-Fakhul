/* mp-player.js — Fixed full version (replace file) 
   Fixes:
   - Ensure mp detail wrapper visibility (remove/add 'hidden')
   - Use translateY only (no translateX) to avoid left-shift issues
   - Drag-to-dismiss with backdrop fade
   - Keeps playlist / play / seek / save-pos functionality
*/

document.addEventListener('DOMContentLoaded', () => {
  // ---------- STATE ----------
  const state = {
    playlist: [],
    index: 0,
    audio: new Audio(),
    isPlaying: false,
    shuffle: false,
    repeat: 'off', // off | one | all
    liked: new Set(),
    dragging: false,
    dragStartY: 0,
    dragDy: 0
  };

  // ---------- HELPERS ----------
  const $ = id => document.getElementById(id) || null;
  const qAll = sel => Array.from(document.querySelectorAll(sel));
  const safeAdd = (el, ev, fn) => { if (el) el.addEventListener(ev, fn); };
  const formatTime = s => {
    if (isNaN(s) || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // ---------- DOM refs ----------
  const mpCard = $('mpCard'); // optional
  const mpMini = $('mpMini');
  const mpMiniCover = $('mpMiniCover');
  const mpMiniTitle = $('mpMiniTitle');
  const mpMiniArtist = $('mpMiniArtist');
  // mini progress: there are nested elements with same id in index; query robustly:
  const mpProgressMiniFill = document.querySelector('#mpMini #mpProgressMiniFill .h-full') || document.querySelector('#mpMini #mpProgressMiniFill');

  const playPauseBtnMini = $('playPauseBtnMini');
  const prevBtnMini = $('prevBtnMini');
  const nextBtnMini = $('nextBtnMini');

  // detail (_ux9)
  const mpDetailWrapper = $('mpDetailWrapper_ux9');
  const mpBackdrop = $('mpBackdrop_ux9');
  const mpDetailCard = $('mpDetailCard_ux9');
  const mpDragHandle = $('mpDragHandle_ux9');

  const mpCover = $('mpCover_ux9');
  const mpTitle = $('mpTitle_ux9');
  const mpArtist = $('mpArtist_ux9');

  const currentTimeEl = $('currentTime_ux9');
  const durationEl = $('duration_ux9');
  const seekBar = $('seekBar_ux9');
  const seekFill = $('seekFill_ux9');
  const seekHandle = $('seekHandle_ux9');

  const playPauseBtn = $('playPauseBtn_ux9');
  const prevBtn = $('prevBtn_ux9');
  const nextBtn = $('nextBtn_ux9');
  const likeBtn = $('likeBtn_ux9');
  const queueBtn = $('queueBtn_ux9');
  const closeBtn = $('mpClose_ux9');
const queuePanel = document.getElementById('queuePanel_ux9');
const queueList = document.getElementById('queueList_ux9');
const queueClose = document.getElementById('queueClose_ux9');

  // ---------- PLAYLIST & UI ----------
  async function loadPlaylist(){
    try {
      const res = await fetch('playlist.json', { cache: 'no-store' });
      const json = await res.json();
      state.playlist = Array.isArray(json) ? json : [];
      renderQueue();

      // restore last position
      const pos = JSON.parse(localStorage.getItem('mp_pos') || 'null');
      if (pos && Number.isInteger(pos.index) && pos.index < state.playlist.length) {
        await loadTrack(pos.index, false);
        state.audio.currentTime = pos.time || 0;
      } else {
        await loadTrack(0, false);
      }

      // restore likes
      try {
        const likes = JSON.parse(localStorage.getItem('mp_likes') || '[]');
        state.liked = new Set(Array.isArray(likes) ? likes : []);
        updateLikeButton();
      } catch(e){}
    } catch (err) {
      console.error('mp-player: failed to load playlist.json', err);
    }
  }

  function renderQueue(){
    if (queueList) {
      queueList.innerHTML = '';
      state.playlist.forEach((t, i) => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-2 rounded';
        li.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <img src="${t.cover||''}" class="w-10 h-10 rounded object-cover flex-shrink-0" />
            <div class="min-w-0">
              <div class="text-sm font-medium truncate text-[var(--mp-text)]">${t.title||''}</div>
              <div class="text-xs text-gray-500 truncate">${t.artist||''}</div>
            </div>
          </div>
          <button data-index="${i}" class="text-sm px-2 py-1 rounded play-track bg-[var(--mp-bg-muted,#eee)] text-[var(--mp-text)]">Play</button>
        `;
        queueList.appendChild(li);
      });
      queueList.querySelectorAll('.play-track').forEach(b => {
        b.addEventListener('click', (ev) => {
          const idx = Number(ev.currentTarget.dataset.index);
          loadTrack(idx, true);
        });
      });
    }

    // Also populate settings panel playlist if it exists
    const settingsPlaylist = document.getElementById('settingsPlaylistContainer');
    if (settingsPlaylist) {
      settingsPlaylist.innerHTML = '';
      // Only show up to 3 tracks in settings panel
      state.playlist.slice(0, 3).forEach((t, i) => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';
        div.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <img src="${t.cover||''}" class="w-8 h-8 rounded object-cover flex-shrink-0" />
            <span class="text-sm font-medium truncate dark:text-gray-200">${t.title||''}</span>
          </div>
          <button class="text-primary text-sm font-medium">Play</button>
        `;
        div.addEventListener('click', () => {
          loadTrack(i, true);
          // Auto-open mini player if not already showing
          const mpCard = document.getElementById('mpCard');
          if (mpCard && !mpCard.classList.contains('translate-y-0')) {
             // If there's an API to show it, call it. Otherwise it's always fixed at bottom.
          }
        });
        settingsPlaylist.appendChild(div);
      });
    }
  }

  async function loadTrack(index, autoplay = true){
    if (!state.playlist.length) return;
    index = Math.max(0, Math.min(index, state.playlist.length - 1));
    state.index = index;
    const track = state.playlist[index];
    if (!track) return;

    state.audio.src = track.src || '';
    state.audio.crossOrigin = 'anonymous';

    if (mpMiniCover) mpMiniCover.src = track.cover || '';
    if (mpMiniTitle) mpMiniTitle.textContent = track.title || '';
    if (mpMiniArtist) mpMiniArtist.textContent = track.artist || '';
    if (mpCover) mpCover.src = track.cover || '';
    if (mpTitle) mpTitle.textContent = track.title || '';
    if (mpArtist) mpArtist.textContent = track.artist || '';

    updateLikeButton();
    highlightQueueItem();

    if (autoplay) await play().catch(()=>{});
    else pause();
  }

  function highlightQueueItem(){
    if (!queueList) return;
    Array.from(queueList.children).forEach((li, i) => {
      li.classList.toggle('active-track', i === state.index);
    });
  }

  function updateLikeButton(){
    if (!likeBtn) return;
    const track = state.playlist[state.index];
    if (!track) return;
    likeBtn.innerHTML = state.liked.has(track.id)
      ? '<i class="ri-heart-fill text-red-500"></i>'
      : '<i class="ri-heart-line text-xl"></i>';
  }

  // ---------- CONTROLS ----------
  async function play(){
    try {
      await state.audio.play();
      state.isPlaying = true;
      if (playPauseBtn) playPauseBtn.innerHTML = '<i class="ri-pause-line text-xl"></i>';
      if (playPauseBtnMini) playPauseBtnMini.innerHTML = '<i class="ri-pause-line"></i>';
    } catch(e){}
  }

  function pause(){
    state.audio.pause();
    state.isPlaying = false;
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="ri-play-line text-xl"></i>';
    if (playPauseBtnMini) playPauseBtnMini.innerHTML = '<i class="ri-play-line"></i>';
  }

  function nextTrack(){
    if (!state.playlist.length) return;
    if (state.shuffle) {
      let rand = Math.floor(Math.random() * state.playlist.length);
      if (state.playlist.length > 1 && rand === state.index) rand = (rand + 1) % state.playlist.length;
      loadTrack(rand, true); return;
    }
    const next = (state.index + 1) % state.playlist.length;
    loadTrack(next, true);
  }

  function prevTrack(){
    if (!state.playlist.length) return;
    if (state.audio.currentTime > 3) {
      state.audio.currentTime = 0; return;
    }
    const prev = (state.index - 1 + state.playlist.length) % state.playlist.length;
    loadTrack(prev, true);
  }

  // ---------- EVENT BINDINGS ----------
  safeAdd(playPauseBtn, 'click', ()=> state.isPlaying ? pause() : play());
  safeAdd(playPauseBtnMini, 'click', (e)=> { e.stopPropagation(); state.isPlaying ? pause() : play(); });
  safeAdd(nextBtn, 'click', nextTrack);
  safeAdd(prevBtn, 'click', prevTrack);
  safeAdd(nextBtnMini, 'click', (e)=> { e.stopPropagation(); nextTrack(); });
  safeAdd(prevBtnMini, 'click', (e)=> { e.stopPropagation(); prevTrack(); });

  safeAdd(likeBtn, 'click', () => {
    const track = state.playlist[state.index]; if (!track) return;
    if (state.liked.has(track.id)) state.liked.delete(track.id); else state.liked.add(track.id);
    updateLikeButton();
    localStorage.setItem('mp_likes', JSON.stringify(Array.from(state.liked)));
  });

  // ---------- SEEK ----------
  let seeking = false;
  function setProgressByX(clientX){
    if (!seekBar || !state.audio) return;
    const rect = seekBar.getBoundingClientRect();
    let pct = (clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));
    if (state.audio.duration) state.audio.currentTime = pct * state.audio.duration;
  }
  if (seekBar) {
    seekBar.addEventListener('pointerdown', (e) => {
      seeking = true; setProgressByX(e.clientX);
    });
    window.addEventListener('pointermove', (e) => { if (seeking) setProgressByX(e.clientX); });
    window.addEventListener('pointerup', () => { seeking = false; });
  }

  // ---------- TIMEUPDATE ----------
  state.audio.addEventListener('timeupdate', () => {
    const cur = state.audio.currentTime || 0;
    const dur = state.audio.duration || 0;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(cur);
    if (durationEl) durationEl.textContent = formatTime(dur);
    const pct = dur ? (cur / dur) * 100 : 0;
    if (seekFill) seekFill.style.width = pct + '%';
    if (seekHandle) seekHandle.style.left = pct + '%';
    // update mini progress (best-effort)
    const miniFill = document.querySelector('#mpMini #mpProgressMiniFill > div') || document.querySelector('#mpMini #mpProgressMiniFill');
    if (miniFill) miniFill.style.width = pct + '%';
  });

  state.audio.addEventListener('ended', () => {
    if (state.repeat === 'one') {
      state.audio.currentTime = 0; play();
    } else {
      nextTrack();
    }
  });

  // ---------- SHOW / HIDE DETAIL (fixed) ----------
  function showDetail(){
    if (!mpDetailCard || !mpDetailWrapper) return;
    // remove hidden on wrapper (Tailwind hidden -> display:none)
    mpDetailWrapper.classList.remove('hidden');
    // allow pointer events for wrapper/backdrop
    mpDetailWrapper.style.pointerEvents = 'auto';
    // show backdrop
    if (mpBackdrop) {
      mpBackdrop.classList.add('open');
      mpBackdrop.style.opacity = '1';
      mpBackdrop.style.pointerEvents = 'auto';
    }
    // show card via transform (use translateY only)
    mpDetailCard.classList.add('open');
    // ensure transition / transform state to visible
    mpDetailCard.style.transition = ''; // let CSS handle transition
    mpDetailCard.style.transform = 'translateY(0)';
    mpDetailCard.style.opacity = '1';
    // hide mini player while detail open
    if (mpMini) mpMini.style.display = 'none';
  }

  function hideDetail(){
    if (!mpDetailCard || !mpDetailWrapper) return;
    // start hide animation
    mpDetailCard.classList.remove('open');
    // animate down using translateY(100%) (match CSS's translate-y-full behavior)
    mpDetailCard.style.transition = 'transform 300ms ease, opacity 200ms ease';
    mpDetailCard.style.transform = 'translateY(100%)';
    mpDetailCard.style.opacity = '0';

    // hide backdrop
    if (mpBackdrop) {
      mpBackdrop.classList.remove('open');
      mpBackdrop.style.opacity = '0';
      mpBackdrop.style.pointerEvents = 'none';
    }
    // disable pointer events immediately for wrapper (optional) but keep wrapper visible until animation finishes
    mpDetailWrapper.style.pointerEvents = 'none';

    // after animation completes, actually hide the wrapper element (to restore display:none)
    setTimeout(() => {
      mpDetailWrapper.classList.add('hidden');
      // restore mini player
      if (mpMini) mpMini.style.display = 'flex';
    }, 320); // slightly more than transition duration
  }

  // bind open/close triggers
  safeAdd(mpMini, 'click', showDetail);
  safeAdd(mpBackdrop, 'click', hideDetail);
  safeAdd(closeBtn, 'click', hideDetail);

  // ---------- DRAG TO DISMISS (Y only) ----------
  const DRAG_THRESHOLD = 120;

  function onDragStart(clientY){
    if (!mpDetailCard) return;
    state.dragging = true;
    state.dragStartY = clientY;
    state.dragDy = 0;
    // temporarily disable transition for immediate follow
    mpDetailCard.style.transition = 'none';
    if (mpBackdrop) mpBackdrop.style.transition = 'none';
  }
  function onDragMove(clientY){
    if (!state.dragging || !mpDetailCard) return;
    state.dragDy = clientY - state.dragStartY;
    if (state.dragDy > 0) { // drag down only
      mpDetailCard.style.transform = `translateY(${state.dragDy}px)`;
      // fade backdrop
      if (mpBackdrop) {
        const opacity = Math.max(0, 1 - (state.dragDy / 400));
        mpBackdrop.style.opacity = opacity.toString();
      }
    }
  }
  function onDragEnd(){
    if (!state.dragging || !mpDetailCard) return;
    state.dragging = false;
    // re-enable transitions
    mpDetailCard.style.transition = 'transform 300ms cubic-bezier(.25,.8,.25,1)';
    if (mpBackdrop) mpBackdrop.style.transition = 'opacity 240ms ease';
    // check threshold
    if (state.dragDy > DRAG_THRESHOLD) {
      hideDetail();
    } else {
      // snap back up
      mpDetailCard.style.transform = 'translateY(0)';
      if (mpBackdrop) mpBackdrop.style.opacity = '1';
    }
    state.dragDy = 0;
  }

  // pointer events for drag handle and whole card (so user can drag from top area)
  safeAdd(mpDragHandle, 'pointerdown', (e) => { e.preventDefault(); onDragStart(e.clientY); });
  // support touch/move globally for smooth interaction
  safeAdd(window, 'pointermove', (e) => { onDragMove(e.clientY); });
  safeAdd(window, 'pointerup', onDragEnd);
  safeAdd(window, 'pointercancel', onDragEnd);

  // ---------- SAVE POSITIONS ----------
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('mp_pos', JSON.stringify({
      index: state.index,
      time: state.audio.currentTime || 0
    }));
  });

  // ---------- INIT ----------
  function init(){
    // Ensure wrapper is hidden initially (Tailwind hidden class might already be present in HTML)
    if (mpDetailWrapper && !mpDetailWrapper.classList.contains('hidden')) {
      mpDetailWrapper.classList.add('hidden');
    }
    // ensure card initial transform (closed) — use translateY(100%)
    if (mpDetailCard) {
      mpDetailCard.style.transform = 'translateY(100%)';
      mpDetailCard.style.opacity = '0';
    }
    if (mpBackdrop) {
      mpBackdrop.style.opacity = '0';
      mpBackdrop.style.pointerEvents = 'none';
    }

    // Volume default
    state.audio.volume = 0.8;

    // metadata update
    state.audio.addEventListener('loadedmetadata', () => {
      if (durationEl) durationEl.textContent = formatTime(state.audio.duration || 0);
    });

    // load playlist
    loadPlaylist().catch(()=>{});
  }

  // ---------- Shuffle / Repeat / Queue panel ----------
  const shuffleBtn = $('shuffleBtn_ux9');
  const repeatBtn = $('repeatBtn_ux9');

  // Shuffle
  safeAdd(shuffleBtn, 'click', () => {
    state.shuffle = !state.shuffle;
    if (shuffleBtn) shuffleBtn.classList.toggle('active', state.shuffle);
  });

  // Repeat
  safeAdd(repeatBtn, 'click', () => {
    state.repeat = state.repeat === 'off' ? 'all' : (state.repeat === 'all' ? 'one' : 'off');
    if (repeatBtn) repeatBtn.classList.toggle('active', state.repeat !== 'off');
  });

  // Queue toggle
  safeAdd(queueBtn, 'click', () => {
    if (queuePanel) queuePanel.classList.add('open');
  });
  safeAdd(queueClose, 'click', () => {
    if (queuePanel) queuePanel.classList.remove('open');
  });

  init();

  // ---------- small UI helpers ----------

  // keyboard Escape closes detail
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // if detail visible -> close
      if (mpDetailWrapper && !mpDetailWrapper.classList.contains('hidden')) hideDetail();
    }
  });

  // expose show/hide for debugging (optional)
  window.__mp_showDetail = showDetail;
  window.__mp_hideDetail = hideDetail;
});