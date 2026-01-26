export type AssistanceStatus = "active" | "standby" | "warning" | "offline";

export type AlertSeverity = "info" | "caution" | "critical";

export type AssistanceSummary = {
  routeName: string;
  lastUpdate: string;
  safetyScore: string;
  conditions: string;
  nextBreak: string;
  systemStatus: AssistanceStatus;
  systemStatusLabel: string;
};

export type AssistanceMetric = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  helper: string;
  status: AssistanceStatus;
};

export type AssistanceAlert = {
  id: string;
  title: string;
  description: string;
  time: string;
  severity: AlertSeverity;
  severityLabel: string;
};

export type AssistanceAction = {
  id: string;
  label: string;
  description: string;
  status: AssistanceStatus;
  statusLabel: string;
};

export type AssistanceChecklistItem = {
  id: string;
  title: string;
  detail: string;
  status: AssistanceStatus;
};
