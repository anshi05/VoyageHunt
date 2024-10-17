import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams, useSearchParams } from 'expo-router';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { createClient } from '@supabase/supabase-js';
export default function MapPage() {
    // const { latitude, longitude } = { latitude: 13.483155, longitude: 74.691371 }
    const [currentLocation, setCurrentLocation] = useState(null);

    const supabase = createClient(
        "https://mezityqgxnauanmjjkgv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw"
    );
    const [markers, setmarkers] = useState([
        {
            coordinate: { latitude: 13.3406, longitude: 74.7421 },
            title: 'Krishna Matha',
        },
        {
            coordinate: { latitude: 13.3361, longitude: 74.7428 },
            title: 'Anantheswara Temple',
        },
    ])
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            setCurrentLocation(location.coords);
        })();
        async function getPlaces() {
            const { data } = await supabase.from("hotspots").select();
            console.log(data)
        }
    });

    return (

        <View style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 13.3406,
                    longitude: 74.7421,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Heatmap
                    points={heatmapPoints}
                    radius={40} // Radius of the heatmap points
                    opacity={0.7} // Opacity of the heatmap layer
                    maxIntensity={100} // Max intensity for the heatmap
                    gradient={{
                        colors: ['green', 'yellow', 'red'], // Colors for the gradient
                        startPoints: [0.1, 0.5, 1],
                        colorMapSize: 256,
                    }}
                />
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={marker.coordinate}>
                        {/* Custom view for marker */}
                        <View style={styles.markerContainer}>
                            <View style={styles.markerDot} />
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
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    markerText: {
        marginTop: 5, // Spacing between the dot and the text
        color: 'black',
        fontSize: 12,
    },
});