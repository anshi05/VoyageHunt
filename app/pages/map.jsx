import React from 'react';
import MapView, { UrlTile } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function MapPage() {
    // const { latitude, longitude } = useLocalSearchParams();
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
    const tileUrlTemplate = 'https://c.tile.openstreetmap.org/10/200/200.png';


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825, // Your initial latitude
                    longitude: -122.4324, // Your initial longitude
                    latitudeDelta: 0.0922, // Zoom level
                    longitudeDelta: 0.0421, // Zoom level
                }}
            >
                <UrlTile
                    urlTemplate={tileUrlTemplate}
                    maximumZ={19} // Maximum zoom level
                    flipY={false} // OSM tiles do not need to be flipped
                    getTilePath={renderTile} // Use the caching function to get tile path
                />
            </MapView>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});