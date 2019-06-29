var express = require("express");
var router = express.Router();
var { jsonInsertQuery, executeQuery } = require("../../utils/common");

router
  .route("/:class_id*?")
  .post(async function(req, res) {
    let requestJson = {
      class: req.body.class,
      section: req.body.section
    };
    let result = await executeQuery(jsonInsertQuery("class", requestJson));
    if (result.errno === 1062) {
      res.statusCode = 409;
      res.json({
        success: 0,
        message: `class ${requestJson.class}-${
          requestJson.section
        } is already exist`
      });
    }
    if (result.affectedRows > 0) {
      res.statusCode = 201;
      res.json({
        success: 1,
        message: `class ${requestJson.class}-${
          requestJson.section
        } inserted successfully`
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
    let result = await executeQuery(`select * from class`);
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
        data: "Class not found"
      });
    }
  })
  .delete(async (req, res) => {
    if (!req.params.class_id) {
      res.statusCode = 400;
      res.json({
        success: 0,
        message: `Please send the class id`
      });
      return;
    }
    let result = await executeQuery(
      `delete from class where class_id=${req.params.class_id}`
    );
    if (result.affectedRows > 0) {
      res.statusCode = 200;
      res.json({
        success: 1,
        message: `Class deleted successfully`
      });
    } else {
      res.statusCode = 404;
      res.json({
        success: 0,
        message: `Class id not found`
      });
    }
  });

module.exports = router;
