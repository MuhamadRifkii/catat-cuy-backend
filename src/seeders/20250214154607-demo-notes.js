"use strict";

const { faker } = require("@faker-js/faker");
const { encrypt } = require("../utils/encryption");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const notes = [
      {
        title: "Tugas Sekolah",
        content: `<p><strong>Tugas Pemrograman Mobile.</strong></p><p>Membuat aplikasi catatan berbasis mobile.</p><p><br></p><p><strong>Catatan:</strong> Jangan lupa mengerjakan <u>matematika</u> dan <em>bahasa Inggris</em>.</p>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Belanja Mingguan",
        content: `<p><strong>To-Do List:</strong></p><ul><li>Belanja Mingguan: <u>beras</u>, <em>sayur</em>, telur</li><li>Kerja: Siapkan laporan <strong>proyek</strong></li><li>Panggil teman untuk makan siang</li></ul><p><br></p><p><strong>Prioritas:</strong> <u>Pekerjaan rumah tangga</u></p>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Rencana Liburan",
        content: `<p><strong>Rencana Liburan:</strong></p><ul><li>Bali, tanggal 20-25</li><li>Booking tiket pesawat</li><li>Cari penginapan</li></ul>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Meeting dengan Tim",
        content: `<p><strong>Agenda Meeting:</strong></p><ol><li>Diskusi anggaran <strong>proyek</strong></li><li>Persiapan <u>presentasi</u> untuk klien</li><li>Evaluasi kinerja tim</li></ol>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Catatan Keuangan",
        content: `<p><strong>Catatan Keuangan:</strong></p><p>Pengeluaran bulan ini melebihi budget, perlu evaluasi.</p><p><br></p><ul><li>Gaji bulan ini</li><li>Belanja kebutuhan rumah tangga</li><li><u>Tagihan listrik</u></li></ul>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Daftar Belanja",
        content: `<p><strong>Daftar Belanja:</strong></p><ul><li>Roti</li><li>Air Mineral</li><li>Keju</li></ul><p><br></p><p><strong>Catatan:</strong> Cek stok di kulkas.</p>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "To-Do List Hari Ini",
        content: `<p><strong>To-Do List:</strong></p><ul><li><u>Update website</u> dengan fitur baru</li><li><em>Periksa email klien</em></li><li>Tambah anggaran untuk promosi</li></ul>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Pekerjaan Rumah",
        content: `<p><strong>Pekerjaan Rumah:</strong></p><ul><li>Cuci piring</li><li>Vakum karpet</li><li><u>Bereskan ruang tamu</u></li></ul>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Jadwal Kerja",
        content: `<p><strong>Jadwal Kerja:</strong></p><p>Senin - Jumat: 09:00 - 18:00</p><p><br></p><ol><li>Rapat pagi dengan tim</li><li><em>Kerjakan laporan untuk klien</em></li><li>Cek email</li></ol>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
      {
        title: "Pengingat: Pembayaran",
        content: `<p><strong>Pengingat:</strong></p><p>Periksa tagihan listrik bulan ini.</p><p><br></p><ol><li>Atur jadwal meeting dengan tim</li><li>Rencanakan perjalanan ke Bali</li><li><em>Cek pengeluaran bulan ini</em></li></ol>`,
        isPinned: faker.datatype.boolean(),
        userId: 1,
      },
    ];

    notes.forEach((note) => {
      const { iv, encryptedData } = encrypt(note.content);
      note.content = encryptedData;
      note.iv = iv;
      const randomDaysAgo = Math.floor(Math.random() * 7);
      const randomTime = new Date();
      randomTime.setDate(randomTime.getDate() - randomDaysAgo);

      note.createdAt = randomTime;
      note.updatedAt = randomTime;
    });

    await queryInterface.bulkInsert("notes", notes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("notes", null, {});
  },
};
