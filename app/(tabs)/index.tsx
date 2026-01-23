import { ScrollView, Text } from "react-native";

import { styles } from "@/constants/home-styles";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function Index() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");

  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: textColor }, styles.border_bottom]}>
        Εξερεύνησε τη στάση σου
      </Text>

      
    </ScrollView>
  );
}
