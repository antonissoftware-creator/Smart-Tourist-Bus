import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
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
  a1: require("../../../assets/images/Frame 1803-5.jpg"),
  a2: require("../../../assets/images/Frame 1803-6.jpg"),
  a3: require("../../../assets/images/Frame 1803-8.jpg"),
  a4: require("../../../assets/images/Frame 1803-7.jpg"),
  a5: require("../../../assets/images/Frame 1803-9.jpg"),
} as const;

const assetUri = (source: number) => Asset.fromModule(source).uri;

const PLACES: PlaceCardItem[] = [
  {
    type: "place",
    id: "a1",
    title: "Ακρόπολη",
    imageUrl: assetUri(PLACE_IMAGES.a1),
    metaLeft: "300 μέτρα",
    metaRight: "50 λεπτά",
  },
  {
    type: "place",
    id: "a2",
    title: "Παρθενώνας",
    imageUrl: assetUri(PLACE_IMAGES.a2),
    metaLeft: "310 μέτρα",
    metaRight: "55 λεπτά",
  },
  {
    type: "place",
    id: "a3",
    title: "Αρχαία Αγορά",
    imageUrl: assetUri(PLACE_IMAGES.a3),
    metaLeft: "1.1 χλμ",
    metaRight: "18 λεπτά",
  },
  {
    type: "place",
    id: "a4",
    title: "Ναός του Διός",
    imageUrl: assetUri(PLACE_IMAGES.a4),
    metaLeft: "1.3 χλμ",
    metaRight: "20 λεπτά",
  },
  {
    type: "place",
    id: "a5",
    title: "Πλατεία Συντάγματος",
    imageUrl: assetUri(PLACE_IMAGES.a5),
    metaLeft: "1.6 χλμ",
    metaRight: "24 λεπτά",
  },
];

const MAP_MARKERS: MapMarker[] = [
  { id: "a1", title: "Ακρόπολη", latitude: 37.9681, longitude: 23.7283 },
  { id: "a2", title: "Παρθενώνας", latitude: 37.9715, longitude: 23.7267 },
  { id: "a3", title: "Αρχαία Αγορά", latitude: 37.9754, longitude: 23.7219 },
  { id: "a4", title: "Ναός του Διός", latitude: 37.9696, longitude: 23.7332 },
  {
    id: "a5",
    title: "Πλατεία Συντάγματος",
    latitude: 37.9759,
    longitude: 23.7349,
  },
];

export default function PassengerNearbyAttractions() {
  const { width } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");

  const isWide = width >= 900;
  const cardWidth = Math.min(280, width * 0.72);
  const actionBarOffset = 90;

  const actionBar = (
    <View
      style={[
        localStyles.actionBar,
        { backgroundColor: textColor, borderColor: tintColor },
      ]}
    >
      {[
        {
          id: "audio",
          label: "Άκου την ξενάγηση",
          icon: "volume-high-outline",
        },
        {
          id: "read",
          label: "Διάβασε Περισσότερα",
          icon: "book-outline",
        },
        {
          id: "save",
          label: "Αποθήκευση για μετά",
          icon: "star-outline",
        },
      ].map((action, index) => (
        <Pressable
          key={action.id}
          accessibilityRole="button"
          style={({ pressed }) => [
            localStyles.actionItem,
            pressed && localStyles.actionItemPressed,
            index !== 0 && [
              localStyles.actionItemDivider,
              { borderLeftColor: tintColor },
            ],
          ]}
        >
          <Ionicons
            name={action.icon as keyof typeof Ionicons.glyphMap}
            size={18}
            color={backgroundColor}
          />
          <Text style={[localStyles.actionText, { color: backgroundColor }]}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[localStyles.safe, { backgroundColor }]}>
      {isWide ? (
        <View style={localStyles.flex}>
          <View style={localStyles.containerFill}>
            <View style={[localStyles.contentRow, localStyles.contentRowWide]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  localStyles.placesColumn,
                  localStyles.placesColumnWide,
                  { paddingBottom: actionBarOffset },
                ]}
              >
                {PLACES.map((place) => (
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
                      <View style={localStyles.metaRow}>
                        <Text
                          style={[
                            localStyles.metaText,
                            { color: mutedTextColor },
                          ]}
                        >
                          {place.metaLeft}
                        </Text>
                        <Text
                          style={[localStyles.metaDot, { color: tintColor }]}
                        >
                          •
                        </Text>
                        <Text
                          style={[
                            localStyles.metaText,
                            { color: mutedTextColor },
                          ]}
                        >
                          {place.metaRight}
                        </Text>
                      </View>
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
          <View style={localStyles.actionBarFixed}>{actionBar}</View>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={[
              localStyles.container,
              { paddingBottom: actionBarOffset },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[localStyles.contentRow, localStyles.contentRowNarrow]}
            >
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
                {PLACES.map((place) => (
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
                      <View style={localStyles.metaRow}>
                        <Text
                          style={[
                            localStyles.metaText,
                            { color: mutedTextColor },
                          ]}
                        >
                          {place.metaLeft}
                        </Text>
                        <Text
                          style={[localStyles.metaDot, { color: tintColor }]}
                        >
                          •
                        </Text>
                        <Text
                          style={[
                            localStyles.metaText,
                            { color: mutedTextColor },
                          ]}
                        >
                          {place.metaRight}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
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
  metaRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  metaText: { fontSize: 12, fontWeight: "600" },
  metaDot: { fontSize: 12, fontWeight: "900" },
  horizontalCards: { gap: 14, paddingRight: 12 },
  actionBarFixed: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10,
  },
  actionItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionItemPressed: { opacity: 0.85 },
  actionItemDivider: {
    borderLeftWidth: 1,
    borderLeftColor: "transparent",
  },
  actionText: { fontSize: 12, fontWeight: "700", textAlign: "center" },
});
