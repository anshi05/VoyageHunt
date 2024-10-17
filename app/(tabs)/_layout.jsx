import React from 'react';
import { router, Tabs } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Tab icon and label component
const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

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
      <MaterialCommunityIcons onPress={() => { router.push('/pages/profile') }} name="account-circle" size={38} color="#fff" />
    </TouchableOpacity>
  );
}
// Profile circle component
function Signout() {
  return (
    <TouchableOpacity style={styles.profileCircle}>
      <FontAwesome5 name="sign-out-alt" size={24} color="white" onPress={async () => {
        const { error } = await supabase.auth.signOut();
        async function deleteAuthToken() {
          await SecureStore.deleteItemAsync('session');
        }
        deleteAuthToken()
        if (error) {
          console.error('Error signing out:', error.message);
        } else {
          // Sign-out successful, redirect to login page
          router.replace('/pages/login'); // Adjust the route as necessary
        }
      }} />
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 7,
        },
        headerStyle: {
          height: 110, // Increased height 

          backgroundColor: '#2C3E50',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 6,

        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: 'bold',
        },
        headerRight: () => <View style={{ display: 'flex', flexDirection: 'row' }}><ProfileCircle /><Signout /></View>,
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