import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import type { AttractionsMapProps } from "@/types/map";

const buildHtml = (latitude: number, longitude: number, markersJson: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
      html, body, #map { height: 100%; width: 100%; margin: 0; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const map = L.map("map").setView([${latitude}, ${longitude}], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);
      const markers = ${markersJson};
      markers.forEach((marker) => {
        L.marker([marker.latitude, marker.longitude]).addTo(map).bindPopup(marker.title);
      });
      const resizeMap = () => map.invalidateSize();
      window.addEventListener("load", () => setTimeout(resizeMap, 0));
      window.addEventListener("resize", resizeMap);
      setTimeout(resizeMap, 200);
    </script>
  </body>
</html>`;

const Iframe = "iframe" as unknown as React.ElementType;

export default function AttractionsMap({ region, markers }: AttractionsMapProps) {
  const markersJson = useMemo(() => JSON.stringify(markers), [markers]);
  const mapHtml = useMemo(
    () => buildHtml(region.latitude, region.longitude, markersJson),
    [region.latitude, region.longitude, markersJson]
  );

  return (
    <View style={styles.container}>
      <Iframe
        title="Nearby attractions map"
        srcDoc={mapHtml}
        style={styles.iframe as unknown as React.CSSProperties}
        sandbox="allow-scripts allow-same-origin"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "stretch" },
  iframe: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
    display: "block",
  },
});
