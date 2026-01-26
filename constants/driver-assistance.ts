import type {
  AssistanceAction,
  AssistanceAlert,
  AssistanceChecklistItem,
  AssistanceMetric,
  AssistanceSummary,
} from "@/types/driver-assistance";

export const driverAssistanceSummary: AssistanceSummary = {
  routeName: "Κυκλική Διαδρομή Α",
  lastUpdate: "Ενημερώθηκε πριν από 1 λεπτό",
  safetyScore: "95",
  conditions: "Στάση σε στάση",
  nextBreak: "10 λεπτά",
  systemStatus: "active",
  systemStatusLabel: "Ενεργό",
};

export const driverAssistanceMetrics: AssistanceMetric[] = [
  {
    id: "speed",
    label: "Ταχύτητα",
    value: "0",
    unit: "km/h",
    helper: "Σταματημένο για επιβίβαση",
    status: "active",
  },
  {
    id: "distance",
    label: "Απόσταση",
    value: "0.0",
    unit: "sec",
    helper: "Στάση σε φανάρι/στάση",
    status: "active",
  },
  {
    id: "lane",
    label: "Απόκλιση λωρίδας",
    value: "0.0",
    unit: "m",
    helper: "Κεντραρισμένο στη στάση",
    status: "active",
  },
  {
    id: "attention",
    label: "Εστίαση οδηγού",
    value: "Καλή",
    helper: "Μάτια στον δρόμο",
    status: "active",
  },
  {
    id: "doors",
    label: "Θύρες",
    value: "1",
    unit: "ανοικτή",
    helper: "Πίσω-αριστερή ανοικτή στη στάση",
    status: "warning",
  },
  {
    id: "tires",
    label: "Πίεση ελαστικών",
    value: "OK",
    helper: "Όλοι οι αισθητήρες φυσιολογικοί",
    status: "standby",
  },
];

export const driverAssistanceAlerts: AssistanceAlert[] = [
  {
    id: "alert-fatigue",
    title: "Αυξημένος κίνδυνος κόπωσης",
    description: "Συνιστάται διάλειμμα μέσα σε 12 λεπτά. Τεντωθείτε και ενυδατωθείτε.",
    time: "Μόλις τώρα",
    severity: "caution",
    severityLabel: "Προσοχή",
  },
  {
    id: "alert-door",
    title: "Πίσω-αριστερή θύρα μισάνοιχτη",
    description: "Η θύρα είναι ανοικτή για επιβίβαση. Κλείσιμο πριν την αναχώρηση.",
    time: "Πριν από 1 λεπτό",
    severity: "critical",
    severityLabel: "Κρίσιμο",
  },
  {
    id: "alert-lane",
    title: "Εντοπίστηκε απόκλιση λωρίδας",
    description: "Η υποβοήθηση λωρίδας διόρθωσε μικρή απόκλιση στην τελευταία στροφή.",
    time: "Πριν από 6 λεπτά",
    severity: "info",
    severityLabel: "Ενημέρωση",
  },
];

export const driverAssistanceActions: AssistanceAction[] = [
  {
    id: "action-lka",
    label: "Υποβοήθηση λωρίδας",
    description: "Διορθώνει απαλά για να μείνετε κεντραρισμένοι.",
    status: "active",
    statusLabel: "Ενεργό",
  },
  {
    id: "action-acc",
    label: "Προσαρμοζόμενο cruise",
    description: "Διατηρεί απόσταση στην κίνηση.",
    status: "active",
    statusLabel: "Αυτόματο",
  },
  {
    id: "action-fcw",
    label: "Πρόσκρουση εμπρός",
    description: "Προειδοποιεί και προετοιμάζει φρένα.",
    status: "active",
    statusLabel: "Παρακολούθηση",
  },
  {
    id: "action-bsm",
    label: "Έλεγχος τυφλού σημείου",
    description: "Οι πλευρικοί αισθητήρες σαρώνουν.",
    status: "standby",
    statusLabel: "Αναμονή",
  },
  {
    id: "action-doors",
    label: "Ασφάλεια θυρών",
    description: "Αποτρέπει άνοιγμα εν κινήσει.",
    status: "warning",
    statusLabel: "Έτοιμο",
  },
  {
    id: "action-camera",
    label: "Κάμερα οδηγού",
    description: "Εντοπίζει απόσπαση και κόπωση.",
    status: "active",
    statusLabel: "Ζωντανό",
  },
];

export const driverAssistanceChecklist: AssistanceChecklistItem[] = [
  {
    id: "check-mirror",
    title: "Ολοκληρώθηκε έλεγχος καθρεφτών",
    detail: "Έλεγχος αριστερού, δεξιού και καμπίνας.",
    status: "active",
  },
  {
    id: "check-doors",
    title: "Επιβεβαίωση κλειδώματος θυρών",
    detail: "Η πίσω-αριστερή θύρα είναι ανοικτή στη στάση. Κλείσιμο πριν την αναχώρηση.",
    status: "warning",
  },
  {
    id: "check-passengers",
    title: "Καταμέτρηση επιβατών",
    detail: "32 επιβάτες, 4 αναμένονται να αποβιβαστούν.",
    status: "standby",
  },
];
