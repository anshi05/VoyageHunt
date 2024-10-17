import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import Card from '@/components/ui/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import bg from '@/assets/images/background.jpg'
export default function HomePage() {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
  const [places, setplaces] = useState([]);

  useEffect(() => {
    getplaces();

  }, []);

  async function getplaces() {
    const { data, error } = await supabase.from("hotspots").select().limit(3);
    if (data) {
      setplaces(data);
    }
    else {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      // Sign-out successful, redirect to login page
      router.replace('/pages/login'); // Adjust the route as necessary
    }
  };
  return (
    <ScrollView>
      <ImageBackground
        source={bg}
        style={styles.image}
        blurRadius={2}
      >
        <View style={styles.overlay} />
        <View className="m-10">
          <Text style={styles.sectionTitle}>Hello Abhi!</Text>
          <Text style={{ fontSize: 20 }}>Welcome to Udupi!</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change Location &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Udupi</Text>
          <Text style={styles.sectionContent}>
            Udupi is a coastal town in Karnataka, famous for its Krishna Temple and delicious cuisine.
            Explore its rich culture and beautiful beaches!
          </Text>
        </View>

        {/* Our Businesses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local Businesses</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[['Restaurants', 'pages/restaurants'], ['Hotels', 'pages/hotels'], ['Guides', 'pages/guides'], ['Events', 'pages/events']].map((business, index) => (
              <Link href={business[1]} key={index} style={styles.businessCard}>
                <MaterialCommunityIcons name="store" size={24} color="#4A90E2" />
                <Text style={styles.businessText}>{business[0]}</Text>
              </Link>
            ))}
          </ScrollView>
        </View>

        {/* Places to Discover */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Places to Discover</Text>
          {places.map((place, index) =>
          (
            // console.log(place)
            <Card place={place} key={index}></Card>
          ))}
          <Link href={'/(tabs)/place/'} style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See More Places</Text>
          </Link>
        </View>

        {/* Gamification Section */}
        <View style={styles.section}>
          <Text className="text-white text-2xl">Your Adventure</Text>
          <View style={styles.gamificationCard}>
            <MaterialCommunityIcons name="trophy" size={48} color="#FFD700" />
            <Text style={styles.gamificationText}>Level 5 Explorer</Text>
            <Text style={styles.gamificationSubtext}>Complete quests to earn rewards!</Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },


  welcomeSection: {
    padding: 20,

  },
  welcomeText: {
    fontSize: 18,
    color: '#2C3E50',
  },
  locationText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 5,
  },
  changeLocationButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',

    alignSelf: 'flex-start',
    marginTop: 10,
  },
  changeLocationText: {
    color: 'gray',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
  },
  businessCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  businessText: {
    marginTop: 5,
    textAlign: 'center',
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeImage: {
    width: 100,
    height: 100,
  },
  placeInfo: {
    flex: 1,
    padding: 10,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  seeMoreButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  seeMoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  gamificationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gamificationText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  gamificationSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    padding: 10,
  },
});