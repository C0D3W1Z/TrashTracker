import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Text } from 'react-native'; // Import Text component
import Markdown from 'react-native-markdown-display';
import COLORS from '../constants/colors';

// The API key - In production, this should be stored securely
const GEMINI_API_KEY = 'ENTER_YOUR_KEY';

export default function PlanScreen({ route, navigation }) {
  const { result } = route.params; // Get the result data from navigation params
  const [plan, setPlan] = useState(null); // State to store the plan from Gemini AI
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to make the request to Gemini AI
    async function fetchPlan() {
      try {
        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: `Generate a plan based on the following data:
                  Decomposition Time: ${result.decomposition_time},
                  Environmental Harm: ${result.environmental_harm},
                  Resource Use: ${result.resource_use},
                  Recycling Potential: ${result.recycling_potential},
                  Impact on Wildlife: ${result.wildlife_impact}
                  Keep the response short, in this app the user takes a photo of trash, it categorizes, and now your task is to create a plan on how to properly dispose it and the next steps.`,
                },
              ],
            },
          ],
        };
    
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json(); // Parse the response
        console.log("Full API Response:", JSON.stringify(data, null, 2)); // Log the full response to inspect it
    
        const candidate = data?.candidates?.[0];
        if (candidate) {
          console.log("Candidate Object:", JSON.stringify(candidate, null, 2)); // Print out the candidate object to understand its structure
    
          // Extract text from the candidate's content object
          const contentParts = candidate?.content?.parts || [];
          const generatedPlan = contentParts.map(part => part.text).join(' '); // Join the text parts
    
          setPlan(generatedPlan); // Update state with the generated plan
        } else {
          console.log("No valid candidate found in response");
          setPlan("No plan generated.");
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
        setPlan('Error generating plan. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [result]); // Fetch the plan when the component mounts and result changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalized Plan</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={styles.planContainer}>
          {/* Render the plan using Markdown */}
          <Markdown style={styles.markdown}>
            {plan}
          </Markdown>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        // Navigate to MapScreen after showing the plan
        onPress={() => navigation.navigate('MapsScreen', { result })}
      >
        <Text style={styles.buttonText}>Go to Map</Text>
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
  planContainer: {
    backgroundColor: COLORS.lightGray, // Box background color
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the box
    marginHorizontal: 20, // Add margin to the left and right of the box
    marginBottom: 20, // Spacing below the box
    maxWidth: '90%', // Ensure it doesn’t take up the entire width of the screen
    borderColor: COLORS.primary, // Optional: border color to match theme
    borderWidth: 1, // Optional: border width for box
  },
  markdown: {
    fontSize: 16,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
