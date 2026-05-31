import re

def fix_tailwind_classes(content):
    # Colors
    content = re.sub(r'\btext-gray-600\b(?! dark:)', 'text-gray-600 dark:text-gray-300', content)
    content = re.sub(r'\btext-gray-700\b(?! dark:)', 'text-gray-700 dark:text-gray-300', content)
    content = re.sub(r'\btext-gray-800\b(?! dark:)', 'text-gray-800 dark:text-gray-200', content)
    content = re.sub(r'\btext-gray-900\b(?! dark:)', 'text-gray-900 dark:text-white', content)
    
    # Backgrounds
    content = re.sub(r'\bbg-white\b(?! dark:)', 'bg-white dark:bg-gray-900', content)
    content = re.sub(r'\bbg-gray-50\b(?! dark:)', 'bg-gray-50 dark:bg-gray-800', content)
    content = re.sub(r'\bbg-gray-100\b(?! dark:)', 'bg-gray-100 dark:bg-gray-800', content)
    content = re.sub(r'\bbg-gray-200\b(?! dark:)', 'bg-gray-200 dark:bg-gray-700', content)
    
    # Borders
    content = re.sub(r'\bborder-gray-200\b(?! dark:)', 'border-gray-200 dark:border-gray-700', content)
    
    return content

