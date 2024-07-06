module.exports = (sequelize, Sequelize) => {
  const vehicleModel = sequelize.define("vehicle_model", {
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
    type_id: {
      type: Sequelize.INTEGER,
    },
  });

  return vehicleModel;
};
