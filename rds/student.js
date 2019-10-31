const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});
module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = `INSERT INTO launchpad.student (id, school_id, major) VALUES ('${event.StudentID}', (SELECT y.id FROM launchpad.school y WHERE y.name = '${event.School}'), '${event.Major}')`
  con.query(sql, function (err, result) {
    if (err) throw err;
    callback(null, (result))
  });
};
