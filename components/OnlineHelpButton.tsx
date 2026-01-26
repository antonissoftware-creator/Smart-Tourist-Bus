import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import type { OnlineHelpButtonProps } from "@/types/help";

export function OnlineHelpButton({
  onPress,
  variant = "pill",
  tone = "default",
  label = "Online βοήθεια",
  accessibilityLabel = "Online βοήθεια",
}: OnlineHelpButtonProps) {
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");

  const isIcon = variant === "icon";
  const isInverse = tone === "inverse";
  const iconColor = isInverse ? backgroundColor : tintColor;
  const labelColor = isInverse ? backgroundColor : textColor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        isIcon ? styles.iconButton : styles.pillButton,
        !isIcon && {
          borderColor,
          backgroundColor: surfaceMutedColor,
        },
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons
        name="lifebuoy"
        size={isIcon ? 20 : 18}
        color={iconColor}
      />
      {!isIcon ? (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    borderRadius: 999,
  },
  pillButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
