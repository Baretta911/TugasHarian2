const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
app.use(express.json());

// Konfigurasi CORS (sesuaikan origin dengan domain frontend kamu kalau perlu)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Routing catatan
app.use('/notes', notesRoutes);

// Sinkronisasi database dan jalankan server
sequelize.sync()
  .then(() => {
    console.log('✅ Database & tabel berhasil disinkronisasi');

    const PORT = process.env.PORT;

    if (!PORT) {
      throw new Error("❌ Environment variable PORT tidak ditemukan. Cloud Run memerlukan PORT.");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Gagal sinkronisasi database:', err);
  });
