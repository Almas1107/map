import { StyleSheet } from "react-native";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TabOneScreen() {
 
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    Location.getCurrentPositionAsync({}).then((location) => {
      setLocation(location);
    });
  }, []);

  if (!status || !status.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          You don't have enabled location permission please enable
        </Text>
        <Button title="Grant location access" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {location && (
        <>
          <Text style={styles.title}>
            Longitude: {location.coords.longitude}
          </Text>
          <Text style={styles.title}>Latitude: {location.coords.latitude}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
