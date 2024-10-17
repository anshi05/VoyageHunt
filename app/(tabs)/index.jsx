// HomePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Modal } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Link, router } from 'expo-router';
import Card from '@/components/ui/Card';
import bg from '@/assets/images/background.jpg';
import TravelChatbot from '../TravelChatbot';
export default function HomePage() {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "YOUR_SUPABASE_KEY");
  const [places, setplaces] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat widget

  useEffect(() => {
    getplaces();
  }, []);

  async function getplaces() {
    const { data, error } = await supabase.from("hotspots").select().limit(3);
    if (data) {
      setplaces(data);
    } else {
      console.log(error);
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      router.replace('/pages/login');
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getUser();
      console.log("session: ", session);
    };
    checkUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={bg}
          style={styles.background}
          blurRadius={2}
        >
          <View style={styles.header}>
            {/* Header and Welcome section */}
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.greeting}>Hello Abhi!</Text>
            <Text style={styles.welcomeTitle}>Welcome to Udupi!</Text>
            <TouchableOpacity style={styles.changeLocationButton}>
              <Text style={styles.changeLocationText}>Change Location &gt;</Text>
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

          {/* Local Businesses */}
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
            {places.map((place, index) => (
              <Card place={place} key={index}></Card>
            ))}
            <Link href={'/(tabs)/place/'} style={styles.seeMoreButton}>
              <Text style={styles.seeMoreText}>See More Places</Text>
            </Link>
          </View>

          {/* Gamification Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Adventure</Text>
            <View style={styles.gamificationCard}>
              <MaterialCommunityIcons name="trophy" size={48} color="#FFD700" />
              <Text style={styles.gamificationText}>Level 5 Explorer</Text>
              <Text style={styles.gamificationSubtext}>Complete quests to earn rewards!</Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>

      {/* Chat Widget Button */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChatOpen}
        onRequestClose={() => setIsChatOpen(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Travel Assistant</Text>
            <TouchableOpacity onPress={() => setIsChatOpen(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <TravelChatbot />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setIsChatOpen(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
        <Text style={styles.chatButtonText}>Chat with us</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Background and Welcome styles
  background: {
    flex: 1,
    padding: 20,
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  changeLocationButton: {
    alignSelf: 'flex-start',
  },
  changeLocationText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  // Sections
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
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginRight: 10,
    width: 150,
  },
  businessText: {
    marginTop: 10,
    textAlign: 'right',
  },
  seeMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  seeMoreText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  gamificationCard: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    margin: 10,
  },
  gamificationText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2C3E50',
  },
  gamificationSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    lineHeight: 22,
  },
  // Chat Widget styles
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
