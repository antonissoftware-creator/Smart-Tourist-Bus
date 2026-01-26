import { ScrollView, StyleSheet, Text, View } from "react-native";

import { climateMetrics, climateModes, climateSchedule, climateZones, driverShift, fanLevels, systemStatus } from "@/constants/climate-control";
import { useThemeColor } from "@/hooks/use-theme-color";

const formatTemp = (value: number) => `${value.toFixed(1)}°C`;

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith("#") && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
};

export default function ClimateControl() {
  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const iconColor = useThemeColor({}, "icon");

  const cardBorder = withAlpha(borderColor, 0.6);
  const tintSoft = withAlpha(tintColor, 0.12);
  const tintStrong = withAlpha(tintColor, 0.2);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        <View style={styles.driverRow}>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Όχημα</Text>
            <Text style={[styles.value, { color: textColor }]}>{driverShift.vehicleId}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Βάρδια</Text>
            <Text style={[styles.value, { color: textColor }]}>{driverShift.timeWindow}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Πληρότητα</Text>
            <Text style={[styles.value, { color: textColor }]}>{driverShift.occupancy}</Text>
          </View>
        </View>
        <View style={styles.driverRow}>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Διαδρομή</Text>
            <Text style={[styles.value, { color: textColor }]}>{driverShift.routeName}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Οδηγός</Text>
            <Text style={[styles.value, { color: textColor }]}>{driverShift.driverName}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.heroCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}>
        <View style={styles.heroLeft}>
          <Text style={[styles.heroLabel, { color: mutedTextColor }]}>Θερμοκρασία καμπίνας</Text>
          <Text style={[styles.heroValue, { color: textColor }]}>{formatTemp(climateMetrics.cabinTemp)}</Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}>Στόχος {formatTemp(climateMetrics.targetTemp)}</Text>
        </View>
        <View style={[styles.heroRight, { backgroundColor: tintSoft }]}> 
          <Text style={[styles.heroLabel, { color: mutedTextColor }]}>Εξωτερική</Text>
          <Text style={[styles.heroValueSmall, { color: textColor }]}>{formatTemp(climateMetrics.outsideTemp)}</Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}>Λειτουργία {systemStatus.activeMode}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={[styles.metricCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
        >
          <Text style={[styles.metricLabel, { color: mutedTextColor }]}>Υγρασία</Text>
          <Text style={[styles.metricValue, { color: textColor }]}>{climateMetrics.humidity}%</Text>
          <Text style={[styles.metricHint, { color: iconColor }]}>Άνεση καμπίνας</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
        >
          <Text style={[styles.metricLabel, { color: mutedTextColor }]}>CO₂</Text>
          <Text style={[styles.metricValue, { color: textColor }]}>{climateMetrics.co2ppm} ppm</Text>
          <Text style={[styles.metricHint, { color: iconColor }]}>Ποιότητα αέρα {systemStatus.airQuality}</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
        >
          <Text style={[styles.metricLabel, { color: mutedTextColor }]}>Κατανάλωση</Text>
          <Text style={[styles.metricValue, { color: textColor }]}>{climateMetrics.energyUse} kWh</Text>
          <Text style={[styles.metricHint, { color: iconColor }]}>Eco σκορ {climateMetrics.ecoScore}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ζώνες καμπίνας</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>Σύνολο ζωνών: {climateZones.length}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        {climateZones.map((zone) => (
          <View key={zone.id} style={styles.zoneRow}>
            <View style={styles.zoneInfo}>
              <Text style={[styles.zoneName, { color: textColor }]}>{zone.name}</Text>
              <Text style={[styles.zoneMeta, { color: mutedTextColor }]}>
                {zone.seatCount} θέσεις · Ροή {zone.airFlow}
              </Text>
            </View>
            <View style={styles.zoneTemp}>
              <Text style={[styles.zoneValue, { color: textColor }]}>{formatTemp(zone.currentTemp)}</Text>
              <Text style={[styles.zoneTarget, { color: mutedTextColor }]}>Στόχος {zone.targetTemp}°C</Text>
              <View style={[styles.zoneStatusPill, { backgroundColor: tintSoft, borderColor: tintStrong }]}
              >
                <Text style={[styles.zoneStatusText, { color: tintColor }]}>{zone.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ρυθμίσεις λειτουργίας</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>Επιλογές με βάση τις συνθήκες της διαδρομής</Text>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        <Text style={[styles.label, { color: mutedTextColor }]}>Λειτουργία</Text>
        <View style={styles.pillRow}>
          {climateModes.map((mode) => (
            <View
              key={mode}
              style={[
                styles.pill,
                {
                  backgroundColor: mode === systemStatus.activeMode ? tintSoft : "transparent",
                  borderColor: mode === systemStatus.activeMode ? tintColor : cardBorder,
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: mode === systemStatus.activeMode ? tintColor : textColor },
                ]}
              >
                {mode}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.label, { color: mutedTextColor }]}>Επίπεδο ανεμιστήρα</Text>
        <View style={styles.pillRow}>
          {fanLevels.map((level) => (
            <View
              key={level}
              style={[
                styles.pill,
                {
                  backgroundColor: level === systemStatus.fanLevel ? tintSoft : "transparent",
                  borderColor: level === systemStatus.fanLevel ? tintColor : cardBorder,
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: level === systemStatus.fanLevel ? tintColor : textColor },
                ]}
              >
                {level}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.inlineRow}>
          <View style={styles.inlineBlock}>
            <Text style={[styles.label, { color: mutedTextColor }]}>Κυκλοφορία</Text>
            <Text style={[styles.value, { color: textColor }]}>{systemStatus.recirculation}</Text>
          </View>
          <View style={styles.inlineBlock}>
            <Text style={[styles.label, { color: mutedTextColor }]}>Αποθάμπωση</Text>
            <Text style={[styles.value, { color: textColor }]}>{systemStatus.defog}</Text>
          </View>
          <View style={styles.inlineBlock}>
            <Text style={[styles.label, { color: mutedTextColor }]}>Φίλτρο</Text>
            <Text style={[styles.value, { color: textColor }]}>{systemStatus.filterHealth}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Πρόγραμμα ημέρας</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>Επόμενες ενέργειες για σταθερή άνεση</Text>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        {climateSchedule.map((item) => (
          <View key={item.time} style={styles.scheduleRow}>
            <View style={styles.scheduleTime}>
              <Text style={[styles.scheduleValue, { color: textColor }]}>{item.time}</Text>
              <Text style={[styles.scheduleHint, { color: mutedTextColor }]}>Στόχος {item.targetTemp}°C</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={[styles.scheduleTitle, { color: textColor }]}>{item.action}</Text>
              <Text style={[styles.scheduleHint, { color: mutedTextColor }]}>{item.note}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Γρήγορες ενέργειες</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}>Εντολές για άμεση προσαρμογή</Text>
      </View>

      <View style={styles.actionRow}>
        <View style={[styles.actionCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
        >
          <Text style={[styles.actionTitle, { color: textColor }]}>Άμεση αποπαγοποίηση</Text>
          <Text style={[styles.actionHint, { color: mutedTextColor }]}>Μπροστινό παρμπρίζ</Text>
        </View>
        <View style={[styles.actionCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
        >
          <Text style={[styles.actionTitle, { color: textColor }]}>Εξαερισμός 2 λεπτών</Text>
          <Text style={[styles.actionHint, { color: mutedTextColor }]}>Ανανέωση αέρα</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <View style={[styles.actionCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
        >
          <Text style={[styles.actionTitle, { color: textColor }]}>Έλεγχος φίλτρου</Text>
          <Text style={[styles.actionHint, { color: mutedTextColor }]}>Επόμενη αλλαγή σε 12 ημέρες</Text>
        </View>
        <View style={[styles.actionCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
        >
          <Text style={[styles.actionTitle, { color: textColor }]}>Προθέρμανση καθισμάτων</Text>
          <Text style={[styles.actionHint, { color: mutedTextColor }]}>Μπροστινή καμπίνα</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    gap: 8,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    gap: 14,
  },
  driverRow: {
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
  heroCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  heroLeft: {
    flex: 1,
    gap: 8,
  },
  heroRight: {
    width: 140,
    borderRadius: 18,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 6,
  },
  heroLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  heroValue: {
    fontSize: 32,
    fontWeight: "700",
  },
  heroValueSmall: {
    fontSize: 20,
    fontWeight: "700",
  },
  heroHint: {
    fontSize: 13,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 18,
  },
  metricCard: {
    width: "31%",
    minWidth: 110,
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
  sectionHeader: {
    marginBottom: 10,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 13,
  },
  zoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 8,
  },
  zoneInfo: {
    flex: 1,
    gap: 4,
  },
  zoneName: {
    fontSize: 15,
    fontWeight: "600",
  },
  zoneMeta: {
    fontSize: 12,
  },
  zoneTemp: {
    alignItems: "flex-end",
    gap: 4,
  },
  zoneValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  zoneTarget: {
    fontSize: 12,
  },
  zoneStatusPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  zoneStatusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  inlineBlock: {
    flex: 1,
    gap: 4,
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 8,
  },
  scheduleTime: {
    width: 90,
    gap: 4,
  },
  scheduleValue: {
    fontSize: 16,
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
    fontSize: 15,
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  actionCard: {
    flex: 1,
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
});
