import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Updated import
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [facing, setFacing] = useState('back'); // Updated camera facing logic
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission hook
  const [camera, setCamera] = useState(null);
  const navigation = useNavigation(); // Hook for navigation

  // Check for permission status
  if (!permission) {
    return <View />; // Permissions still loading
  }

  if (!permission.granted) {
    // Camera permissions not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Function to handle camera flipping
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // Function to capture a photo
  async function takePhoto() {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      console.log(photo.uri); // Photo URI for local storage reference
      const result = await uploadImage(photo);

      if (result) {
        // Navigate to ResultScreen with the API response
        navigation.navigate('ResultScreen', { result });
      }
    }
  }

  // Function to upload the image to an API
  async function uploadImage(photo) {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.1.43:5000/classification-image-model', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // API response data
        return responseData;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Image upload failed');
      return null;
    }
  }

  return (
    <View style={styles.container}>
      {/* Replacing Camera with CameraView */}
      <CameraView style={styles.camera} facing={facing} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          {/* Take Photo Button */}
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
          
          {/* Flip Camera Button */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '15%', // Adjust this to keep buttons above the navigation bar
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute buttons evenly
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 150, // Button width for consistency
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007260',
  },
});
