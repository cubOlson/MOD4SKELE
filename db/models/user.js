'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserLocation, { foreignKey: 'userId' });
  };
  return User;
};