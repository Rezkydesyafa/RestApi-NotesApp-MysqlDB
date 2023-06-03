const response = require('../helpers/response');
const NotesValidation = require('../validators/notes.validation');
const {
  findAll,
  findOne,
  insertNotes,
  editNotes,
  dropNotes,
  findQueryParams,
  countRows,
} = require('../helpers/notes.repository');

const getAllNotes = async (req, res) => {
  try {
    const datas = await findAll();
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
  const totalRows = await countRows(search);
  const totalPage = Math.ceil(totalRows / limit);
  const result = await findQueryParams(offset, limit, search);
  // if (!findQueryParams) return console.log('note found');
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
    const datas = await findOne(req);

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
    await insertNotes(value);
    res
      .status(201)
      .json({ statusCode: '201', message: 'Notes Created succesfully' });
  } catch (error) {
    response.error({ error: error.message }, 403, res);
  }
};

const updateNotes = async (req, res) => {
  const { error, value } = NotesValidation(req.body);
  if (error) return res.json({ message: error.details[0].message });
  const findNotes = await findOne(req);

  if (!findNotes) return response.error('Notes not found', 404, res);

  try {
    const notes = await editNotes(value, req);
    // res.status(201).json({ statusCode: '201', message: 'notes updated' });
    response.success('', 'updated notes is successfully', res);
  } catch (error) {
    console.log(error);
    response.error(error.message, 403, res);
  }
};

const deleteNotes = async (req, res) => {
  const findNotes = await findOne(req);

  if (!findNotes) return response.error('Notes not found', 404, res);
  try {
    await dropNotes(req);
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
