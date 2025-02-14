"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saran = [
      {
        title: "Tambah Mode Gelap",
        content: `<p>Akan sangat membantu jika bisa menambahkan fitur mode gelap agar lebih nyaman dibaca di malam hari. Ini sangat membantu terutama saat menggunakan aplikasi di lingkungan yang minim cahaya.</p><p><br></p>`,
        userId: 1,
      },
      {
        title: "Peningkatan Fitur Pencarian",
        content: `<p>Fitur pencarian bisa ditingkatkan untuk memungkinkan filter berdasarkan tanggal atau kategori. Ini akan mempermudah dalam mempersempit hasil pencarian dengan cepat dan membuatnya lebih user-friendly.</p><p><br></p>`,
        userId: 2,
      },
      {
        title: "Notifikasi untuk Pembaruan",
        content: `<p>Saya ingin menerima notifikasi setiap kali ada pembaruan atau perubahan pada aplikasi. Ini akan membuat saya tetap terinformasi tentang fitur-fitur penting atau perbaikan bug.</p><p><br></p>`,
        userId: 3,
      },
      {
        title: "Versi Aplikasi Mobile",
        content: `<p>Akan sangat baik jika dapat dibuat versi mobile dari aplikasi ini, sehingga dapat diakses di ponsel juga. Ini akan membuat aplikasi lebih mudah diakses bagi pengguna yang aktif bepergian.</p><p><br></p>`,
        userId: 3,
      },
      {
        title: "Opsi Kustomisasi Lebih Banyak",
        content: `<p>Akan lebih menyenangkan jika ada lebih banyak opsi kustomisasi, seperti mengganti tema, ukuran font, atau tata letak. Ini akan memungkinkan pengguna untuk mempersonalisasi aplikasi sesuai preferensi mereka.</p><p><br></p>`,
        userId: 2,
      },
      {
        title: "Perbaikan Bug Upload",
        content: `<p>Ada bug dengan upload catatan, di mana beberapa catatan tidak muncul setelah diunggah. Akan sangat membantu jika bug ini bisa diperbaiki agar pengalaman pengguna lebih lancar.</p><p><br></p>`,
        userId: 1,
      },
      {
        title: "Mode Offline",
        content: `<p>Akan sangat berguna jika ada mode offline di mana pengguna bisa mengakses beberapa fitur meskipun tanpa koneksi internet. Ini penting bagi pengguna yang menggunakan aplikasi saat bepergian.</p><p><br></p>`,
        userId: 1,
      },
      {
        title: "Dukungan Multi-bahasa",
        content: `<p>Aplikasi ini bisa mendapatkan banyak manfaat dari menambahkan dukungan multi-bahasa. Akan lebih baik jika pengguna bisa memilih bahasa pilihan mereka untuk meningkatkan aksesibilitas bagi pengguna non-Inggris.</p><p><br></p>`,
        userId: 2,
      },
      {
        title: "Penanganan Error yang Lebih Baik",
        content: `<p>Pesan error bisa lebih deskriptif agar pengguna tahu apa yang salah dan bagaimana cara memperbaikinya. Penanganan error yang lebih jelas akan meningkatkan pengalaman pengguna.</p><p><br></p>`,
        userId: 3,
      },
      {
        title: "Optimasi Performa",
        content: `<p>Performa aplikasi bisa dioptimalkan lebih lanjut untuk mengurangi waktu loading dan meningkatkan responsivitas, terutama saat digunakan di perangkat dengan spesifikasi rendah.</p><p><br></p>`,
        userId: 1,
      },
    ];

    saran.forEach((feedback) => {
      const randomDaysAgo = Math.floor(Math.random() * 7);
      const randomTime = new Date();
      randomTime.setDate(randomTime.getDate() - randomDaysAgo);

      feedback.createdAt = randomTime;
      feedback.updatedAt = randomTime;
    });

    await queryInterface.bulkInsert("sarans", saran);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sarans", null, {});
  },
};
