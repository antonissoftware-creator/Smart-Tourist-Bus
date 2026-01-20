import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { styles } from "@/constants/home-styles";

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
      <Text style={[styles.title, { color: textColor }]}>
        Smart Tourist Bus
      </Text>
      <Text style={[styles.subtitle, { color: mutedTextColor }]}>
        Choose a destination to explore.
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Core Systems
        </Text>
        <Link href="/driver" style={[styles.link, { color: tintColor }]}>
          Driver Console
        </Link>
        <Link
          href="/driver/assistance"
          style={[styles.link, { color: tintColor }]}
        >
          Driver Assistance
        </Link>
        <Link href="/climate-control" style={[styles.link, { color: tintColor }]}>
          Climate Control
        </Link>
        <Link href="/energy-dashboard" style={[styles.link, { color: tintColor }]}>
          Energy Dashboard
        </Link>
        <Link href="/robot-vacuum" style={[styles.link, { color: tintColor }]}>
          Robot Vacuum
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Passenger Experience
        </Text>
        <Link href="/passenger" style={[styles.link, { color: tintColor }]}>
          Passenger Hub
        </Link>
        <Link
          href="/passenger/nearby-attractions"
          style={[styles.link, { color: tintColor }]}
        >
          Nearby Attractions
        </Link>
        <Link
          href="/passenger/route-view"
          style={[styles.link, { color: tintColor }]}
        >
          Route View
        </Link>
        <Link
          href="/passenger/city-navigation"
          style={[styles.link, { color: tintColor }]}
        >
          City Navigation
        </Link>
        <Link
          href="/passenger/cafe-orders"
          style={[styles.link, { color: tintColor }]}
        >
          Cafe Orders
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Operations
        </Text>
        <Link href="/employee-control" style={[styles.link, { color: tintColor }]}>
          Employee Control
        </Link>
        <Link href="/interactions" style={[styles.link, { color: tintColor }]}>
          Rider Interactions
        </Link>
      </View>
    </ScrollView>
  );
}
