const { authJwt } = require("../middleware");
const { Op } = require("sequelize");
const { checkDuplicate } = require("../utils");

const db = require("../models");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/vehicle-brands", [authJwt.verifyToken], (req, res) => {
    let limit = parseInt(req.query.limit) || 2;
    let offset = parseInt(req.query.offset) || null;

    let name = req.query.name;

    const query = {};
    if (name) query.name = { [Op.like]: `%${name}%` };

    db.vehicle_brand
      .findAndCountAll({
        where: query,
        limit: limit,
        offset: offset,
        order: [["id", "ASC"]],
      })
      .then((vb) => {
        const data = {
          data: vb.rows || [],
          totalRows: vb.count || 0,
          page: offset ? offset : 1,
          totalPage: Math.ceil(vb.count / limit) || 1,
        };
        res.status(200).send(data);
      })
      .catch((e) => {
        console.error(e);
        res.status(400).send("Bad Request!");
      });
  });

  app.get("/api/vehicle-brands/:id", [authJwt.verifyToken], (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) res.status(400).send("Bad Request!");
    else {
      db.vehicle_brand
        .findByPk(id)
        .then((vb) => {
          if (vb) res.status(200).send(vb);
          else res.status(404).send({ message: "Data not found!" });
        })
        .catch((e) => {
          console.error(e);
          res.status(500).send("Server error!");
        });
    }
  });

  app.post(
    "/api/vehicle-brands",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const name = req.body.name;
      if (!name) res.status(400).send("Bad Request!");
      else {
        try {
          checkDuplicate(db.vehicle_brand, { name: name }).then(
            (duplicated) => {
              if (!duplicated) {
                db.vehicle_brand.create({ name: name }).then((vbNew) => {
                  res.status(200).send(vbNew);
                });
              } else res.status(422).send({ message: "Duplicated!" });
            }
          );
        } catch (e) {
          res.status(500).send("Server error!");
          console.error(e);
        }
      }
    }
  );

  app.patch(
    "/api/vehicle-brands/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const name = req.body.name;
      if (!name) res.status(400).send("Bad Request!");
      else {
        try {
          checkDuplicate(db.vehicle_brand, { name: name }).then(
            (duplicated) => {
              if (!duplicated) {
                const id = parseInt(req.params.id);
                db.vehicle_brand.findByPk(id).then((vb) => {
                  if (vb) {
                    if (vb.name !== name) {
                      vb.name = name;
                      vb.save().then((vbNew) => {
                        res.status(200).send(vbNew);
                      });
                    } else {
                      res.status(200).send(vb);
                    }
                  } else res.status(404).send({ message: "Data not found!" });
                });
              } else res.status(422).send({ message: "Duplicated!" });
            }
          );
        } catch (e) {
          res.status(500).send("Server Error!");
          console.error(e);
        }
      }
    }
  );

  app.delete(
    "/api/vehicle-brands/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const id = parseInt(req.params.id);
      if (!id) res.status(400).send("Bad Request!");
      else {
        try {
          db.vehicle_brand.findByPk(id).then((vb) => {
            vb.destroy().then(() => {
              res.status(200).send({
                status: "Ok",
                message: `Deleted ${id} from vehicle_brand`,
              });
            });
          });
        } catch (e) {
          res.status(500).send("Server Error!");
          console.error(e);
        }
      }
    }
  );
};
