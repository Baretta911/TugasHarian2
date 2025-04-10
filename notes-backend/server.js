require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use('/notes', notesRoutes);

// Mulai dengarkan port SEBELUM sequelize sync
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

// Tetap sync DB tapi tidak menghambat startup
sequelize.sync()
  .then(() => {
    console.log('Database & tabel berhasil disinkronisasi');
  })
  .catch(err => {
    console.error('Gagal sinkronisasi database:', err);
  });
