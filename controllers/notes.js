const Notes = require('../models/notesModels');
const response = require('../helpers/response');
const NotesValidation = require('../validators/notes.validation');
const { Op } = require('sequelize');

const getAllNotes = async (req, res) => {
  try {
    const datas = await Notes.findAll();
    response.success(datas, 'Getting datas succes', res);
  } catch (error) {
    response.error({ error: error.message }, 403, res);
  }
};
const getQueryNotes = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || '';
  const offset = limit * page;
  const totalRows = await Notes.count({
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
  const totalPage = Math.ceil(totalRows / limit);
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
  res.json({
    result,
    page,
    limit,
    totalRows,
    totalPage,
  });
};
const getAllNotesById = async (req, res) => {
  try {
    const datas = await Notes.findOne({ where: { id: req.params.id } });

    if (datas === null) {
      response.error('Notes not found', 404, res);
      return;
    }
    response.success(datas, 'Getting datas by Id is succes', res);
  } catch (error) {
    response.error({ error: error.message }, 403, res);
  }
};

const createNotes = async (req, res) => {
  const { error, value } = NotesValidation(req.body);
  if (error) return response.error(error.details[0].message, 422, res);
  try {
    // const { title, body, tags } = req.body;
    await Notes.create({
      title: value.title,
      body: value.body,
      tags: value.tags,
    });
    res
      .status(201)
      .json({ statusCode: '201', message: 'Notes Created succesfully' });
  } catch (error) {
    response.error({ error: error.message }, 403, res);
  }
};
const updateNotes = async (req, res) => {
  const { error, value } = NotesValidation(req.body);
  if (error) return response.error(error.details[0].message, 422, res);
  const notes = await Notes.findOne({ where: { id: req.params.id } });
  if (!notes) {
    return response.error('Notes not found', 404, res);
  }
  try {
    await Notes.update(
      { title: value.title, body: value.body, tags: value.tags },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({ statusCode: '201', message: 'notes updated' });
  } catch (error) {
    response.error({ error: error.message }, 403, res);
  }
};

const deleteNotes = async (req, res) => {
  const findNotes = await Notes.findOne({ where: { id: req.params.id } });

  if (!findNotes) {
    response.error('Notes not found', 404, res);
    return;
  }
  try {
    await Notes.destroy({ where: { id: req.params.id } });
    res
      .status(201)
      .json({ statusCode: '200', message: 'Delete Notes is Succesfully' });
  } catch (error) {
    response.error({ error: error.message }, 403, res);
  }
};

module.exports = {
  getAllNotes,
  createNotes,
  getAllNotesById,
  updateNotes,
  deleteNotes,
  getQueryNotes,
};
