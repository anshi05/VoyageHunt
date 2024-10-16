import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, StyleSheet, Image } from 'react-native';

const Card = ({ place }) => {
    const handlePress = () => {
        Alert.alert(place.place_names, place.info_history, [
            {
                text: 'Get Location',
                onPress: () => {
                    const url = `https://www.google.com/maps?q=${place.latitude},${place.longitude}`; // Make sure to use place.longitude

                    // Check if the device can open the link
                    Linking.canOpenURL(url)
                        .then((supported) => {
                            if (supported) {
                                Linking.openURL(url);
                            } else {
                                Alert.alert('Error', 'Unable to open map link.');
                            }
                        })
                        .catch((err) => console.error('An error occurred', err));
                },
            },
            {
                text: "Back", onPress: () => { }
            },
        ]);
    };
    return (
        <View style={styles.card}>
            <Image source={{ uri: place.image }} style={styles.cardImage} />
            {/* Card Title */}
            <Text style={styles.title}>{place.place_names}</Text>

            {/* Card Description */}
            <Text style={styles.description}>{place.info_history.substring(0, 100)}...</Text>

            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5, // Adds a shadow for Android
        borderRadius: 15, // Rounded corners
        padding: 16, // Padding
        margin: 10, // Margin
    },
    title: {
        fontSize: 24, // Equivalent to text-2xl
        fontWeight: 'bold', // Equivalent to font-bold
        marginBottom: 8, // Equivalent to mb-2
    },
    description: {
        fontSize: 16, // Equivalent to text-base
        marginBottom: 16, // Equivalent to mb-4
        color: '#333', // Text color
    },
    button: {
        backgroundColor: '#007bff', // Equivalent to bg-blue-600
        padding: 12, // Equivalent to p-3
        borderRadius: 10, // Rounded corners for the button
    },
    buttonText: {
        textAlign: 'center',
        color: 'white', // Equivalent to text-white
        fontSize: 18, // Equivalent to text-lg
        fontWeight: '600', // Equivalent to font-semibold
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 10
    },
});

export default Card;
