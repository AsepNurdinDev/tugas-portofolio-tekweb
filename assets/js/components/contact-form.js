const FORM_ENDPOINT = "https://formsubmit.co/ajax/asepnurdin1902@gmail.com";
let statusHideTimer = null;

export function renderContactForm() {
  const root = document.getElementById("contact-root");

  root.innerHTML = `
    <section
      id="contact"
      class="w-full bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300 overflow-hidden relative"
    >
      <!-- Background Ambient Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      <div data-aos="fade-up" class="max-w-xl mx-auto px-4 relative z-10">

        <!-- Header Section -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            Hubungi Saya
          </div>
          <h2 class="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Mari Mulai <span class="text-indigo-500 dark:text-indigo-400">Kolaborasi</span>
          </h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
            Punya ide proyek company profile, kebutuhan arsitektur backend, atau optimasi DevOps? Kirimkan pesan Anda di bawah ini.
          </p>
        </div>

        <!-- Notifikasi Status Pengiriman -->
        <div id="contact-status" class="hidden mb-6"></div>

        <!-- Form dengan Efek Premium Glassmorphism -->
        <form
          id="contact-form"
          class="space-y-5 backdrop-blur-md bg-white/30 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-950/5 transition-all"
        >
          <!-- Input Nama -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Masukkan nama Anda"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-sm text-slate-900 dark:text-white p-3.5 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
            />
          </div>

          <!-- Input Email -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Alamat Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="nama@email.com"
              class="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-sm text-slate-900 dark:text-white p-3.5 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
            />
          </div>

          <!-- Input Pesan -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Detail Pesan
            </label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Tuliskan detail rencana proyek atau pertanyaan Anda di sini..."
              class="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-sm text-slate-900 dark:text-white p-3.5 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none disabled:opacity-50"
            ></textarea>
          </div>

          <!-- Tombol Kirim dengan State Loading -->
          <button
            type="submit"
            id="contact-submit-btn"
            class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 disabled:from-slate-600 disabled:to-slate-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-300 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed"
          >
            <span id="contact-submit-label">Kirim Pesan</span>
            <i data-lucide="send" id="contact-submit-icon" class="w-3.5 h-3.5"></i>
          </button>
        </form>

      </div>
    </section>
  `;

  if (window.lucide) window.lucide.createIcons();
  bindContactForm();
}

function setLoading(isLoading) {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("contact-submit-btn");
  const label = document.getElementById("contact-submit-label");
  const iconEl = document.getElementById("contact-submit-icon");

  btn.disabled = isLoading;
  [...form.elements].forEach((el) => {
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.disabled = isLoading;
  });

  if (isLoading) {
    label.textContent = "Sedang Mengirim...";
    iconEl.setAttribute("data-lucide", "loader-2");
    iconEl.classList.add("animate-spin");
  } else {
    label.textContent = "Kirim Pesan";
    iconEl.setAttribute("data-lucide", "send");
    iconEl.classList.remove("animate-spin");
  }
  if (window.lucide) window.lucide.createIcons();
}

function showStatus(type, message) {
  const statusEl = document.getElementById("contact-status");
  const isSuccess = type === "success";

  statusEl.className = `mb-6 flex items-center gap-3 rounded-2xl p-4 text-xs font-medium shadow-sm animate-fade-in ${
    isSuccess
      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
      : "bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400"
  }`;
  statusEl.innerHTML = `
    <i data-lucide="${isSuccess ? "check-circle-2" : "alert-circle"}" class="w-4 h-4 shrink-0"></i>
    <span>${message}</span>
  `;
  if (window.lucide) window.lucide.createIcons();

  // Hilangkan alert otomatis setelah 5 detik
  if (statusHideTimer) clearTimeout(statusHideTimer);
  statusHideTimer = setTimeout(() => {
    statusEl.className = "hidden mb-6";
    statusEl.innerHTML = "";
  }, 5000);
}

function bindContactForm() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: form.elements["name"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value,
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showStatus("success", "Pesan Anda berhasil terkirim! Saya akan segera menghubungi Anda.");
        form.reset();
      } else {
        throw new Error("Gagal kirim");
      }
    } catch (err) {
      console.error(err);
      showStatus("error", "Gagal mengirim pesan. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  });
}
