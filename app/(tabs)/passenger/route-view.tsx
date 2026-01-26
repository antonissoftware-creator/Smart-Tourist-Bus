import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import AttractionsMap from "@/components/AttractionsMap";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { MapMarker, MapRegion } from "@/types/map";

const CURRENT_LOCATION = {
  latitude: 37.9756,
  longitude: 23.7351,
};

const BUS_STOP = {
  latitude: 37.9769,
  longitude: 23.7368,
};

const MAP_REGION: MapRegion = {
  latitude: 37.9762,
  longitude: 23.736,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const MAP_MARKERS: MapMarker[] = [
  {
    id: "you",
    title: "Η τοποθεσία σου",
    latitude: CURRENT_LOCATION.latitude,
    longitude: CURRENT_LOCATION.longitude,
  },
  {
    id: "stop",
    title: "Πλησιέστερη στάση",
    latitude: BUS_STOP.latitude,
    longitude: BUS_STOP.longitude,
  },
];

export default function PassengerIndex() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const surfaceColor = useThemeColor({}, "surface");
  const { width } = useWindowDimensions();
  const isMobile = width < 430;
  const videoSource = require("../../../assets/videos/Bus.mp4");
  const player = useVideoPlayer(videoSource, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });
  useEffect(() => {
    player.loop = true;
    player.play();
  }, [player]);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${CURRENT_LOCATION.latitude},${CURRENT_LOCATION.longitude}&destination=${BUS_STOP.latitude},${BUS_STOP.longitude}&travelmode=walking`;

  const handleOpenDirections = () => {
    Linking.openURL(directionsUrl);
  };

  if (!isMobile) {
    return (
      <View style={[localStyles.root, { backgroundColor }]}>
        <VideoView
          player={player}
          style={localStyles.video}
          contentFit="cover"
          nativeControls={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={[localStyles.root, { backgroundColor }]}>
      <View style={localStyles.mobileContainer}>
        <View
          style={[
            localStyles.mapCard,
            { borderColor, backgroundColor: surfaceColor },
          ]}
        >
          <AttractionsMap
            region={MAP_REGION}
            markers={MAP_MARKERS}
            tintColor={tintColor}
          />
        </View>
        <View
          style={[
            localStyles.infoCard,
            { borderColor, backgroundColor: surfaceColor },
          ]}
        >
          <View style={localStyles.infoRow}>
            <Text style={[localStyles.infoLabel, { color: mutedTextColor }]}>
              Η τοποθεσία σου
            </Text>
            <Text style={[localStyles.infoValue, { color: textColor }]}>
              {CURRENT_LOCATION.latitude.toFixed(4)},{" "}
              {CURRENT_LOCATION.longitude.toFixed(4)}
            </Text>
          </View>
          <View style={localStyles.infoRow}>
            <Text style={[localStyles.infoLabel, { color: mutedTextColor }]}>
              Πλησιέστερη στάση
            </Text>
            <Text style={[localStyles.infoValue, { color: textColor }]}>
              {BUS_STOP.latitude.toFixed(4)}, {BUS_STOP.longitude.toFixed(4)}
            </Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={handleOpenDirections}
          style={({ pressed }) => [
            localStyles.directionsButton,
            { backgroundColor: tintColor },
            pressed && localStyles.directionsButtonPressed,
          ]}
        >
          <Text
            style={[
              localStyles.directionsButtonText,
              { color: backgroundColor },
            ]}
          >
            Οδηγίες στο Google Maps
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: "transparent",
  },
  mobileContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 18,
    gap: 14,
  },
  mapCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
  },
  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
  },
  directionsButton: {
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  directionsButtonPressed: {
    opacity: 0.85,
  },
  directionsButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
