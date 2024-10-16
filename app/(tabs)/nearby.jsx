import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
export default function TabFourScreen() {
  const data = [
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
      href: "../pages/Nearby Tourists",
      subtitle: "20 nearby",
      icon: "person"
    },
    {
      heading: "View Events",
      href: "../pages/ViewEvents",
      subtitle: "20 nearby",
      icon: "event"
    },
    {
      heading: "Add Events",
      href: "../pages/AddEvents",
      subtitle: "",
      icon: "note-add"
    },

  ]
  return (
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
