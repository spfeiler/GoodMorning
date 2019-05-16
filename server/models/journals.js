'use strict';
module.exports = (sequelize, DataTypes) => {
  const Journals = sequelize.define('Journals', {
    date: DataTypes.STRING,
    entry_one: DataTypes.TEXT,
    entry_two: DataTypes.TEXT,
    entry_three: DataTypes.TEXT,
    user: DataTypes.INTEGER
  }, {});
  Journals.associate = function(models) {
    // associations can be defined here
    Journals.belongsTo(models.Users, { foreignKey: "user" });
  };
  return Journals;
};
