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
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
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
    <View>
      <ScrollView>
        <ImageBackground
          source={bg}
          style={styles.image}
          blurRadius={2}
        >
          <View style={styles.overlay} />
          <View className="m-10">
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
            <Text style={styles.modalTitle}>Your Voyager</Text>
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 
  welcomeTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
     // Adds elegance with spacing
  },

  greeting: {
    fontSize: 35, // Large and bold for emphasis
    fontWeight: 'bold',
    color: 'green', // White for contrast on a dark background
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Light shadow for depth
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4, // Slight blur for a soft shadow effect
    letterSpacing: 1.5, // Adds some elegance
    overflow: 'hidden', // Ensures the text stays inside the rounded corners
  },



  // Change Location Button
  changeLocationButton: {
    alignSelf: 'center',  // Centers the button horizontally
    paddingVertical: 10,  // Slightly more vertical padding for better touch target
    paddingHorizontal: 15,  // Wider horizontal padding for a more prominent button
    borderRadius: 20,  // More rounded corners for a modern, soft look
    backgroundColor: '#007AFF',  // Vibrant blue to make it pop
    borderWidth: 2,  // Add a border for extra definition
    borderColor: '#005BB5',  // Darker blue for contrast
    
   
  },
  
  changeLocationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
// Section Styling
section: {
  padding: 15,  // Increased padding for more generous space
   // Light background for subtle contrast
    // Rounded corners to modernize the section
    // Increased margin for clearer separation between sections
  borderWidth: 2,  // Added a subtle border for definition
  borderColor: '#E5E7EB',  // Light border color to keep it soft
},

sectionTitle: {
  fontSize: 20,  // Slightly larger for emphasis
  fontWeight: 'bold',
  color: '#1F2937',  // Darker shade for contrast
  marginBottom: 15,  // Slightly increased spacing below the title
  letterSpacing: 0.8,  // More balanced spacing between letters
  textAlign: 'center',  // Keeps the title aligned at the center
  backgroundColor: 'black',  // Light grey background for subtle highlight
  paddingVertical: 4,  // Increased vertical padding for a more prominent title area
  paddingHorizontal: 1,  // Horizontal padding for spacious feel
  borderRadius: 30,  // Rounded corners for smoother look
  overflow: 'hidden',
  color: 'white'
},

sectionContent: {
  fontSize: 15,
  textAlign: 'center',
  color: '#4B5563',  // A medium grey for text that's easier on the eyes
  lineHeight: 24,  // Improved readability with slightly larger line height
  paddingHorizontal: 10,  // Added padding for more breathing room around content
},

  // Business Card Styling
  businessCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,  // More rounded corners for modern look
    padding: 10,
    alignItems: 'center',
    marginRight: 12,
    width: 120,
    
    transform: [{ scale: 1 }],  // Starting point for animation
  },
  businessText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  // See More Button
  seeMoreButton: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,  // More rounded and large to make it stand out
    alignSelf: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    transition: 'transform 0.3s ease',  // For smooth interaction animations
  },
  seeMoreText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,  // Slightly larger to make it more clickable
    textAlign: 'center',
  },


    gamificationCard: {
      padding: 20,  // Reduced padding for better spacing
      alignItems: 'center',
      backgroundColor: 'white',  // Changed background to white
      borderRadius: 15,  // Slightly smaller border radius for a modern look
      margin: 16,
      transform: [{ translateY: 0 }],  // Base for animation
      transition: 'transform 0.2s ease-in-out',  // Smooth transition for hover
    },
    gamificationText: {
      fontSize: 26,  // Slightly larger font size for emphasis
      fontWeight: '700',  // Use bold weight for more prominence
      marginTop: 12,
      color: '#2C3E50',  // Darker blue for improved readability
      textAlign: 'center',  // Center align the text
    },
    gamificationSubtext: {
      fontSize: 16,
      color: '#BDC3C7',  // Lighter grey for secondary text
      marginTop: 8,
      textAlign: 'center',
      lineHeight: 28,  // Increased line height for better readability
      fontStyle: 'italic',
      fontWeight: '300',  // Lighter weight for distinction
    }
  });  // Closing parenthesis for the styles object
  