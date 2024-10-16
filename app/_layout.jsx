import { Stack } from "expo-router";
import { IsLoggedInProvider } from '@/app/context/isLoginContext'
export default function RootLayout() {

  return (
    <IsLoggedInProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pages/login" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="pages/register" options={{ title: 'Register', headerShown: false }} />
      </Stack>
    </IsLoggedInProvider>
  );
}
