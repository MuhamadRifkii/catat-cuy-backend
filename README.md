# Catat Cuy! Backend 🛠️

**Catat Cuy! Backend** adalah backend REST API untuk aplikasi Catat Cuy!, dibangun menggunakan **Express.js**. API ini menyediakan fitur CRUD catatan dengan koneksi ke database PostgreSQL menggunakan **Sequelize** dan di-host menggunakan **Neon**.

## 📋 Fitur

- REST API untuk CRUD catatan.
- Validasi input data.
- Pengelolaan database menggunakan Sequelize ORM.
- Struktur kode modular untuk kemudahan pengembangan.

---

## 🛠️ Teknologi yang Digunakan

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Sequelize](https://sequelize.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) di-host pada [Neon](https://neon.tech/)

---

## ⚡ Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/username/catat-cuy-backend.git
cd catat-cuy-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Database

- Buat akun di [Neon](https://neon.tech/), buat proyek baru, dan dapatkan URL database Anda.
- Buat file `.env` di root folder proyek dan tambahkan konfigurasi berikut:

```bash
- TOKEN_SHHHH = #Token untuk autentikasi atau enkripsi
- PORT = #Isi dengan Port keinginan anda, default 3001
# Sesuaikan dengan konfigurasi Database Neon anda
- PGUSER =  #User
- PGPASSWORD= #Password
- PGDATABASE= #Nama Database
- PGHOST= #Host Neon
- GMAIL_USER: #Email untuk pengiriman OTP.
- GMAIL_PASS: #Password aplikasi Gmail Anda, yang dibuat melalui fitur App Password di akun Google.
```

### 4. Migrasi Database

npx sequelize-cli db:migrate

### 5. Jalankan Server

npm run dev

### 6. Akses API

Server berjalan di http://localhost:3001.

---

## 📂 Struktur Proyek

```
catat-cuy-backend/
├── src/
│   ├── api/            # Berisi Controller dan Routes API Aplikasi
│   ├── config/         # Berisi Konfigurasi Database Aplikasi
│   ├── middleware/     # Berisi proses authentikasi User pada Database
│   ├── migration/      # Berisi migration tabel Database
│   ├── models/         # Model Sequelize
│   ├── seeders/        # Data Dummy yang dapat di seed ke Database
│   └── utils/          # Utilitas yang digunakan di Aplikasi
├── .env                # File konfigurasi environment
├── package.json        # Konfigurasi dependensi
└── README.md           # Dokumentasi
```

---

## 🔗 Endpoints API

| Method | Endpoint                   | Deskripsi                  |
| ------ | -------------------------- | -------------------------- |
|        | /api/v2/auth/*             |                            |
| POST   | */register                 | Mendaftar Akun             |
| POST   | */login                    | Masuk Akun                 |
| GET    | */get-user                 | Mengambil informasi akun   |
| POST   | */request-password-reset   | Request Reset Password     |
| POST   | */reset-password           | Reset Password             |
|        |                            |                            |
|        | /api/v2/notes/*            |                            |
| GET    | */get-all-notes            | Mengambil semua catatan    |
| POST   | */add-note                 | Menambahkan catatan        |
| PUT    | */edit-note/:id            | Mengedit catatan           |
| PUT    | */edit-note/:id            | Mengedit catatan           |
| PUT    | */pin-note/:id             | Memberi pin pada catatan   |
| DELETE | */delete/:id               | Menghapus catatan          |

## 🤝 Kontribusi

Kontribusi sangat diterima pada aplikasi! Untuk memulai:

1. Fork repository ini.
2. Buat branch fitur Anda
   ```bash
   git checkout -b fitur/<Nama Fitur>.
   ```
3. Commit perubahan Anda

   ```bash
   git commit -m 'Menambahkan fitur <Nama Fitur>'.
   ```

4. Push ke branch (git push origin fitur/AmazingFeature)
5. Buat Pull Request.

---

## 🌟 Kredit

- Dibuat dengan ❤️ oleh [Muhamad Rifqi](https://github.com/MuhamadRifkii/).
