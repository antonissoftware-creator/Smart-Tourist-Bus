import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";

import AttractionsMap from "@/components/AttractionsMap";
import { PlaceCardsRow } from "@/components/DynamicCardsScreen";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { PlaceCardItem } from "@/types/cards";
import type { MapMarker, MapRegion } from "@/types/map";

const MAP_REGION: MapRegion = {
  latitude: 37.9755,
  longitude: 23.7348,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

const PLACES: PlaceCardItem[] = [
  {
    type: "place",
    id: "a1",
    title: "Acropolis Museum",
    imageUrl:
      "https://images.unsplash.com/photo-1544776523-8bdb5f6f1e3a?auto=format&fit=crop&w=1200&q=80",
    metaLeft: "350 m",
    metaRight: "6 min",
  },
  {
    type: "place",
    id: "a2",
    title: "Plaka District",
    imageUrl:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=80",
    metaLeft: "900 m",
    metaRight: "14 min",
  },
  {
    type: "place",
    id: "a3",
    title: "Ancient Agora",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    metaLeft: "1.1 km",
    metaRight: "18 min",
  },
  {
    type: "place",
    id: "a4",
    title: "Temple of Zeus",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    metaLeft: "1.3 km",
    metaRight: "20 min",
  },
  {
    type: "place",
    id: "a5",
    title: "Syntagma Square",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    metaLeft: "1.6 km",
    metaRight: "24 min",
  },
];

const MAP_MARKERS: MapMarker[] = [
  { id: "a1", title: "Acropolis Museum", latitude: 37.9681, longitude: 23.7283 },
  { id: "a2", title: "Plaka District", latitude: 37.9737, longitude: 23.7304 },
  { id: "a3", title: "Ancient Agora", latitude: 37.9754, longitude: 23.7219 },
  { id: "a4", title: "Temple of Zeus", latitude: 37.9696, longitude: 23.7332 },
  { id: "a5", title: "Syntagma Square", latitude: 37.9759, longitude: 23.7349 },
];

export default function PassengerNearbyAttractions() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");

  return (
    <SafeAreaView style={[localStyles.safe, { backgroundColor }]}>
      <ScrollView contentContainerStyle={localStyles.container} showsVerticalScrollIndicator={false}>
        <Text style={[localStyles.title, { color: textColor }]}>Nearby Attractions</Text>
        <Text style={[localStyles.subtitle, { color: mutedTextColor }]}>
          Explore what's around your stop and tap a card to learn more.
        </Text>

        <View style={[localStyles.mapCard, { borderColor, backgroundColor: surfaceColor }]}>
          <AttractionsMap region={MAP_REGION} markers={MAP_MARKERS} tintColor={tintColor} />
        </View>

        <Text style={[localStyles.sectionTitle, { color: textColor }]}>Top 5 places</Text>
        <PlaceCardsRow places={PLACES} layout="vertical" fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 18, paddingBottom: 28 },
  title: { fontSize: 20, fontWeight: "800" },
  subtitle: { marginTop: 6, fontSize: 13, fontWeight: "600" },
  mapCard: {
    marginTop: 18,
    height: 240,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  sectionTitle: { marginTop: 18, marginBottom: 12, fontSize: 16, fontWeight: "800" },
});
