import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local Businesses Component
const businesses = [
  { id: '1', name: 'Eco-Friendly Restaurant', type: 'Restaurant', discount: '10% off' },
  { id: '2', name: 'Green Hotel', type: 'Accommodation', discount: '15% off for 3+ nights' },
  { id: '3', name: 'Sustainable Tours', type: 'Tour Guide', discount: 'Free eco-gift with booking' },
];

function LocalBusinesses() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Sustainable Businesses</Text>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.businessItem}>
            <Text style={styles.businessName}>{item.name}</Text>
            <Text style={styles.businessType}>Type: {item.type}</Text>
            <Text style={styles.businessDiscount}>Special Offer: {item.discount}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

// Eco-Friendly Transport Component
const transportOptions = [
  { id: '1', name: 'City Bike Rental', description: 'Explore the city on two wheels' },
  { id: '2', name: 'Walking Tours', description: 'Guided eco-friendly city walks' },
  { id: '3', name: 'Electric Car Rental', description: 'Zero-emission vehicle rentals' },
];

const ecoHotels = [
  { id: '1', name: 'Green Leaf Hotel', features: 'Solar power, water recycling' },
  { id: '2', name: 'Eco Lodge', features: 'Plastic-free, locally sourced food' },
];

function EcoFriendlyTransport() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eco-Friendly Transportation</Text>
      <FlatList
        data={transportOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
      <Text style={styles.title}>Eco-Friendly Accommodations</Text>
      <FlatList
        data={ecoHotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{item.features}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Eco-Tourism Recommendations Component
const ecoTourismSpots = [
  { id: '1', name: 'Rainforest Reserve', description: 'Protected rainforest with guided tours', certified: true },
  { id: '2', name: 'Coral Reef Sanctuary', description: 'Snorkeling and diving in protected marine areas', certified: true },
  { id: '3', name: 'Wildlife Refuge', description: 'Observe and learn about local endangered species', certified: false },
];

function EcoTourismRecommendations() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eco-Tourism Recommendations</Text>
      <FlatList
        data={ecoTourismSpots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{item.description}</Text>
            {item.certified && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Green Badge Certified</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

// Stack Navigator
const Stack = createStackNavigator();

export default function SDGApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LocalBusinesses"> {/* LocalBusinesses as the default screen */}
        <Stack.Screen name="LocalBusinesses" component={LocalBusinesses} options={{ title: 'Local Businesses' }} />
        <Stack.Screen name="EcoFriendlyTransport" component={EcoFriendlyTransport} options={{ title: 'Eco-Friendly Transport' }} />
        <Stack.Screen name="EcoTourismRecommendations" component={EcoTourismRecommendations} options={{ title: 'Eco-Tourism Recommendations' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  businessItem: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  businessType: {
    fontSize: 16,
    color: '#666',
  },
  businessDiscount: {
    fontSize: 16,
    color: '#FF6347',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  badge: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});
