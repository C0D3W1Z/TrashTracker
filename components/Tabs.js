// components/Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"  // Start with the Home screen in the middle
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={'#007260'} />;
        },
        tabBarShowLabel: false, // Hide labels to make it cleaner
        tabBarStyle: styles.tabBarStyle, // Apply custom styles
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name="Feed" component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Home" component={ProfileScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,  // Increased bottom padding to raise the tab bar slightly
    left: 15,  // Increased side padding
    right: 15,  // Increased side padding
    height: 80,  // Increased height for more space and better touch area
    backgroundColor: '#ffffff',
    borderRadius: 25,  // More rounded corners for a softer look
    shadowColor: '#000',
    shadowOpacity: 0.15,  // Slightly stronger shadow for a more pronounced effect
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,  // Increased shadow radius for a softer spread
    elevation: 10,  // Increased elevation for a more defined shadow on Android
    paddingHorizontal: 20,  // Increased horizontal padding for more spacing around icons
    paddingVertical: 25,  // Increased vertical padding for better positioning of icons
  },
});

export default Tabs;
