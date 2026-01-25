import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export default function PassengerIndex() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const videoSource = require("../../../assets/videos/Bus.mp4");
  const player = useVideoPlayer(videoSource, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });
  useEffect(() => {
    player.loop = true;
    player.play();
  }, [player]);

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
});
