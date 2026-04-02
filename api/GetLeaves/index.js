 // api/GetLeaves/index.js
const { getPool, sql } = require('../shared/db');

module.exports = async function (context, req) {
  try {
    const pool      = await getPool();
    const empId     = req.query.employeeId;
    const status    = req.query.status;
    const startDate = req.query.startDate;
    const endDate   = req.query.endDate;

    let query = `
      SELECT
        lr.Id, lr.EmployeeId, lr.LeaveType,
        lr.StartDate, lr.EndDate, lr.Days,
        lr.Reason, lr.Status, lr.Comment,
        lr.CreatedAt, lr.UpdatedAt,
        e.FirstName, e.LastName,
        e.Service, e.Poste, e.Role
      FROM LeaveRequests lr
      JOIN Employees e ON lr.EmployeeId = e.Id
      WHERE e.IsActive = 1
    `;

    const request = pool.request();

    if (empId) {
      query += ' AND lr.EmployeeId = @empId';
      request.input('empId', sql.Int, parseInt(empId));
    }
    if (status) {
      query += ' AND lr.Status = @status';
      request.input('status', sql.NVarChar(20), status);
    }
    if (startDate) {
      query += ' AND lr.StartDate >= @startDate';
      request.input('startDate', sql.Date, startDate);
    }
    if (endDate) {
      query += ' AND lr.EndDate <= @endDate';
      request.input('endDate', sql.Date, endDate);
    }

    query += ' ORDER BY lr.CreatedAt DESC';

    const result = await request.query(query);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { data: result.recordset, count: result.recordset.length }
    };

  } catch (err) {
    context.log.error('GetLeaves error:', err);
    context.res = {
      status: 500,
      body: { error: 'Erreur serveur', details: err.message }
    };
  }
};
