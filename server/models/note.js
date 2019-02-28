'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      minutes: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {},
  );
  Note.associate = function(models) {
    Note.belongsTo(models.Ticket)
    Note.belongsTo(models.User,{
      as: 'tech'
    })
  }
  return Note;
};
