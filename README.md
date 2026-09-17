# Portofolio — Asep Nurdin (HTML + Tailwind CSS + JavaScript)

Hasil refactor dari versi React (Vite) menjadi **HTML statis + Tailwind CSS (CDN) + vanilla JavaScript (ES Modules)**, tanpa build step / bundler. Desain, layout, animasi, dan seluruh asset dipertahankan sama persis dengan versi aslinya.

## Cara menjalankan

Karena JavaScript menggunakan ES Modules (`type="module"`), file harus dibuka lewat local server (bukan `file://`), misalnya:

```bash
# Python
python3 -m http.server 8080

# atau Node
npx serve .
```

Lalu buka `http://localhost:8080`.

> Membuka `index.html` langsung lewat double-click (protokol `file://`) akan memblokir `import`/`fetch` module karena kebijakan CORS browser terhadap file lokal.

## Struktur folder

```
portfolio-html/
├── index.html                    # Markup utama + konfigurasi Tailwind (CDN) & AOS
├── assets/
│   ├── css/
│   │   └── style.css             # Custom CSS tambahan (di luar utility Tailwind)
│   ├── js/
│   │   ├── data/
│   │   │   ├── projects-data.js  # Data 12 project portofolio
│   │   │   └── tools-data.js     # Data kategori tech stack / tools
│   │   ├── components/
│   │   │   ├── navbar.js         # Navbar + mobile menu + efek scroll
│   │   │   ├── dark-mode.js      # Toggle dark/light mode (localStorage)
│   │   │   ├── typed-text.js     # Efek mengetik pada hero (pengganti react-typed)
│   │   │   ├── about.js          # Section About
│   │   │   ├── tools.js          # Section Technical Stack
│   │   │   ├── projects.js       # Section Project + modal detail + "Lihat Semua"
│   │   │   ├── contact-form.js   # Form kontak (submit ke formsubmit.co)
│   │   │   └── footer.js         # Footer + social links
│   │   └── main.js               # Entry point: render semua section + init AOS/Lucide
│   └── img/                      # Semua asset gambar (project, tools, foto profil, dll)
└── docs/
    └── CV_ASEP_NURDIN.pdf        # File CV yang bisa diunduh dari tombol "Download CV"
```

## Teknologi yang dipakai

- **Tailwind CSS** via CDN (`cdn.tailwindcss.com`) — tidak perlu build/`npm install`.
- **AOS (Animate On Scroll)** via CDN — reveal animation saat scroll, sama seperti versi React.
- **Lucide Icons** via CDN — pengganti `lucide-react`, dipakai lewat atribut `data-lucide` dan `lucide.createIcons()`.
- **Vanilla JavaScript (ES Modules)** — setiap section di-render secara dinamis ke dalam elemen root (`#navbar-root`, `#about-root`, dst) lewat fungsi `renderXxx()`, sehingga struktur tetap modular seperti komponen React sebelumnya.

## Catatan refactor

- Efek mengetik pada judul hero (`ReactTyped`) diganti dengan implementasi vanilla di `typed-text.js` dengan string, `typeSpeed`, dan `backSpeed` yang sama persis.
- Ikon dari `lucide-react` diganti dengan Lucide versi vanilla (CDN) — nama ikon tetap sama (`eye`, `external-link`, `layers`, dst).
- Semua path gambar sebelumnya berupa path absolut (`/img/...`, `/asep.jpeg`) — sekarang menjadi path relatif ke `assets/img/...` agar project bisa langsung dijalankan dari folder mana pun tanpa server root khusus.
- Data project & tools dipisah ke file tersendiri (`data/projects-data.js`, `data/tools-data.js`) agar mudah diedit tanpa menyentuh logic render.
