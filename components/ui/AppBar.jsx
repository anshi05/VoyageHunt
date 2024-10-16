import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router'; // For navigation
import Ionicons from '@expo/vector-icons/Ionicons';

const AppBar = ({ title }) => {

    const handleBackPress = () => {
        router.back(); // Navigate to the previous page
    };

    return (
        <View style={styles.appBar}>
            <TouchableOpacity onPress={handleBackPress}>
                <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <Ionicons name="person" size={24} color="black" />
        </View>
    );
};

const styles = StyleSheet.create({
    appBar: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#6200EE', // Change the color as per your theme
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    backButton: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default AppBar;
