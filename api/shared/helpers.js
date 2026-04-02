 // api/shared/helpers.js

const { differenceInBusinessDays, parseISO, isWeekend } = require('date-fns');

// Calcule les jours ouvrés entre deux dates
function calculateWorkingDays(startDate, endDate) {
  const start = parseISO(startDate);
  const end   = parseISO(endDate);
  let days = 0;
  const current = new Date(start);
  while (current <= end) {
    if (!isWeekend(current)) days++;
    current.setDate(current.getDate() + 1);
  }
  return days;
}

// Réponse standard
function sendResponse(context, status, body) {
  context.res = {
    status,
    headers: { 'Content-Type': 'application/json' },
    body
  };
}

// Validation des champs requis
function validateRequired(obj, fields) {
  const missing = fields.filter(f => !obj[f]);
  return missing.length ? missing : null;
}

module.exports = { calculateWorkingDays, sendResponse, validateRequired };
