import { renderDarkModeToggle, bindDarkModeToggle } from "./dark-mode.js";

// PERBAIKAN: Memetakan href dengan benar & menambahkan flag 'isExternal'
const navLinks = [
  { name: "Home", href: "#", isExternal: false },
  { name: "About", href: "#about", isExternal: false },
  { name: "Projects", href: "#project", isExternal: false },
  { name: "Blog", href: "https://asepblog.online/", isExternal: true },
  { name: "Contact", href: "#contact", isExternal: false },
];

function navLinkHtml(link, extraClasses) {
  const target = link.isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${link.href}" class="${extraClasses}"${target}>${link.name}</a>`;
}

export function renderNavbar() {
  const desktopLinks = navLinks
    .map((link) =>
      navLinkHtml(
        link,
        "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl transition-all duration-200 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400"
      )
    )
    .join("");

  const mobileLinks = navLinks
    .map((link) =>
      navLinkHtml(
        link,
        "mobile-nav-link block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
      )
    )
    .join("");

  const root = document.getElementById("navbar-root");
  root.innerHTML = `
    <div id="navbar-wrapper" class="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-500 pt-4">
      <nav
        id="navbar"
        class="mx-auto max-w-5xl w-full transition-all duration-300 rounded-2xl border bg-transparent border-transparent"
      >
        <div class="px-6 py-3 flex justify-between items-center">
          <!-- Logo / Brand -->
          <div class="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Asep <span class="text-indigo-500 dark:text-indigo-400">Nurdin</span>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            ${desktopLinks}
          </div>

          <!-- Right Action Area -->
          <div class="flex items-center space-x-4">
            ${renderDarkModeToggle()}

            <!-- Hamburger Button -->
            <div class="md:hidden flex items-center">
              <button
                id="mobile-menu-toggle"
                class="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/5 focus:outline-none transition-all"
                aria-label="Toggle Menu"
              >
                <i data-lucide="menu" id="menu-icon-open" class="w-[22px] h-[22px]"></i>
                <i data-lucide="x" id="menu-icon-close" class="w-[22px] h-[22px] hidden"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div
          id="mobile-menu"
          class="md:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0"
        >
          <div class="px-6 py-4 space-y-1 bg-white/60 dark:bg-slate-950/60 backdrop-blur-lg rounded-b-2xl">
            ${mobileLinks}
          </div>
        </div>
      </nav>
    </div>
  `;

  bindDarkModeToggle();
  bindNavbarBehavior();
}

function bindNavbarBehavior() {
  const nav = document.getElementById("navbar");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");
  const mobileLinkEls = document.querySelectorAll(".mobile-nav-link");

  const scrolledClasses = [
    "backdrop-blur-md",
    "bg-white/40",
    "dark:bg-slate-950/40",
    "border-white/20",
    "dark:border-slate-800/50",
    "shadow-lg",
    "shadow-slate-900/5",
  ];
  const transparentClasses = ["bg-transparent", "border-transparent"];

  function handleScroll() {
    const scrolled = window.scrollY > 20;
    if (scrolled) {
      nav.classList.remove(...transparentClasses);
      nav.classList.add(...scrolledClasses);
    } else {
      nav.classList.add(...transparentClasses);
      nav.classList.remove(...scrolledClasses);
    }
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  let open = false;
  function setOpen(next) {
    open = next;
    if (open) {
      mobileMenu.classList.remove("max-h-0", "opacity-0");
      mobileMenu.classList.add("max-h-64", "opacity-100", "border-t", "border-slate-200/20");
      iconOpen.classList.add("hidden");
      iconClose.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("max-h-0", "opacity-0");
      mobileMenu.classList.remove("max-h-64", "opacity-100", "border-t", "border-slate-200/20");
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    }
  }

  toggleBtn.addEventListener("click", () => setOpen(!open));
  mobileLinkEls.forEach((el) => el.addEventListener("click", () => setOpen(false)));
}
