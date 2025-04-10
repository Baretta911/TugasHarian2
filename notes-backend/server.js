const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
app.use(express.json());

// Allow CORS from anywhere (or ganti dengan domain frontend kamu)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Gunakan route dari notesRoutes
app.use('/notes', notesRoutes);

// Sinkronisasi database sebelum server berjalan
sequelize.sync()
  .then(() => {
    console.log('Database & tabel berhasil disinkronisasi');

    const PORT = process.env.PORT || 8080; // Cloud Run biasanya pakai PORT env
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal sinkronisasi database:', err);
  });
