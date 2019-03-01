'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {},
  );
  User.associate = function(models) {
    User.belongsTo(models.Department,{
      as: 'department'
    })
    User.hasMany(models.Ticket);
  };
  return User;
};
