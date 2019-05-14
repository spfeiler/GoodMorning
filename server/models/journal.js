'use strict';
module.exports = (sequelize, DataTypes) => {
  const Journal = sequelize.define('Journal', {
    date: DataTypes.STRING,
    entry: DataTypes.TEXT,
    user: DataTypes.INTEGER
  }, {});
  Journal.associate = function(models) {
    // associations can be defined here
    Journal.belongsTo(models.Users, { foreignKey: "user" });
  };
  return Journal;
};
