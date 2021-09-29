'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('UserLocation', {
    userId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    buttonText: DataTypes.STRING
  }, {});
  UserLocation.associate = function(models) {
    UserLocation.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return UserLocation;
};