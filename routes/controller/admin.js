var express = require("express");
var router = express.Router();
const pool = require("../../config/config");

router.post("/addAdmin", (request, response) => {
  pool.query(
    `insert into admin_login values ('${request.body.name}','${
      request.body.password
    }','${request.body.role}')`,
    (error, result) => {
      if (error) throw error;

      if (result.affectedRows > 0) {
        response.send("Data inserted successfully");
      } else {
        response.send("Something went wrong... Try again");
      }
    }
  );
});

router
  .route("/country/:country_id?*")
  .post(function(req, res) {
    let country_name = req.body.country_name;
    pool.query(
      `insert into country 
        (country_name) 
        values
        ('${country_name}')
    `,
      (error, result) => {
        if (error) {
          if (error.errno === 1062) {
            res.statusCode = 409;
            res.json({ success: 0, message: `${country_name} already exist` });
          } else throw error;
        } else {
          if (result.affectedRows > 0) {
            res.statusCode = 201;
            res.json({ success: 1, message: "Country instered successfully" });
          } else {
            res.statusCode = 404;
            res.json({
              success: 0,
              message: "Something went wrong... Try again."
            });
          }
        }
      }
    );
  })
  .get(function(req, res) {
    pool.query(`select * from country `, (error, result) => {
      if (error) {
        throw error;
      } else {
        if (result.length > 0) {
          res.statusCode = 200;
          res.json({ success: 1, data: result });
        } else {
          res.statusCode = 404;
          res.json({
            success: 0,
            message: "Country not found"
          });
        }
      }
    });
  })
  .delete(function(req, res) {
    if (req.params.country_id) {
      pool.query(
        `delete from country where country_id=${req.params.country_id}`,
        (error, result) => {
          if (error) {
            if (error.code === "ER_BAD_FIELD_ERROR") {
              res.statusCode = 404;
              res.json({
                success: 0,
                message: `${req.params.country_id} not found`
              });
            } else throw error;
          } else {
            if (result.affectedRows > 0) {
              res.json({
                success: 1,
                data: `state id ${req.params.country_id} has been deleted`
              });
            } else {
              res.statusCode = 404;
              res.json({
                success: 0,
                message: "Country not found"
              });
            }
          }
        }
      );
    } else {
      res.statusCode = 422;
      res.json({
        success: 0,
        message: "Country code not found in the parameters"
      });
    }
  });

router
  .route("/state/:country_id/:state_id?*")
  .post(function(req, res) {
    let country_id = req.params.country_id;
    let state_name = req.body.state_name;
    pool.query(
      `insert into state 
          (state_name, country_id) 
          values
          ('${state_name}', '${country_id}')
      `,
      (error, result) => {
        if (error) {
          if (error.errno === 1062) {
            res.statusCode = 409;
            res.json({ success: 0, message: `${state_name} already exist` });
          } else throw error;
        } else {
          if (result.affectedRows > 0) {
            res.statusCode = 201;
            res.json({ success: 1, message: "State instered successfully" });
          } else {
            res.statusCode = 404;
            res.json({
              success: 0,
              message: "Something went wrong... Try again."
            });
          }
        }
      }
    );
  })
  .get(function(req, res) {
    pool.query(
      `select * from state where country_id=${req.params.country_id} `,
      (error, result) => {
        if (error) {
          throw error;
        } else {
          if (result.length > 0) {
            res.statusCode = 200;
            res.json({ success: 1, data: result });
          } else {
            res.statusCode = 404;
            res.json({
              success: 0,
              message: "State not found in this country"
            });
          }
        }
      }
    );
  })
  .delete(function(req, res) {
    if (req.params.state_id) {
      pool.query(
        `delete from state where state_id=${req.params.state_id}`,
        (error, result) => {
          if (error) {
            if (error.code === "ER_BAD_FIELD_ERROR") {
              res.statusCode = 404;
              res.json({
                success: 0,
                message: `${req.params.state_id} not found`
              });
            } else throw error;
          } else {
            if (result.affectedRows > 0) {
              res.json({
                success: 1,
                data: `state id ${req.params.state_id} has been deleted`
              });
            } else {
              res.statusCode = 404;
              res.json({
                success: 0,
                message: "State not found"
              });
            }
          }
        }
      );
    } else {
      res.statusCode = 422;
      res.json({
        success: 0,
        message: "State code not found in the parameters"
      });
    }
  });

router
  .route("/city/:state_id/:city_id?*")
  .post(function(req, res) {
    let state_id = req.params.state_id;
    let city_name = req.body.city_name;
    pool.query(
      `insert into city 
          (city_name, state_id) 
          values
          ('${city_name}', '${state_id}')
      `,
      (error, result) => {
        if (error) {
          if (error.errno === 1062) {
            res.statusCode = 409;
            res.json({ success: 0, message: `${city_name} already exist` });
          } else throw error;
        } else {
          if (result.affectedRows > 0) {
            res.statusCode = 201;
            res.json({ success: 1, message: "City instered successfully" });
          } else {
            res.statusCode = 404;
            res.json({
              success: 0,
              message: "Something went wrong... Try again."
            });
          }
        }
      }
    );
  })
  .get(function(req, res) {
    pool.query(
      `select * from city where state_id=${req.params.state_id} `,
      (error, result) => {
        if (error) {
          throw error;
        } else {
          if (result.length > 0) {
            res.statusCode = 200;
            res.json({ success: 1, data: result });
          } else {
            res.statusCode = 404;
            res.json({
              success: 0,
              message: "City not found in this State"
            });
          }
        }
      }
    );
  })
  .delete(function(req, res) {
    if (req.params.state_id) {
      pool.query(
        `delete from city where city_id=${req.params.city_id}`,
        (error, result) => {
          if (error) {
            if (error.code === "ER_BAD_FIELD_ERROR") {
              res.statusCode = 404;
              res.json({
                success: 0,
                message: `${req.params.city_id} not found`
              });
            } else throw error;
          } else {
            if (result.affectedRows > 0) {
              res.json({
                success: 1,
                data: `city id ${req.params.city_id} has been deleted`
              });
            } else {
              res.statusCode = 404;
              res.json({
                success: 0,
                message: "State not found"
              });
            }
          }
        }
      );
    } else {
      res.statusCode = 422;
      res.json({
        success: 0,
        message: "State id not found in the parameters"
      });
    }
  });


module.exports = router;
