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

  app.get("/api/vehicle-models", [authJwt.verifyToken], (req, res) => {
    let limit = parseInt(req.query.limit) || 2;
    let offset = parseInt(req.query.offset) || null;

    let name = req.query.name;
    let type_id = parseInt(req.query.type_id);

    const query = {};
    if (name) query.name = { [Op.like]: `%${name}%` };
    if (type_id) query.type_id = { [Op.eq]: type_id };

    db.vehicle_model
      .findAndCountAll({
        where: query,
        limit: limit,
        offset: offset,
        order: [["id", "ASC"]],
        include: [
          {
            model: db.vehicle_type,
            as: "type",
            attributes: ["id", "name"],
            include: {
              model: db.vehicle_brand,
              as: "brand",
              attributes: ["id", "name"],
            },
          },
        ],
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

  app.get("/api/vehicle-models/:id", [authJwt.verifyToken], (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) res.status(400).send("Bad Request!");
    else {
      db.vehicle_model
        .findByPk(id, {
          include: [
            {
              model: db.vehicle_type,
              as: "type",
              attributes: ["id", "name"],
              include: {
                model: db.vehicle_brand,
                as: "brand",
                attributes: ["id", "name"],
              },
            },
          ],
        })
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
    "/api/vehicle-models",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const name = req.body.name;
      const type_id = parseInt(req.body.type_id);

      if (!name && !type_id) res.status(400).send("Bad Request!");
      else {
        try {
          checkDuplicate(db.vehicle_model, {
            name: name,
            type_id: type_id,
          }).then((duplicated) => {
            if (!duplicated) {
              db.vehicle_model
                .create({ name: name, type_id: type_id })
                .then((vbNew) => {
                  res.status(200).send(vbNew);
                });
            } else res.status(422).send({ message: "Duplicated!" });
          });
        } catch (e) {
          res.status(500).send("Server error!");
          console.error(e);
        }
      }
    }
  );

  app.patch(
    "/api/vehicle-models/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const name = req.body.name;
      const type_id = parseInt(req.body.type_id);

      if (!name && !type_id) res.status(400).send("Bad Request!");
      else {
        try {
          const id = parseInt(req.params.id);
          db.vehicle_model.findByPk(id).then((vb) => {
            if (vb) {
              let save = false;
              if (name && vb.name !== name) {
                vb.name = name;
                save = true;
              }
              if (type_id && vb.type_id !== type_id) {
                vb.type_id = type_id;
                save = true;
              }

              if (save) {
                checkDuplicate(db.vehicle_model, {
                  name: vb.name,
                  type_id: vb.type_id,
                }).then((duplicated) => {
                  if (!duplicated) {
                    vb.save().then((vbNew) => {
                      res.status(200).send(vbNew);
                    });
                  } else res.status(422).send({ message: "Duplicated!" });
                });
              } else {
                res.status(200).send(vb);
              }
            } else res.status(404).send({ message: "Data not found!" });
          });
        } catch (e) {
          res.status(500).send("Server Error!");
          console.error(e);
        }
      }
    }
  );

  app.delete(
    "/api/vehicle-models/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const id = parseInt(req.params.id);
      if (!id) res.status(400).send("Bad Request!");
      else {
        try {
          db.vehicle_model.findByPk(id).then((vb) => {
            vb.destroy().then(() => {
              res.status(200).send({
                status: "Ok",
                message: `Deleted ${id} from vehicle_model`,
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
