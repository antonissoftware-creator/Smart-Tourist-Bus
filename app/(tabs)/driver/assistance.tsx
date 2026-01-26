import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { driverAssistanceActions, driverAssistanceAlerts, driverAssistanceChecklist, driverAssistanceMetrics, driverAssistanceSummary } from "@/constants/driver-assistance";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { AlertSeverity, AssistanceStatus } from "@/types/driver-assistance";

export default function DriverAssistance() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");

  const statusTokens = (status: AssistanceStatus) => {
    if (status === "active") {
      return { backgroundColor: surfaceMutedColor, borderColor: tintColor, color: tintColor };
    }
    if (status === "warning") {
      return { backgroundColor: surfaceMutedColor, borderColor: textColor, color: textColor };
    }
    if (status === "standby") {
      return { backgroundColor: surfaceMutedColor, borderColor, color: mutedTextColor };
    }
    return { backgroundColor: surfaceMutedColor, borderColor, color: mutedTextColor };
  };

  const severityTokens = (severity: AlertSeverity) => {
    if (severity === "critical") {
      return { backgroundColor: surfaceMutedColor, borderColor: tintColor, color: textColor };
    }
    if (severity === "caution") {
      return { backgroundColor: surfaceMutedColor, borderColor: textColor, color: textColor };
    }
    return { backgroundColor: surfaceMutedColor, borderColor, color: mutedTextColor };
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.summaryCard, { backgroundColor: surfaceColor, borderColor }]}>
        <View style={styles.summaryTopRow}>
          <View>
            <Text style={[styles.summaryTitle, { color: textColor }]}>
              {driverAssistanceSummary.routeName}
            </Text>
            <Text style={[styles.summaryMeta, { color: mutedTextColor }]}>
              {driverAssistanceSummary.lastUpdate}
            </Text>
          </View>
          {(() => {
            const summaryStatus = statusTokens(driverAssistanceSummary.systemStatus);
            return (
              <View style={[styles.statusPill, summaryStatus]}>
                <Text style={[styles.statusText, { color: summaryStatus.color }]}>
                  {driverAssistanceSummary.systemStatusLabel}
                </Text>
              </View>
            );
          })()}
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: mutedTextColor }]}>
              Δείκτης ασφάλειας
            </Text>
            <Text style={[styles.summaryValue, { color: textColor }]}>
              {driverAssistanceSummary.safetyScore}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: mutedTextColor }]}>
              Καιρός
            </Text>
            <Text style={[styles.summaryValue, { color: textColor }]}>
              {driverAssistanceSummary.conditions}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: mutedTextColor }]}>
              Επόμενο διάλειμμα
            </Text>
            <Text style={[styles.summaryValue, { color: textColor }]}>
              {driverAssistanceSummary.nextBreak}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ζωντανές μετρήσεις</Text>
        <Text style={[styles.sectionHint, { color: mutedTextColor }]}>
          Ταχύτητα, λωρίδα, απόσταση και κρίσιμες ενδείξεις.
        </Text>
        <View style={styles.metricsGrid}>
          {driverAssistanceMetrics.map((metric) => (
            <View key={metric.id} style={[styles.metricCard, { backgroundColor: surfaceColor, borderColor }]}>
              {(() => {
                const metricStatus = statusTokens(metric.status);
                return (
                  <View style={styles.metricHeader}>
                    <Text style={[styles.metricLabel, { color: mutedTextColor }]}>{metric.label}</Text>
                    <View style={[styles.statusDot, { borderColor: metricStatus.borderColor, backgroundColor: metricStatus.borderColor }]} />
                  </View>
                );
              })()}
              <Text style={[styles.metricValue, { color: textColor }]}>
                {metric.value}
                {metric.unit ? ` ${metric.unit}` : ""}
              </Text>
              <Text style={[styles.metricHelper, { color: mutedTextColor }]}>
                {metric.helper}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ενεργές ειδοποιήσεις</Text>
        <Text style={[styles.sectionHint, { color: mutedTextColor }]}>
          Εστιάστε σε όσα χρειάζονται άμεση ενέργεια.
        </Text>
        <View style={styles.alertList}>
          {driverAssistanceAlerts.map((alert) => (
            <View key={alert.id} style={[styles.alertCard, { backgroundColor: surfaceColor, borderColor }]}>
              <View style={styles.alertHeader}>
                <Text style={[styles.alertTitle, { color: textColor }]}>{alert.title}</Text>
                {(() => {
                  const severityStyle = severityTokens(alert.severity);
                  return (
                    <View style={[styles.severityPill, severityStyle]}>
                      <Text style={[styles.severityText, { color: severityStyle.color }]}>
                        {alert.severityLabel}
                      </Text>
                    </View>
                  );
                })()}
              </View>
              <Text style={[styles.alertDescription, { color: mutedTextColor }]}>
                {alert.description}
              </Text>
              <Text style={[styles.alertTime, { color: mutedTextColor }]}>{alert.time}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Λειτουργίες υποβοήθησης</Text>
        <Text style={[styles.sectionHint, { color: mutedTextColor }]}>
          Ενεργοποίηση ή έλεγχος μονάδων συστήματος.
        </Text>
        <View style={styles.actionsGrid}>
          {driverAssistanceActions.map((action) => (
            <View key={action.id} style={[styles.actionCard, { backgroundColor: surfaceColor, borderColor }]}>
              <Text style={[styles.actionTitle, { color: textColor }]}>{action.label}</Text>
              <Text style={[styles.actionDescription, { color: mutedTextColor }]}>
                {action.description}
              </Text>
              {(() => {
                const actionStatus = statusTokens(action.status);
                return (
                  <View style={[styles.statusPill, actionStatus]}>
                    <Text style={[styles.statusText, { color: actionStatus.color }]}>
                      {action.statusLabel}
                    </Text>
                  </View>
                );
              })()}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Λίστα οδηγού</Text>
        <Text style={[styles.sectionHint, { color: mutedTextColor }]}>
          Γρήγορες υπενθυμίσεις πριν την επόμενη στάση.
        </Text>
        <View style={[styles.checklistCard, { backgroundColor: surfaceColor, borderColor }]}>
          {driverAssistanceChecklist.map((item) => (
            <View key={item.id} style={styles.checklistRow}>
              {(() => {
                const itemStatus = statusTokens(item.status);
                return (
                  <View
                    style={[
                      styles.checkmark,
                      { borderColor: itemStatus.borderColor, backgroundColor: itemStatus.borderColor },
                    ]}
                  />
                );
              })()}
              <View style={styles.checklistText}>
                <Text style={[styles.checklistTitle, { color: textColor }]}>
                  {item.title}
                </Text>
                <Text style={[styles.checklistMeta, { color: mutedTextColor }]}>
                  {item.detail}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Link href="/" style={[styles.link, { color: tintColor }]}>
          Επιστροφή στην αρχική
        </Link>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
    marginTop: 6,
  },
  summaryCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  summaryTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  summaryMeta: {
    fontSize: 13,
    marginTop: 4,
  },
  statusPill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionHint: {
    fontSize: 13,
    marginTop: 4,
  },
  metricsGrid: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    width: "48%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  metricHelper: {
    fontSize: 12,
    marginTop: 6,
  },
  alertList: {
    marginTop: 14,
    gap: 12,
  },
  alertCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  severityPill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  severityText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  alertDescription: {
    fontSize: 13,
    marginTop: 8,
  },
  alertTime: {
    fontSize: 12,
    marginTop: 6,
  },
  actionsGrid: {
    marginTop: 14,
    gap: 12,
  },
  actionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  actionDescription: {
    fontSize: 13,
  },
  checklistCard: {
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  checklistText: {
    flex: 1,
  },
  checklistTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  checklistMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    marginTop: 28,
  },
  link: {
    fontSize: 16,
    fontWeight: "600",
  },
});
