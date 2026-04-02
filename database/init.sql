 -- ============================================================
-- CONGIPRO — Initialisation base de données
-- ============================================================

-- Employees
CREATE TABLE Employees (
  Id          INT PRIMARY KEY IDENTITY(1,1),
  FirstName   NVARCHAR(50)  NOT NULL,
  LastName    NVARCHAR(50)  NOT NULL,
  Email       NVARCHAR(100) NOT NULL UNIQUE,
  Poste       NVARCHAR(100),
  Service     NVARCHAR(50),
  Role        NVARCHAR(20)  NOT NULL DEFAULT 'employe',
  IsAdmin     BIT           NOT NULL DEFAULT 0,
  AzureAdOid  NVARCHAR(100),
  CreatedAt   DATETIME2     DEFAULT GETDATE(),
  IsActive    BIT           DEFAULT 1
);

-- LeaveBalances
CREATE TABLE LeaveBalances (
  Id         INT PRIMARY KEY IDENTITY(1,1),
  EmployeeId INT          NOT NULL REFERENCES Employees(Id),
  LeaveType  NVARCHAR(10) NOT NULL,
  Acquired   DECIMAL(5,1) DEFAULT 0,
  Taken      DECIMAL(5,1) DEFAULT 0,
  Year       INT          NOT NULL DEFAULT YEAR(GETDATE()),
  UNIQUE(EmployeeId, LeaveType, Year)
);

-- LeaveRequests
CREATE TABLE LeaveRequests (
  Id         INT PRIMARY KEY IDENTITY(1,1),
  EmployeeId INT           NOT NULL REFERENCES Employees(Id),
  LeaveType  NVARCHAR(10)  NOT NULL,
  StartDate  DATE          NOT NULL,
  EndDate    DATE          NOT NULL,
  Days       DECIMAL(5,1)  NOT NULL,
  Reason     NVARCHAR(500),
  Status     NVARCHAR(20)  NOT NULL DEFAULT 'pending',
  Comment    NVARCHAR(500),
  CreatedAt  DATETIME2     DEFAULT GETDATE(),
  UpdatedAt  DATETIME2,
  ApprovedBy INT           REFERENCES Employees(Id)
);

-- AuditLog
CREATE TABLE AuditLog (
  Id         INT PRIMARY KEY IDENTITY(1,1),
  Action     NVARCHAR(50),
  EntityType NVARCHAR(50),
  EntityId   INT,
  UserId     INT REFERENCES Employees(Id),
  OldValue   NVARCHAR(MAX),
  NewValue   NVARCHAR(MAX),
  CreatedAt  DATETIME2 DEFAULT GETDATE()
);

-- Index
CREATE INDEX IX_LR_Employee  ON LeaveRequests(EmployeeId);
CREATE INDEX IX_LR_Status    ON LeaveRequests(Status);
CREATE INDEX IX_LR_StartDate ON LeaveRequests(StartDate);
