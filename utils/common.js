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

function createTablesForSchoolApproval(school_id) {
  let tableList = ["calendar", "class"];
}

module.exports = jsonInsertQuery;
