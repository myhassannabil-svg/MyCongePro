 // ============================================================
//  AUTH.JS — Gestion authentification Azure AD
// ============================================================

// En mode démo local (sans Azure AD)
const DEMO_MODE = window.location.hostname === 'localhost';

const DEMO_USER = {
  id: 15,
  firstName: 'Admin',
  lastName: 'RH',
  email: 'admin.rh@company.fr',
  role: 'employe',
  isAdmin: true,
  poste: 'Administrateur RH',
  service: 'RH'
};

let currentUser = null;

// ── Initialisation ───────────────────────────────────────────
async function initAuth() {
  if (DEMO_MODE) {
    currentUser = DEMO_USER;
    console.log('🔓 Mode démo — utilisateur:', currentUser.firstName);
    return currentUser;
  }
  // En production → récupérer depuis Azure Static Web Apps
  try {
    const resp = await fetch('/.auth/me');
    const data = await resp.json();
    if (data.clientPrincipal) {
      currentUser = parseAzureUser(data.clientPrincipal);
      return currentUser;
    }
  } catch (e) {
    console.error('Auth error:', e);
  }
  // Non connecté → rediriger
  window.location.href = '/.auth/login/aad';
}

function parseAzureUser(principal) {
  return {
    id:        principal.userId,
    firstName: principal.userDetails?.split(' ')[0] || 'Utilisateur',
    lastName:  principal.userDetails?.split(' ')[1] || '',
    email:     principal.userDetails,
    role:      principal.userRoles?.includes('cadre') ? 'cadre' : 'employe',
    isAdmin:   principal.userRoles?.includes('admin') || false
  };
}

function getCurrentUser() { return currentUser; }

function logout() {
  if (DEMO_MODE) {
    currentUser = null;
    window.location.reload();
    return;
  }
  window.location.href = '/.auth/logout';
}

function isAdmin()  { return currentUser?.isAdmin  === true; }
function isCadre()  { return currentUser?.role     === 'cadre'; }
function canValidate() { return isAdmin() || isCadre(); }
