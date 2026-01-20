import { Link } from "expo-router";
import { Text, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { styles } from "@/constants/centered-screen-styles";

export default function ClimateControl() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Climate Control Interface
      </Text>
      <Text style={[styles.subtitle, { color: mutedTextColor }]}>
        Temperature settings and energy savings.
      </Text>
      <Link href="/" style={[styles.link, { color: tintColor }]}>
        Back to Home
      </Link>
    </View>
  );
}
