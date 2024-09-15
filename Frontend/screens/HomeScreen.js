import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
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

  // Function to capture a photo and send it to the API
  async function takePhoto() {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      console.log(photo.uri); // Photo URI for local storage reference
      await uploadImage(photo);
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
  
      const response = await fetch('http://10.0.0.90:5000/upload', { // Use your local IP address here
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        Alert.alert('Success', 'Image uploaded successfully');
        console.log(responseData); // API response data
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Image upload failed');
    }
  }
  
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          {/* Take Photo Button */}
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
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
  flipButton: {
    marginLeft: 20, // Adjust margin between buttons if needed
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007260',
  },
});
