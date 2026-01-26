import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  batteryPacks,
  chargeSchedule,
  energyAlerts,
  energyFlows,
  energyMetrics,
  energySummary,
  quickActions,
} from "@/constants/energy-dashboard";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { BatteryStatus, EnergyAlertSeverity } from "@/types/energy-dashboard";

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith("#") && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
};

const getStatusIcon = (status: BatteryStatus) => {
  switch (status) {
    case "charging":
      return "battery-charging";
    case "warning":
      return "battery-alert";
    case "critical":
      return "battery-alert-variant";
    default:
      return "battery-high";
  }
};

const getAlertIcon = (severity: EnergyAlertSeverity) => {
  switch (severity) {
    case "critical":
      return "alert-circle";
    case "warning":
      return "alert";
    default:
      return "information";
  }
};

export default function EnergyDashboard() {
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
  const tintStrong = withAlpha(tintColor, 0.25);

  const statusAccent = (status: BatteryStatus) => {
    switch (status) {
      case "critical":
        return textColor;
      case "warning":
        return tintColor;
      case "charging":
        return tintColor;
      default:
        return iconColor;
    }
  };

  const severityAccent = (severity: EnergyAlertSeverity) => {
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
          <Text style={[styles.label, { color: mutedTextColor }]}>Συνολική φόρτιση</Text>
          <Text style={[styles.heroValue, { color: textColor }]}>
            {energySummary.socPercent}%
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}
          >
            {energySummary.availableKwh} από {energySummary.totalCapacityKwh} kWh διαθέσιμα
          </Text>
        </View>
        <View style={[styles.heroRight, { backgroundColor: tintSoft }]}>
          <Text style={[styles.label, { color: mutedTextColor }]}>Εκτίμηση αυτονομίας</Text>
          <Text style={[styles.heroValueSmall, { color: textColor }]}
          >
            {energySummary.estimatedRangeKm} km
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}
          >
            Τρέχουσα κατανάλωση {energySummary.currentDrawKw} kW
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}
          >
            Ανάκτηση {energySummary.regenKw} kW
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        <View style={styles.metaRow}>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Όχημα</Text>
            <Text style={[styles.value, { color: textColor }]}>{energySummary.vehicleId}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Διαδρομή</Text>
            <Text style={[styles.value, { color: textColor }]}>{energySummary.routeName}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Βάρδια</Text>
            <Text style={[styles.value, { color: textColor }]}>{energySummary.shiftWindow}</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Θερμ. συστοιχιών</Text>
            <Text style={[styles.value, { color: textColor }]}>{energySummary.packTempC}°C</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Τελευταία ενημέρωση</Text>
            <Text style={[styles.value, { color: textColor }]}>{energySummary.lastUpdate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Κύρια metrics</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Απόδοση ενέργειας και βοηθητικά φορτία.
        </Text>
      </View>

      <View style={styles.grid}>
        {energyMetrics.map((metric) => (
          <View
            key={metric.id}
            style={[styles.metricCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
          >
            <Text style={[styles.metricLabel, { color: mutedTextColor }]}
            >
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: textColor }]}
            >
              {metric.value} {metric.unit}
            </Text>
            <Text style={[styles.metricHint, { color: iconColor }]}
            >
              {metric.helper}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ροές ισχύος</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Κατανομή τρέχουσας ενέργειας.
        </Text>
      </View>

      <View style={styles.flowRow}>
        {energyFlows.map((flow) => (
          <View
            key={flow.id}
            style={[styles.flowCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
          >
            <View style={styles.flowHeader}>
              <MaterialCommunityIcons
                name={flow.direction === "generation" ? "flash" : "engine"}
                size={18}
                color={flow.direction === "generation" ? tintColor : iconColor}
              />
              <Text style={[styles.flowLabel, { color: mutedTextColor }]}
              >
                {flow.label}
              </Text>
            </View>
            <Text style={[styles.flowValue, { color: textColor }]}
            >
              {flow.value} {flow.unit}
            </Text>
            <Text style={[styles.flowHint, { color: mutedTextColor }]}
            >
              {flow.helper}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}
        >
          Συστοιχίες μπαταριών
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}
        >
          Κατάσταση φόρτισης, υγεία και ισορροπία κελιών.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {batteryPacks.map((pack) => {
          const accent = statusAccent(pack.status);
          return (
            <View
              key={pack.id}
              style={[styles.packCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
            >
              <View style={styles.packHeader}>
                <View style={styles.packTitleRow}>
                  <MaterialCommunityIcons name={getStatusIcon(pack.status)} size={20} color={accent} />
                  <View>
                    <Text style={[styles.packTitle, { color: textColor }]}>{pack.name}</Text>
                    <Text style={[styles.packLocation, { color: mutedTextColor }]}
                    >
                      {pack.location}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.packStatusPill,
                    { backgroundColor: tintSoft, borderColor: tintStrong },
                  ]}
                >
                  <Text style={[styles.packStatusText, { color: accent }]}
                  >
                    {pack.statusLabel}
                  </Text>
                </View>
              </View>

              <View style={[styles.progressTrack, { backgroundColor: surfaceMutedColor }]}
              >
                <View
                  style={[
                    styles.progressFill,
                    { width: `${pack.socPercent}%`, backgroundColor: accent },
                  ]}
                />
              </View>
              <View style={styles.progressMeta}>
                <Text style={[styles.progressLabel, { color: mutedTextColor }]}
                >
                  SoC {pack.socPercent}%
                </Text>
                <Text style={[styles.progressLabel, { color: mutedTextColor }]}
                >
                  Υγεία {pack.healthPercent}%
                </Text>
              </View>

              <View style={styles.detailGrid}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: mutedTextColor }]}
                  >
                    Θερμοκρασία
                  </Text>
                  <Text style={[styles.detailValue, { color: textColor }]}
                  >
                    {pack.temperatureC}°C
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: mutedTextColor }]}
                  >
                    Τάση
                  </Text>
                  <Text style={[styles.detailValue, { color: textColor }]}>
                    {pack.voltage} V
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: mutedTextColor }]}
                  >
                    Ρεύμα
                  </Text>
                  <Text style={[styles.detailValue, { color: textColor }]}>
                    {pack.currentA} A
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: mutedTextColor }]}
                  >
                    Δέλτα κελιών
                  </Text>
                  <Text style={[styles.detailValue, { color: textColor }]}
                  >
                    {pack.balanceDeltaMv} mV
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: mutedTextColor }]}
                  >
                    Κύκλοι
                  </Text>
                  <Text style={[styles.detailValue, { color: textColor }]}
                  >
                    {pack.cycleCount}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: mutedTextColor }]}
                  >
                    Τελευταίο service
                  </Text>
                  <Text style={[styles.detailValue, { color: textColor }]}
                  >
                    {pack.lastService}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}
        >
          Ενεργές ειδοποιήσεις
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}
        >
          Βασικές ειδοποιήσεις για άμεση δράση.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {energyAlerts.map((alert) => {
          const accent = severityAccent(alert.severity);
          return (
            <View
              key={alert.id}
              style={[styles.alertCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
            >
              <View style={styles.alertHeader}>
                <MaterialCommunityIcons name={getAlertIcon(alert.severity)} size={18} color={accent} />
                <Text style={[styles.alertTitle, { color: textColor }]}>{alert.title}</Text>
              </View>
              <Text style={[styles.alertDescription, { color: mutedTextColor }]}
              >
                {alert.description}
              </Text>
              <View style={styles.alertFooter}>
                <Text style={[styles.alertTime, { color: mutedTextColor }]}
                >
                  {alert.time}
                </Text>
                <View
                  style={[
                    styles.alertPill,
                    { backgroundColor: tintSoft, borderColor: tintStrong },
                  ]}
                >
                  <Text style={[styles.alertPillText, { color: accent }]}
                  >
                    {alert.severityLabel}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}
        >
          Πρόγραμμα φόρτισης
        </Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}
        >
          Επόμενες ενέργειες φόρτισης για τις συστοιχίες.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        {chargeSchedule.map((item) => (
          <View key={item.id} style={styles.scheduleRow}>
            <View style={styles.scheduleTime}>
              <Text style={[styles.scheduleValue, { color: textColor }]}
              >
                {item.window}
              </Text>
              <Text style={[styles.scheduleHint, { color: mutedTextColor }]}
              >
                Στόχος {item.targetSoc}
              </Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={[styles.scheduleTitle, { color: textColor }]}
              >
                {item.location}
              </Text>
              <Text style={[styles.scheduleHint, { color: mutedTextColor }]}
              >
                {item.note}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Γρήγορες ενέργειες</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>
          Συντομεύσεις για τους υπεύθυνους βάρδιας.
        </Text>
      </View>

      <View style={styles.actionGrid}>
        {quickActions.map((action) => (
          <View
            key={action.id}
            style={[styles.actionCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
          >
            <Text style={[styles.actionTitle, { color: textColor }]}
            >
              {action.label}
            </Text>
            <Text style={[styles.actionHint, { color: mutedTextColor }]}
            >
              {action.description}
            </Text>
          </View>
        ))}
      </View>

      <Link href="/" style={[styles.link, { color: tintColor }]}>Επιστροφή στην αρχική</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  statusPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  heroLeft: {
    flex: 1,
    gap: 8,
  },
  heroRight: {
    width: 150,
    borderRadius: 18,
    padding: 12,
    gap: 6,
  },
  heroValue: {
    fontSize: 34,
    fontWeight: "700",
  },
  heroValueSmall: {
    fontSize: 20,
    fontWeight: "700",
  },
  heroHint: {
    fontSize: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 13,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 6,
  },
  metricLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  metricHint: {
    fontSize: 12,
  },
  flowRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  flowCard: {
    flex: 1,
    minWidth: 150,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 6,
  },
  flowHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  flowLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  flowValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  flowHint: {
    fontSize: 12,
  },
  cardStack: {
    gap: 12,
  },
  packCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  packHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  packTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  packTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  packLocation: {
    fontSize: 12,
  },
  packStatusPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  packStatusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 12,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailItem: {
    width: "47%",
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  alertCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 8,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  alertTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  alertDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  alertFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertTime: {
    fontSize: 12,
  },
  alertPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  alertPillText: {
    fontSize: 11,
    fontWeight: "600",
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 8,
  },
  scheduleTime: {
    width: 120,
    gap: 4,
  },
  scheduleValue: {
    fontSize: 15,
    fontWeight: "700",
  },
  scheduleHint: {
    fontSize: 12,
  },
  scheduleInfo: {
    flex: 1,
    gap: 4,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: 160,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionHint: {
    fontSize: 12,
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
});
