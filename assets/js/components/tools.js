import { techCategories } from "../data/tools-data.js";

function toolCardHtml(tool) {
  return `
    <div class="group flex items-center gap-3 backdrop-blur-md bg-white/30 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl p-3.5 shadow-sm shadow-slate-950/5 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:bg-white/60 dark:hover:bg-slate-900/70 transition-all duration-300">
      <!-- Wadah Logo Minimalis -->
      <div class="w-11 h-11 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 p-2 border border-slate-200/40 dark:border-slate-700/50 group-hover:scale-105 transition-all duration-300">
        <img
          src="${tool.img}"
          alt="${tool.title}"
          class="w-full h-full object-contain filter saturate-[0.85] group-hover:saturate-100 transition-all"
        />
      </div>

      <!-- Teks Deskripsi Tool -->
      <div class="min-w-0">
        <h4 class="text-xs md:text-sm font-bold text-slate-900 dark:text-white tracking-tight truncate">
          ${tool.title}
        </h4>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
          ${tool.desc}
        </p>
      </div>
    </div>
  `;
}

function categoryHtml(cat, catIdx) {
  const cards = cat.skills.map(toolCardHtml).join("");
  return `
    <div data-aos="fade-up" data-aos-delay="${catIdx * 50}" class="space-y-5">
      <!-- Judul Sub-Kategori -->
      <div class="border-l-2 border-indigo-500 pl-4">
        <h3 class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${cat.category}
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          ${cat.description}
        </p>
      </div>

      <!-- Grid Cards dalam Kategori -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${cards}
      </div>
    </div>
  `;
}

export function renderTools() {
  const root = document.getElementById("tools-root");
  const categories = techCategories.map(categoryHtml).join("");

  root.innerHTML = `
    <section
      id="tools"
      class="w-full bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300 overflow-hidden"
    >
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <!-- Header Section -->
        <div data-aos="fade-right" class="max-w-2xl mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
            Ekosistem Teknologi
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-none mb-4">
            Technical Stack & Architecture
          </h2>
          <p class="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Kombinasi perangkat penulisan kode, manajemen data, orkestrasi infrastruktur, hingga optimasi performa yang saya kuasai.
          </p>
        </div>

        <!-- Looping per Kategori Stack -->
        <div class="space-y-16">
          ${categories}
        </div>

      </div>
    </section>
  `;
}
