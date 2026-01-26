import type { AuthRole } from "@/types/auth";
import type { HelpContent } from "@/types/help";

export const ROLE_HELP_CONTENT: Record<AuthRole, HelpContent> = {
  guest: {
    title: "Online Βοήθεια",
    subtitle: "Χρήσιμες οδηγίες για επιβάτες και επισκέπτες.",
    quickActionsTitle: "Γρήγορες ενέργειες",
    quickActions: [
      {
        id: "guest-route",
        title: "Ζωντανή διαδρομή",
        description: "Παρακολούθησε τη θέση του λεωφορείου.",
        iconName: "map-marker-path",
      },
      {
        id: "guest-attractions",
        title: "Κοντινά αξιοθέατα",
        description: "Δες σημεία ενδιαφέροντος δίπλα σου.",
        iconName: "binoculars",
      },
      {
        id: "guest-coffee",
        title: "Παραγγελία ροφήματος",
        description: "Παρήγγειλε πριν την επόμενη στάση.",
        iconName: "coffee",
      },
    ],
    guidanceTitle: "Συχνές οδηγίες",
    guidance: [
      "Κράτησε το εισιτήριο διαθέσιμο κατά την επιβίβαση.",
      "Χρησιμοποίησε τις ενότητες αξιοθέατων για κοντινές προτάσεις.",
      "Για βοήθεια εντός του λεωφορείου μίλησε με το πλήρωμα.",
    ],
    contactTitle: "Επικοινωνία",
    contacts: [
      {
        id: "guest-staff",
        label: "Πλήρωμα διαδρομής",
        description: "Άμεση βοήθεια για θέσεις, στάσεις και οδηγίες.",
        iconName: "account",
      },
      {
        id: "guest-lost",
        label: "Απολεσθέντα αντικείμενα",
        description: "Δήλωσε απώλεια στον συνοδό ή στον οδηγό.",
        iconName: "briefcase",
      },
    ],
  },
  driver: {
    title: "Online Βοήθεια Οδηγού",
    subtitle: "Εργαλεία και οδηγίες για ασφαλή οδήγηση.",
    quickActionsTitle: "Γρήγορες ενέργειες",
    quickActions: [
      {
        id: "driver-dashboard",
        title: "Πίνακας Οδηγού",
        description: "Ταχύτητα, λωρίδα, κατάσταση επιβατών.",
        iconName: "bus",
      },
      {
        id: "driver-assistance",
        title: "Υποβοήθηση οδηγού",
        description: "Alerts, checklist και δείκτες ασφαλείας.",
        iconName: "shield-check",
      },
      {
        id: "driver-climate",
        title: "Έλεγχος κλίματος",
        description: "Ρύθμισε θερμοκρασία και εξαερισμό.",
        iconName: "fan",
      },
    ],
    guidanceTitle: "Οδηγίες βάρδιας",
    guidance: [
      "Χρησιμοποίησε την Υποβοήθηση οδηγού για alerts σε πραγματικό χρόνο.",
      "Επιβεβαίωσε την κατάσταση επιβατών πριν την αναχώρηση.",
      "Σε έκτακτη ανάγκη ενημέρωσε άμεσα το κέντρο λειτουργίας.",
    ],
    contactTitle: "Επικοινωνία",
    contacts: [
      {
        id: "driver-ops",
        label: "Κέντρο λειτουργίας",
        description: "Συντονισμός διαδρομών και έκτακτων περιστατικών.",
        iconName: "headset",
      },
      {
        id: "driver-maintenance",
        label: "Τεχνική υποστήριξη",
        description: "Αναφορές για τεχνικά ή μηχανικά ζητήματα.",
        iconName: "tools",
      },
    ],
  },
  employee: {
    title: "Online Βοήθεια Προσωπικού",
    subtitle: "Οδηγίες για την ομάδα υποστήριξης.",
    quickActionsTitle: "Γρήγορες ενέργειες",
    quickActions: [
      {
        id: "employee-control",
        title: "Έλεγχος προσωπικού",
        description: "Παρακολούθηση βαρδιών και ρόλων.",
        iconName: "account-group",
      },
      {
        id: "employee-energy",
        title: "Ενέργεια οχήματος",
        description: "Κατανάλωση, φόρτιση και στόχοι.",
        iconName: "battery-charging",
      },
      {
        id: "employee-robot",
        title: "Ρομπότ καθαρισμού",
        description: "Κατάσταση και προτεραιότητες καθαρισμού.",
        iconName: "robot",
      },
    ],
    guidanceTitle: "Οδηγίες βάρδιας",
    guidance: [
      "Έλεγξε κάλυψη ρόλων πριν την εκκίνηση της διαδρομής.",
      "Κατέγραψε τυχόν αποκλίσεις κατανάλωσης ή φόρτισης.",
      "Κράτησε ενημερωμένο το checklist καθαρισμού καμπίνας.",
    ],
    contactTitle: "Επικοινωνία",
    contacts: [
      {
        id: "employee-ops",
        label: "Κέντρο λειτουργίας",
        description: "Συντονισμός προσωπικού και αλλαγές βάρδιας.",
        iconName: "headset",
      },
      {
        id: "employee-stock",
        label: "Υλικά & αναλώσιμα",
        description: "Αιτήματα ανεφοδιασμού και ελλείψεων.",
        iconName: "clipboard-check",
      },
    ],
  },
  admin: {
    title: "Online Βοήθεια Διαχειριστή",
    subtitle: "Εποπτεία ρόλων, στόλων και υποστήριξης.",
    quickActionsTitle: "Γρήγορες ενέργειες",
    quickActions: [
      {
        id: "admin-driver",
        title: "Κονσόλα οδηγού",
        description: "Έλεγχος βασικών λειτουργιών οδήγησης.",
        iconName: "bus",
      },
      {
        id: "admin-employee",
        title: "Έλεγχος προσωπικού",
        description: "Κάλυψη βαρδιών και κατανομή ομάδων.",
        iconName: "account-group",
      },
      {
        id: "admin-energy",
        title: "Ενέργεια οχήματος",
        description: "Επισκόπηση κατανάλωσης και φόρτισης.",
        iconName: "battery-charging",
      },
    ],
    guidanceTitle: "Συστάσεις εποπτείας",
    guidance: [
      "Παρακολούθησε καθημερινά KPI ασφάλειας και ενέργειας.",
      "Επιβεβαίωσε ότι οι βάρδιες έχουν πλήρη κάλυψη.",
      "Συγκέντρωσε αναφορές συμβάντων για τα KPI.",
    ],
    contactTitle: "Επικοινωνία",
    contacts: [
      {
        id: "admin-ops",
        label: "Κέντρο λειτουργίας",
        description: "Επείγοντα θέματα διαδρομών και πόρων.",
        iconName: "headset",
      },
      {
        id: "admin-support",
        label: "Τεχνική υποστήριξη",
        description: "Διαχείριση τεχνικών αιτημάτων στόλου.",
        iconName: "tools",
      },
    ],
  },
};
