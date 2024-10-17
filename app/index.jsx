import { View, Image, StyleSheet, Alert, BackHandler, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, usePathname } from 'expo-router'; // Import usePathname to get current path
import { supabase } from '@/utils/supabase';

const SplashScreen = ({ onTimeout }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout();
        }, 3000); // Display the splash screen for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.splashContainer}>
            <Image 
                source={require('../assets/images/voyageHunt.png')} // Update with your logo path
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.splashText}>Welcome to Voyage Hunt</Text>
        </View>
    );
};

const Index = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const currentRoute = usePathname(); // Use this to get the current route

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            // User is authenticated, redirect to home/dashboard
            setIsLoggedIn(true);
            setShowSplash(false);
            router.push('/(tabs)'); // Adjust the route as necessary
        } else {
            setIsLoggedIn(false);
            setShowSplash(false);
            router.push('/pages/login');
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const backAction = () => {
            // Only show the quit alert if on the login page or the home page
            if (currentRoute === '/pages/login' || (isLoggedIn && currentRoute === '/(tabs)')) {
                Alert.alert("Quit?", "Do you want to exit the app?", [
                    {
                        text: "No",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "Yes",
                        onPress: () => BackHandler.exitApp(),
                    }
                ]);
                return true; // Prevent default back behavior
            }
            return false; // Allow back navigation for other pages
        };

        // Add event listener for back press
        const subscription = BackHandler.addEventListener("hardwareBackPress", backAction);

        // Clean up listener on unmount
        return () => subscription.remove();
    }, [currentRoute, isLoggedIn]);

    return (
        <View style={styles.container}>
            {showSplash ? (
                <SplashScreen onTimeout={() => setShowSplash(false)} />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2E', // Match your app's background color
    },
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2E', // Match your app's background color
    },
    logo: {
        width: 150, // Adjust size as needed
        height: 150, // Adjust size as needed
        marginBottom: 20,
    },
    splashText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Index;
