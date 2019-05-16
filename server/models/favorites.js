'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    thumbnail: DataTypes.TEXT,
    title: DataTypes.TEXT,
    url: DataTypes.TEXT,
    articleId: DataTypes.STRING,
    user: DataTypes.INTEGER
  }, {});
  Favorites.associate = function(models) {
    // associations can be defined here
    Favorites.belongsTo(models.Users, { foreignKey: "user" });
  };
  return Favorites;
};
