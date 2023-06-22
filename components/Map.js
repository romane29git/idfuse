import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

const App = () => {
  const mapRef = useRef(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 48.856,
    longitude: 2.352,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (markerCoordinates) {
      setInitialRegion({
        ...markerCoordinates,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    console.log("adresse : ", initialRegion);
  }, [markerCoordinates]);

  const handleGeocodeAddress = async () => {
    try {
      const address = "Bordeaux";

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newMarkerCoordinates = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };

        setMarkerCoordinates(newMarkerCoordinates);
        setInitialRegion({
          ...newMarkerCoordinates,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.error("Erreur de géocodage :", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          key={
            markerCoordinates
              ? markerCoordinates.latitude.toString()
              : "default"
          }
        >
          {markerCoordinates && (
            <Marker coordinate={markerCoordinates} title="Adresse" />
          )}
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />
        </MapView>
      </View>

      <TouchableOpacity onPress={handleGeocodeAddress}>
        <Text>Ajouter un marqueur</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: 350,
    height: 350,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  map: {
    width: 350,
    height: 350,
  },
};

export default App;
