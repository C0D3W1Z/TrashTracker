// screens/HomeScreen.js
import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Tabs from '../components/Tabs';

const HomeScreen = () => {
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
            </View>
        </LinearGradient>
    );
};

export default HomeScreen;