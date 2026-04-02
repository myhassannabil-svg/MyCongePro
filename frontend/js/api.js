 // ============================================================
//  API.JS — Appels vers Azure Functions
// ============================================================

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:7071/api'
  : '/api';

// ── Utilitaire fetch ─────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  };
  const response = await fetch(url, { ...defaultOptions, ...options });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Erreur ${response.status}`);
  }
  return response.json();
}

function getAuthHeaders() {
  const token = sessionStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Employés ─────────────────────────────────────────────────
const EmployeeAPI = {
  getAll:  ()   => apiFetch('/employees'),
  getById: (id) => apiFetch(`/employees/${id}`),
};

// ── Congés ────────────────────────────────────────────────────
const LeaveAPI = {
  getAll:    (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/leaves${qs ? '?' + qs : ''}`);
  },
  getById:   (id)          => apiFetch(`/leaves/${id}`),
  create:    (data)        => apiFetch('/leaves', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update:    (id, data)    => apiFetch(`/leaves/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  cancel:    (id)          => LeaveAPI.update(id, { status: 'cancelled' }),
  approve:   (id, comment) => LeaveAPI.update(id, { status: 'approved', comment }),
  reject:    (id, comment) => LeaveAPI.update(id, { status: 'rejected', comment }),
};

// ── Soldes ────────────────────────────────────────────────────
const BalanceAPI = {
  getByEmployee: (id) => apiFetch(`/balances?employeeId=${id}`),
  getAll:        ()   => apiFetch('/balances'),
};
