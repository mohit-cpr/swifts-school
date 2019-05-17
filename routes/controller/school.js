var express = require("express");
var router = express.Router();
const pool = require("../../config/config");
var jsonInsertQuery = require("../../utils/common");

router
  .route("/")
  .post((request, response) => {
    pool.query(
      jsonInsertQuery("school_details", request.body),
      (error, result) => {
        if (error) throw error;

        if (result.affectedRows > 0) {
          response.statusCode = 201;
          response.json({
            success: 1,
            message: "School inserted successfully"
          });
        } else {
          response.statusCode = 409;
          response.send("Something went wrong... Try again");
        }
      }
    );
  })
  .get((request, response) => {
    pool.query(`select * from school_details`, (error, result) => {
      if (error) throw error;

      if (result.length > 0) {
        response.statusCode = 200;
        response.json({
          success: 1,
          data: result
        });
      } else {
        response.statusCode = 404;
        response.send("School not found");
      }
    });
  });

router.route("/change-status/:schoolId").put((request, response) => {
  if(request.params.schoolId === 'APPROVED'){
    
  }
});

module.exports = router;
