/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: country
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `country` (
  `country_name` varchar(64) NOT NULL,
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`country_id`),
  UNIQUE KEY `uk1` (`country_id`),
  UNIQUE KEY `uk2` (`country_name`)
) ENGINE = MyISAM AUTO_INCREMENT = 8 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 36_home_work
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `36_home_work` (
  `home_work_id` int(11) NOT NULL AUTO_INCREMENT,
  `home_work_date` date NOT NULL,
  `subject_id` int(11) NOT NULL,
  `home_work_flag` tinyint(1) DEFAULT NULL,
  `home_work_details` text,
  PRIMARY KEY (`home_work_id`),
  KEY `home_work_fk0` (`subject_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 36_students
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `36_students` (
  `student_auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `student_roll_no` varchar(64) NOT NULL,
  `student_name` varchar(64) NOT NULL,
  `student_fathers_name` varchar(64) NOT NULL,
  `student_mothers_name` varchar(64) NOT NULL,
  `student_fathers_email` varchar(128) NOT NULL,
  `student_fathers_phone` varchar(16) NOT NULL,
  `student_address` varchar(128) NOT NULL,
  `student_city_id` int(11) NOT NULL,
  `student_state_id` int(11) NOT NULL,
  `student_country_id` int(11) NOT NULL,
  `student_zip` varchar(8) NOT NULL,
  `student_photo` text NOT NULL,
  `student_gender` varchar(8) NOT NULL,
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`student_auto_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: admin_login
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `admin_login` (
  `username` varchar(16) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(128) NOT NULL
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: approval_status
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `approval_status` (
  `approval_status_id` int(11) NOT NULL,
  `approval_status_name` varchar(64) NOT NULL,
  PRIMARY KEY (`approval_status_id`)
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: city
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(64) NOT NULL,
  `state_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `uk1` (`city_name`),
  KEY `state_id` (`state_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: class
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `class` varchar(16) NOT NULL,
  `section` varchar(16) NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 7 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: class_teacher
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `class_teacher` (
  `class_id` int(11) NOT NULL,
  `teacher_auto_id` int(11) NOT NULL,
  `form_date` date NOT NULL,
  `to_date` date NOT NULL,
  KEY `class_teacher_fk0` (`class_id`),
  KEY `class_teacher_fk1` (`teacher_auto_id`)
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 36_parents_credential
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `36_parents_credential` (
  `parent_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_auto_id` int(11) NOT NULL,
  `parent_phone` varchar(16) NOT NULL,
  `parent_password` varchar(128) NOT NULL,
  `parent_last_login_date` date NOT NULL,
  `parent_last_login_time` time NOT NULL,
  `parent_session_key` varchar(128) NOT NULL,
  PRIMARY KEY (`parent_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: parents_credential
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `parents_credential` (
  `parent_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_auto_id` int(11) NOT NULL,
  `parent_phone` varchar(16) NOT NULL,
  `parent_password` varchar(128) NOT NULL,
  `parent_last_login_date` date NOT NULL,
  `parent_last_login_time` time NOT NULL,
  `parent_session_key` varchar(128) NOT NULL,
  PRIMARY KEY (`parent_id`),
  KEY `parents_credential_fk0` (`student_auto_id`)
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: school_credential
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `school_credential` (
  `school_id` int(11) NOT NULL,
  `login_id` varchar(32) NOT NULL,
  `login_password` varchar(128) DEFAULT NULL,
  `registration_date_time` varchar(32) DEFAULT NULL,
  `approval_date_time` varchar(32) DEFAULT NULL,
  `starting_date` varchar(32) DEFAULT NULL,
  `expiry_date` varchar(32) DEFAULT NULL,
  `no_of_days` int(11) DEFAULT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: school_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `school_details` (
  `school_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_name` varchar(512) NOT NULL,
  `school_address` text,
  `school_city_id` int(11) NOT NULL,
  `school_state_id` int(11) NOT NULL,
  `school_county_id` int(11) NOT NULL,
  `school_zip` varchar(8) NOT NULL,
  `status` varchar(32) DEFAULT NULL,
  `classes` text,
  `phones` text NOT NULL,
  `emails` text NOT NULL,
  PRIMARY KEY (`school_id`),
  KEY `school_details_fk0` (`school_city_id`),
  KEY `school_details_fk1` (`school_state_id`),
  KEY `school_details_fk2` (`school_county_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 45 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: state
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `state` (
  `state_id` int(11) NOT NULL AUTO_INCREMENT,
  `state_name` varchar(64) NOT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `uk1` (`state_name`),
  KEY `state_fk0` (`country_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: students
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `students` (
  `student_auto_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `student_roll_no` varchar(64) NOT NULL,
  `student_name` varchar(64) NOT NULL,
  `student_fathers_name` varchar(64) NOT NULL,
  `student_mothers_name` varchar(64) NOT NULL,
  `student_fathers_email` varchar(128) NOT NULL,
  `student_fathers_phone` varchar(16) NOT NULL,
  `student_address` varchar(128) NOT NULL,
  `student_city_id` int(11) NOT NULL,
  `student_state_id` int(11) NOT NULL,
  `student_country_id` int(11) NOT NULL,
  `student_zip` varchar(8) NOT NULL,
  `student_photo` text NOT NULL,
  `student_gender` varchar(8) NOT NULL,
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`student_auto_id`),
  KEY `students_fk0` (`student_id`),
  KEY `students_fk1` (`student_city_id`),
  KEY `students_fk2` (`student_state_id`),
  KEY `students_fk3` (`student_country_id`),
  KEY `students_fk4` (`class_id`)
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: teacher
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `teacher` (
  `teacher_auto_id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` varchar(64) NOT NULL,
  `teacher_name` varchar(64) NOT NULL,
  `teacher_phone` varchar(64) NOT NULL,
  `teacher_email` varchar(64) NOT NULL,
  `teacher_city_id` int(11) NOT NULL,
  `teacher_state_id` int(11) NOT NULL,
  `teacher_country_id` int(11) NOT NULL,
  `teacher_zip` varchar(8) NOT NULL,
  `school_id` int(11) DEFAULT NULL,
  `teacher_address` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`teacher_auto_id`),
  KEY `teacher_fk0` (`teacher_city_id`),
  KEY `teacher_fk1` (`teacher_state_id`),
  KEY `teacher_fk2` (`teacher_country_id`)
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: teacher_credential
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `teacher_credential` (
  `teacher_auto_id` int(11) NOT NULL,
  `teacher_password` varchar(128) NOT NULL,
  `teacher_joining_date` date NOT NULL,
  `teacher_resigning_date` date NOT NULL,
  `teacher_approval_states_id` int(11) NOT NULL,
  `teacher_last_login_date` date NOT NULL,
  `teacher_last_login_time` time NOT NULL,
  `teacher_session_key` varchar(128) NOT NULL,
  PRIMARY KEY (`teacher_auto_id`),
  KEY `teacher_credential_fk1` (`teacher_approval_states_id`)
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: country
# ------------------------------------------------------------

INSERT INTO
  `country` (`country_name`, `country_id`)
VALUES
  ('India', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 36_home_work
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 36_students
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: admin_login
# ------------------------------------------------------------

INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');
INSERT INTO
  `admin_login` (`username`, `password`, `role`)
VALUES
  ('abcd', 'abcd@123', 'user');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: approval_status
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: city
# ------------------------------------------------------------

INSERT INTO
  `city` (`city_id`, `city_name`, `state_id`)
VALUES
  (2, 'Chapra', 2);
INSERT INTO
  `city` (`city_id`, `city_name`, `state_id`)
VALUES
  (4, 'Bangalore', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: class
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: class_teacher
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 36_parents_credential
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: parents_credential
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: school_credential
# ------------------------------------------------------------

INSERT INTO
  `school_credential` (
    `school_id`,
    `login_id`,
    `login_password`,
    `registration_date_time`,
    `approval_date_time`,
    `starting_date`,
    `expiry_date`,
    `no_of_days`
  )
VALUES
  (
    36,
    'CPS123',
    'CHFDDCHG',
    '1558864325882',
    '1561798446374',
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `school_credential` (
    `school_id`,
    `login_id`,
    `login_password`,
    `registration_date_time`,
    `approval_date_time`,
    `starting_date`,
    `expiry_date`,
    `no_of_days`
  )
VALUES
  (
    44,
    'CPS1234',
    NULL,
    '1558865837239',
    NULL,
    NULL,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: school_details
# ------------------------------------------------------------

INSERT INTO
  `school_details` (
    `school_id`,
    `school_name`,
    `school_address`,
    `school_city_id`,
    `school_state_id`,
    `school_county_id`,
    `school_zip`,
    `status`,
    `classes`,
    `phones`,
    `emails`
  )
VALUES
  (
    36,
    'CPS',
    'Bazar Samiti',
    2,
    2,
    1,
    '841301',
    'APPROVED',
    NULL,
    '[\"7022488224\"]',
    '[\"mohit@swiftsschool.com\"]'
  );
INSERT INTO
  `school_details` (
    `school_id`,
    `school_name`,
    `school_address`,
    `school_city_id`,
    `school_state_id`,
    `school_county_id`,
    `school_zip`,
    `status`,
    `classes`,
    `phones`,
    `emails`
  )
VALUES
  (
    44,
    'CPS',
    'Bazar Samiti',
    2,
    2,
    1,
    '841301',
    'REGISTERED',
    NULL,
    '[\"7022488224\"]',
    '[\"mohit@swiftsschool.com\"]'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: state
# ------------------------------------------------------------

INSERT INTO
  `state` (`state_id`, `state_name`, `country_id`)
VALUES
  (1, 'Karnataka', 1);
INSERT INTO
  `state` (`state_id`, `state_name`, `country_id`)
VALUES
  (2, 'Bihar', 1);
INSERT INTO
  `state` (`state_id`, `state_name`, `country_id`)
VALUES
  (4, 'Rajasthan', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: students
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: teacher
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: teacher_credential
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
