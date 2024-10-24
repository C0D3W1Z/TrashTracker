// screens/ResultScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import { collection, addDoc, doc, updateDoc, increment } from "firebase/firestore";
import { auth } from '../firebase';
import { db } from '../firebase';

async function incrementTrashCount() {
  try {
    const docRef = doc(db, "users", "1");
    await updateDoc(docRef, {
      trash: increment(1)
    });
  } catch (e) {
    console.error("Error incrementing document: ", e);
  }
}

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params;
  incrementTrashCount();

  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).trim();
  const formatDecompositionTime = (time) => `${String(time).trim()} Years`;
  const formatScale = (value) => `${parseFloat(value)} on a scale of 10`.trim();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>

      {/* Add Box Around Each Result */}
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Predicted Class:</Text>
        <Text style={styles.resultValue}>{capitalizeFirstLetter(result.predicted_class)}</Text>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Decomposition Time:</Text>
        <Text style={styles.resultValue}>{formatDecompositionTime(result.decomposition_time)}</Text>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Environmental Harm:</Text>
        <Text style={styles.resultValue}>{formatScale(result.environmental_harm)}</Text>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Resource Use:</Text>
        <Text style={styles.resultValue}>{formatScale(result.resource_use)}</Text>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Recycling Potential:</Text>
        <Text style={styles.resultValue}>{formatScale(result.recycling_potential)}</Text>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Impact on Wildlife:</Text>
        <Text style={styles.resultValue}>{formatScale(result.wildlife_impact)}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlanScreen', { result })}
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
    padding: 10,  // Reduced padding to create more space
    backgroundColor: COLORS.lightGray,
  },
  title: {
    fontSize: 24,  // Reduced font size
    fontWeight: 'bold',
    marginBottom: 50,  // Reduced margin bottom
    color: COLORS.primary,
  },
  resultBox: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,  // Slightly smaller border radius
    padding: 15,  // Reduced padding inside each box
    marginBottom: 10,  // Reduced space between each result box
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,  // Reduced shadow
    shadowRadius: 2,  // Reduced shadow radius
    elevation: 3,  // Lower elevation for less shadow
    width: 350,
    marginHorizontal: 100
  },
  resultTitle: {
    fontSize: 14,  // Reduced font size for titles
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 3,  // Reduced space between title and value
  },
  resultValue: {
    fontSize: 16,  // Reduced font size for values
    color: COLORS.darkGray,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,  // Reduced padding for the button
    borderRadius: 8,
    alignItems: 'center',
    width: 150,
    marginTop: 50,  // Reduced space between the last result and the button
  },
  buttonText: {
    fontSize: 16,  // Slightly reduced font size for button text
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
