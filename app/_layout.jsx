import { Stack } from "expo-router";
import { IsLoggedInProvider } from '@/app/context/isLoginContext';
import { StyleSheet } from 'react-native';

export default function RootLayout() {

  return (
    <IsLoggedInProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pages/login" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="pages/register" options={{ title: 'Register', headerShown: false }} />
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
      </Stack>
    </IsLoggedInProvider>
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
};
