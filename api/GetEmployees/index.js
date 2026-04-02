 // api/GetEmployees/index.js
const { getPool, sql } = require('../shared/db');

module.exports = async function (context, req) {
  try {
    const pool   = await getPool();
    const result = await pool.request().query(`
      SELECT
        e.Id, e.FirstName, e.LastName, e.Email,
        e.Poste, e.Service, e.Role, e.IsAdmin,
        lb_cp.Acquired  AS CP_Acquired,
        lb_cp.Taken     AS CP_Taken,
        lb_rtt.Acquired AS RTT_Acquired,
        lb_rtt.Taken    AS RTT_Taken
      FROM Employees e
      LEFT JOIN LeaveBalances lb_cp
        ON lb_cp.EmployeeId = e.Id
        AND lb_cp.LeaveType = 'CP'
        AND lb_cp.Year = YEAR(GETDATE())
      LEFT JOIN LeaveBalances lb_rtt
        ON lb_rtt.EmployeeId = e.Id
        AND lb_rtt.LeaveType = 'RTT'
        AND lb_rtt.Year = YEAR(GETDATE())
      WHERE e.IsActive = 1
      ORDER BY e.LastName, e.FirstName
    `);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { data: result.recordset }
    };
  } catch (err) {
    context.log.error('GetEmployees error:', err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
