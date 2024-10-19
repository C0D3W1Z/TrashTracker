// screens/HomeScreen.j
import { View, Text, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Tabs from '../components/Tabs';
import { collection, addDoc } from "firebase/firestore";
import { auth } from '../firebase';
// import { db } from '../firebase';

// console.log("____");
// console.log(db);
// console.log("____");
 
// async function fries() {
// try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// fries();

const ProfileScreen = () => {
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
                    <View style={{
                        marginTop: 175,
                    }}>
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
                            height: 175, // Adjust the height as needed
                            width: 350,
                            backgroundColor: COLORS.white, // Transparent white background
                            borderRadius: 40, // Rounded corners
                            justifyContent: 'center', // Center content vertically
                            alignItems: 'center', // Center content horizontally
                            borderWidth: 3,
                            borderColor: COLORS.secondary
                        }}
                    >

                    </View>
                </View>
                {/* Other content goes here */}



            </View>
        </LinearGradient>
    );
};

export default ProfileScreen;
