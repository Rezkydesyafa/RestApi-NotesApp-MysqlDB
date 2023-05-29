const express = require('express');
const {
  getAllNotes,
  createNotes,
  getAllNotesById,
  updateNotes,
  deleteNotes,
  getQueryNotes,
} = require('../controllers/notes');

const noteRoutes = express.Router();

noteRoutes.get('/', getQueryNotes);
noteRoutes.get('/', getAllNotes);
noteRoutes.get('/:id', getAllNotesById);
noteRoutes.post('/', createNotes);
noteRoutes.patch('/:id', updateNotes);
noteRoutes.delete('/:id', deleteNotes);

module.exports = noteRoutes;
