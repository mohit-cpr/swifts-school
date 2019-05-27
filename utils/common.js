const pool = require("../config/config");
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
  return new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      if (error)
        switch (error.errno) {
          case 1062:
            resolve(error);
            break;
          default:
            return reject(error);
        }

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
module.exports = { jsonInsertQuery, executeQuery, createRandomPassword };
