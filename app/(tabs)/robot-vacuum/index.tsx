import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  maintenanceItems,
  robotVacuumSummary,
  vacuumAlerts,
  vacuumMeters,
  vacuumMetrics,
  vacuumZones,
} from "@/constants/robot-vacuum";
import { useThemeColor } from "@/hooks/use-theme-color";
import type {
  MaintenanceStatus,
  VacuumAlertSeverity,
  VacuumMeterStatus,
  VacuumRunStatus,
  VacuumZoneStatus,
} from "@/types/robot-vacuum";

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith("#") && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
};

const runStatusLabel = (status: VacuumRunStatus) => {
  switch (status) {
    case "cleaning":
      return "Σε εξέλιξη";
    case "paused":
      return "Σε παύση";
    case "returning":
      return "Επιστρέφει στη βάση";
    case "docked":
      return "Στη βάση";
    default:
      return "Αναμονή";
  }
};

const zoneStatusLabel = (status: VacuumZoneStatus) => {
  switch (status) {
    case "done":
      return "Ολοκληρώθηκε";
    case "in-progress":
      return "Σε εξέλιξη";
    case "skipped":
      return "Παραλείφθηκε";
    default:
      return "Σε αναμονή";
  }
};

const maintenanceStatusLabel = (status: MaintenanceStatus) => {
  switch (status) {
    case "overdue":
      return "Εκτός ορίου";
    case "soon":
      return "Προσεχώς";
    default:
      return "Εντάξει";
  }
};

const alertSeverityLabel = (severity: VacuumAlertSeverity) => {
  switch (severity) {
    case "critical":
      return "Κρίσιμο";
    case "warning":
      return "Προσοχή";
    default:
      return "Πληροφορία";
  }
};

const alertIcon = (severity: VacuumAlertSeverity) => {
  switch (severity) {
    case "critical":
      return "alert-octagon";
    case "warning":
      return "alert";
    default:
      return "information";
  }
};

