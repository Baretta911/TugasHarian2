const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Gunakan route dari notesRoutes
app.use('/notes', notesRoutes);

// Sinkronisasi database sebelum server berjalan
sequelize.sync()
    .then(() => {
        console.log('Database & tabel berhasil disinkronisasi');
        const PORT = process.env.PORT || 8080; // Pastikan ini menggunakan 8080
        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Gagal sinkronisasi database:', err);
    });
