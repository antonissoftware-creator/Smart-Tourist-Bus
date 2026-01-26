import type {
  BatteryPack,
  ChargeScheduleItem,
  EnergyAlert,
  EnergyFlow,
  EnergyMetric,
  EnergySummary,
  QuickAction,
} from "@/types/energy-dashboard";

export const energySummary: EnergySummary = {
  vehicleId: "STB-12",
  routeName: "Κυκλική Διαδρομή Β",
  shiftWindow: "06:00-14:00",
  lastUpdate: "Ενημερώθηκε πριν από 32 δευτ.",
  socPercent: 78,
  availableKwh: 146,
  totalCapacityKwh: 188,
  estimatedRangeKm: 102,
  currentDrawKw: 48,
  regenKw: 6.4,
  packTempC: 29,
  bmsStatus: "warning",
  bmsStatusLabel: "Παρακολούθηση",
};

export const energyMetrics: EnergyMetric[] = [
  {
    id: "efficiency",
    label: "Απόδοση",
    value: "1.7",
    unit: "km/kWh",
    helper: "Μέση κατανάλωση βάρδιας",
  },
  {
    id: "aux",
    label: "Βοηθητικά φορτία",
    value: "12.4",
    unit: "kW",
    helper: "Κλιματισμός + συστήματα",
  },
  {
    id: "pv",
    label: "Φωτοβολταϊκά",
    value: "3.2",
    unit: "kW",
    helper: "Συνεισφορά οροφής",
  },
  {
    id: "reserve",
    label: "Εφεδρεία",
    value: "18",
    unit: "kWh",
    helper: "Όριο ασφαλείας 10%",
  },
];

export const energyFlows: EnergyFlow[] = [
  {
    id: "traction",
    label: "Έλξη",
    value: "31",
    unit: "kW",
    helper: "Κύριοι κινητήρες",
    direction: "load",
  },
  {
    id: "climate",
    label: "Κλιματισμός",
    value: "8.6",
    unit: "kW",
    helper: "Εσωτερική άνεση",
    direction: "load",
  },
  {
    id: "regen",
    label: "Ανάκτηση",
    value: "6.4",
    unit: "kW",
    helper: "Πρόσφατη επιβράδυνση",
    direction: "generation",
  },
];

export const batteryPacks: BatteryPack[] = [
  {
    id: "pack-a",
    name: "Συστοιχία Α",
    location: "Κάτω πάτωμα · αριστερά",
    socPercent: 82,
    healthPercent: 96,
    temperatureC: 27.4,
    voltage: 704,
    currentA: 68,
    cycleCount: 312,
    balanceDeltaMv: 18,
    status: "normal",
    statusLabel: "Σταθερή",
    lastService: "10 Ιαν",
  },
  {
    id: "pack-b",
    name: "Συστοιχία Β",
    location: "Κάτω πάτωμα · δεξιά",
    socPercent: 74,
    healthPercent: 94,
    temperatureC: 30.8,
    voltage: 690,
    currentA: 72,
    cycleCount: 326,
    balanceDeltaMv: 26,
    status: "warning",
    statusLabel: "Ελεγχόμενη",
    lastService: "22 Δεκ",
  },
  {
    id: "pack-c",
    name: "Συστοιχία Γ",
    location: "Οροφή · εμπρός",
    socPercent: 68,
    healthPercent: 89,
    temperatureC: 34.2,
    voltage: 672,
    currentA: 64,
    cycleCount: 358,
    balanceDeltaMv: 41,
    status: "critical",
    statusLabel: "Ασυμμετρία",
    lastService: "05 Νοε",
  },
  {
    id: "pack-d",
    name: "Συστοιχία Δ",
    location: "Οροφή · πίσω",
    socPercent: 88,
    healthPercent: 97,
    temperatureC: 25.6,
    voltage: 716,
    currentA: 54,
    cycleCount: 298,
    balanceDeltaMv: 15,
    status: "charging",
    statusLabel: "Εξισορρόπηση",
    lastService: "18 Ιαν",
  },
];

export const energyAlerts: EnergyAlert[] = [
  {
    id: "alert-pack-c",
    title: "Υψηλή ασυμμετρία στη Συστοιχία Γ",
    description: "Διαφορά κελιών 41 mV. Προτείνεται εξισορρόπηση στο επόμενο σταθμό.",
    time: "Πριν από 2 λεπτά",
    severity: "critical",
    severityLabel: "Κρίσιμο",
  },
  {
    id: "alert-pack-b",
    title: "Αύξηση θερμοκρασίας στη Συστοιχία Β",
    description: "Θερμοκρασία 30.8°C. Παρακολουθήστε τον αερισμό.",
    time: "Πριν από 7 λεπτά",
    severity: "warning",
    severityLabel: "Προσοχή",
  },
  {
    id: "alert-regen",
    title: "Υψηλή ανάκτηση ενέργειας",
    description: "Σημαντική ανάκτηση σε κατηφόρα. Καλή απόδοση φρένων.",
    time: "Πριν από 12 λεπτά",
    severity: "info",
    severityLabel: "Ενημέρωση",
  },
];

export const chargeSchedule: ChargeScheduleItem[] = [
  {
    id: "charge-1",
    window: "14:10-14:40",
    targetSoc: "90%",
    location: "Αμαξοστάσιο Κεραμεικός",
    note: "Προτεραιότητα στη Συστοιχία Γ.",
  },
  {
    id: "charge-2",
    window: "18:30-19:00",
    targetSoc: "100%",
    location: "Σταθμός Σύνταγμα",
    note: "Πλήρης φόρτιση πριν τη νυχτερινή διαδρομή.",
  },
  {
    id: "charge-3",
    window: "23:00-05:00",
    targetSoc: "100%",
    location: "Κεντρικό depot",
    note: "Βαθιά φόρτιση και έλεγχος θερμοκρασιών.",
  },
];

export const quickActions: QuickAction[] = [
  {
    id: "action-balance",
    label: "Έναρξη εξισορρόπησης",
    description: "Εξισορρόπηση κελιών για Συστοιχία Γ.",
  },
  {
    id: "action-cooling",
    label: "Ενίσχυση ψύξης",
    description: "Αύξηση αερισμού για Συστοιχία Β.",
  },
  {
    id: "action-report",
    label: "Εξαγωγή αναφοράς",
    description: "Αναλυτικό report για τον επόπτη βάρδιας.",
  },
  {
    id: "action-alerts",
    label: "Σίγαση ειδοποιήσεων",
    description: "Σίγαση μη κρίσιμων ειδοποιήσεων για 30 λεπτά.",
  },
];
