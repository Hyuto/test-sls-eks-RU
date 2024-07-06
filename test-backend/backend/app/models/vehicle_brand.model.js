module.exports = (sequelize, Sequelize) => {
  const vehicleBrand = sequelize.define("vehicle_brand", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });

  return vehicleBrand;
};
