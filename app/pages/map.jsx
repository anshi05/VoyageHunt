import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams, useSearchParams } from 'expo-router';
import { PROVIDER_GOOGLE } from 'react-native-maps';
export default function MapPage() {
    // const { latitude, longitude } = useLocalSearchParams();
    // const [currentLocation, setCurrentLocation] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             alert('Permission to access location was denied');
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setCurrentLocation(location.coords);
    //     })();
    // }, []);
    const { latitude, longitude } = { latitude: 13.483155, longitude: 74.691371 }
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
        })();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {currentLocation ? (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: parseFloat(13.483155),
                        longitude: parseFloat(74.691371),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }} title="Destination" />
                    <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} title="Your Location" pinColor="blue" />
                </MapView>
            ) : (
                <Text>Fetching current location...</Text>
            )}
        </View>
    );
}