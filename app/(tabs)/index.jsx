import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Home, Search, Book, MapPin } from 'lucide-react-native'; // Assuming you are using a compatible package
import type { ReactNode } from 'react'; // Import ReactNode type

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Welcome />
    </View>
  );
}

const Welcome = () => {
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
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.article}>
            <Image
              source={{ uri: 'https://example.com/placeholder.svg?height=64&width=64' }}
              style={styles.articleImage}
            />
            <View>
              <Text style={styles.articleTitle}>Udupi Krishna Mutt</Text>
              <Text style={styles.articleDescription}>
                Lord Krishna is depicted here as a small boy (Balakrishna). The idol is
                richly adorned and is viewed through a silver-plated window called the Navagraha Kitiki.
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.nav}>
        <NavItem icon={<Home size={24} />} label="Home" active />
        <NavItem icon={<Search size={24} />} label="Hunt" />
        <NavItem icon={<Book size={24} />} label="Guide" />
        <NavItem icon={<MapPin size={24} />} label="Nearby" />
      </View>
    </View>
  );
};

// Define types for the NavItem props
interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => {
  return (
    <View style={[styles.navItem, active ? styles.activeNavItem : {}]}>
      {icon}
      <Text style={styles.navLabel}>{label}</Text>
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

