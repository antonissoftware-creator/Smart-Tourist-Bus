import type { AirFlow, AirQuality, ClimateMode, FanLevel, PowerState, ZoneStatus } from "@/types/climate-control";

export interface ClimateZone {
  id: string;
  name: string;
  currentTemp: number;
  targetTemp: number;
  status: ZoneStatus;
  seatCount: number;
  airFlow: AirFlow;
}

export interface SystemStatus {
  power: PowerState;
  activeMode: ClimateMode;
  fanLevel: FanLevel;
  recirculation: string;
  defog: string;
  filterHealth: string;
  airQuality: AirQuality;
}

export interface ClimateScheduleItem {
  time: string;
  action: string;
  targetTemp: number;
  note: string;
}

export interface DriverShift {
  vehicleId: string;
  routeName: string;
  timeWindow: string;
  occupancy: string;
  driverName: string;
}

export interface ClimateMetrics {
  cabinTemp: number;
  targetTemp: number;
  outsideTemp: number;
  humidity: number;
  co2ppm: number;
  energyUse: number;
  ecoScore: number;
}
