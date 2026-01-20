import { Link } from "expo-router";
import { Text, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { styles } from "@/constants/centered-screen-styles";

export default function PassengerCityNavigation() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Passenger Mode: City Navigation
      </Text>
      <Text style={[styles.subtitle, { color: mutedTextColor }]}>
        Out-of-bus navigation view.
      </Text>
      <Link href="/" style={[styles.link, { color: tintColor }]}>
        Back to Home
      </Link>
    </View>
  );
}
