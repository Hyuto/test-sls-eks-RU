const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  define: {
    freezeTableName: true,
    /* hooks: {
      beforeFind: (model) => {
        model.attributes = {};
        model.attributes.exclude = ["createdAt", "updatedAt"];
      },
    },
    timestamps: false, */
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.vehicle_brand = require("../models/vehicle_brand.model.js")(
  sequelize,
  Sequelize
);
db.vehicle_type = require("../models/vehicle_type.model.js")(
  sequelize,
  Sequelize
);
db.vehicle_model = require("../models/vehicle_model.model.js")(
  sequelize,
  Sequelize
);
db.vehicle_year = require("../models/vehicle_year.model.js")(
  sequelize,
  Sequelize
);
db.pricelist = require("../models/pricelist.model.js")(sequelize, Sequelize);

db.vehicle_type.belongsTo(db.vehicle_brand, {
  as: "brand",
  foreignKey: "brand_id",
});
db.vehicle_model.belongsTo(db.vehicle_type, {
  as: "type",
  foreignKey: "type_id",
});
db.pricelist.belongsTo(db.vehicle_year, {
  as: "year",
  foreignKey: "year_id",
});
db.pricelist.belongsTo(db.vehicle_model, {
  as: "model",
  foreignKey: "model_id",
});

module.exports = db;
