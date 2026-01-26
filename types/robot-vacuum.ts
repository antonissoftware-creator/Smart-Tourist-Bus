export type VacuumRunStatus = "cleaning" | "paused" | "returning" | "docked" | "idle";
export type VacuumMeterStatus = "good" | "attention" | "critical";
export type VacuumZoneStatus = "done" | "in-progress" | "pending" | "skipped";
export type VacuumAlertSeverity = "critical" | "warning" | "info";
export type MaintenanceStatus = "ok" | "soon" | "overdue";

export interface VacuumSummary {
  robotName: string;
  model: string;
  status: VacuumRunStatus;
  modeLabel: string;
  currentZone: string;
  cycleProgress: number;
  estimatedFinish: string;
  lastUpdate: string;
  dockStatus: string;
  shiftWindow: string;
  vehicleId: string;
  routeName: string;
  firmware: string;
  serial: string;
  lastDocking: string;
  nextRun: string;
}

export interface VacuumMeter {
  id: string;
  label: string;
  value: number;
  unit: string;
  percent: number;
  hint: string;
  status: VacuumMeterStatus;
}

export interface VacuumMetric {
  id: string;
  label: string;
  value: string;
  helper: string;
}

export interface VacuumZone {
  id: string;
  name: string;
  status: VacuumZoneStatus;
  lastCleaned: string;
  duration: string;
  coverage: string;
}

export interface VacuumMaintenanceItem {
  id: string;
  title: string;
  status: MaintenanceStatus;
  detail: string;
  nextStep: string;
}

export interface VacuumAlert {
  id: string;
  title: string;
  description: string;
  severity: VacuumAlertSeverity;
  time: string;
}
