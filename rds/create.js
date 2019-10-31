const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});
module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql1 = `INSERT INTO launchpad.compensation (id, wage_type_id, value) VALUES ('${event.ItemID}', '1', '${event.Salary}')`;
  const sql2 = `INSERT INTO launchpad.offer (id, student_id, academic_year_id, company_id, city_id, initial_compensation_id, final_compensation_id, major_id, offer_received_date, work_type_id, description)
  VALUES (${event.ItemID},'0',
  (SELECT y.id FROM launchpad.academic_year y WHERE y.name = '${event.Year}'),
  (SELECT b.id FROM launchpad.company b WHERE b.name = '${event.Company}'),
  (SELECT a.id FROM launchpad.city a WHERE a.name = 'Provo'),
  ${event.ItemID},
  2,
  (SELECT d.id FROM launchpad.major d WHERE d.name = '${event.Major}'),
  '0000-00-00 00:00:00', '1', 'No Description');`;
  con.query(sql1, (err, res) => {
    if (err) {throw err}
    con.query(sql2, (err, res) => {
      if (err) {throw err}
      callback(null, res);
    })
  })
};
