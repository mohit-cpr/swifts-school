var express = require("express");
var router = express.Router();
var { jsonInsertQuery, executeQuery } = require("../../utils/common");

router
  .route("/:teacher_auto_id*?")
  .post(async (req, res) => {
    let requestJson = {
      teacher_id: req.body.teacher_id,
      teacher_name: req.body.teacher_name,
      teacher_phone: req.body.teacher_phone,
      teacher_email: req.body.teacher_email,
      teacher_address: req.body.teacher_address,
      teacher_city_id: req.body.teacher_city_id,
      teacher_state_id: req.body.teacher_state_id,
      teacher_country_id: req.body.teacher_country_id,
      teacher_zip: req.body.teacher_zip,
      school_id: req.body.school_id
    };
    let result = await executeQuery(jsonInsertQuery("teacher", requestJson));
    if (result.errno === 1062) {
      res.statusCode = 409;
      res.json({
        success: 0,
        message: `Teacher is already exist`
      });
    }
    if (result.affectedRows > 0) {
      res.statusCode = 201;
      res.json({
        success: 1,
        message: `Teacher inserted successfully`
      });
    } else {
      res.statusCode = 400;
      res.json({
        success: 0,
        message: `something went wrong.. try again.`
      });
    }
  })
  .get(async (req, res) => {
    let result = await executeQuery(`select * from teacher`);
    if (result.length > 0) {
      res.statusCode = 200;
      res.json({
        success: 1,
        data: result
      });
    } else {
      res.statusCode = 404;
      res.json({
        success: 0,
        data: "Teacher not found"
      });
    }
  })
  .delete(async (req, res) => {
    if (!req.params.teacher_auto_id) {
      res.statusCode = 400;
      res.json({
        success: 0,
        message: `Please send the teacher id`
      });
      return;
    }
    let result = await executeQuery(
      `delete from teacher where teacher_auto_id=${req.params.teacher_auto_id}`
    );
    if (result.affectedRows > 0) {
      res.statusCode = 200;
      res.json({
        success: 1,
        message: `Teacher deleted successfully`
      });
    } else {
      res.statusCode = 404;
      res.json({
        success: 0,
        message: `Teacher id not found`
      });
    }
  })
  .put(async (req, res) => {
    let requestJson = {
      teacher_id: req.body.teacher_id,
      teacher_name: req.body.teacher_name,
      teacher_phone: req.body.teacher_phone,
      teacher_email: req.body.teacher_email,
      teacher_address: req.body.teacher_address,
      teacher_city_id: req.body.teacher_city_id,
      teacher_state_id: req.body.teacher_state_id,
      teacher_country_id: req.body.teacher_country_id,
      teacher_zip: req.body.teacher_zip,
      school_id: req.body.school_id
    };
    let result = await executeQuery(
      `update teacher set teacher_id = '${
        requestJson.teacher_id
      }', teacher_name = '${requestJson.teacher_name}', teacher_phone = '${
        requestJson.teacher_phone
      }', teacher_email = '${requestJson.teacher_email}', teacher_address = '${
        requestJson.teacher_address
      }', teacher_city_id = '${
        requestJson.teacher_city_id
      }', teacher_state_id = '${
        requestJson.teacher_state_id
      }', teacher_country_id = '${
        requestJson.teacher_country_id
      }', teacher_zip = '${requestJson.teacher_zip}', school_id = '${
        requestJson.school_id
      }' where teacher_auto_id = '${req.params.teacher_auto_id}'`,
      requestJson
    );
    if (result.message.split(":")[1].split(" ")[1] === "0") {
      res.statusCode = 404;
      res.json({
        status: 0,
        message: "Teacher id not found"
      });
      return;
    }
    if (result.changedRows === 0) {
      res.statusCode = 400;
      res.json({
        status: 0,
        message: "Same data"
      });
      return;
    }
    if (result.changedRows === 1) {
      res.statusCode = 400;
      res.json({
        status: 0,
        message: "Teacher updated successfully"
      });
      return;
    }
  });

module.exports = router;
