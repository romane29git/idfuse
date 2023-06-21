import React, { useRef } from "react";
import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

const App = () => {
  const mapRef = useRef(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  const handleGeocodeAddress = async () => {
    try {
      const address = "Grenoble";

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMarkerCoordinates({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      }
    } catch (error) {
      console.error("Erreur de géocodage :", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 45.78825,
          longitude: 5.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markerCoordinates && (
          <Marker coordinate={markerCoordinates} title="Adresse" />
        )}
      </MapView>
      <TouchableOpacity onPress={handleGeocodeAddress}>
        <Text>Ajouter un marqueur</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  zoomButtonsContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "column",
  },
  zoomButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
};

export default App;
