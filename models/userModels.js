const { Sequelize } = require('sequelize');
const db = require('../config/db.conection.js');

const { DataTypes } = Sequelize;

const Notes = db.define(
  'users',
  {
    // uuid
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

// (async () => {
//   await db.sync();
// })();

module.exports = Notes;
