const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var sql = `(SELECT o.id AS ItemID, IFNULL(bsum.value,0) AS Bonus, a.name AS Year, m.name AS Major, comp.value AS Salary, w.name AS WorkType,
  ci.name AS City, c.name AS Company
FROM launchpad.offer o
    LEFT OUTER JOIN launchpad.academic_year a ON o.academic_year_id = a.id
    LEFT OUTER JOIN launchpad.company c ON o.company_id = c.id
    LEFT OUTER JOIN launchpad.city ci ON o.city_id = ci.id
    LEFT OUTER JOIN launchpad.major m ON o.major_id = m.id
    LEFT OUTER JOIN launchpad.work_type w ON o.work_type_id = w.id
    LEFT OUTER JOIN (SELECT o.id, SUM(b.value) AS value
      FROM launchpad.bonus b
      JOIN launchpad.compensation c ON c.id = b.compensation_id
      JOIN launchpad.offer o ON o.initial_compensation_id = c.id
      GROUP BY(c.id)
    ) bsum ON bsum.id = o.id
    LEFT OUTER JOIN launchpad.compensation comp ON o.initial_compensation_id = comp.id`;
  var companyVisit = false;
  var majorVisit = false;
  if(event.Company != null){
    sql = sql + `\n WHERE (o.company_id = (SELECT id FROM launchpad.company WHERE name = '${event.Company}'))`;
    companyVisit = true;
  }
  if(event.Major != null){
    majorVisit = true;
    if(companyVisit == false){
      sql = sql + `\n WHERE (o.major_id = (SELECT id FROM launchpad.major WHERE name = '${event.Major}'))`;
    }else{
      sql = sql + `\n AND \n (o.major_id = (SELECT id FROM launchpad.major WHERE name = '${event.Major}'))`;
    }
  }
  sql = sql + `)`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    var returnVal = `{\"Data\": ${JSON.stringify(result)}}`;
    callback(null, (JSON.parse(returnVal)))
  });
};
