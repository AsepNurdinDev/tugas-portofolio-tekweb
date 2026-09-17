const socials = [
  { icon: "facebook", href: "#", label: "Facebook" },
  { icon: "instagram", href: "https://www.instagram.com/aseppnrdn/", label: "Instagram" },
  { icon: "github", href: "https://github.com/AsepNurdinDev", label: "GitHub" },
  { icon: "linkedin", href: "https://www.linkedin.com/in/aseppnrdn", label: "LinkedIn" },
];

export function renderFooter() {
  const root = document.getElementById("footer-root");
  if (!root) return; // Guard clause jika container tidak ditemukan

  const socialLinks = socials
    .map(
      (social) => `
      <li>
        <a
          href="${social.href}"
          rel="noreferrer"
          target="_blank"
          aria-label="${social.label}"
          class="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-sm shadow-slate-950/5 transition-all duration-200"
        >
          <i data-lucide="${social.icon}" class="w-[18px] h-[18px]"></i>
        </a>
      </li>`
    )
    .join("");

  root.innerHTML = `
    <footer class="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/60 py-12 transition-colors duration-300">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <!-- Identitas Brand / Nama -->
        <div class="flex flex-col items-center justify-center text-center">
          <div class="inline-flex items-center gap-2 mb-3">
            <i data-lucide="terminal" class="w-[18px] h-[18px] text-indigo-600 dark:text-indigo-400"></i>
            <span class="text-lg font-extrabold text-slate-950 dark:text-white tracking-tight">
              Asep Nurdin
            </span>
          </div>

          <!-- Deskripsi Kompetensi Terkini -->
          <p class="max-w-md text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Full-Stack Developer & DevOps Practitioner. Berfokus pada pembangunan arsitektur backend yang tangguh, antarmuka modern yang optimal (SEO), dan manajemen infrastruktur awan.
          </p>
        </div>

        <!-- Menu Navigasi Internal -->
        <ul class="mt-8 flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider">
          <li>
            <a href="#about" class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              About
            </a>
          </li>
          <li>
            <a href="#project" class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              Contact
            </a>
          </li>
        </ul>

        <!-- Copyright Area -->
        <div class="mt-10 border-t border-slate-200/60 dark:border-slate-900 pt-6 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-wide">
          &copy; <span id="footer-year"></span> Asep Nurdin. All rights reserved.
        </div>

      </div>
    </footer>
  `;

  document.getElementById("footer-year").textContent = new Date().getFullYear();

  // Memanggil re-render icon setelah DOM disalin
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}