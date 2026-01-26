import type {
  VacuumAlert,
  VacuumMaintenanceItem,
  VacuumMeter,
  VacuumMetric,
  VacuumSummary,
  VacuumZone,
} from "@/types/robot-vacuum";

export const robotVacuumSummary: VacuumSummary = {
  robotName: "Nimbus-07",
  model: "CleanRide XR4",
  status: "cleaning",
  modeLabel: "Αυτόματο + Ήσυχο",
  currentZone: "Κύριος διάδρομος - Μπροστινό τμήμα",
  cycleProgress: 68,
  estimatedFinish: "12:45",
  lastUpdate: "Πριν 2 λεπτά",
  dockStatus: "Σταθμός φόρτισης διαθέσιμος",
  shiftWindow: "Πρωινή βάρδια 08:00–16:00",
  vehicleId: "BUS-24",
  routeName: "Ιστορικό Κέντρο",
  firmware: "v3.8.2",
  serial: "STB-RV-2407",
  lastDocking: "Σήμερα 07:10",
  nextRun: "13:30",
};

export const vacuumMeters: VacuumMeter[] = [
  {
    id: "battery",
    label: "Μπαταρία",
    value: 82,
    unit: "%",
    percent: 82,
    hint: "Εκτιμώμενη αυτονομία 2ώ 10λ",
    status: "good",
  },
  {
    id: "dustbin",
    label: "Κάδος συλλογής",
    value: 65,
    unit: "%",
    percent: 65,
    hint: "Αδειάζει στον σταθμό μετά τον κύκλο",
    status: "attention",
  },
  {
    id: "water",
    label: "Δεξαμενή νερού",
    value: 48,
    unit: "%",
    percent: 48,
    hint: "Γέμισμα πριν τον επόμενο γύρο",
    status: "attention",
  },
  {
    id: "filter",
    label: "Φίλτρο HEPA",
    value: 22,
    unit: "%",
    percent: 22,
    hint: "Αλλαγή εντός 3 ημερών",
    status: "critical",
  },
];

export const vacuumMetrics: VacuumMetric[] = [
  {
    id: "area",
    label: "Επιφάνεια καθαρισμού",
    value: "420 τ.μ.",
    helper: "68% της διαδρομής",
  },
  {
    id: "duration",
    label: "Χρόνος λειτουργίας",
    value: "01:35",
    helper: "Στόχος κύκλου 02:15",
  },
  {
    id: "obstacles",
    label: "Αποφυγές εμποδίων",
    value: "14",
    helper: "2 σημεία χρειάζονται έλεγχο",
  },
  {
    id: "noise",
    label: "Μέσος θόρυβος",
    value: "52 dB",
    helper: "Εντός ορίων άνεσης",
  },
];

export const vacuumZones: VacuumZone[] = [
  {
    id: "zone-1",
    name: "Μπροστινή είσοδος & ράμπα",
    status: "done",
    lastCleaned: "10:25",
    duration: "18 λεπτά",
    coverage: "100%",
  },
  {
    id: "zone-2",
    name: "Κύριος διάδρομος",
    status: "in-progress",
    lastCleaned: "Σε εξέλιξη",
    duration: "Υπόλοιπο 22 λεπτά",
    coverage: "65%",
  },
  {
    id: "zone-3",
    name: "Πίσω καθίσματα",
    status: "pending",
    lastCleaned: "Προγραμματισμένο 12:15",
    duration: "20 λεπτά",
    coverage: "0%",
  },
  {
    id: "zone-4",
    name: "Χώρος αποσκευών",
    status: "pending",
    lastCleaned: "Προγραμματισμένο 12:35",
    duration: "12 λεπτά",
    coverage: "0%",
  },
];

export const maintenanceItems: VacuumMaintenanceItem[] = [
  {
    id: "maint-1",
    title: "Καθαρισμός αισθητήρων LIDAR",
    status: "ok",
    detail: "Τελευταίος καθαρισμός πριν 2 ημέρες",
    nextStep: "Επόμενος έλεγχος σε 5 ημέρες",
  },
  {
    id: "maint-2",
    title: "Αντικατάσταση βούρτσας",
    status: "soon",
    detail: "Φθορά 72%",
    nextStep: "Κλείστε ραντεβού για αύριο",
  },
  {
    id: "maint-3",
    title: "Φίλτρο HEPA",
    status: "overdue",
    detail: "Υπερβαίνει το όριο κατά 1 ημέρα",
    nextStep: "Αλλαγή σήμερα πριν την απογευματινή βάρδια",
  },
];

export const vacuumAlerts: VacuumAlert[] = [
  {
    id: "alert-1",
    title: "Αισθητήρας άκρων",
    description: "Προσωρινή απώλεια σήματος στην ζώνη πίσω καθισμάτων.",
    severity: "warning",
    time: "11:18",
  },
  {
    id: "alert-2",
    title: "Φίλτρο HEPA",
    description: "Η ροή αέρα μειώθηκε στο 78%. Απαιτείται αντικατάσταση.",
    severity: "critical",
    time: "10:42",
  },
  {
    id: "alert-3",
    title: "Σταθμός φόρτισης",
    description: "Η βάση είναι καθαρή και έτοιμη για αυτόματη σύνδεση.",
    severity: "info",
    time: "10:05",
  },
];
