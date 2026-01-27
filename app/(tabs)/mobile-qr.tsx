import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AthensSVG from "@/assets/svgs/Athens.svg";
import { styles } from "@/constants/home-styles";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function MobileQr() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");

  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.section}>
        <Text style={[styles.title, { color: textColor }]}>
          Καλωσόρισες στη Διαδρομή
        </Text>
        <View
          style={[localStyles.titleUnderline, { backgroundColor: tintColor }]}
        />

        <Text
          style={[
            styles.sectionTitle,
            { color: mutedTextColor, textAlign: "center" },
          ]}
        >
          Επόμενη στάση:{" "}
          <Text style={[localStyles.sectionEmphasis, { color: textColor }]}>
            Ακρόπολη σε 6 λεπτά
          </Text>
        </Text>

        <View
          style={[
            localStyles.qrContainer,
            {
              borderColor,
              backgroundColor: surfaceColor,
            },
          ]}
        >
          <MaterialCommunityIcons name="qrcode" size={180} color={textColor} />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)")}
          style={({ pressed }) => [
            localStyles.primaryButton,
            { backgroundColor: tintColor },
            pressed && localStyles.primaryButtonPressed,
          ]}
        >
          <Text
            style={[localStyles.primaryButtonText, { color: surfaceColor }]}
          >
            Επιστροφή στο Menu
          </Text>
        </Pressable>
      </View>

      <View style={styles.svgBottom}>
        <AthensSVG width="100%" height="100%" />
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  titleUnderline: {
    alignSelf: "center",
    width: "70%",
    height: 2,
    borderRadius: 999,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionEmphasis: {
    fontWeight: "700",
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 12,
  },
  qrCaption: {
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    alignSelf: "center",
    marginTop: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
