import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; export default function MapPage() {
    const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
    const { latitude, longitude, info_history, place_names, visitors } = useLocalSearchParams();
    console.log(latitude, longitude, info_history, place_names, visitors)
    const [currentLocation, setCurrentLocation] = useState(null);
    useEffect(() => {
        const getloaction = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
        };
        getloaction()
    }, []);
    const handlePress = () => {
        console.log(currentLocation.latitude, currentLocation.longitude)
        latDiff = Math.abs(currentLocation.latitude - latitude)
        longDiff = Math.abs(currentLocation.longitude - longitude)
        if (latDiff < 0.001 && longDiff < 0.001) {
            console.log("You found the place! Congrats for the rest 75 points. Keep going")
            const [uid, setuid] = useState()
            useEffect(() => {
                async function getUid() {
                    const data = await SecureStore.getItemAsync('session');
                    console.log(JSON.parse(data).session.user.id)
                    return JSON.parse(data).session.user.id;
                }
                setuid(getUid())
            }, [])

            const updateUserPoints = async (uid) => {
                console.log(uid._j)
                let { data: user, error: fetchError } = await supabase
                    .from('Users')
                    .select('*')
                    .eq('uid', uid._j)

                if (fetchError) {
                    console.error('Error fetcdfhing user points:', fetchError);
                    return;
                }
                else {
                    console.log("points: ", user[0].points)
                }

                // Update the points (increment by 75)
                const newPoints = user[0].points + 75;
                console.log(newPoints)
                const { data, error: updateError } = await supabase
                    .from('Users')
                    .update({ points: newPoints })
                    .eq('uid', uid._j);

                if (updateError) {
                    console.error('Error updating user points:', updateError);
                } else {
                    console.log('User points updated:', data);
                }
            };
            updateUserPoints()
        }
        else {
            Alert.alert(place_names, info_history, [
                {
                    text: 'Get Location',
                    onPress: () => {
                        const url = `https://www.google.com/maps?q=${places[index].latitude},${places[index].longitude}`;
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
        }

    };
    return (
        <View style={{ flex: 1 }}>
            {currentLocation ? (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {/* Location */}
                    <Marker onPress={() => { handlePress() }} coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }} >
                        <View style={styles.markerContainer}>
                            <MaterialIcons name="location-pin" size={40} color="black" />
                            <Text style={styles.markerText}>{place_names}</Text>
                        </View>
                    </Marker>
                    {/* Current Location */}
                    <Marker coordinate={{ latitude: parseFloat(currentLocation.latitude), longitude: parseFloat(currentLocation.longitude) }} title="Your Location" pinColor="blue" >
                        <View style={styles.markerContainer}>
                            <View style={styles.markerDot} />
                            <Text style={styles.markerText}>Your Location</Text>
                        </View>
                    </Marker>
                </MapView>
            ) : (
                <Text>Fetching current location...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    markerContainer: {
        alignItems: 'center', // Center the text below the marker
    },
    markerDot: {
        width: 20,
        height: 20,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    markerDot2: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    markerText: {
        marginTop: 5, // Spacing between the dot and the text
        color: 'black',
        fontSize: 12,
        backgroundColor: "white",
        padding: 3
    },
});