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
  console.log("query", query);
  return new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      if (error) return reject(error);
      console.log(result);
      resolve(result);
    });
  });
}

module.exports = { jsonInsertQuery, executeQuery };
