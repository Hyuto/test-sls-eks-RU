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

  app.get(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      let limit = parseInt(req.query.limit) || 2;
      let offset = parseInt(req.query.offset) || null;

      let is_admin = parseInt(req.query.is_admin);

      const query = {};
      if (is_admin) query.is_admin = { [Op.eq]: is_admin };

      db.user
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
    }
  );

  app.get(
    "/api/admin/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const id = parseInt(req.params.id);
      if (!id) res.status(400).send("Bad Request!");
      else {
        db.user
          .findByPk(id)
          .then((user) => {
            if (user) res.status(200).send(user);
            else res.status(404).send({ message: "Data not found!" });
          })
          .catch((e) => {
            console.error(e);
            res.status(500).send("Server error!");
          });
      }
    }
  );

  app.patch(
    "/api/admin/make-admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const id = parseInt(req.params.id);

      if (!id) res.status(400).send("Bad Request!");
      else {
        db.user
          .findByPk(id)
          .then((user) => {
            if (!user.is_admin) {
              user.is_admin = true;

              user
                .save()
                .then((userNew) => {
                  res
                    .status(200)
                    .send({ message: `User ${userNew.id} is now an admin!` });
                })
                .catch((e) => {
                  res.status(500).send("Server error!");
                  console.error(e);
                });
            } else
              res
                .status(422)
                .send({ message: `User ${id} are already an admin!` });
          })
          .catch((e) => {
            res.status(500).send("Server Error!");
            console.error(e);
          });
      }
    }
  );

  app.patch(
    "/api/admin/drop-admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const id = parseInt(req.params.id);

      if (!id) res.status(400).send("Bad Request!");
      else {
        db.user
          .findByPk(id)
          .then((user) => {
            if (user.is_admin) {
              user.is_admin = false;

              user
                .save()
                .then((userNew) => {
                  res.status(200).send({
                    message: `User ${userNew.id} is not an admin anymore!`,
                  });
                })
                .catch((e) => {
                  res.status(500).send("Server error!");
                  console.error(e);
                });
            } else
              res.status(422).send({ message: `User ${id} are not an admin!` });
          })
          .catch((e) => {
            res.status(500).send("Server Error!");
            console.error(e);
          });
      }
    }
  );

  app.delete(
    "/api/admin/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      const id = parseInt(req.params.id);
      if (!id) res.status(400).send("Bad Request!");
      else {
        db.user
          .findByPk(id)
          .then((user) => {
            user.destroy().then(() => {
              res.status(200).send({
                status: "Ok",
                message: `Droping account for User ${id}`,
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
