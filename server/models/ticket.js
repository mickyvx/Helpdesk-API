'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Ticket',
    {
      alias: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM,
        values: ['Low', 'Normal', 'High', 'Critical'],
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        values: ['Pending', 'Open', 'On-Hold', 'Resolved'],
        allowNull: false
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {},
  );
  Ticket.associate = function(models) {
    Ticket.belongsTo(models.User, {
      as: 'user'
    }),
    Ticket.belongsTo(models.User, {
      as: 'tech'
    }),
    Ticket.belongsTo(models.Department, {
      as: 'department'
    }),
    Ticket.hasMany(models.Reply, {
      as: 'replies'
    }),
    Ticket.hasMany(models.Note, {
      as: 'notes'
    })
  }
  return Ticket;
};
