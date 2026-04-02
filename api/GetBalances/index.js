 // api/GetBalances/index.js
const { getPool, sql } = require('../shared/db');

module.exports = async function (context, req) {
  try {
    const pool  = await getPool();
    const empId = req.query.employeeId;
    const year  = req.query.year || new Date().getFullYear();

    const request = pool.request()
      .input('year', sql.Int, parseInt(year));

    let query = `
      SELECT
        lb.Id, lb.EmployeeId, lb.LeaveType,
        lb.Acquired, lb.Taken,
        (lb.Acquired - lb.Taken) AS Remaining,
        lb.Year
      FROM LeaveBalances lb
      WHERE lb.Year = @year
    `;

    if (empId) {
      query += ' AND lb.EmployeeId = @empId';
      request.input('empId', sql.Int, parseInt(empId));
    }

    const result = await request.query(query);
    context.res = {
      status: 200,
      body: { data: result.recordset }
    };
  } catch (err) {
    context.log.error('GetBalances error:', err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