export default function RobotVacuum() {
  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const iconColor = useThemeColor({}, "icon");

  const cardBorder = withAlpha(borderColor, 0.7);
  const tintSoft = withAlpha(tintColor, 0.12);
  const tintStrong = withAlpha(tintColor, 0.28);

  const statusAccent = (status: VacuumRunStatus) => {
    switch (status) {
      case "cleaning":
        return tintColor;
      case "paused":
        return textColor;
      case "returning":
        return tintColor;
      default:
        return iconColor;
    }
  };

  const meterAccent = (status: VacuumMeterStatus) => {
    switch (status) {
      case "critical":
        return textColor;
      case "attention":
        return tintColor;
      default:
        return iconColor;
    }
  };

  const zoneAccent = (status: VacuumZoneStatus) => {
    switch (status) {
      case "in-progress":
        return tintColor;
      case "done":
        return iconColor;
      case "skipped":
        return textColor;
      default:
        return mutedTextColor;
    }
  };

  const maintenanceAccent = (status: MaintenanceStatus) => {
    switch (status) {
      case "overdue":
        return textColor;
      case "soon":
        return tintColor;
      default:
        return iconColor;
    }
  };

  const alertAccent = (severity: VacuumAlertSeverity) => {
    switch (severity) {
      case "critical":
        return textColor;
      case "warning":
        return tintColor;
      default:
        return iconColor;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.heroCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        <View style={styles.heroLeft}>
          <Text style={[styles.label, { color: mutedTextColor }]}>Ρομπότ καθαρισμού</Text>
          <Text style={[styles.heroTitle, { color: textColor }]}>
            {robotVacuumSummary.robotName}
          </Text>
          <Text style={[styles.heroSubtitle, { color: mutedTextColor }]}>
            {robotVacuumSummary.model}
          </Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusPill,
                { backgroundColor: tintSoft, borderColor: tintStrong },
              ]}
            >
              <Text style={[styles.statusText, { color: statusAccent(robotVacuumSummary.status) }]}
              >
                {runStatusLabel(robotVacuumSummary.status)}
              </Text>
            </View>
            <Text style={[styles.statusHint, { color: mutedTextColor }]}>
              {robotVacuumSummary.modeLabel}
            </Text>
          </View>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}>
            Τρέχουσα ζώνη: {robotVacuumSummary.currentZone}
          </Text>
          <View style={[styles.progressTrack, { backgroundColor: surfaceMutedColor }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${robotVacuumSummary.cycleProgress}%`,
                  backgroundColor: statusAccent(robotVacuumSummary.status),
                },
              ]}
            />
          </View>
          <View style={styles.progressMeta}>
            <Text style={[styles.progressLabel, { color: mutedTextColor }]}>
              Πρόοδος {robotVacuumSummary.cycleProgress}%
            </Text>
            <Text style={[styles.progressLabel, { color: mutedTextColor }]}>
              Ολοκλήρωση {robotVacuumSummary.estimatedFinish}
            </Text>
          </View>
        </View>
        <View style={[styles.heroRight, { backgroundColor: tintSoft }]}>
          <Text style={[styles.label, { color: mutedTextColor }]}>Τελευταία ενημέρωση</Text>
          <Text style={[styles.heroValueSmall, { color: textColor }]}>
            {robotVacuumSummary.lastUpdate}
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}>
            {robotVacuumSummary.dockStatus}
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}>
            Επόμενος κύκλος {robotVacuumSummary.nextRun}
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}>
            {robotVacuumSummary.shiftWindow}
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        <View style={styles.metaRow}>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Όχημα</Text>
            <Text style={[styles.value, { color: textColor }]}>{robotVacuumSummary.vehicleId}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Διαδρομή</Text>
            <Text style={[styles.value, { color: textColor }]}>{robotVacuumSummary.routeName}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Firmware</Text>
            <Text style={[styles.value, { color: textColor }]}>{robotVacuumSummary.firmware}</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Σειριακό</Text>
            <Text style={[styles.value, { color: textColor }]}>{robotVacuumSummary.serial}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Τελευταία σύνδεση</Text>
            <Text style={[styles.value, { color: textColor }]}>{robotVacuumSummary.lastDocking}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Κατάσταση αναλώσιμων
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Μπαταρία, κάδος, δεξαμενή και φίλτρα.
        </Text>
      </View>

      <View style={styles.grid}>
        {vacuumMeters.map((meter) => {
          const accent = meterAccent(meter.status);
          return (
            <View
              key={meter.id}
              style={[styles.meterCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
            >
              <Text style={[styles.meterLabel, { color: mutedTextColor }]}>{meter.label}</Text>
              <Text style={[styles.meterValue, { color: textColor }]}>
                {meter.value}
                {meter.unit}
              </Text>
              <View style={[styles.meterTrack, { backgroundColor: surfaceColor }]}>
                <View
                  style={[
                    styles.meterFill,
                    { width: `${meter.percent}%`, backgroundColor: accent },
                  ]}
                />
              </View>
              <Text style={[styles.meterHint, { color: mutedTextColor }]}>
                {meter.hint}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Μετρήσεις κύκλου
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Απόδοση καθαρισμού και άνεση επιβατών.
        </Text>
      </View>

      <View style={styles.grid}>
        {vacuumMetrics.map((metric) => (
          <View
            key={metric.id}
            style={[styles.metricCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
          >
            <Text style={[styles.metricLabel, { color: mutedTextColor }]}>{metric.label}</Text>
            <Text style={[styles.metricValue, { color: textColor }]}>{metric.value}</Text>
            <Text style={[styles.metricHint, { color: mutedTextColor }]}>{metric.helper}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Ζώνες καθαρισμού
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Πρόοδος ανά σημείο του λεωφορείου.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {vacuumZones.map((zone) => {
          const accent = zoneAccent(zone.status);
          return (
            <View
              key={zone.id}
              style={[styles.zoneCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
            >
              <View style={styles.zoneHeader}>
                <View style={styles.zoneTitleRow}>
                  <View style={[styles.zoneDot, { backgroundColor: accent }]} />
                  <Text style={[styles.zoneTitle, { color: textColor }]}>{zone.name}</Text>
                </View>
                <View style={[styles.statusPill, { backgroundColor: tintSoft, borderColor: tintStrong }]}>
                  <Text style={[styles.statusText, { color: accent }]}>{zoneStatusLabel(zone.status)}</Text>
                </View>
              </View>
              <View style={styles.zoneMeta}>
                <Text style={[styles.zoneMetaText, { color: mutedTextColor }]}>
                  Τελευταίο: {zone.lastCleaned}
                </Text>
                <Text style={[styles.zoneMetaText, { color: mutedTextColor }]}>
                  Διάρκεια: {zone.duration}
                </Text>
                <Text style={[styles.zoneMetaText, { color: mutedTextColor }]}>
                  Κάλυψη: {zone.coverage}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Συντήρηση & αναλώσιμα
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Προγραμματισμένες εργασίες και προθεσμίες.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {maintenanceItems.map((item) => {
          const accent = maintenanceAccent(item.status);
          return (
            <View
              key={item.id}
              style={[styles.maintenanceCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
            >
              <View style={styles.maintenanceHeader}>
                <Text style={[styles.maintenanceTitle, { color: textColor }]}>{item.title}</Text>
                <View style={[styles.statusPill, { backgroundColor: tintSoft, borderColor: tintStrong }]}>
                  <Text style={[styles.statusText, { color: accent }]}>{maintenanceStatusLabel(item.status)}</Text>
                </View>
              </View>
              <Text style={[styles.maintenanceDetail, { color: mutedTextColor }]}>{item.detail}</Text>
              <Text style={[styles.maintenanceNext, { color: mutedTextColor }]}>{item.nextStep}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Ενεργές ειδοποιήσεις
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Κρίσιμα μηνύματα για άμεση ανταπόκριση.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {vacuumAlerts.map((alert) => {
          const accent = alertAccent(alert.severity);
          return (
            <View
              key={alert.id}
              style={[styles.alertCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
            >
              <View style={styles.alertHeader}>
                <MaterialCommunityIcons name={alertIcon(alert.severity)} size={18} color={accent} />
                <Text style={[styles.alertTitle, { color: textColor }]}>{alert.title}</Text>
              </View>
              <Text style={[styles.alertDescription, { color: mutedTextColor }]}>
                {alert.description}
              </Text>
              <View style={styles.alertFooter}>
                <Text style={[styles.alertTime, { color: mutedTextColor }]}>
                  {alert.time}
                </Text>
                <View style={[styles.statusPill, { backgroundColor: tintSoft, borderColor: tintStrong }]}>
                  <Text style={[styles.statusText, { color: accent }]}>{alertSeverityLabel(alert.severity)}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
    gap: 20,
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  heroLeft: {
    flex: 1,
    minWidth: 220,
    gap: 10,
  },
  heroRight: {
    borderRadius: 20,
    padding: 16,
    gap: 8,
    minWidth: 180,
    flex: 1,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  heroHint: {
    fontSize: 13,
  },
  heroValueSmall: {
    fontSize: 20,
    fontWeight: "700",
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusHint: {
    fontSize: 13,
    fontWeight: "500",
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    borderRadius: 999,
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 12,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionHeader: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  meterCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    width: "48%",
    gap: 8,
  },
  meterLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  meterValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  meterTrack: {
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  meterFill: {
    height: 6,
    borderRadius: 999,
  },
  meterHint: {
    fontSize: 12,
  },
  metricCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    width: "48%",
    gap: 6,
  },
  metricLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  metricHint: {
    fontSize: 12,
  },
  cardStack: {
    gap: 12,
  },
  zoneCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  zoneHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  zoneTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  zoneDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  zoneTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  zoneMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  zoneMetaText: {
    fontSize: 12,
  },
  maintenanceCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  maintenanceHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  maintenanceTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  maintenanceDetail: {
    fontSize: 13,
  },
  maintenanceNext: {
    fontSize: 12,
  },
  alertCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  alertDescription: {
    fontSize: 13,
  },
  alertFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  alertTime: {
    fontSize: 12,
  },
});
