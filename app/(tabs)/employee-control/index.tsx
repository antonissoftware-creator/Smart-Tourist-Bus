import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  crewSummary,
  dutyTasks,
  roleCoverage,
  staffAlerts,
  staffMembers,
} from "@/constants/employee-control";
import { useThemeColor } from "@/hooks/use-theme-color";
import type {
  AlertSeverity,
  CoverageStatus,
  StaffStatus,
} from "@/types/employee-control";

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith("#") && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
};

export default function EmployeeControl() {
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
  const tintStrong = withAlpha(tintColor, 0.3);

  const coverageAccent = (status: CoverageStatus) => {
    switch (status) {
      case "critical":
        return textColor;
      case "thin":
        return tintColor;
      default:
        return iconColor;
    }
  };

  const staffAccent = (status: StaffStatus) => {
    switch (status) {
      case "on-duty":
        return tintColor;
      case "support":
        return textColor;
      case "training":
        return iconColor;
      case "break":
        return mutedTextColor;
      default:
        return mutedTextColor;
    }
  };

  const alertAccent = (severity: AlertSeverity) => {
    switch (severity) {
      case "urgent":
        return textColor;
      case "attention":
        return tintColor;
      default:
        return iconColor;
    }
  };

  const taskStatusLabel = (status: string) => {
    switch (status) {
      case "done":
        return "Ολοκληρώθηκε";
      case "in-progress":
        return "Σε εξέλιξη";
      default:
        return "Σε εκκρεμότητα";
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
          <Text style={[styles.label, { color: mutedTextColor }]}>Προσωπικό εντός οχήματος</Text>
          <Text style={[styles.heroValue, { color: textColor }]}
          >
            {crewSummary.onboardCount}
            <Text style={[styles.heroValueMuted, { color: mutedTextColor }]}
            >
              /{crewSummary.requiredCount}
            </Text>
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}
          >
            Επόμενη αλλαγή {crewSummary.nextChangeover}
          </Text>
        </View>
        <View style={[styles.heroRight, { backgroundColor: tintSoft }]}
        >
          <Text style={[styles.label, { color: mutedTextColor }]}>Τελευταία ενημέρωση</Text>
          <Text style={[styles.heroValueSmall, { color: textColor }]}
          >
            {crewSummary.lastUpdate}
          </Text>
          <Text style={[styles.heroHint, { color: mutedTextColor }]}
          >
            Βάρδια {crewSummary.shiftWindow}
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
      >
        <View style={styles.metaRow}>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Όχημα</Text>
            <Text style={[styles.value, { color: textColor }]}>
              {crewSummary.vehicleId}
            </Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Διαδρομή</Text>
            <Text style={[styles.value, { color: textColor }]}>
              {crewSummary.routeName}
            </Text>
          </View>
          <View>
            <Text style={[styles.label, { color: mutedTextColor }]}>Κάλυψη</Text>
            <Text style={[styles.value, { color: textColor }]}>
              {crewSummary.onboardCount} / {crewSummary.requiredCount}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Κάλυψη ρόλων</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}
        >
          Απαιτούμενο vs ανατεθειμένο προσωπικό ανά ρόλο.
        </Text>
      </View>

      <View style={styles.grid}>
        {roleCoverage.map((role) => {
          const accent = coverageAccent(role.status);
          return (
            <View
              key={role.id}
              style={[styles.metricCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
            >
              <View style={styles.metricHeader}>
                <View style={[styles.dot, { backgroundColor: accent }]} />
                <Text style={[styles.metricLabel, { color: mutedTextColor }]}
                >
                  {role.role}
                </Text>
              </View>
              <Text style={[styles.metricValue, { color: textColor }]}
              >
                {role.assigned} / {role.required}
              </Text>
              <Text style={[styles.metricHint, { color: accent }]}>
                {role.statusLabel}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Προσωπικό εντός οχήματος</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}
        >
          Κατάσταση, τοποθεσία και κανάλι επικοινωνίας.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {staffMembers.map((member) => {
          const accent = staffAccent(member.status);
          return (
            <View
              key={member.id}
              style={[styles.staffCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
            >
              <View style={styles.staffHeader}>
                <View style={styles.staffTitleRow}>
                  <View style={[styles.dot, { backgroundColor: accent }]} />
                  <View>
                    <Text style={[styles.staffName, { color: textColor }]}
                    >
                      {member.name}
                    </Text>
                    <Text style={[styles.staffRole, { color: mutedTextColor }]}
                    >
                      {member.role}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusPillSmall,
                    { borderColor: withAlpha(accent, 0.4), backgroundColor: withAlpha(accent, 0.12) },
                  ]}
                >
                  <Text style={[styles.statusTextSmall, { color: accent }]}
                  >
                    {member.statusLabel}
                  </Text>
                </View>
              </View>
              <View style={styles.staffMetaRow}>
                <View>
                  <Text style={[styles.label, { color: mutedTextColor }]}>Τοποθεσία</Text>
                  <Text style={[styles.value, { color: textColor }]}>
                    {member.location}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.label, { color: mutedTextColor }]}>Βάρδια</Text>
                  <Text style={[styles.value, { color: textColor }]}>
                    {member.shift}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.label, { color: mutedTextColor }]}>Επαφή</Text>
                  <Text style={[styles.value, { color: textColor }]}>
                    {member.contact}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ζωντανές ειδοποιήσεις</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}
        >
          Θέματα που απαιτούν άμεση προσοχή.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {staffAlerts.map((alert) => {
          const accent = alertAccent(alert.severity);
          return (
            <View
              key={alert.id}
              style={[styles.alertCard, { backgroundColor: surfaceMutedColor, borderColor: cardBorder }]}
            >
              <View style={styles.alertHeader}>
                <View style={[styles.dot, { backgroundColor: accent }]} />
                <Text style={[styles.alertTitle, { color: textColor }]}
                >
                  {alert.title}
                </Text>
                <Text style={[styles.alertTime, { color: mutedTextColor }]}
                >
                  {alert.time}
                </Text>
              </View>
              <Text style={[styles.alertDescription, { color: mutedTextColor }]}
              >
                {alert.description}
              </Text>
              <Text style={[styles.alertLabel, { color: accent }]}>
                {alert.severityLabel}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ενεργά καθήκοντα</Text>
        <Text style={[styles.sectionSubtitle, { color: mutedTextColor }]}
        >
          Κοινά καθήκοντα για τον τρέχοντα κύκλο.
        </Text>
      </View>

      <View style={styles.cardStack}>
        {dutyTasks.map((task) => {
          const accent =
            task.status === "done"
              ? iconColor
              : task.status === "in-progress"
              ? tintColor
              : mutedTextColor;
          return (
            <View
              key={task.id}
              style={[styles.taskCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}
            >
              <View style={styles.taskHeader}>
                <Text style={[styles.taskTitle, { color: textColor }]}>
                  {task.title}
                </Text>
                <Text style={[styles.taskDue, { color: mutedTextColor }]}
                >
                  {task.due}
                </Text>
              </View>
              <View style={styles.taskMetaRow}>
                <Text style={[styles.taskMeta, { color: mutedTextColor }]}
                >
                  {task.area}
                </Text>
                <Text style={[styles.taskMeta, { color: mutedTextColor }]}
                >
                  {task.owner}
                </Text>
                <Text style={[styles.taskStatus, { color: accent }]}>
                  {taskStatusLabel(task.status)}
                </Text>
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
    padding: 20,
    paddingBottom: 36,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  statusPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  heroCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  heroLeft: {
    flex: 1,
  },
  heroRight: {
    borderRadius: 14,
    padding: 14,
    alignSelf: "flex-start",
  },
  heroValue: {
    fontSize: 34,
    fontWeight: "700",
  },
  heroValueMuted: {
    fontSize: 18,
    fontWeight: "600",
  },
  heroValueSmall: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
  },
  heroHint: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
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
    lineHeight: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    width: "48%",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metricLabel: {
    fontSize: 12,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  metricHint: {
    fontSize: 12,
    fontWeight: "600",
  },
  cardStack: {
    gap: 12,
  },
  staffCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  staffHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  staffTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  staffName: {
    fontSize: 16,
    fontWeight: "700",
  },
  staffRole: {
    fontSize: 13,
    marginTop: 2,
  },
  staffMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statusPillSmall: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusTextSmall: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  alertCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  alertTime: {
    fontSize: 11,
  },
  alertDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  alertLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  taskCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  taskDue: {
    fontSize: 12,
  },
  taskMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  taskMeta: {
    fontSize: 12,
  },
  taskStatus: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});
