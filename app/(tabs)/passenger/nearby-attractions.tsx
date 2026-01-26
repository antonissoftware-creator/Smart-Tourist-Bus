import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  Modal,
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

const TOUR_SOUND = require("../../../assets/sounds/tour.mp3");

const assetUri = (source: number) => Asset.fromModule(source).uri;

const TOUR_COPY = `Welcome to Athens, one of the oldest cities in the world and still very much alive.
Today, you’ll travel through 3,000 years of history, modern city life, political drama, philosophy, and coffee breaks that last longer than planned.

Feel free to hop off whenever something catches your eye, and hop back on when your feet need mercy.

Let’s begin.

Coming up on your left is the Acropolis, the sacred rock of Athens.

Sitting proudly on top is the Parthenon, built in the 5th century BC and dedicated to Athena, the goddess of wisdom and protector of the city.
This is not just a ruin. It was once a temple, a church, a mosque, and even a gunpowder storage. History here never stood still.

If you hop off here, take your time. Look up, look around, and imagine the city without cars, without noise, just marble, sun, and ideas that shaped the world.

Next stop, the Ancient Agora.

This was the heart of ancient Athenian life. Markets, politics, philosophy, and gossip all happened here.
Socrates walked these grounds, probably asking uncomfortable questions to people who just wanted to buy olives.

Today, you can still see temples, stoas, and the remarkably preserved Temple of Hephaestus.
If you want to understand how democracy was born, this is the place to hop off.

On your right, the Temple of Olympian Zeus.

Once one of the largest temples in the ancient world, it took nearly 700 years to complete.
Only a few columns remain, but they are enough to remind you how seriously the ancient Greeks took their gods, especially the king of them all.

Fun fact, when it was finished, Zeus was already slightly out of fashion. Even gods are not safe from trends.

Welcome to Syntagma Square, the political and modern heart of Athens.

Here you’ll see the Greek Parliament and, if timing is right, the famous Evzones guards performing the changing of the guard.
Their uniforms may look ceremonial, but this is a symbol of national pride and discipline.

Around you are shops, cafés, and streets that never really sleep.
If you hop off here, it’s a great place for people watching, shopping, or a strong Greek coffee.

As you continue your journey, remember that Athens is not just a city you visit.
It’s a city you experience slowly, between ancient stones and modern chaos.

Stay curious, stay hydrated, and don’t forget, the next bus is always on the way.

Enjoy Athens.`;

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const audioRef = useRef<Audio.Sound | null>(null);
  const tourParagraphs = useMemo(() => TOUR_COPY.split("\n\n"), []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.unloadAsync();
      }
    };
  }, []);

  const handleStartTour = async () => {
    if (isLoadingAudio || isPlaying) {
      return;
    }
    setIsLoadingAudio(true);
    try {
      let sound = audioRef.current;
      if (!sound) {
        const { sound: createdSound } =
          await Audio.Sound.createAsync(TOUR_SOUND);
        createdSound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) {
            return;
          }
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        audioRef.current = createdSound;
        sound = createdSound;
      }
      await sound.playAsync();
      setIsPlaying(true);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handleStopTour = async () => {
    if (isLoadingAudio || !audioRef.current) {
      return;
    }
    setIsLoadingAudio(true);
    try {
      await audioRef.current.stopAsync();
      await audioRef.current.setPositionAsync(0);
      setIsPlaying(false);
    } finally {
      setIsLoadingAudio(false);
    }
  };

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
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isPlaying || isLoadingAudio }}
        onPress={handleStartTour}
        style={({ pressed }) => [
          localStyles.actionItem,
          pressed && localStyles.actionItemPressed,
          (isPlaying || isLoadingAudio) && localStyles.actionItemDisabled,
        ]}
      >
        <Ionicons name="play-outline" size={18} color={backgroundColor} />
        <Text style={[localStyles.actionText, { color: backgroundColor }]}>
          Έναρξη
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !isPlaying || isLoadingAudio }}
        onPress={handleStopTour}
        style={({ pressed }) => [
          localStyles.actionItem,
          pressed && localStyles.actionItemPressed,
          localStyles.actionItemDivider,
          { borderLeftColor: tintColor },
          (!isPlaying || isLoadingAudio) && localStyles.actionItemDisabled,
        ]}
      >
        <Ionicons name="stop-outline" size={18} color={backgroundColor} />
        <Text style={[localStyles.actionText, { color: backgroundColor }]}>
          Στοπ
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          localStyles.actionItem,
          pressed && localStyles.actionItemPressed,
          localStyles.actionItemDivider,
          { borderLeftColor: tintColor },
        ]}
        onPress={() => setIsReadMoreOpen(true)}
      >
        <Ionicons name="book-outline" size={18} color={backgroundColor} />
        <Text style={[localStyles.actionText, { color: backgroundColor }]}>
          Διάβασε Περισσότερα
        </Text>
      </Pressable>
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
      <Modal
        visible={isReadMoreOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsReadMoreOpen(false)}
      >
        <View style={localStyles.modalBackdrop}>
          <View
            style={[localStyles.modalShade, { backgroundColor: textColor }]}
          />
          <View
            style={[
              localStyles.modalCard,
              { backgroundColor: surfaceColor, borderColor },
            ]}
          >
            <View style={localStyles.modalHeader}>
              <Text style={[localStyles.modalTitle, { color: textColor }]}>
                Διάβασε Περισσότερα
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsReadMoreOpen(false)}
                style={({ pressed }) => [
                  localStyles.modalClose,
                  pressed && localStyles.modalClosePressed,
                ]}
              >
                <Ionicons name="close" size={20} color={textColor} />
              </Pressable>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={localStyles.modalBody}
            >
              {tourParagraphs.map((paragraph, index) => (
                <Text
                  key={`tour-${index}`}
                  style={[localStyles.modalText, { color: mutedTextColor }]}
                >
                  {paragraph}
                </Text>
              ))}
            </ScrollView>
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsReadMoreOpen(false)}
              style={({ pressed }) => [
                localStyles.modalCta,
                { backgroundColor: tintColor },
                pressed && localStyles.modalCtaPressed,
              ]}
            >
              <Text
                style={[localStyles.modalCtaText, { color: backgroundColor }]}
              >
                Κλείσιμο
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  container: { padding: 18, paddingBottom: 74 },
  containerFill: { flex: 1, padding: 18, paddingBottom: 74 },
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
  actionItemDisabled: { opacity: 0.5 },
  actionItemDivider: {
    borderLeftWidth: 1,
    borderLeftColor: "transparent",
  },
  actionText: { fontSize: 12, fontWeight: "700", textAlign: "center" },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 18,
  },
  modalShade: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.55,
  },
  modalCard: {
    borderRadius: 20,
    borderWidth: 1,
    maxHeight: "85%",
    padding: 16,
    gap: 12,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  modalTitle: { fontSize: 16, fontWeight: "700" },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalClosePressed: { opacity: 0.7 },
  modalBody: { gap: 12, paddingBottom: 6 },
  modalText: { fontSize: 13, fontWeight: "500", lineHeight: 20 },
  modalCta: {
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  modalCtaPressed: { opacity: 0.85 },
  modalCtaText: { fontSize: 13, fontWeight: "700" },
});
