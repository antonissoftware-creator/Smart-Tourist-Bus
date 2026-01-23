export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type MapMarker = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
};

export type AttractionsMapProps = {
  region: MapRegion;
  markers: MapMarker[];
  tintColor: string;
};
