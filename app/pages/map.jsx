import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSearchParams } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; export default function MapPage() {
    const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

    const [currentLocation, setCurrentLocation] = useState(null);
    const [markers, setmarkers] = useState([])
    const [showmodel, setshowmodel] = useState(false)
    const [places, setplaces] = useState([])
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
        async function getPlaces() {
            const { data } = await supabase.from("hotspots").select();
            setplaces(data)
            const mar = []
            data.map((ele, index) => (
                mar.push({
                    coordinate: { latitude: ele.latitude, longitude: ele.longitude },
                    title: ele.place_names,
                    avatar: ele.avatars_on_map
                })
            ))
            setmarkers(mar);
        }
        getPlaces()
    }, []);
    const handlePress = (index) => {
        Alert.alert(places[index].place_names, places[index].info_history, [
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
    };
    return (
        <View style={{ flex: 1 }}>
            {currentLocation ? (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: parseFloat(currentLocation.latitude),
                        longitude: parseFloat(currentLocation.longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {markers.map((marker, index) => (
                        // <Marker key={index} coordinate={{ latitude: parseFloat(74.70385279537415), longitude: parseFloat(74.70385279537415) }} title="Your Location" pinColor="blue" />
                        <Marker onPress={() => { handlePress(index) }} key={index} coordinate={{ latitude: parseFloat(marker.coordinate.latitude), longitude: parseFloat(marker.coordinate.longitude) }} >
                            <View style={styles.markerContainer}>
                                {/* <Image source={{ uri: marker.avatar }} style={{height: 20, height:20}} /> */}
                                <MaterialIcons name="location-pin" size={24} color="black" />
                                <Text style={styles.markerText}>{marker.title}</Text>
                            </View>
                        </Marker>
                    ))}
                    <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} title="Your Location" pinColor="blue" >
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