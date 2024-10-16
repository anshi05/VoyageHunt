import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';

const Card = ({ place }) => {
    const handlePress = () => {
        const url = `https://www.google.com/maps?q=${place.latitude},${longitude}`; // Example: coordinates for San Francisco

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
    };

    return (
        <View className="bg-white shadow-lg rounded-xl p-6 m-4">
            {/* Card Title */}
            <Text className="text-2xl font-bold text-gray-800 mb-2">{place.place_names}</Text>

            {/* Card Description */}
            <Text className="text-gray-600 text-base mb-4">{place.info_history}</Text>

            {/* Button */}
            <TouchableOpacity
                className="bg-blue-600 p-3 rounded-lg"
                onPress={handlePress}
            >
                <Text className="text-center text-white text-lg font-semibold">Click Me</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Card;
