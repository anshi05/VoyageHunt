import { View, Image, StyleSheet, Alert, BackHandler, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
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

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            // User is authenticated, redirect to dashboard or home
            router.push('/(tabs)'); // Adjust the route as necessary
        } else {
            setShowSplash(false); // Hide splash and navigate to login
            router.push('/pages/login');
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const backAction = () => {
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
            return true; // Prevent default behavior (going back)
        };

        const subscription = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => subscription.remove();
    }, []);

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
