import re

with open('/root/Portfolio-Fakhul/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make the tabs responsive
old_tabs = """<div class="flex justify-center mb-12 relative z-10" data-aos="fade-up">
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
</div>"""

new_tabs = """<div class="flex justify-center mb-12 relative z-10 w-full max-w-2xl mx-auto" data-aos="fade-up">
  <div class="ios-tabs-container relative flex w-full p-1 bg-gray-200 dark:bg-gray-800 rounded-full shadow-inner overflow-hidden border border-gray-300 dark:border-gray-700">
    <div class="ios-tab-indicator absolute top-1 bottom-1 left-1 rounded-full bg-white dark:bg-gray-700 shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-[calc(33.333%-0.5rem)]" id="aboutTabIndicator"></div>
    
    <button class="about-filter flex-1 relative z-10 py-3 text-xs sm:text-sm md:text-base rounded-full font-semibold transition-colors active text-primary dark:text-white flex items-center justify-center whitespace-nowrap" data-filter="about-education">
      <i class="ri-book-line mr-1 sm:mr-2"></i>Education
    </button>
    <button class="about-filter flex-1 relative z-10 py-3 text-xs sm:text-sm md:text-base rounded-full font-semibold transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center whitespace-nowrap" data-filter="about-exp">
      <i class="ri-briefcase-line mr-1 sm:mr-2"></i>Exp Work
    </button>
    <button class="about-filter flex-1 relative z-10 py-3 text-xs sm:text-sm md:text-base rounded-full font-semibold transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center whitespace-nowrap" data-filter="about-org">
      <i class="ri-group-line mr-1 sm:mr-2"></i>Organisasi
    </button>
  </div>
</div>"""

html = html.replace(old_tabs, new_tabs)

with open('/root/Portfolio-Fakhul/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
