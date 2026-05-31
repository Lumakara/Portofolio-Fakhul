import re

with open('/root/Portfolio-Fakhul/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add darkMode: 'class'
js = js.replace("tailwind.config = {\n  theme: {", "tailwind.config = {\n  darkMode: 'class',\n  theme: {")

# Replace about section tabs logic
new_about_logic = """
  // ──────────────────────────────────────
  // 2g. About section tabs (iOS Style)
  // ──────────────────────────────────────
  const aboutFilters = document.querySelectorAll('.about-filter');
  const aboutContents = document.querySelectorAll('.about-content');
  const tabIndicator = document.getElementById('aboutTabIndicator');

  aboutFilters.forEach((filter, index) => {
    filter.addEventListener('click', function() {
      const target = this.dataset.filter;
      
      // Move indicator
      if(tabIndicator) {
        tabIndicator.style.transform = `translateX(${index * 100}%)`;
      }

      // Update button styles
      aboutFilters.forEach(f => {
        f.classList.remove('active', 'text-primary', 'dark:text-white');
        f.classList.add('text-gray-600', 'dark:text-gray-400');
      });
      this.classList.add('active', 'text-primary', 'dark:text-white');
      this.classList.remove('text-gray-600', 'dark:text-gray-400');
      
      // Update contents with smooth animation
      aboutContents.forEach(content => {
        content.classList.remove('translate-y-0', 'opacity-100', 'z-10');
        content.classList.add('translate-y-8', 'opacity-0', 'pointer-events-none', 'z-0');
      });
      
      const targetEl = document.getElementById(target);
      if (targetEl) {
        // small delay for smooth transition
        setTimeout(() => {
          targetEl.classList.remove('translate-y-8', 'opacity-0', 'pointer-events-none', 'z-0');
          targetEl.classList.add('translate-y-0', 'opacity-100', 'z-10');
        }, 50);
      }
    });
  });
"""

# Regex to replace old 2g logic
pattern = r'// 2g\. About section tabs\s*// ──────────────────────────────────────\s*const aboutFilters.*?}\);\s*}\);'
js = re.sub(pattern, new_about_logic.strip(), js, flags=re.DOTALL)

with open('/root/Portfolio-Fakhul/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
