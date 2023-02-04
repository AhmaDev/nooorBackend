const connection = require("../helpers/db");

const CourseGroup = function (courseGroup) {
  this.courseId = courseGroup.courseId;
  this.groupName = courseGroup.groupName;
  this.telegramChannel = courseGroup.telegramChannel;
};

CourseGroup.create = (newCourseGroup, result) => {
  connection.query(
    `INSERT INTO courseGroup SET ?`,
    newCourseGroup,
    (err, res) => {
      if (err) {
        console.log("Add courseGroup error:", err);
        result(err, null);
        return;
      }
      result(null, { idCourseGroup: res.insertId, ...newCourseGroup });
    },
  );
};

CourseGroup.getAll = (result) => {
  connection.query(`SELECT * FROM courseGroup`, (err, res) => {
    result(null, res);
  });
};

CourseGroup.findById = (id, result) => {
  connection.query(
    `SELECT * FROM courseGroup WHERE courseId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Find By ID: courseGroup error:", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res);
      }
    },
  );
};

CourseGroup.update = (id, courseGroup, result) => {
  connection.query(
    `UPDATE courseGroup SET ? WHERE idCourseGroup = ${id}`,
    courseGroup,
    (err, res) => {
      if (err) {
        console.log("Error while editing a courseGroup", err);
        result(err, null);
        return;
      }
      result(null, { idCourseGroup: id, ...courseGroup });
    },
  );
};
CourseGroup.delete = (id, result) => {
  connection.query(
    `DELETE FROM courseGroup WHERE idCourseGroup = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while deleting a courseGroup", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `CourseGroup ID ${id} has been deleted successfully`,
      });
    },
  );
};
module.exports = CourseGroup;
