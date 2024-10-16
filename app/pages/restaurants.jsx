import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const restaurants = [
  {
    id: '1',
    name: 'Woodlands Restaurants',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    isVeg: true,
    location: { latitude: 12.9716, longitude: 77.5946 },
  },
  {
    id: '2',
    name: 'HOTEL NEW SHANTI SAGAR',
    rating: 4.2,
    image: 'https://assets.architecturaldigest.in/photos/64f85037ec0bc118bdd98aba/4:3/w_1440,h_1080,c_limit/Untitled%20design%20(14).png',
    isVeg: true,
    location: { latitude: 12.9719, longitude: 77.6412 },
  },
  {
    id: '3',
    name: 'MADHURAM RESTAURANT',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    isVeg: false,
    location: { latitude: 12.9165, longitude: 77.6101 },
  },
  {
    id: '4',
    name: 'Sitaram Sagar',
    rating: 4.9,
    image: 'https://b.zmtcdn.com/data/collections/684397cd092de6a98862220e8cc40aca_1709810207.png',
    isVeg: true,
    location: { latitude: 12.9719, longitude: 77.6412 },
    isLocalFavorite: true,
  },
  // Add other restaurants here...
];

const RestaurantCard = ({ restaurant }) => {
  const openMap = () => {
    const url = "https://www.google.com/maps/search/?api=1&query=${restaurant.location.latitude},${restaurant.location.longitude}";
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={[styles.card, restaurant.isLocalFavorite && styles.localFavoriteCard]}>
      <View style={styles.row}>
        <Image source={{ uri: restaurant.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.ratingWrapper}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
          </View>
          <Text style={styles.vegStatus}>{restaurant.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</Text>
        </View>
        <TouchableOpacity onPress={openMap} style={styles.locationButton}>
          <Ionicons name="location-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function Component() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        
      </View>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A4A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 16,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#2A2A3A',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    padding: 10,
  },
  localFavoriteCard: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    paddingLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFF',
    marginLeft: 4,
    fontSize: 14,
  },
  vegStatus: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 8,
  },
  locationButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#3A3A4A',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 4,
  },
});