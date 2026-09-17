// Dark mode toggle — menyimpan preferensi user di localStorage,
// sama seperti perilaku DarkModeToggle.jsx pada versi React.

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  // fallback: hormati preferensi sistem jika belum pernah diset
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

export function initDarkMode() {
  // Terapkan tema saat halaman dimuat (index.html sudah default class="dark",
  // baris ini menyelaraskannya dengan preferensi tersimpan user).
  applyTheme(getInitialTheme());
}

export function renderDarkModeToggle() {
  const isDark = document.documentElement.classList.contains("dark");
  return `
    <button
      id="dark-mode-toggle"
      class="justify-center m-1 rounded-xl px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition"
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
    >
      <span id="dark-mode-icon">${isDark ? "🌙" : "☀️"}</span>
    </button>
  `;
}

export function bindDarkModeToggle() {
  const btn = document.getElementById("dark-mode-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isDark = !document.documentElement.classList.contains("dark");
    applyTheme(isDark);
    const icon = document.getElementById("dark-mode-icon");
    if (icon) icon.textContent = isDark ? "🌙" : "☀️";
  });
}

// Terapkan tema sesegera mungkin (sebelum render) agar tidak ada flicker.
initDarkMode();
