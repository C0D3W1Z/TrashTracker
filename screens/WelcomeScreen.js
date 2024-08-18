import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../constants/colors'
import Button from '../components/Button'

const Welcome = ({ navigation }) => {
    return (
        <LinearGradient
        style={{
            flex: 1
        }}
        colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{flex: 1}}>
                <View>
                    <Image
                        source={require("../assets/PFP1.png")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 50,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                    <Image
                        source={require("../assets/PFP2.png")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 10,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />
                    <Image
                        source={require("../assets/PFP3.png")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 170,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />
                    <Image
                        source={require("../assets/PFP4.png")}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 150,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                <View style={{
                    paddingHorizontal: 22,
                    position: 'absolute',
                    top: 475,
                    width: '100%'
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white,
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Started</Text>

                    <View style={{marginVetical: 22}}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4,
                            top: 10
                        }}>Elevate every aspect of your life</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4,
                            top: 10
                        }}>with ElevateAI</Text>
                    </View>

                    <Button
                        title="Join Now"
                        onPress={()=>navigation.navigate("Signup")}
                        style={{
                            marginTop: 40,
                            width: '100%',

                        }}
                    />

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 35,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>Already have an account?</Text>
                        <Pressable
                            onPress={()=>navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                fontWeight: 'bold',
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>
                    </View>

                </View>

            </View>

        </LinearGradient>
    )
}

export default Welcome