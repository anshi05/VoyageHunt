import React, { useEffect, useState } from 'react';
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
import { createClient } from '@supabase/supabase-js';


const RestaurantCard = ({ restaurant }) => {
  const openMap = () => {
    const url = "https://www.google.com/maps/search/?api=1&query=${restaurant.location.latitude},${restaurant.location.longitude}";
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={[styles.card, restaurant.isLocalFavorite && styles.localFavoriteCard]}>
      <View style={styles.row}>
        <Image source={{ uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantName}>{restaurant.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Component() {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
  const [restaurants, setrestaurants] = useState([])
  useEffect(() => {
    const getRestaurants = async () => {
      const { data, error } = await supabase
        .from('Users')                      // The table you're querying
        .select('*')                        // Selecting all columns
        .eq('business_type', 'Restaurants');     // Filtering where business_type is 'Restaurants'

      if (error) {
        console.error('Error fetching restaurants:', error);
      } else {
        console.log('List of restaurants:', data);
        setrestaurants(data)
      }
    };
    getRestaurants()
  }, [])
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