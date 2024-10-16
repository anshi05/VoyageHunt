import React from 'react';
import { Tabs } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Tab icon and label component
function TabBarIcon({
  name,
  label,
  focused,
}) {
  return (
    <View style={[styles.wrapper, focused && styles.focusedTab]}>
      <MaterialCommunityIcons name={name} size={24} color={focused ? 'black' : 'gray'} />
      <Text style={[styles.tabLabel, focused && { color: 'black' }]}>{label}</Text>
    </View>
  );
}

// Profile circle component
function ProfileCircle() {
  return (
    <TouchableOpacity style={styles.profileCircle}>
      <MaterialCommunityIcons name="account-circle" size={38} color="#fff" />
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 7,
        },
        headerStyle: {
          height: 110, // Increased height
          paddingTop: 20, 
          borderBottomLeftRadius:8,
          borderBottomRightRadius:8,
          backgroundColor: '#2C3E50',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 10,
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: 'bold',
        },
        headerRight: route.name === 'index' ? () => <ProfileCircle /> : undefined,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'VoyageHunt',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" label="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="place"
        options={{
          title: 'Tourist Spots',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="map-marker-path" label="Places" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="hunt"
        options={{
          title: 'Hunt',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="gift" label="Hunt" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="nearby"
        options={{
          title: 'Nearby',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="near-me" label="Nearby" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  tabLabel: {
    fontSize: 12,
    color: 'gray',
    marginTop: 3,
  },
  focusedTab: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 15,
    padding: 6,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
});