const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

// "mysql_get" Function
// GET request: https://d23kwuyo38.execute-api.us-east-1.amazonaws.com/production
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = `(SELECT o.id AS ItemID, (SELECT SUM(b.value) AS Bonus FROM launchpad.bonus b
    JOIN launchpad.compensation c ON c.id = b.compensation_id
    JOIN launchpad.offer o ON o.initial_compensation_id = c.id) AS Bonus, a.name AS Year, m.name AS Major, comp.value AS Salary, w.name AS Status,
  ci.name AS State, c.name AS Company
FROM launchpad.offer o
    LEFT OUTER JOIN launchpad.academic_year a ON o.academic_year_id = a.id
    LEFT OUTER JOIN launchpad.company c ON o.company_id = c.id
    LEFT OUTER JOIN launchpad.city ci ON o.city_id = ci.id
    LEFT OUTER JOIN launchpad.major m ON o.major_id = m.id
    LEFT OUTER JOIN launchpad.work_type w ON o.work_type_id = w.id
    LEFT OUTER JOIN launchpad.compensation comp ON o.initial_compensation_id = comp.id)`
  con.query(sql, function (err, result) {
    if (err) throw err;
    var returnVal = `{\"Data\": ${JSON.stringify(result)}}`;
    callback(null, (JSON.parse(returnVal)))
  });
};

// "mysql_createOffer" Function
// POST request: https://d23kwuyo38.execute-api.us-east-1.amazonaws.com/production
exports.handler = (event, context, callback) => {
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
