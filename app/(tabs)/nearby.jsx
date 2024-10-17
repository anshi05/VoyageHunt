import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import bg from '@/assets/images/background.jpg'
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function TabFourScreen() {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
  const [isBusiness, setisBusiness] = useState(false)
  const [data, setdata] = useState([
    {
      heading: "Restaurants",
      href: "../pages/restaurants",
      subtitle: "20 nearby",
      icon: "restaurant"
    },
    {
      heading: "Hotels",
      href: "../pages/hotels",
      subtitle: "20 nearby",
      icon: "hotel"
    },
    {
      heading: "Guides",
      href: "../pages/guides",
      subtitle: "20 nearby",
      icon: "tour"
    },
    {
      heading: "Tourists",
      href: "../pages/tourists",
      subtitle: "20 nearby",
      icon: "person"
    }

  ])
  useEffect(() => {
    async function getUserByUID() {
      const data = await SecureStore.getItemAsync('session');
      const uid = JSON.parse(data).session.user.id;
      try {
        const { data, error } = await supabase
          .from('Users') // The table name is 'Users'
          .select('*') // Selecting all columns
          .eq('uid', uid); // Where the 'uid' column matches the provided UID

        if (error) {
          console.error('Error fetching user:', error);
          return null;
        }
        if (data.length > 0) {
          console.log('User found:', data[0]);
          if (data[0].business_type.length === 0) {
            setisBusiness(false)
          }
          else {
            setisBusiness(true)
          }
          return data[0]; // Return the first matching user
        } else {
          console.log('No user found with this UID');
          return null;
        }
      } catch (error) {
        console.error('Error during fetching user by UID:', error);
        return null;
      }
    }
    getUserByUID()
  }, [])

  useEffect(() => {
    if (data.business_type !== "" && data.length === 5) {
      console.log(data.business_type === "")
      setdata(prevItems => [...prevItems, {
        heading: "Add Events",
        href: "../pages/addevents",
        subtitle: "",
        icon: "note-add"
      }])
    }
  }, [isBusiness])
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <ImageBackground
      source={bg} // Background image
      style={styles.background}
    // blurRadius={5} // Optional: to blur the background as in the screenshot
    >
      <View style={styles.container}>
        {data.map((ele, index) => (
          <Link href={ele.href} key={index} asChild>
            <TouchableOpacity style={styles.card}>
              <MaterialIcons name={ele.icon} size={40} color="#fff" />
              <Text style={styles.cardTitle}>{ele.heading}</Text>
              <Text style={styles.cardSubtitle}>{ele.subtitle}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '90%',
    alignItems: 'center',
  },
  card: {
    width: '40%',
    backgroundColor: '#2A2E3D', // dark background for cards
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
});
