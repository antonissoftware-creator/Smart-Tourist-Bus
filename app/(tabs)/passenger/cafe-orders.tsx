import { Link } from "expo-router";
import { Text, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { styles } from "@/constants/centered-screen-styles";

export default function PassengerCafeOrders() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Passenger Mode: Cafe Orders
      </Text>
      <Text style={[styles.subtitle, { color: mutedTextColor }]}>
        Order and delivery flow.
      </Text>
      <Link href="/" style={[styles.link, { color: tintColor }]}>
        Back to Home
      </Link>
    </View>
  );
}
