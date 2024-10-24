import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'; // Assuming Firestore is initialized
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native'; // For chart width

async function readTrashCount() {
    try {
        const docRef = doc(db, "users", "1"); // Ensure this is the correct document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().trash || 0; // Accessing the "trash" field in the document
        } else {
            console.log("No such document!");
            return 0; // Return 0 if document is not found
        }
    } catch (e) {
        console.error("Error reading document: ", e);
        return 0; // Return 0 in case of an error
    }
}

const ProfileScreen = () => {
    const [trashCount, setTrashCount] = useState(0); // State to store trash count

    useEffect(() => {
        // Fetch trash count when component mounts
        const fetchTrashCount = async () => {
            const count = await readTrashCount();
            setTrashCount(count); // Update state with fetched trash count
        };

        fetchTrashCount();
    }, []); // Empty dependency array ensures this runs only once

    const weeklyData = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
            {
                data: [5, 8, 3, 6, 4, 7, trashCount-34], // Example trash count per day
            },
        ],
    };

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        height: 325, // Adjust the height as needed
                        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent white background
                        borderRadius: 40, // Rounded corners
                        justifyContent: 'center', // Center content vertically
                        alignItems: 'center', // Center content horizontally
                    }}
                >
                    <View style={{ marginTop: 175 }}>
                        <View
                            style={{
                                height: 135, // Adjust the height as needed
                                width: 135,
                                backgroundColor: COLORS.white, // Transparent white background
                                borderRadius: 150, // Rounded corners
                                justifyContent: 'center', // Center content vertically
                                alignItems: 'center', // Center content horizontally
                                borderWidth: 70,
                                borderColor: COLORS.secondary
                            }}
                        >
                            <Image
                                alt=""
                                source={require("../assets/blank-pfp.png")}
                                style={{
                                    height: 117, // Adjust the height as needed
                                    width: 117,
                                    backgroundColor: COLORS.white, // Transparent white background
                                    borderRadius: 150, // Rounded corners
                                    justifyContent: 'center', // Center content vertically
                                    alignItems: 'center', // Center content horizontally
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 22, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: COLORS.white
                        }}>Goutham Mahesh
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 125, // Adjust the height as needed
                            width: 350,
                            backgroundColor: COLORS.white, // Transparent white background
                            borderRadius: 40, // Rounded corners
                            justifyContent: 'center', // Center content vertically
                            alignItems: 'center', // Center content horizontally
                            borderWidth: 3,
                            borderColor: COLORS.secondary
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                            Lifetime Trash Disposed:
                        </Text>
                        <Text style={{
                            fontSize: 40,
                            fontWeight: 'bold',
                            color: COLORS.primary,
                            marginBottom: 5, 
                        }}>
                            {trashCount}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 115, marginLeft: 25 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: COLORS.white, marginBottom: 0, marginLeft: -25 }}>
                            Weekly Trash Pickup
                        </Text>
                        <BarChart
                            data={weeklyData}
                            width={Dimensions.get('window').width - 50} // Adjust width for padding
                            height={220}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundColor: 'rgba(255, 255, 255, 0.3)', // Updated to your desired color
                                backgroundGradientFrom: 'rgba(255, 255, 255, 0.3)', // For consistency
                                backgroundGradientTo: 'rgba(255, 255, 255, 0.3)', // For consistency
                                decimalPlaces: 0, // No decimal places
                                color: () => COLORS.primary, // Use your primary color
                                labelColor: () => COLORS.primary, // Use your primary color
                                style: {
                                    borderRadius: 16,
                                },
                                barPercentage: 0.7, // Adjust to control the width of bars
                            }}
                            
                            verticalLabelRotation={0} // Rotates labels for readability
                            style={{
                                marginVertical: 10,
                                borderRadius: 20,
                            }}
                        />
                    </View>

            </View>
        </LinearGradient>
    );
};

export default ProfileScreen;
