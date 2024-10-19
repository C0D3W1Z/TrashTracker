import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params; // Get the result from navigation params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <Text style={styles.result}>Predicted Class: {result.predicted_class}</Text>
      <Text style={styles.result}>Decomposition Time: {result.decomposition_time}</Text>
      <Text style={styles.result}>Environmental Harm: {result.environmental_harm}</Text>
      <Text style={styles.result}>Resource Use: {result.resource_use}</Text>
      <Text style={styles.result}>Recycling Potential: {result.recycling_potential}</Text>
      <Text style={styles.result}>Impact on Wildlife: {result.wildlife_impact}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapsScreen', { result })} // Pass the result to MapScreen
      >
        <Text style={styles.buttonText}>Continue</Text>
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
