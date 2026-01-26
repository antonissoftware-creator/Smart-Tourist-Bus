import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import AttractionsMap from "@/components/AttractionsMap";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { PlaceCardItem } from "@/types/cards";
import type { MapMarker, MapRegion } from "@/types/map";

const MAP_REGION: MapRegion = {
  latitude: 37.9755,
  longitude: 23.7348,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

const PLACE_IMAGES = {
  c1: require("../../../assets/images/Frame 1803-4.jpg"),
  c2: require("../../../assets/images/Frame 1803-2.jpg"),
  c3: require("../../../assets/images/melano.jpg"),
  c4: require("../../../assets/images/tailor.jpg"),
  c5: require("../../../assets/images/coffe-island.jpg"),
} as const;

const assetUri = (source: number) => Asset.fromModule(source).uri;

const PLACES: PlaceCardItem[] = [
  {
    type: "place",
    id: "c1",
    title: "Starbucks",
    imageUrl: assetUri(PLACE_IMAGES.c1),
    metaLeft: "Μοναστηράκι",
  },
  {
    type: "place",
    id: "c2",
    title: "Mikel",
    imageUrl: assetUri(PLACE_IMAGES.c2),
    metaLeft: "Θησείο",
  },
  {
    type: "place",
    id: "c3",
    title: "Caffé Melano",
    imageUrl: assetUri(PLACE_IMAGES.c3),
    metaLeft: "Πλάκα",
  },
  {
    type: "place",
    id: "c4",
    title: "Tailor Made",
    imageUrl: assetUri(PLACE_IMAGES.c4),
    metaLeft: "Σύνταγμα",
  },
  {
    type: "place",
    id: "c5",
    title: "Coffee Island",
    imageUrl: assetUri(PLACE_IMAGES.c5),
    metaLeft: "Ομόνοια",
  },
];

const MAP_MARKERS: MapMarker[] = [
  { id: "c1", title: "Starbucks", latitude: 37.976, longitude: 23.7256 },
  { id: "c2", title: "Mikel", latitude: 37.9746, longitude: 23.7239 },
  { id: "c3", title: "Caffé Melano", latitude: 37.9728, longitude: 23.7323 },
  { id: "c4", title: "Tailor Made", latitude: 37.9767, longitude: 23.7351 },
  { id: "c5", title: "Coffee Island", latitude: 37.9841, longitude: 23.7278 },
];

export default function PassengerNearbyCoffeeShops() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");

  const isWide = width >= 900;
  const cardWidth = Math.min(280, width * 0.72);
  const places = PLACES.map((place) => ({
    ...place,
    onPress: () =>
      router.push({
        pathname: "/(tabs)/passenger/cafe-orders",
        params: { shop: place.title },
      }),
  }));

  return (
    <SafeAreaView style={[localStyles.safe, { backgroundColor }]}>
      {isWide ? (
        <View style={localStyles.containerFill}>
          <View style={[localStyles.contentRow, localStyles.contentRowWide]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                localStyles.placesColumn,
                localStyles.placesColumnWide,
              ]}
            >
              {places.map((place) => (
                <Pressable
                  key={place.id}
                  onPress={place.onPress}
                  style={({ pressed }) => [
                    localStyles.placeCard,
                    { borderColor, backgroundColor: surfaceColor },
                    pressed && localStyles.placeCardPressed,
                  ]}
                >
                  <Image
                    source={{ uri: place.imageUrl }}
                    style={localStyles.placeImage}
                  />
                  <View style={localStyles.placeBody}>
                    <Text
                      style={[localStyles.placeTitle, { color: textColor }]}
                    >
                      {place.title}
                    </Text>
                    {place.metaLeft ? (
                      <Text
                        style={[
                          localStyles.metaText,
                          { color: mutedTextColor },
                        ]}
                      >
                        {place.metaLeft}
                      </Text>
                    ) : null}
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            <View
              style={[
                localStyles.mapCard,
                localStyles.mapCardWide,
                { borderColor, backgroundColor: surfaceColor },
              ]}
            >
              <AttractionsMap
                region={MAP_REGION}
                markers={MAP_MARKERS}
                tintColor={tintColor}
              />
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={localStyles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={[localStyles.contentRow, localStyles.contentRowNarrow]}>
            <View
              style={[
                localStyles.mapCard,
                localStyles.mapCardTall,
                { borderColor, backgroundColor: surfaceColor },
              ]}
            >
              <AttractionsMap
                region={MAP_REGION}
                markers={MAP_MARKERS}
                tintColor={tintColor}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={localStyles.horizontalCards}
            >
              {places.map((place) => (
                <Pressable
                  key={place.id}
                  onPress={place.onPress}
                  style={({ pressed }) => [
                    localStyles.placeCard,
                    {
                      borderColor,
                      backgroundColor: surfaceColor,
                      width: cardWidth,
                    },
                    pressed && localStyles.placeCardPressed,
                  ]}
                >
                  <Image
                    source={{ uri: place.imageUrl }}
                    style={localStyles.placeImage}
                  />
                  <View style={localStyles.placeBody}>
                    <Text
                      style={[localStyles.placeTitle, { color: textColor }]}
                    >
                      {place.title}
                    </Text>
                    {place.metaLeft ? (
                      <Text
                        style={[
                          localStyles.metaText,
                          { color: mutedTextColor },
                        ]}
                      >
                        {place.metaLeft}
                      </Text>
                    ) : null}
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 18, paddingBottom: 24 },
  containerFill: { flex: 1, padding: 18, paddingBottom: 24 },
  contentRow: { gap: 18, flex: 1 },
  contentRowWide: { flexDirection: "row", alignItems: "stretch" },
  contentRowNarrow: { flexDirection: "column" },
  placesColumn: { gap: 16 },
  placesColumnWide: { flex: 1, minWidth: 320 },
  mapCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  mapCardTall: { height: 400 },
  mapCardWide: { flex: 1, minHeight: 160, alignSelf: "stretch" },
  placeCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  placeCardPressed: { opacity: 0.9 },
  placeImage: { width: "100%", height: 130 },
  placeBody: { paddingHorizontal: 12, paddingVertical: 10, gap: 6 },
  placeTitle: { fontSize: 16, fontWeight: "700", textAlign: "center" },
  metaText: { fontSize: 12, fontWeight: "600", textAlign: "center" },
  horizontalCards: { gap: 14, paddingRight: 12 },
});
