import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

import type { AttractionsMapProps } from "@/types/map";

export default function AttractionsMap({ region, markers, tintColor }: AttractionsMapProps) {
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={region}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            pinColor={tintColor}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
