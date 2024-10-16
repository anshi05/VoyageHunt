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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const hotels = [
  { 
    id: '1', 
    name: 'Vinayaka Grand', 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' 
  },
  { 
    id: '2', 
    name: 'Udupi Palace Hotel', 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' 
  },
  { 
    id: '3', 
    name: 'Mahalaxmi Resort', 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80' 
  },
  { 
    id: '4', 
    name: 'Padmanabha Retreat', 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80' 
  },
  { 
    id: '5', 
    name: 'Krishna Matha View Inn', 
    rating: 3, 
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' 
  },
];

const HotelCard = ({ hotel }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: hotel.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.hotelName}>{hotel.name}</Text>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < hotel.rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    </View>
  </TouchableOpacity>
);

export default function Component() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        
      </View>
      <FlatList
        data={hotels}
        renderItem={({ item }) => <HotelCard hotel={item} />}
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
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2A2A3A',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#3A3A4A',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 3,
  },
});