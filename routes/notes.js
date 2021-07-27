const express = require('express');
const Authentication = require('../middleware/authentication');

const router = express.Router();

const {
  getNotes,
  updateNote,
  deleteNotes,
  createNotes,
  getNote,
} = require('../controllers/notes');

router
  .route('/')
  .get(Authentication, getNotes)
  .post(Authentication, createNotes);

router
  .route('/:id')
  .get(Authentication, getNote)
  .put(Authentication, updateNote)
  .delete(Authentication, deleteNotes);

module.exports = router;
