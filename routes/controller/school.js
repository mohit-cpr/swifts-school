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
  if (request.params.schoolId === "APPROVED") {
  }
});
router
  .route("/class/:school_id")
  .post((request, response) => {
    pool.query(
      `insert into class (school_id, class, section) values ('${
        request.body.class
      }', '${request.body.section}')`, // because school_id is coming in params and both class and section are coming in body
      (error, result) => {
        if (error) throw error;

        if (result.affectedRows > 0) {
          response.statusCode = 201; // 201 means created
          response.json({
            success: 1,
            message: "Class inserted successfully"
          });
        } else {
          response.statusCode = 400; // 400 means bad request
          response.send("Something went wrong");
        }
      }
    );
  })
  .get((request, response) => {
    pool.query(
      `select * from school_details where school_id=${
        request.params.school_id
      }`,
      (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          console.log(result["classes"]);
          //let query = 'select * from class where';
          //pool.query((req, res) => {

          //});
          response.json({
            success: 1,
            data: `school id: ${request.params.school_id} is not found`
          });
        } else {
          response.json({
            success: 0,
            message: `classes not found in school id: ${
              request.params.school_id
            }`
          });
        }
      }
    );
  });
router
  .route("/class_subjects/:class_id/:subject_id*?")
  .post((request, response) => {
    let class_id = request.params.class_id;
    let subject_code = request.body.subject_code;
    let subject_name = request.body.subject_name; // jo insert karana h wo sab body me lete h jo compare karna h wo params me achha han
    pool.query(
      `insert into class_subjects (class_id, subject_code, subject_name) values ('${class_id}','${subject_code}', '${subject_name}' )`,
      (error, result) => {
        if (error) {
          if (error.errno === 1062) {
            response.statusCode = 409;
            response.json({
              success: 0,
              message: `Subject code : "${subject_code}" already exist in this class`
            });
          } else throw error;
        } else {
          if (result.affectedRows > 0) {
            response.statusCode = 201;
            response.json({
              success: 1,
              message: "Subject instered successfully"
            });
          } else {
            response.statusCode = 404;
            response.json({
              success: 0,
              message: "Something went wrong... Try again."
            });
          }
        }
      }
    );
  })
  .get((request, response) => {
    pool.query(
      `select * from class_subjects where class_id=${request.params.class_id}`,
      (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          response.status = 200;
          response.json({
            success: 1,
            data: result
          });
        } else {
          response.status = 404;
          response.json({
            success: 0,
            message: " Subject not found in this class"
          });
        }
      }
    );
  });
router
  .route("/class_teacher/:class_id/:school_id*?")
  .post((request, response) => {
    let class_id = request.params.class_id;
    let school_id = request.params.school_id;
    let teacher_auto_id = request.body.teacher_auto_id;
    let form_date = request.body.form_date;
    let to_date = request.body.to_date;
    pool.query(
      `insert into class_teacher (class_id, school_id, teacher_auto_id, form_date, to_date ) values (${class_id}, '(${school_id})', '(${teacher_auto_id})' '(${form_date})', '(${to_date})')`,
      (error, result) => {
        if (error) {
          if (error.errno === 1062) {
            response.statusCode = 409;
            response.json({
              success: 0,
              message: "Class teacher is already exist in this class"
            });
          } else throw error;
        } else {
          if (result.affectedRows > 0) {
            response.statusCode = 201;
            response.json({
              success: 1,
              message: "Class teacher is inserted successfully"
            });
          } else {
            response.statusCode = 404;
            response.json({
              success: 0,
              message: "Something went wrong... Try again."
            });
          }
        }
      }
    );
  })
  .get((request, response) => {
    pool.query(
      `select * from class_teacher where class_id=${
        request.params.class_id
      } and school_id=${request.params.school_id}`,
      (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          response.status = 200;
          response.json({
            success: 1,
            data: result
          });
        } else {
          response.status = 404;
          response.json({
            success: 0,
            message: " Teacher is not found in this class"
          });
        }
      }
    );
  });

module.exports = router;
