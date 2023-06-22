import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

const Map = () => {
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
      }
    } catch (error) {
      console.error("Erreur de géocodage :", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        key={
          markerCoordinates ? markerCoordinates.latitude.toString() : "default"
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

      {/* <TouchableOpacity onPress={handleGeocodeAddress}>
        <Text>Ajouter un marqueur</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = {
  container: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "#f6E",
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
};

export default Map;
