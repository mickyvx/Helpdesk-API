'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  Department.associate = function(models) {
    Department.hasMany(models.Ticket)
  }
  return Department;
};
