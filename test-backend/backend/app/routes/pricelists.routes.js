const { authJwt } = require("../middleware");
const { Op } = require("sequelize");

const db = require("../models");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/pricelists", [authJwt.verifyToken], (req, res) => {
    let limit = parseInt(req.query.limit) || 2;
    let offset = parseInt(req.query.offset) || null;

    let code = req.query.code;
    let price_min = parseInt(req.query.price_min);
    let price_max = parseInt(req.query.price_max);
    let year_id = parseInt(req.query.year_id);
    let model_id = parseInt(req.query.model_id);

    const query = {};
    if (code) query.code = { [Op.like]: `%${code}%` };
    if (price_min) query.price = { [Op.gte]: price_min };
    if (price_max) query.price = { [Op.lte]: price_max };
    if (year_id) query.year_id = { [Op.eq]: year_id };
    if (model_id) query.model_id = { [Op.eq]: model_id };

    db.pricelist
      .findAndCountAll({
        where: query,
        limit: limit,
        offset: offset,
        order: [["id", "ASC"]],
        include: [
          {
            model: db.vehicle_year,
            as: "year",
            attributes: ["id", "year"],
          },
          {
            model: db.vehicle_model,
            as: "model",
            attributes: ["id", "name"],
            include: {
              model: db.vehicle_type,
              as: "type",
              attributes: ["id", "name"],
              include: {
                model: db.vehicle_brand,
                as: "brand",
                attributes: ["id", "name"],
              },
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

  app.get("/api/pricelists/:id", [authJwt.verifyToken], (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) res.status(400).send("Bad Request!");
    else {
      db.pricelist
        .findByPk(id, {
          include: [
            {
              model: db.vehicle_year,
              as: "year",
              attributes: ["id", "year"],
            },
            {
              model: db.vehicle_model,
              as: "model",
              attributes: ["id", "name"],
              include: {
                model: db.vehicle_type,
                as: "type",
                attributes: ["id", "name"],
                include: {
                  model: db.vehicle_brand,
                  as: "brand",
                  attributes: ["id", "name"],
                },
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
    "/api/pricelists",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const code = req.body.code;
      const price = parseInt(req.body.price);
      const year_id = parseInt(req.body.year_id);
      const model_id = parseInt(req.body.model_id);

      if (!code && !price && !year_id && !model_id)
        res.status(400).send("Bad Request!");
      else {
        db.pricelist
          .create({
            code: code,
            price: price,
            year_id: year_id,
            model_id: model_id,
          })
          .then((vbNew) => {
            res.status(200).send(vbNew);
          })
          .catch((e) => {
            if (e.name == "SequelizeUniqueConstraintError")
              res.status(422).send({ message: "Duplicated!" });
            else {
              res.status(500).send("Server error!");
              console.error(e);
            }
          });
      }
    }
  );

  app.patch(
    "/api/pricelists/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const code = req.body.code;
      const price = parseInt(req.body.price);
      const year_id = parseInt(req.body.year_id);
      const model_id = parseInt(req.body.model_id);

      if (!code && !price && !year_id && !model_id)
        res.status(400).send("Bad Request!");
      else {
        const id = parseInt(req.params.id);
        db.pricelist
          .findByPk(id)
          .then((vb) => {
            if (vb) {
              let save = false;
              if (code && vb.code !== code) {
                vb.code = code;
                save = true;
              }
              if (price && vb.price !== price) {
                vb.price = price;
                save = true;
              }
              if (year_id && vb.year_id !== year_id) {
                vb.year_id = year_id;
                save = true;
              }
              if (model_id && vb.model_id !== model_id) {
                vb.model_id = model_id;
                save = true;
              }

              if (save) {
                vb.save()
                  .then((vbNew) => {
                    res.status(200).send(vbNew);
                  })
                  .catch((e) => {
                    if (e.name == "SequelizeUniqueConstraintError")
                      res.status(422).send({ message: "Duplicated!" });
                    else {
                      res.status(500).send("Server error!");
                      console.error(e);
                    }
                  });
              } else {
                res.status(200).send(vb);
              }
            } else res.status(404).send({ message: "Data not found!" });
          })
          .catch((e) => {
            res.status(500).send("Server Error!");
            console.error(e);
          });
      }
    }
  );

  app.delete(
    "/api/pricelists/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const id = parseInt(req.params.id);
      if (!id) res.status(400).send("Bad Request!");
      else {
        db.pricelist
          .findByPk(id)
          .then((vb) => {
            vb.destroy().then(() => {
              res.status(200).send({
                status: "Ok",
                message: `Deleted ${id} from pricelist`,
              });
            });
          })
          .catch((e) => {
            res.status(500).send("Server Error!");
            console.error(e);
          });
      }
    }
  );
};
