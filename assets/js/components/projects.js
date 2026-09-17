import { projectsData } from "../data/projects-data.js";

let showAll = false;

function projectCardHtml(project, index) {
  const techBadges = project.tech
    .slice(0, 4)
    .map(
      (t) => `
        <span class="px-2.5 py-0.5 text-[10px] font-semibold rounded-md bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300/10">
          ${t}
        </span>`
    )
    .join("");

  const extraTechBadge =
    project.tech.length > 4
      ? `<span class="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">+${
          project.tech.length - 4
        }</span>`
      : "";

  return `
    <div
      data-aos="fade-up"
      data-aos-delay="${index * 50}"
      class="group flex flex-col justify-between backdrop-blur-md bg-white/30 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-sm shadow-slate-950/5 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:bg-white/50 dark:hover:bg-slate-900/60 transition-all duration-300"
    >
      <!-- Image Area -->
      <div class="w-full h-48 overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/40 dark:border-slate-800/40 relative">
        <img
          src="${project.img}"
          alt="${project.title}"
          class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 filter saturate-[0.9]"
        />
      </div>

      <!-- Content Area -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-base font-bold text-slate-950 dark:text-white tracking-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
            ${project.title}
          </h3>
          <!-- Text dibatasi 3 baris di halaman depan agar layout tetap simetris -->
          <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-5 line-clamp-3">
            ${project.desc}
          </p>
        </div>

        <!-- Tags & Action Buttons -->
        <div>
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${techBadges}
            ${extraTechBadge}
          </div>

          <!-- Dual Actions: Detail & Link -->
          <div class="flex items-center justify-between gap-2 border-t border-slate-200/30 dark:border-slate-800/30 pt-4">
            <button
              data-project-index="${index}"
              class="project-detail-btn inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>Detail</span>
            </button>

            <a
              href="${project.link}"
              class="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Eksplorasi</span>
              <i data-lucide="external-link" class="w-3 h-3 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function modalHtml(project) {
  const techBadges = project.tech
    .map(
      (t) => `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/30">
          <i data-lucide="terminal" class="w-[11px] h-[11px] text-indigo-500"></i>
          ${t}
        </span>`
    )
    .join("");

  return `
    <div id="project-modal-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <!-- Backdrop Blur Layer -->
      <div id="project-modal-backdrop" class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>

      <!-- Modal Card Content -->
      <div class="relative w-full max-w-2xl bg-white/90 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">

        <!-- Close Button Inside Modal -->
        <button
          id="project-modal-close"
          class="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Tutup detail proyek"
        >
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>

        <!-- Modal Image Header -->
        <div class="w-full h-56 sm:h-64 shrink-0 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 relative">
          <img
            src="${project.img}"
            alt="${project.title}"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Modal Core Info (Scrollable if text is too long) -->
        <div class="p-6 overflow-y-auto space-y-6 CustomScrollbar">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
              <i data-lucide="cpu" class="w-[10px] h-[10px]"></i> Arsitektur Sistem
            </div>
            <h3 class="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              ${project.title}
            </h3>
          </div>

          <!-- Deskripsi Lengkap - Tanpa Terpotong -->
          <div class="space-y-2">
            <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Dokumentasi Proyek</span>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
              ${project.desc}
            </p>
          </div>

          <!-- Seluruh Tech Stack Terpasang -->
          <div class="space-y-2.5">
            <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Teknologi & Infrastruktur</span>
            <div class="flex flex-wrap gap-2">
              ${techBadges}
            </div>
          </div>
        </div>

        <!-- Modal Footer Action Button -->
        <div class="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/60 flex justify-end shrink-0">
          <a
            href="${project.link}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition"
          >
            <span>Kunjungi Tautan Proyek</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>

      </div>
    </div>
  `;
}

function closeModal() {
  const overlay = document.getElementById("project-modal-overlay");
  if (overlay) overlay.remove();
  document.body.style.overflow = "";
}

function openModal(project) {
  closeModal();
  document.body.insertAdjacentHTML("beforeend", modalHtml(project));
  document.body.style.overflow = "hidden";

  if (window.lucide) window.lucide.createIcons();

  document.getElementById("project-modal-close").addEventListener("click", closeModal);
  document.getElementById("project-modal-backdrop").addEventListener("click", closeModal);
}

export function renderProjects() {
  const root = document.getElementById("project-root");
  draw(root);
}

function draw(root) {
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 6);
  const cards = visibleProjects.map(projectCardHtml).join("");

  const toggleButton =
    projectsData.length > 6
      ? `
      <div data-aos="fade-up" class="flex justify-center mt-14">
        <button
          id="project-toggle-btn"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800/80 backdrop-blur-sm bg-white/20 dark:bg-slate-900/20 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:scale-[1.02]"
        >
          <i data-lucide="layers" class="w-4 h-4"></i>
          <span>${showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua Project"}</span>
        </button>
      </div>`
      : "";

  root.innerHTML = `
    <section
      id="project"
      class="w-full bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300 overflow-hidden"
    >
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <!-- Header Section -->
        <div data-aos="fade-right" class="max-w-2xl mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
            Portofolio
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-none mb-4">
            Proyek Pilihan
          </h2>
          <p class="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Kumpulan sistem backend, arsitektur microservices, dan optimalisasi platform yang dirancang dengan performa tinggi.
          </p>
        </div>

        <!-- Grid Project Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cards}
        </div>

        ${toggleButton}

      </div>
    </section>
  `;

  if (window.lucide) window.lucide.createIcons();
  if (window.AOS) window.AOS.refreshHard();

  root.querySelectorAll(".project-detail-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.projectIndex);
      openModal(visibleProjects[idx]);
    });
  });

  const toggleBtn = document.getElementById("project-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      showAll = !showAll;
      draw(root);
    });
  }
}
