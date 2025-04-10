const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use('/notes', notesRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database & tabel berhasil disinkronisasi');
    const PORT = process.env.PORT || 8080;  // <--- ini WAJIB pakai ENV
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal sinkronisasi database:', err);
  });
