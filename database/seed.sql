 -- ============================================================
-- CONGIPRO — Données initiales (15 salariés)
-- ============================================================

-- ── 5 Cadres ─────────────────────────────────────────────────
INSERT INTO Employees (FirstName,LastName,Email,Poste,Service,Role,IsAdmin) VALUES
('Sophie',  'Martin',  'sophie.martin@company.fr',  'Directrice RH',          'RH',         'cadre', 0),
('Thomas',  'Bernard', 'thomas.bernard@company.fr', 'Directeur Commercial',   'Commercial', 'cadre', 0),
('Claire',  'Dubois',  'claire.dubois@company.fr',  'Responsable Technique',  'Technique',  'cadre', 0),
('Marc',    'Leroy',   'marc.leroy@company.fr',     'Directeur Financier',    'Finance',    'cadre', 0),
('Isabelle','Moreau',  'isabelle.moreau@company.fr','Directrice Marketing',   'Marketing',  'cadre', 0);

-- ── 10 Employés ──────────────────────────────────────────────
INSERT INTO Employees (FirstName,LastName,Email,Poste,Service,Role,IsAdmin) VALUES
('Lucas',   'Petit',    'lucas.petit@company.fr',    'Développeur',       'Technique',  'employe', 0),
('Emma',    'Simon',    'emma.simon@company.fr',     'Commerciale',       'Commercial', 'employe', 0),
('Hugo',    'Laurent',  'hugo.laurent@company.fr',   'Comptable',         'Finance',    'employe', 0),
('Léa',     'Garcia',   'lea.garcia@company.fr',     'Assistante RH',     'RH',         'employe', 0),
('Nathan',  'Roux',     'nathan.roux@company.fr',    'Designer',          'Marketing',  'employe', 0),
('Camille', 'Fournier', 'camille.fournier@company.fr','Développeuse',     'Technique',  'employe', 0),
('Antoine', 'Girard',   'antoine.girard@company.fr', 'Commercial',        'Commercial', 'employe', 0),
('Julie',   'André',    'julie.andre@company.fr',    'Contrôleuse gestion','Finance',   'employe', 0),
('Maxime',  'Lefebvre', 'maxime.lefebvre@company.fr','Technicien',        'Technique',  'employe', 0),
('Admin',   'RH',       'admin.rh@company.fr',       'Administrateur RH', 'RH',         'employe', 1);

-- ── Soldes congés 2024 ───────────────────────────────────────
INSERT INTO LeaveBalances (EmployeeId, LeaveType, Acquired, Taken, Year) VALUES
(1,  'CP',  25, 8,  2024), (1,  'RTT', 12, 3,  2024),
(2,  'CP',  25, 5,  2024), (2,  'RTT', 12, 6,  2024),
(3,  'CP',  25, 10, 2024), (3,  'RTT', 12, 4,  2024),
(4,  'CP',  25, 6,  2024), (4,  'RTT', 12, 2,  2024),
(5,  'CP',  25, 12, 2024), (5,  'RTT', 12, 5,  2024),
(6,  'CP',  25, 5,  2024), (6,  'RTT', 10, 2,  2024),
(7,  'CP',  25, 7,  2024), (7,  'RTT', 10, 1,  2024),
(8,  'CP',  25, 3,  2024), (8,  'RTT', 10, 0,  2024),
(9,  'CP',  25, 9,  2024), (9,  'RTT', 10, 3,  2024),
(10, 'CP',  25, 4,  2024), (10, 'RTT', 10, 2,  2024),
(11, 'CP',  25, 6,  2024), (11, 'RTT', 10, 1,  2024),
(12, 'CP',  25, 2,  2024), (12, 'RTT', 10, 0,  2024),
(13, 'CP',  25, 8,  2024), (13, 'RTT', 10, 4,  2024),
(14, 'CP',  25, 1,  2024), (14, 'RTT', 10, 0,  2024),
(15, 'CP',  25, 0,  2024), (15, 'RTT', 10, 0,  2024);
