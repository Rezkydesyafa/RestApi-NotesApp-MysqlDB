const { Sequelize } = require('sequelize');
const db = require('../config/db.conection.js');

const { DataTypes } = Sequelize;

const Notes = db.define(
  'notes',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.STRING, allowNull: true },
  },
  {
    freezeTableName: true,
  }
);

// (async () => {
//   await db.sync();
// })();

module.exports = Notes;
