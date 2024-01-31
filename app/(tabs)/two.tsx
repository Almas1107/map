import { Button, StyleSheet, Text, View, Image } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function TabTwoScreen() {
  const options = {
    method: "GET",
    url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
    params: {
      radius: "500",
      lon: "38.364285",
      lat: "59.855685",
      kinds: "interesting_places",
    },
    headers: {
      "X-RapidAPI-Key": "fda9945fc6msh3d38c07c56e6013p18429ajsn21c639670159",
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<any>(null);
  const [datas, setDatas] = useState<any>(null);

  const DataHandler = async () => {
    try {
      const response = await axios.request(options);
      setDatas(response.data.features);
    } catch (error) {
      console.error(error);
    }
  };
  // const [status, requestPermission] = Location.useBackgroundPermissions();
  useEffect(() => {
    Location.getCurrentPositionAsync({}).then((location) => {
      console.log("location", location);
      setLocation(location);
    });
    DataHandler();
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
      {location && (
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          zoomEnabled
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Me"}
            description={"My position"}
          />
          {datas.map(({ place }: any) => {
            <Marker
              key={place.properties.xid}
              coordinate={{
                latitude: place.geometry.coordinates[1],
                longitude: place.geometry.coordinates[0],
              }}
              title={place.properties.name}
            />;
          })}
        </MapView>
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
