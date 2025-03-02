const express = require('express');
const Note = require('../models/note.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content });
        res.json({ message: 'Catatan ditambahkan', id: note.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        await Note.update({ title, content }, { where: { id } });
        res.json({ message: 'Catatan diperbarui' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Note.destroy({ where: { id } });
        res.json({ message: 'Catatan dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
