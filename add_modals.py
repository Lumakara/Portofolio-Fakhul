import re

with open('/root/Portfolio-Fakhul/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_modals = """
<!-- === MODAL EXP WORK 1 === -->
<div id="expWork1Modal" class="journey-modal hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="modal-content bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl mx-4 relative transform opacity-0 scale-95 transition-all duration-300 ease-out border border-gray-100 dark:border-gray-700">
    <button class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onclick="document.getElementById('expWork1Modal').classList.remove('show'); setTimeout(() => document.getElementById('expWork1Modal').classList.add('hidden'), 300)">
      <i class="ri-close-line text-xl"></i>
    </button>
    <h2 class="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2"><i class="ri-code-box-line text-blue-500"></i> Frontend Developer</h2>
    <p class="text-sm text-blue-500 font-semibold mb-4">2024 - Present</p>
    <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
      <li>Membangun antarmuka interaktif dan responsif menggunakan React, Vue.js, dan Tailwind CSS.</li>
      <li>Mengoptimalkan performa rendering halaman dan aksesibilitas untuk memberikan pengalaman pengguna yang lebih baik.</li>
      <li>Berkolaborasi dengan desainer UI/UX untuk mengimplementasikan desain pixel-perfect.</li>
    </ul>
    <div class="flex justify-end mt-6">
      <button class="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors" onclick="document.getElementById('expWork1Modal').classList.remove('show'); setTimeout(() => document.getElementById('expWork1Modal').classList.add('hidden'), 300)">Tutup</button>
    </div>
  </div>
</div>

<!-- === MODAL EXP WORK 2 === -->
<div id="expWork2Modal" class="journey-modal hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="modal-content bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl mx-4 relative transform opacity-0 scale-95 transition-all duration-300 ease-out border border-gray-100 dark:border-gray-700">
    <button class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onclick="document.getElementById('expWork2Modal').classList.remove('show'); setTimeout(() => document.getElementById('expWork2Modal').classList.add('hidden'), 300)">
      <i class="ri-close-line text-xl"></i>
    </button>
    <h2 class="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2"><i class="ri-brush-line text-purple-500"></i> UI/UX Designer</h2>
    <p class="text-sm text-purple-500 font-semibold mb-4">2023 - 2024</p>
    <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
      <li>Merancang wireframe, mockup, dan prototipe interaktif menggunakan Figma.</li>
      <li>Melakukan riset pengguna untuk mengidentifikasi pain points dan mengembangkan solusi antarmuka yang intuitif.</li>
      <li>Memastikan konsistensi design system di seluruh produk digital perusahaan.</li>
    </ul>
    <div class="flex justify-end mt-6">
      <button class="px-6 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors" onclick="document.getElementById('expWork2Modal').classList.remove('show'); setTimeout(() => document.getElementById('expWork2Modal').classList.add('hidden'), 300)">Tutup</button>
    </div>
  </div>
</div>

<!-- === MODAL EXP WORK 3 === -->
<div id="expWork3Modal" class="journey-modal hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="modal-content bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl mx-4 relative transform opacity-0 scale-95 transition-all duration-300 ease-out border border-gray-100 dark:border-gray-700">
    <button class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onclick="document.getElementById('expWork3Modal').classList.remove('show'); setTimeout(() => document.getElementById('expWork3Modal').classList.add('hidden'), 300)">
      <i class="ri-close-line text-xl"></i>
    </button>
    <h2 class="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2"><i class="ri-server-line text-green-500"></i> Backend Intern</h2>
    <p class="text-sm text-green-500 font-semibold mb-4">2022 - 2023</p>
    <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
      <li>Membantu pengembangan RESTful API menggunakan Node.js dan Express.</li>
      <li>Mengintegrasikan database NoSQL (MongoDB) dan relasional (PostgreSQL).</li>
      <li>Menulis unit test dan berpartisipasi dalam proses code review untuk memastikan kualitas kode.</li>
    </ul>
    <div class="flex justify-end mt-6">
      <button class="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors" onclick="document.getElementById('expWork3Modal').classList.remove('show'); setTimeout(() => document.getElementById('expWork3Modal').classList.add('hidden'), 300)">Tutup</button>
    </div>
  </div>
</div>
"""

# Insert right before the closing main tag or body tag
html = html.replace("</main>", new_modals + "\n</main>")

with open('/root/Portfolio-Fakhul/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
