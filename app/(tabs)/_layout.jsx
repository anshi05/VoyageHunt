import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

// Tab icon and label component
function TabBarIcon({
  name,
  label,
  focused,
}) {
  return (
    <View style={[styles.wrapper, focused && styles.focusedTab]}>
      <FontAwesome name={name} size={24} color={focused ? 'black' : 'gray'} />
      <Text style={[styles.tabLabel, focused && { color: 'black' }]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Disable default label to avoid duplication
        tabBarStyle: {
          height: 80, // Increased height to fit icon and label
          paddingBottom: 7,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" label="Home" focused={focused} />
          ),
        }}
      />



      <Tabs.Screen
        name="place"
        options={{
          title: 'Places',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="bookmark" label="Places" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="hunt"
        options={{
          title: 'Hunt',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="diamond" label="Hunt" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="nearby"
        options={{
          title: 'Nearby',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="location-arrow" label="Nearby" focused={focused} />
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
    backgroundColor: 'rgba(128, 128, 128, 0.2)', // Grey background for focused tab
    borderRadius: 15, // Rounded border
    padding: 6, // Increased padding for a wider focused area
    width: 80, // Adjusted width to make the focus area wider
    alignItems: 'center',
    justifyContent: 'center',
  },
});