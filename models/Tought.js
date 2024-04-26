const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Tought = db.define("Tought", {
  title: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
});

module.exports = Tought;
