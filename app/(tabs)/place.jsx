import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card'
export default function TabThreeScreen() {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  const [places, setplaces] = useState([]);

  useEffect(() => {
    getplaces();

  }, []);
  useEffect(() => {
    // console.log(places)
  }, [places])


  async function getplaces() {
    const { data } = await supabase.from("hotspots").select();
    setplaces(data);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Places</Text>
      <ScrollView>
        {places.map((place, index) => 
        (
          // console.log(place)
          <Card place={place} key={index}></Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});