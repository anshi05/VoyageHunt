import { View, Image, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Link } from 'expo-router'; // Import usePathname to get current path
import * as SecureStore from 'expo-secure-store';

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
    
    useEffect(() => {
        const getsession = async () => {
            const data = await SecureStore.getItemAsync('session');
            if(data){
                router.replace('/(tabs)')
            }
            else{
                router.replace('/pages/login')
            }
        }
        getsession()
    }, [])
    
    

    return (
        <View style={styles.container}>
            {showSplash ? (
                <SplashScreen onTimeout={() => setShowSplash(false)} />
            ) : null}
            <Image
                source={require('../assets/images/voyageHunt.png')} // Update with your logo path
                style={styles.logo}
                resizeMode="contain"
            />
            <Text className="font-bold text-xl text-white">Welcome to Voyage Hunt</Text>

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
