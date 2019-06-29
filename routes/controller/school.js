var express = require("express");
var router = express.Router();
const pool = require("../../config/config");
var {
  jsonInsertQuery,
  executeQuery,
  createRandomPassword
} = require("../../utils/common");
// var executeQuery = require("../../utils/common");

router
  .route("/")
  .post(async (request, response) => {
    let schoolDetailsBody = {
      school_name: request.body.school_name,
      school_address: request.body.school_address,
      school_city_id: request.body.school_city_id,
      school_state_id: request.body.school_state_id,
      school_county_id: request.body.school_county_id,
      school_zip: request.body.school_zip,
      status: request.body.status,
      phones: request.body.phones,
      emails: request.body.emails
    };
    let checkLoginId = await executeQuery(
      `select * from school_credential where login_id='${
        request.body.login_id
      }'`
    );
    console.log("checkLoginId", checkLoginId);
    if (checkLoginId.length > 0) {
      response.statusCode = 400;
      response.json({
        success: 1,
        message: `Login ID ${
          request.body.login_id
        } id already exist. Try other login id `
      });
      return;
    }
    let result = await executeQuery(
      jsonInsertQuery("school_details", schoolDetailsBody)
    );
    if (result.affectedRows > 0) {
      let credentialBody = {
        school_id: result.insertId,
        registration_date_time: parseInt(new Date().getTime()),
        login_id: request.body.login_id
      };
      let innerResult = await executeQuery(
        jsonInsertQuery("school_credential", credentialBody)
      );
      if (innerResult.affectedRows > 0) {
        response.statusCode = 201;
        response.json({
          success: 1,
          message: "School inserted successfully"
        });
      } else {
        let deleteSchool = await executeQuery(
          `delete from school_details where school_id=${result.insertId}`
        );
        response.statusCode = 400;
        response.json({
          success: 1,
          message: "Something went wrong.. Try again."
        });
      }
    } else {
      response.statusCode = 409;
      response.send("Something went wrong... Try again");
    }
  })
  .get(async (request, response) => {
    let result = await executeQuery(
      `select * from school_details inner join school_credential on school_credential.school_id=school_details.school_id`
    );
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

router
  .route("/change-status/:schoolId/:op*?")
  .put(async (request, response) => {
    let result = await executeQuery(
      `update school_details inner join school_credential on school_details.school_id=school_credential.school_id set school_details.status='${
        request.body.status
      }', school_credential.approval_date_time='${new Date().getTime()}', login_password='${createRandomPassword()}' where school_credential.school_id=${
        request.params.schoolId
      }`
    );
    if (result.changedRows === 1) {
      response.status = 400;
      response.json({
        success: 1,
        data: `This school is already approved`
      });
      return;
    }
    if (result.affectedRows > 0) {
      response.statusCode = 200;
      response.json({
        success: 1,
        data: `Status of school has been changes to ${request.body.status}`
      });
      if (request.body.status === "APPROVED") {
        let createHomeWork = await executeQuery(`CREATE TABLE IF NOT EXISTS ${
          request.params.schoolId
        }_home_work (
          home_work_id int(11) NOT NULL auto_increment,
          home_work_date date NOT NULL,
          subject_id int(11) NOT NULL,
          home_work_flag boolean NULL,
          home_work_details text NULL,
          PRIMARY KEY (home_work_id),
          KEY home_work_fk0 (subject_id)
        )`);

        let createStudents = await executeQuery(`
        CREATE TABLE IF NOT EXISTS ${request.params.schoolId}_students (
          student_auto_id int(11) NOT NULL auto_increment,
          student_id int(11) NOT NULL,
          student_roll_no varchar(64) NOT NULL,
          student_name varchar(64) NOT NULL,
          student_fathers_name varchar(64) NOT NULL,
          student_mothers_name varchar(64) NOT NULL,
          student_fathers_email varchar(128) NOT NULL,
          student_fathers_phone varchar(16) NOT NULL,
          student_address varchar(128) NOT NULL,
          student_city_id int(11) NOT NULL,
          student_state_id int(11) NOT NULL,
          student_country_id int(11) NOT NULL,
          student_zip varchar(8) NOT NULL,
          student_photo text NOT NULL,
          student_gender varchar(8) NOT NULL,
          class_id int(11) NOT NULL,
          PRIMARY KEY (student_auto_id)
        )`);

        let createParents = await executeQuery(`
        CREATE TABLE IF NOT EXISTS ${
          request.params.schoolId
        }_parents_credential (
          parent_id int(11) NOT NULL AUTO_INCREMENT,
          student_auto_id int(11) NOT NULL,
          parent_phone varchar(16) NOT NULL,
          parent_password varchar(128) NOT NULL,
          parent_last_login_date_time date NOT NULL,
          parent_session_key varchar(128) NOT NULL,
          PRIMARY KEY (parent_id)
        )`);
      }
    } else {
      response.statusCode = 400;
      if (result.message.split(":")[1].split(" ")[1] === "0") {
        response.json({
          success: 1,
          data: "School Id not found"
        });
      }
      response.json({
        success: 1,
        data: "Something went wrong"
      });
    }
  });

router.route("/class/:school_id").put(async (req, res) => {
  let result = await executeQuery(
    `update school_details set classes='${req.body.classes}' where school_id=${
      req.params.school_id
    }`
  );
  if (result.affectedRows > 0) {
    res.statusCode = 200;
    res.json({
      success: 1,
      message: "Classes updated successfully"
    });
  } else {
    res.statusCode = 404;
    res.send("School id not found");
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
