import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import COLORS from '../constants/colors';
import * as Location from 'expo-location'; // Ensure this is installed if using Expo

const GOOGLE_MAPS_API_KEY = 'AIzaSyDVGkRz8nGKVUXAiinmaRdSIPKhjXVzRqk'; // Replace with your API key

const disposalKeywords = {
  cardboard: 'cardboard recycling',
  glass: 'glass recycling',
  metal: 'metal recycling',
  paper: 'paper recycling',
  plastic: 'plastic recycling',
  trash: 'trash disposal',
};

export default function MapScreen({ route, navigation }) {
  const { result } = route.params; 
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission not granted');
        return;
      }

      // Get user's current location
      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Fetch disposal locations based on predicted class
      const keyword = disposalKeywords[result.predicted_class.toLowerCase()] || 'recycling'; // Default to 'recycling' if class not found
      fetchDisposalLocations(keyword, latitude, longitude);
    };

    fetchLocation();
  }, [result]);

  const fetchDisposalLocations = async (keyword, latitude, longitude) => {
    try {
      console.log(`Searching for ${keyword} at lat: ${latitude}, lng: ${longitude}`); // Debugging log
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
        params: {
          location: `${latitude},${longitude}`,
          radius: 50000, // Increased radius
          keyword: keyword,
          key: GOOGLE_MAPS_API_KEY,
        },
      });
  
      // Debugging logs
      console.log('API Response:', response.data);
      if (response.data.results.length === 0) {
        console.log('No recycling facilities found for keyword:', keyword);
        return; // No results found, exit the function
      }
  
      // Map results to markers
      const places = response.data.results.map(place => ({
        id: place.place_id,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        title: place.name,
      }));
      setMarkers(places);
    } catch (error) {
      console.error('Error fetching disposal locations', error);
      setErrorMsg('Error fetching locations. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      
      {region && (
        <MapView
          style={styles.map}
          region={region}
        >
          {/* Show user's location */}
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title="Your Location"
            pinColor="blue" // You can customize this color
          />
          {/* Show recycling facility markers */}
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
            />
          ))}
        </MapView>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")} // Ensure "Home" is registered in your navigator
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '80%', // Adjust height as needed
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 150,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
