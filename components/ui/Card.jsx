import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Card = ({ place }) => {
    const handlePress = () => {
        Alert.alert(place.place_names, place.info_history, [
            {
                text: 'Get Location',
                onPress: () => {
                    const url = `https://www.google.com/maps?q=${place.latitude},${place.longitude}`;
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
            <View style={styles.content}>
                <Text style={styles.title}>{place.place_names}</Text>
                <View style={styles.locationContainer}>
                    <MapPin color="#fff" size={14} />
                    <Text style={styles.locationText}>View on Map</Text>
                </View>

                <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
                    {place.info_history}
                </Text>

                <View style={styles.tagContainer}>
                    {place.tags && place.tags.length > 0 ? (
                        place.tags.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noTags}>No Tags Available</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Explore</Text>
                    <ChevronRight color="#FFF" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        margin: 12,
        overflow: 'hidden',
        width: width - 24,
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
        color:'black'
    },
    description: {
        fontSize: 15,
        color: 'black',
        marginBottom: 30,
        marginTop: 15,
        lineHeight: 20,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    tag: {
        backgroundColor: '#eef6ff',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginRight: 3,
        marginBottom: 3,
    },
    tagText: {
        color: 'black',
        fontSize: 10,
    },
    noTags: {
        fontSize: 12,
        color: '#888',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
    },
    locationText: {
        marginLeft: 4,
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
    },
});

export default Card;