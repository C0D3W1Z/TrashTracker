import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors'

export default function ResultScreen({ route, navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  result: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 150, // Button width for consistency
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
