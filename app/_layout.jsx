import { Stack, useRouter, useSegments } from "expo-router";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import TravelChatbot from './TravelChatbot';

export function InititalLayout() {
  const { session, initialized, signOut } = {}
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if (!initialized) return;
    const inAuthGroup = segments[0] === '(tabs)';
    if (session && !inAuthGroup) {
      router.replace('/(tabs)/')
    }
    else if (!session && inAuthGroup) {
      router.replace('/pages/login')
    }
  }, [initialized, session])
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pages/login" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="pages/register" options={{ title: 'Register', headerShown: false }} />
      <Stack.Screen name="pages/addevents" options={{ title: 'Add Events' }} />
      <Stack.Screen name="pages/leaderboard" options={{ title: 'Leaderboard' }} />
      <Stack.Screen name="pages/profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="pages/map2" options={{ title: 'Maps - Click on the pin' }} />
      <Stack.Screen name="pages/map" options={{ title: 'Maps' }} />
      <Stack.Screen
        name="pages/restaurants"
        options={{
          title: 'Restaurants',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/hotels"
        options={{
          title: 'Hotels',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/tourists"
        options={{
          title: 'Tourists',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/guides"
        options={{
          title: 'Connect with Guides',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/games/photo_quest"
        options={{
          title: 'Photo Quest',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/games/nritya_gyaan"
        options={{
          title: 'Nritya Gyaan',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/games/snap_seek"
        options={{
          title: 'Snap and Seek',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/games/hint_n_clue"
        options={{
          title: 'Hint and Clue',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/games/flutegame"
        options={{
          title: 'Flute Game',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/games/folklore"
        options={{
          title: 'Folk Lore',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: 'VoyageHunt',
          ...headerOptions // Apply common header options
        }}
      />
      <Stack.Screen
        name="pages/games/business_event"
        options={{
          title: 'Business Events',
          ...headerOptions // Apply common header options
        }}
      />
    </Stack>
  )
}

export default function RootLayout() {


  return (
    <InititalLayout />
  );
}

// Define common styles and options
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E1E2E', // Dark background color
  },
  headerTitle: {
    color: '#fff', // White title text
    fontWeight: 'bold', // Bold text
  },
});

const headerOptions = {
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
  headerTintColor: '#fff', // White color for back button and icons
  haederRight: () => {
    <TouchableOpacity onPress={signOut}>
      <Ionicons name="log-out" size={24} color={'#fff'} />
    </TouchableOpacity>
  }
};


export function App() {
  return (
    <TravelChatbot />
  );
};


