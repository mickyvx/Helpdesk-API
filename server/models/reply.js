'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {},
  );
  Reply.associate = function(models) {
    Reply.belongsTo(models.Ticket)
    Reply.belongsTo(models.User,{
      as: 'user'
    })
  }
  return Reply;
};
