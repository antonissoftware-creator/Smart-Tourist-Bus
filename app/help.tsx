import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ROLE_LABELS } from "@/constants/auth";
import { ROLE_HELP_CONTENT } from "@/constants/help";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { HelpStyleProps } from "@/types/help";

export default function HelpScreen() {
  const { role } = useAuth();
  const content = ROLE_HELP_CONTENT[role];
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");
  const tintColor = useThemeColor({}, "tint");

  const styles = useMemo(
    () =>
      createStyles({
        textColor,
        mutedTextColor,
        borderColor,
        surfaceColor,
        surfaceMutedColor,
        tintColor,
      }),
    [
      textColor,
      mutedTextColor,
      borderColor,
      surfaceColor,
      surfaceMutedColor,
      tintColor,
    ],
  );

  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>
        <View style={styles.rolePill}>
          <MaterialCommunityIcons name="account" size={16} color={tintColor} />
          <Text style={styles.roleText}>Ρόλος: {ROLE_LABELS[role]}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.quickActionsTitle}</Text>
        <View style={styles.cardGrid}>
          {content.quickActions.map((action) => (
            <View key={action.id} style={styles.card}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name={action.iconName}
                  size={22}
                  color={textColor}
                />
              </View>
              <Text style={styles.cardTitle}>{action.title}</Text>
              <Text style={styles.cardDescription}>{action.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.guidanceTitle}</Text>
        <View style={styles.panel}>
          {content.guidance.map((item) => (
            <View key={item} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.contactTitle}</Text>
        <View style={styles.contactGrid}>
          {content.contacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name={contact.iconName}
                  size={20}
                  color={textColor}
                />
              </View>
              <View style={styles.contactBody}>
                <Text style={styles.contactTitle}>{contact.label}</Text>
                <Text style={styles.contactDescription}>
                  {contact.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = ({
  textColor,
  mutedTextColor,
  borderColor,
  surfaceColor,
  surfaceMutedColor,
  tintColor,
}: HelpStyleProps) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 28,
      gap: 20,
    },
    header: {
      gap: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: textColor,
    },
    subtitle: {
      fontSize: 14,
      color: mutedTextColor,
    },
    rolePill: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceMutedColor,
    },
    roleText: {
      fontSize: 13,
      fontWeight: "600",
      color: textColor,
    },
    section: {
      gap: 12,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
    },
    cardGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    card: {
      flex: 1,
      minWidth: 220,
      borderRadius: 16,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
      padding: 14,
      gap: 8,
    },
    cardIcon: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: surfaceMutedColor,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: textColor,
    },
    cardDescription: {
      fontSize: 13,
      color: mutedTextColor,
    },
    panel: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
      padding: 14,
      gap: 10,
    },
    bulletRow: {
      flexDirection: "row",
      gap: 8,
      alignItems: "flex-start",
    },
    bullet: {
      fontSize: 16,
      color: tintColor,
    },
    bulletText: {
      flex: 1,
      fontSize: 13,
      color: mutedTextColor,
    },
    contactGrid: {
      gap: 12,
    },
    contactCard: {
      flexDirection: "row",
      gap: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor,
      backgroundColor: surfaceColor,
      padding: 14,
    },
    contactBody: {
      flex: 1,
      gap: 4,
    },
    contactTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: textColor,
    },
    contactDescription: {
      fontSize: 13,
      color: mutedTextColor,
    },
  });
