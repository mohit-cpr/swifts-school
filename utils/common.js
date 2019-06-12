const { pool, exportConfig } = require("../config/config");
var mysqlDump = require("mysqldump");
var cmd = require("node-cmd");

function jsonInsertQuery(table, json) {
  let query = `INSERT INTO ${table} (`;

  Object.keys(json).map(data => {
    query += `${data},`;
  });
  query = `${query.substring(0, query.length - 1)}) values (`;
  Object.keys(json).map(data => {
    query += `'${json[data]}' ,`;
  });
  query = `${query.substring(0, query.length - 1)})`;
  return query;
}

function executeQuery(query) {
  console.log("query", query);
  return new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      if (error) return reject(error);
      console.log(result);
      resolve(result);
    });
  });
}

function createRandomPassword() {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let charactersLength = 8;
  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function exportSql(commitMessage) {
  await mysqlDump(
    {
      connection: {
        host: "localhost",
        user: "root",
        password: "password",
        database: "swiftsschool"
      },
      dumpToFile: "./school.sql"
    },
    function(err) {
      console.log("test", err);
    }
  );
  await gitAdd("school.sql");
  gitCommit(commitMessage);
}

function shellScript(script) {
  return new Promise((resolve, reject) => {
    cmd.get(script, function(err, data, stderr) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

function gitStatus() {
  return new Promise((resolve, reject) => {
    cmd.get("git status", function(err, data, stderr) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

function gitAdd(files) {
  return new Promise((resolve, reject) => {
    cmd.get(`git add ${files}`, function(err, data, stderr) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

function gitCommit(message) {
  return new Promise((resolve, reject) => {
    cmd.get(`git commit -m ${message}`, function(err, data, stderr) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

function gitPush(origin) {
  console.log(origin);
  return new Promise((resolve, reject) => {
    cmd.get(`git push origin ${origin}`, function(err, data, stderr) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

function gitCheckout(branch) {
  return new Promise((resolve, reject) => {
    cmd.get(`git checkout ${branch}`, function(err, data, stderr) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

function gitCheckoutBranch(branch) {
  return new Promise((resolve, reject) => {
    cmd.get(`git checkout -b ${branch}`, function(err, data, stderr) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  jsonInsertQuery,
  executeQuery,
  createRandomPassword,
  exportSql,
  shellScript,
  gitStatus,
  gitAdd,
  gitPush,
  gitCheckout,
  gitCheckoutBranch
};
