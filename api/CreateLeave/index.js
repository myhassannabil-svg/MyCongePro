 // api/CreateLeave/index.js
const { getPool, sql } = require('../shared/db');

module.exports = async function (context, req) {
  const { employeeId, leaveType, startDate, endDate, days, reason } = req.body;

  // ── Validation ───────────────────────────────────
  if (!employeeId || !leaveType || !startDate || !endDate || !days) {
    context.res = {
      status: 400,
      body: { error: 'Champs obligatoires manquants' }
    };
    return;
  }

  try {
    const pool = await getPool();

    // Vérifier l'employé et son rôle
    const empResult = await pool.request()
      .input('id', sql.Int, employeeId)
      .query('SELECT Id, Role FROM Employees WHERE Id = @id AND IsActive = 1');

    if (!empResult.recordset.length) {
      context.res = { status: 404, body: { error: 'Employé introuvable' } };
      return;
    }

    const employee = empResult.recordset[0];

    // Cadres → planifié directement (approved)
    // Employés → en attente (pending)
    const initialStatus = employee.Role === 'cadre' ? 'approved' : 'pending';

    // Vérifier les conflits de dates
    const conflictResult = await pool.request()
      .input('empId', sql.Int, employeeId)
      .input('start', sql.Date, startDate)
      .input('end',   sql.Date, endDate)
      .query(`
        SELECT COUNT(*) as cnt FROM LeaveRequests
        WHERE EmployeeId = @empId
          AND Status != 'rejected'
          AND (StartDate <= @end AND EndDate >= @start)
      `);

    if (conflictResult.recordset[0].cnt > 0) {
      context.res = {
        status: 409,
        body: { error: 'Conflit avec une demande existante' }
      };
      return;
    }

    // Insérer la demande
    const insertResult = await pool.request()
      .input('employeeId', sql.Int,          employeeId)
      .input('leaveType',  sql.NVarChar(10),  leaveType)
      .input('startDate',  sql.Date,          startDate)
      .input('endDate',    sql.Date,          endDate)
      .input('days',       sql.Decimal(5,1),  days)
      .input('reason',     sql.NVarChar(500), reason || '')
      .input('status',     sql.NVarChar(20),  initialStatus)
      .query(`
        INSERT INTO LeaveRequests
          (EmployeeId, LeaveType, StartDate, EndDate, Days, Reason, Status, CreatedAt)
        OUTPUT INSERTED.Id
        VALUES
          (@employeeId, @leaveType, @startDate, @endDate, @days, @reason, @status, GETDATE())
      `);

    const newId = insertResult.recordset[0].Id;

    context.res = {
      status: 201,
      body: {
        message: initialStatus === 'approved'
          ? 'Congé planifié avec succès'
          : 'Demande soumise en attente de validation',
        id: newId,
        status: initialStatus
      }
    };

  } catch (err) {
    context.log.error('CreateLeave error:', err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
