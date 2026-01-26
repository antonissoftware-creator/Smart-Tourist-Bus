import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AthensSVG from "@/assets/svgs/Athens.svg";
import { styles } from "@/constants/home-styles";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { HomeCardStyleProps, HomeSampleCard } from "@/types/home";

const SAMPLE_CARDS: HomeSampleCard[] = [
  {
    id: "sample-1",
    title: "Ζωντανή Θέα",
    description: "Απόλαυσε τη διαδρομή σε πραγματικό χρόνο.",
    tag: "Ζωντανά",
    iconName: "eye",
    route: "/(tabs)/passenger",
  },
  {
    id: "sample-2",
    title: "Κοντινά αξιοθέατα",
    description: "Δες τα σημεία ενδιαφέροντος δίπλα σου.",
    tag: "Αξιοθέατα",
    iconName: "binoculars",
    route: "/(tabs)/passenger/nearby-attractions",
  },
  {
    id: "sample-3",
    title: "Παραγγελία Ροφήματος",
    description: "Παράγγειλε ρόφημα πριν την επόμενη στάση.",
    tag: "Ρόφημα",
    iconName: "coffee",
    route: "/(tabs)/passenger/nearby-coffee-shops",
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
    [
      textColor,
      mutedTextColor,
      tintColor,
      borderColor,
      surfaceColor,
      surfaceMutedColor,
    ],
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
      <View style={styles.section}>
        <Text style={[styles.title, { color: textColor }]}>
          Καλωσόρισες στη Διαδρομή
        </Text>
        <View
          style={[cardStyles.titleUnderline, { backgroundColor: tintColor }]}
        />

        <Text
          style={[
            styles.sectionTitle,
            { color: mutedTextColor, textAlign: "center" },
          ]}
        >
          Επόμενη στάση:{" "}
          <Text style={[cardStyles.sectionEmphasis, { color: textColor }]}>
            Ακρόπολη σε 6 λεπτά
          </Text>
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
              <View style={cardStyles.iconSlot}>
                <MaterialCommunityIcons
                  name={card.iconName}
                  size={30}
                  color={textColor}
                />
              </View>
              <Text style={cardStyles.cardTitle}>{card.title}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)/passenger")}
          style={({ pressed }) => [
            cardStyles.primaryButton,
            pressed && cardStyles.primaryButtonPressed,
          ]}
        >
          <Text style={cardStyles.primaryButtonText}>Συνέχισε στο Κινητό</Text>
        </Pressable>
      </View>

      <View style={styles.svgBottom}>
        <AthensSVG width="100%" height="100%" />
      </View>
    </ScrollView>
  );
}

const createCardStyles = ({
  textColor,
  tintColor,
  borderColor,
  surfaceColor,
}: HomeCardStyleProps) =>
  StyleSheet.create({
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
    cardGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "space-between",
    },
    card: {
      flex: 1,
      minWidth: 120,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: surfaceColor,
      borderRadius: 18,
      borderWidth: 1,
      borderColor,
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 12,
    },
    cardPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.99 }],
    },
    iconSlot: {
      width: 64,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: textColor,
      textAlign: "center",
    },
    primaryButton: {
      alignSelf: "center",
      marginTop: 8,
      paddingHorizontal: 22,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: tintColor,
    },
    primaryButtonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    primaryButtonText: {
      fontSize: 15,
      fontWeight: "700",
      color: surfaceColor,
    },
  });
