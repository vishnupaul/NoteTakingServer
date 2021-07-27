const Notes = require('../models/Notes');

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user_id: req.user.id });
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const createNotes = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const newNotes = new Notes({
      title,
      content,
      date,
      user_id: req.user.id,
      name: req.user.name,
    });
    await newNotes.save();
    res.json({ message: 'New Notes Created' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteNotes = async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted a Note' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    await Notes.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        content,
        date,
      }
    );
    res.json({ message: 'Note is Updated' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    res.json(note);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getNotes,
  updateNote,
  deleteNotes,
  createNotes,
  getNote,
};
