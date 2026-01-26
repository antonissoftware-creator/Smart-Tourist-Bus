export type StaffStatus = "on-duty" | "break" | "off-duty" | "support" | "training";

export type CoverageStatus = "ok" | "thin" | "critical";

export type AlertSeverity = "info" | "attention" | "urgent";

export type CrewSummary = {
  vehicleId: string;
  routeName: string;
  shiftWindow: string;
  onboardCount: number;
  requiredCount: number;
  readinessStatus: CoverageStatus;
  readinessLabel: string;
  lastUpdate: string;
  nextChangeover: string;
};

export type RoleCoverage = {
  id: string;
  role: string;
  assigned: number;
  required: number;
  status: CoverageStatus;
  statusLabel: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  status: StaffStatus;
  statusLabel: string;
  location: string;
  shift: string;
  contact: string;
};

export type StaffAlert = {
  id: string;
  title: string;
  description: string;
  time: string;
  severity: AlertSeverity;
  severityLabel: string;
};

export type DutyTask = {
  id: string;
  title: string;
  area: string;
  owner: string;
  due: string;
  status: "pending" | "in-progress" | "done";
};
