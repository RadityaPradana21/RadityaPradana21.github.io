# LaDitto Portfolio 🚀
Template portfolio 3D interaktif — semua konten dikelola dari `js/data.js`.

---

## 📁 Struktur Folder

```
laditto-portfolio/
├── index.html              ← Halaman utama (jangan diubah)
├── css/
│   └── style.css           ← Semua gaya tampilan
├── js/
│   ├── data.js             ← ⭐ SATU-SATUNYA file yang perlu diedit
│   ├── app.js              ← Logika render & animasi
│   ├── three-bg.js         ← 3D partikel background
│   └── three-avatar.js     ← 3D kristal hero
└── assets/
    └── images/             ← Simpan semua foto & gambar di sini
```

---

## 🖼️ CARA INPUT GAMBAR SERTIFIKAT (LANGKAH DETAIL)

### Langkah 1 — Siapkan gambar sertifikat
- Format yang didukung: **JPG, JPEG, PNG, WEBP**
- Ukuran ideal: **800 × 480 px** (ratio 5:3, landscape)
- Nama file: pakai nama pendek tanpa spasi, contoh: `cert-dicoding.png`

### Langkah 2 — Letakkan di folder assets
Salin file gambar ke dalam folder:
```
laditto-portfolio/assets/images/
```
Contoh hasil:
```
assets/images/cert-dicoding.png
assets/images/cert-google.png
assets/images/cert-hackerrank.png
```

### Langkah 3 — Edit data.js bagian certificates
Buka `js/data.js` dengan teks editor, cari bagian `certificates:` lalu isi:

```js
certificates: [
  {
    name:   "Belajar Dasar Pemrograman Web",     // ← judul sertifikat
    issuer: "Dicoding Academy",                   // ← nama lembaga penerbit
    img:    "assets/images/cert-dicoding.png",    // ← path gambar yang sudah disalin
    link:   "https://dicoding.com/certificates/xxx", // ← URL kredensial
    emoji:  "🌐",                                 // ← emoji backup (jika gambar gagal muat)
  },
  {
    name:   "Sertifikat Kedua",
    issuer: "Nama Lembaga",
    img:    "assets/images/cert-2.png",
    link:   "https://...",
    emoji:  "🏅",
  },
  // Tambah objek baru { } untuk sertifikat tambahan
],
```

### Langkah 4 — Simpan & Refresh
Simpan file `data.js` → refresh browser (`F5`) → gambar sertifikat tampil.

> **Tip:** Jika gambar belum siap, kosongkan field `img: ""` maka emoji akan tampil sebagai pengganti.

---

## ✏️ CARA GANTI DESKRIPSI PROYEK MANUAL

Buka `js/data.js`, cari bagian `projects:`:

```js
projects: [
  {
    title: "SI PALING",            // ← ganti nama proyek
    desc:  "Deskripsi proyek...",  // ← ganti teks deskripsi di sini
    img:   "assets/images/project-sipaling.png",
    emoji: "🌿",
    tags:  ["Figma", "UI/UX"],     // ← ganti atau tambah tag teknologi
    link:  "#",                    // ← isi URL demo/repo jika ada
  },
  // ... proyek berikutnya
],
```

**Tips menulis deskripsi yang baik:**
- Jelaskan **tujuan** aplikasi (untuk apa)
- Sebutkan **fitur utama** (1-2 fitur kunci)
- Sebutkan **teknologi** yang digunakan
- Panjang ideal: 2-3 kalimat (tidak terpotong di card)

---

## 🌐 CARA PUBLISH

### GitHub Pages (Gratis, Paling Mudah)
1. Buat repository baru di GitHub: `username.github.io`
2. Upload **semua file** (index.html, css/, js/, assets/) ke repository
3. Settings → Pages → Source: **main** branch → **/ (root)** → Save
4. Tunggu 1-2 menit → live di `https://username.github.io`

### Netlify (Drag & Drop)
1. Buka https://netlify.com → Login / Daftar gratis
2. Drag seluruh folder `laditto-portfolio/` ke halaman deploy
3. Website langsung live dengan URL otomatis (bisa custom domain)

### Vercel
1. Push folder ke GitHub repository
2. Buka https://vercel.com → Import Git Repository
3. Deploy otomatis setiap kali push

---

## 📝 REFERENSI ICON SKILL
Cari icon skill di:
- https://devicon.dev (devicons)
- https://www.vectorlogo.zone

Contoh URL icon:
```
HTML5:      https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg
Laravel:    https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg
Flutter:    https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg
Figma:      https://www.vectorlogo.zone/logos/figma/figma-icon.svg
```

---
Made with ❤️ — LaDitto Portfolio Template
