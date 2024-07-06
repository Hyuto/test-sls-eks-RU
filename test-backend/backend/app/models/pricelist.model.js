module.exports = (sequelize, Sequelize) => {
  const Pricelist = sequelize.define("pricelist", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    year_id: {
      type: Sequelize.INTEGER,
    },
    model_id: {
      type: Sequelize.INTEGER,
    },
  });

  return Pricelist;
};
