import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { styles } from "@/constants/home-styles";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { HomeCardStyleProps, HomeSampleCard } from "@/types/home";

const SAMPLE_CARDS: HomeSampleCard[] = [
  {
    id: "sample-1",
    title: "Μικρή βόλτα στην Πλάκα",
    description: "Παραδοσιακά σοκάκια και θέα στην Ακρόπολη.",
    tag: "Προτεινόμενο",
    route: "/(tabs)/passenger/nearby-attractions",
  },
  {
    id: "sample-2",
    title: "Freddo από το onboard cafe",
    description: "Δροσερός espresso για τη διαδρομή σου.",
    tag: "Ρόφημα",
    route: "/(tabs)/passenger/cafe-orders",
  },
  {
    id: "sample-3",
    title: "Γρήγορη στάση για φωτογραφίες",
    description: "Κλείσε 10 λεπτά για το καλύτερο κάδρο.",
    tag: "Στάση",
    route: "/(tabs)/passenger/route-view",
  },
  {
    id: "sample-4",
    title: "Αξιοθέατο στα 300 μέτρα",
    description: "Ιδανικό για άμεση εξερεύνηση.",
    tag: "Κοντά",
    route: "/(tabs)/passenger/city-navigation",
  },
  {
    id: "sample-5",
    title: "Snack στο δρόμο",
    description: "Ελαφρύ, γρήγορο και νόστιμο.",
    tag: "Snack",
    route: "/(tabs)/passenger/cafe-orders",
  },
];

export default function Index() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");

  const cardStyles = useMemo(
    () =>
      createCardStyles({
        textColor,
        mutedTextColor,
        tintColor,
        borderColor,
        surfaceColor,
        surfaceMutedColor,
      }),
    [textColor, mutedTextColor, tintColor, borderColor, surfaceColor, surfaceMutedColor]
  );

  const randomizedCards = useMemo(() => {
    const shuffled = [...SAMPLE_CARDS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: textColor }, styles.border_bottom]}>
        Εξερεύνησε τη στάση σου
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Δείγματα καρτών
        </Text>
        <View style={cardStyles.cardGrid}>
          {randomizedCards.map((card) => (
            <Pressable
              key={card.id}
              accessibilityRole="button"
              onPress={() => {
                if (card.route) {
                  router.push(card.route);
                }
              }}
              style={({ pressed }) => [
                cardStyles.card,
                pressed && cardStyles.cardPressed,
              ]}
            >
              <View style={cardStyles.tagPill}>
                <Text style={cardStyles.tagText}>{card.tag}</Text>
              </View>
              <Text style={cardStyles.cardTitle}>{card.title}</Text>
              <Text style={cardStyles.cardBody}>{card.description}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const createCardStyles = ({
  textColor,
  mutedTextColor,
  tintColor,
  borderColor,
  surfaceColor,
  surfaceMutedColor,
}: HomeCardStyleProps) =>
  StyleSheet.create({
    cardGrid: {
      gap: 12,
    },
    card: {
      backgroundColor: surfaceColor,
      borderRadius: 14,
      borderWidth: 1,
      borderColor,
      padding: 14,
      gap: 8,
    },
    cardPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.99 }],
    },
    tagPill: {
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: surfaceMutedColor,
      borderWidth: 1,
      borderColor,
    },
    tagText: {
      fontSize: 12,
      fontWeight: "700",
      color: tintColor,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
    },
    cardBody: {
      fontSize: 13,
      color: mutedTextColor,
    },
  });
