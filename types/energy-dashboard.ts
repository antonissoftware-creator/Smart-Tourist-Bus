export type BatteryStatus = "normal" | "warning" | "critical" | "charging";

export type EnergyAlertSeverity = "info" | "warning" | "critical";

export type EnergySummary = {
  vehicleId: string;
  routeName: string;
  shiftWindow: string;
  lastUpdate: string;
  socPercent: number;
  availableKwh: number;
  totalCapacityKwh: number;
  estimatedRangeKm: number;
  currentDrawKw: number;
  regenKw: number;
  packTempC: number;
  bmsStatus: BatteryStatus;
  bmsStatusLabel: string;
};

export type EnergyMetric = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  helper: string;
};

export type EnergyFlow = {
  id: string;
  label: string;
  value: string;
  unit: string;
  helper: string;
  direction: "load" | "generation";
};

export type BatteryPack = {
  id: string;
  name: string;
  location: string;
  socPercent: number;
  healthPercent: number;
  temperatureC: number;
  voltage: number;
  currentA: number;
  cycleCount: number;
  balanceDeltaMv: number;
  status: BatteryStatus;
  statusLabel: string;
  lastService: string;
};

export type EnergyAlert = {
  id: string;
  title: string;
  description: string;
  time: string;
  severity: EnergyAlertSeverity;
  severityLabel: string;
};

export type ChargeScheduleItem = {
  id: string;
  window: string;
  targetSoc: string;
  location: string;
  note: string;
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
};
