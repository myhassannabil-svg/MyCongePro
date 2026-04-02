 // api/UpdateLeave/index.js
const { getPool, sql } = require('../shared/db');

module.exports = async function (context, req) {
  const leaveId = parseInt(req.params.id);
  const { status, comment, approvedBy } = req.body;

  if (!['approved', 'rejected', 'cancelled'].includes(status)) {
    context.res = { status: 400, body: { error: 'Statut invalide' } };
    return;
  }

  try {
    const pool = await getPool();

    await pool.request()
      .input('id',         sql.Int,          leaveId)
      .input('status',     sql.NVarChar(20),  status)
      .input('comment',    sql.NVarChar(500), comment || '')
      .input('approvedBy', sql.Int,           approvedBy || null)
      .query(`
        UPDATE LeaveRequests
        SET Status     = @status,
            Comment    = @comment,
            ApprovedBy = @approvedBy,
            UpdatedAt  = GETDATE()
        WHERE Id = @id
      `);

    context.res = {
      status: 200,
      body: { message: `Demande ${status} avec succès` }
    };

  } catch (err) {
    context.log.error('UpdateLeave error:', err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
