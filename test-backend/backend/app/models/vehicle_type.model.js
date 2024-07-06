module.exports = (sequelize, Sequelize) => {
  const vehicleType = sequelize.define("vehicle_type", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    brand_id: {
      type: Sequelize.INTEGER,
    },
  });

  return vehicleType;
};
