module.exports = (sequelize, Sequelize) => {
  const vehicleYear = sequelize.define("vehicle_year", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return vehicleYear;
};
