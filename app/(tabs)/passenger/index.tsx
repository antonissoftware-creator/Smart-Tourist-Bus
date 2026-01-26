import { Link } from "expo-router";
import { Text, View } from "react-native";

import { styles } from "@/constants/centered-screen-styles";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function PassengerIndex() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Passenger Interface
      </Text>
      <Text style={[styles.subtitle, { color: mutedTextColor }]}>
        Primary passenger view.
      </Text>
      <Link href="/" style={[styles.link, { color: tintColor }]}>
        Back to Home
      </Link>
    </View>
  );
}
