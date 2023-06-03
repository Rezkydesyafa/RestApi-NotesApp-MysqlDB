// Untuk Berkomunikasi Ke Database
const { Op } = require('sequelize');
const Notes = require('../models/notesModels');
const countRows = async (search) => {
  const result = await Notes.count({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: '%' + search + '%',
          },
        },
        {
          tags: {
            [Op.like]: '%' + search + '%',
          },
        },
      ],
    },
  });
  return result;
};

const findQueryParams = async (offset, limit, search) => {
  const result = await Notes.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: '%' + search + '%',
          },
        },
        {
          tags: {
            [Op.like]: '%' + search + '%',
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']],
  });
  return result;
};
const findAll = async () => {
  const notes = await Notes.findAll();
  return notes;
};
const findOne = async (req) => {
  const notes = await Notes.findOne({ where: { id: req.params.id } });
  return notes;
};
const insertNotes = async (value) => {
  const notes = await Notes.create({
    title: value.title,
    body: value.body,
    tags: value.tags,
  });
  return notes;
};
const editNotes = async (value, req) => {
  const notes = await Notes.update(
    { title: value.title, body: value.body, tags: value.tags },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return notes;
};

const dropNotes = async (req) => {
  const notes = await Notes.destroy({ where: { id: req.params.id } });
  return notes;
};

module.exports = {
  findAll,
  findOne,
  insertNotes,
  editNotes,
  dropNotes,
  findQueryParams,
  countRows,
};
