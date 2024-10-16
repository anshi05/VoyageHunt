import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import Card from '@/components/ui/Card';

const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw"); // Replace with your Supabase key

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      <Welcome />
    </View>
  );
}

const Welcome = () => {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  const [places, setplaces] = useState([]);

  useEffect(() => {
    getplaces();
  }, []);
  useEffect(() => {
    // console.log(places)
  }, [places])

  async function getplaces() {
    const { data } = await supabase.from("hotspots").select().limit(3);
    setplaces(data);
  }
  return (
    <ImageBackground
      source={{ uri: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80' }}
      style={styles.image}
      blurRadius={2}
    >
      <View style={styles.overlay} />
      <View style={styles.headerContent}>
        <Text style={styles.greeting}>Hello Abhi!</Text>
        <Text style={styles.title}>Welcome to Udupi!</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Location &gt;</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.overviewTitle}>Overview of Places</Text>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.article}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image source
              style={styles.articleImage}
            />
            <Text style={styles.articleText}>Place {i}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export function TabThreeScreen() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = async () => {
    const { data, error } = await supabase.from("hotspots").select();
    if (error) console.error('Error fetching places:', error);
    else setPlaces(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {places.map((place, index) => (
          <Card place={place} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}

// Common styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay to darken the background
  },
  headerContent: {
    padding: 20,
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold', // Make the greeting bold
  },
  title: {
    fontSize: 30, // Increased font size for better visibility
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600', // Semi-bold
  },
  button: {
    backgroundColor: '#FF6347', // Tomato color
    paddingVertical: 12, // Increased padding for a larger button
    paddingHorizontal: 20,
    borderRadius: 30, // Rounded button
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Increased font size
    textAlign: 'center',
  },
  main: {
    padding: 20,
    paddingBottom: 100, // Extra space for scrollable content
  },
  overviewTitle: {
    fontSize: 24, // Increased font size
    marginBottom: 15,
    color: '#333',
    fontWeight: '600', // Semi-bold
  },
  article: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Add some shadow effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  articleImage: {
    width: '100%',
    height: 100,
  },
  articleText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500', // Medium weight for the text
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});
