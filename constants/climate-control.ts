import type {
  ClimateMetrics,
  ClimateScheduleItem,
  ClimateZone,
  DriverShift,
  SystemStatus,
} from "@/interfaces/climate-control";
import type { ClimateMode, FanLevel } from "@/types/climate-control";

export const driverShift: DriverShift = {
  vehicleId: "ΛΕΩΦ-204",
  routeName: "Ακρόπολη - Σούνιο",
  timeWindow: "06:30 - 14:30",
  occupancy: "28/45",
  driverName: "Νίκος Παπαδόπουλος",
};

export const climateMetrics: ClimateMetrics = {
  cabinTemp: 22.4,
  targetTemp: 22,
  outsideTemp: 11,
  humidity: 46,
  co2ppm: 610,
  energyUse: 1.8,
  ecoScore: 92,
};

export const systemStatus: SystemStatus = {
  power: "Ενεργό",
  activeMode: "Άνεση",
  fanLevel: "Μεσαίο",
  recirculation: "Κλειστό κύκλωμα",
  defog: "Έτοιμο",
  filterHealth: "96%",
  airQuality: "Άριστη",
};

export const climateModes: ClimateMode[] = [
  "Αυτόματο",
  "Eco",
  "Άνεση",
  "Ξήρανση",
  "Αποπαγοποίηση",
];

export const fanLevels: FanLevel[] = ["Χαμηλό", "Μεσαίο", "Υψηλό", "Turbo"];

export const climateZones: ClimateZone[] = [
  {
    id: "front",
    name: "Μπροστινή καμπίνα",
    currentTemp: 22.4,
    targetTemp: 22,
    status: "Σταθερό",
    seatCount: 16,
    airFlow: "Εμπρός",
  },
  {
    id: "middle",
    name: "Μεσαία ζώνη",
    currentTemp: 23.1,
    targetTemp: 22,
    status: "Ανάγκη ψύξης",
    seatCount: 18,
    airFlow: "Μικτή ροή",
  },
  {
    id: "rear",
    name: "Πίσω καμπίνα",
    currentTemp: 21.6,
    targetTemp: 22,
    status: "Ανάγκη θέρμανσης",
    seatCount: 11,
    airFlow: "Πόδια",
  },
];

export const climateSchedule: ClimateScheduleItem[] = [
  {
    time: "07:00",
    action: "Προθέρμανση",
    targetTemp: 21,
    note: "Εκκίνηση δρομολογίου",
  },
  {
    time: "10:30",
    action: "Σταθεροποίηση",
    targetTemp: 22,
    note: "Κορύφωση πληρότητας",
  },
  {
    time: "13:00",
    action: "Eco",
    targetTemp: 21,
    note: "Χαμηλότερη κατανάλωση",
  },
];
