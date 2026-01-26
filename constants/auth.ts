import type { AuthCredential, AuthRole } from "@/types/auth";
import type { HomeSampleCard } from "@/types/home";

export const ROLE_LABELS: Record<AuthRole, string> = {
  guest: "Επισκέπτης",
  driver: "Οδηγός",
  employee: "Υπάλληλος",
  admin: "Διαχειριστής",
};

export const AUTH_CREDENTIALS: AuthCredential[] = [
  {
    label: "Admin",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    label: "Driver",
    username: "driver",
    password: "driver123",
    role: "driver",
  },
  {
    label: "Employee",
    username: "employee",
    password: "employee123",
    role: "employee",
  },
];

const DRIVER_CARDS: HomeSampleCard[] = [
  {
    id: "driver-dashboard",
    title: "Κονσόλα Οδηγού",
    description: "Βασικά εργαλεία οδήγησης.",
    tag: "Οδηγός",
    iconName: "bus",
    route: "/(tabs)/driver",
  },
  {
    id: "driver-climate",
    title: "Έλεγχος Κλίματος",
    description: "Ρύθμισε θερμοκρασία και εξαερισμό.",
    tag: "Κλίμα",
    iconName: "fan",
    route: "/(tabs)/climate-control",
  },
];

const EMPLOYEE_CARDS: HomeSampleCard[] = [
  {
    id: "employee-control",
    title: "Έλεγχος Πληρώματος",
    description: "Καθημερινές λειτουργίες πληρώματος.",
    tag: "Προσωπικό",
    iconName: "account",
    route: "/(tabs)/employee-control",
  },
  {
    id: "employee-energy",
    title: "Ενέργεια Οχήματος",
    description: "Κατάσταση κατανάλωσης και φόρτισης.",
    tag: "Ενέργεια",
    iconName: "battery-charging",
    route: "/(tabs)/staff",
  },
  {
    id: "employee-robot",
    title: "Ρομπότ Καθαρισμού",
    description: "Έλεγχος ρομπότ καμπίνας.",
    tag: "Καθαριότητα",
    iconName: "robot",
    route: "/(tabs)/robot-vacuum",
  },
];

export const ROLE_CARDS: Record<AuthRole, HomeSampleCard[]> = {
  guest: [],
  driver: DRIVER_CARDS,
  employee: EMPLOYEE_CARDS,
  admin: [...DRIVER_CARDS, ...EMPLOYEE_CARDS],
};
