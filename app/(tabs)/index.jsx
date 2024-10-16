import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import Card from '@/components/ui/Card';

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
    console.log(places)
  }, [places])

  async function getplaces() {
    const { data } = await supabase.from("hotspots").select().limit(3);
    setplaces(data);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/placeholder.svg?height=400&width=300' }}
          style={styles.image}
        />
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hello Abhi!</Text>
          <Text style={styles.title}>Welcome to Udupi!</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change Location &gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.overviewTitle}>Overview of places</Text>
        {places.map((ele, index) => (
          <Card place={ele} key={index}></Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  header: {
    height: '50%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 16,
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
  },
  main: {
    flexGrow: 1,
    padding: 16,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  article: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  articleImage: {
    width: 64,
    height: 64,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    marginRight: 12,
  },
  articleTitle: {
    fontWeight: '600',
    color: '#fff',
  },
  articleDescription: {
    color: '#b0b0b0',
  },
  nav: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    color: '#b0b0b0',
  },
  activeNavItem: {
    color: '#1e90ff',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: 'inherit',
  },
});