# Read index.html
with open('/root/Portfolio-Fakhul/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Apply tailwind fixes
html = fix_tailwind_classes(html)

# Now, replace the About section tabs and content
about_replacement = """<div class="flex justify-center mb-12 relative z-10" data-aos="fade-up">
  <div class="ios-tabs-container relative flex p-1 bg-gray-200 dark:bg-gray-800 rounded-full shadow-inner overflow-hidden border border-gray-300 dark:border-gray-700">
    <div class="ios-tab-indicator absolute top-1 bottom-1 left-1 rounded-full bg-white dark:bg-gray-700 shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" id="aboutTabIndicator" style="width: 140px;"></div>
    
    <button class="about-filter relative z-10 w-[140px] py-3 rounded-full font-semibold transition-colors active text-primary dark:text-white" data-filter="about-education">
      <i class="ri-book-line mr-2"></i>Education
    </button>
    <button class="about-filter relative z-10 w-[140px] py-3 rounded-full font-semibold transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" data-filter="about-exp">
      <i class="ri-briefcase-line mr-2"></i>Exp Work
    </button>
    <button class="about-filter relative z-10 w-[140px] py-3 rounded-full font-semibold transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" data-filter="about-org">
      <i class="ri-group-line mr-2"></i>Organisasi
    </button>
  </div>
</div>

<div id="aboutContent" class="min-h-[400px] relative">
  <!-- EDUCATION -->
  <div id="about-education" class="about-content absolute inset-0 w-full transition-all duration-500 ease-out transform translate-y-0 opacity-100 z-10">
    <div class="max-w-3xl mx-auto relative">
      <div class="progress-bar absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gray-200 dark:bg-gray-700 h-full rounded-full">
        <div id="aboutProgressFill" class="bg-primary w-1 rounded-full transition-all duration-1000" style="height:100%"></div>
      </div>
      <div class="space-y-12 relative z-10 pt-4">
        <div class="timeline-item-left" data-aos="fade-right">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-end gap-3 mb-2">
              <span class="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">2013 - 2019</span>
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center"><i class="ri-school-line text-blue-600 dark:text-blue-400"></i></div>
            </div>
            <h3 class="text-xl font-bold dark:text-white">MI HAYATUL ISLAMIYAH</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">Madrasah Ibtidaiyah <b>(MI)</b></p>
          </div>
        </div>

        <div class="timeline-item-right" data-aos="fade-left">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-start gap-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"><i class="ri-book-open-line text-green-600 dark:text-green-400"></i></div>
              <span class="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">2019 - 2022</span>
            </div>
            <h3 class="text-xl font-bold dark:text-white">SMP ISLAM YAPKUM</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">Sekolah Menengah Pertama <b>(SMP)</b></p>
          </div>
        </div>

        <div class="timeline-item-left" data-aos="fade-right">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-end gap-3 mb-2">
              <span class="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">2022 - 2025</span>
              <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center"><i class="ri-bank-line text-purple-600 dark:text-purple-400"></i></div>
            </div>
            <h3 class="text-xl font-bold dark:text-white">SMK AL-HIDAYAH</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">Sekolah Menengah Kejuruan <b>(SMK) AKUNTANSI</b></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- EXP WORK -->
  <div id="about-exp" class="about-content absolute inset-0 w-full transition-all duration-500 ease-out transform translate-y-8 opacity-0 pointer-events-none z-0">
    <div class="grid md:grid-cols-3 gap-6 pt-4">
      <!-- Exp 1 -->
      <div class="exp-card group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700" data-modal="expWork1">
        <div class="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>
        <div class="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
          <i class="ri-code-box-line text-3xl text-blue-600 dark:text-blue-400"></i>
        </div>
        <span class="text-sm font-bold text-blue-500 mb-2 block">2024 - Present</span>
        <h3 class="text-xl font-bold mb-2 dark:text-white group-hover:text-blue-500 transition-colors">Frontend Developer</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">Membangun antarmuka interaktif dan responsif menggunakan teknologi modern seperti React dan TailwindCSS.</p>
        <div class="mt-4 flex items-center text-blue-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Lihat Detail <i class="ri-arrow-right-line ml-1"></i>
        </div>
      </div>

      <!-- Exp 2 -->
      <div class="exp-card group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700" data-modal="expWork2">
        <div class="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>
        <div class="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
          <i class="ri-brush-line text-3xl text-purple-600 dark:text-purple-400"></i>
        </div>
        <span class="text-sm font-bold text-purple-500 mb-2 block">2023 - 2024</span>
        <h3 class="text-xl font-bold mb-2 dark:text-white group-hover:text-purple-500 transition-colors">UI/UX Designer</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">Merancang prototipe aplikasi dan website yang berpusat pada pengalaman pengguna menggunakan Figma.</p>
        <div class="mt-4 flex items-center text-purple-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Lihat Detail <i class="ri-arrow-right-line ml-1"></i>
        </div>
      </div>

      <!-- Exp 3 -->
      <div class="exp-card group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700" data-modal="expWork3">
        <div class="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>
        <div class="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
          <i class="ri-server-line text-3xl text-green-600 dark:text-green-400"></i>
        </div>
        <span class="text-sm font-bold text-green-500 mb-2 block">2022 - 2023</span>
        <h3 class="text-xl font-bold mb-2 dark:text-white group-hover:text-green-500 transition-colors">Backend Intern</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">Membantu pengembangan RESTful API dan manajemen database menggunakan Node.js dan MongoDB.</p>
        <div class="mt-4 flex items-center text-green-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Lihat Detail <i class="ri-arrow-right-line ml-1"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- ORGANISASI -->
  <div id="about-org" class="about-content absolute inset-0 w-full transition-all duration-500 ease-out transform translate-y-8 opacity-0 pointer-events-none z-0">
    <div class="grid md:grid-cols-3 gap-6 pt-4">
      <!-- Org 1 -->
      <div class="org-card bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-indigo-900/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 dark:border-gray-700">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-md">
            <i class="ri-team-line text-xl"></i>
          </div>
          <div>
            <h3 class="font-bold text-lg dark:text-white leading-tight">OSIS</h3>
            <span class="text-indigo-500 dark:text-indigo-400 text-sm font-medium">Bendahara Pria (2024-2025)</span>
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-sm">Mengelola keuangan kegiatan siswa, memastikan laporan transparan, dan mendukung kelancaran program sekolah.</p>
      </div>

      <!-- Org 2 -->
      <div class="org-card bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-orange-900/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100 dark:border-gray-700">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md">
            <i class="ri-fire-line text-xl"></i>
          </div>
          <div>
            <h3 class="font-bold text-lg dark:text-white leading-tight">Pramuka</h3>
            <span class="text-orange-500 dark:text-orange-400 text-sm font-medium">Ketua (2 Periode)</span>
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-sm">Memimpin berbagai kegiatan perkemahan, melatih kedisiplinan anggota, dan meningkatkan partisipasi aktif hingga 40%.</p>
      </div>

      <!-- Org 3 -->
      <div class="org-card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-emerald-900/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100 dark:border-gray-700">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md">
            <i class="ri-code-s-slash-line text-xl"></i>
          </div>
          <div>
            <h3 class="font-bold text-lg dark:text-white leading-tight">IT Club</h3>
            <span class="text-emerald-500 dark:text-emerald-400 text-sm font-medium">Koordinator Web (2023-2024)</span>
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-sm">Mengadakan workshop pemrograman dasar, mengelola website komunitas, dan memfasilitasi diskusi teknologi terbaru.</p>
      </div>
    </div>
  </div>
</div>
"""

# Regex to replace the flex container and aboutContent completely
pattern = r'<div class="flex justify-center mb-8">.*?</div>\s*</div>\s*<div id="aboutContent" class="min-h-\[1px\]">.*?</div>\s*</div>\s*</div>'
html = re.sub(pattern, about_replacement, html, flags=re.DOTALL)

with open('/root/Portfolio-Fakhul/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
