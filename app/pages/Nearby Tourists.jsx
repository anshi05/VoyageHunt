import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tourists = [
  { id: '1', name: 'Abhijith' },
  { id: '2', name: 'Agnirudra' },
  { id: '3', name: 'Anshi Sachan' },
  { id: '4', name: 'Shreyas Lal' },
  { id: '5', name: 'Aryan' },
];

export default function NearbyTourists() {
  const renderTourist = ({ item, index }) => (
    <View style={styles.touristCard}>
      <View style={styles.touristInfo}>
        <View style={styles.imageContainer}>
          <Text style={styles.touristNumber}>{index + 1}</Text>
          <Image
            source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Cmkbp0SYpVLZ3pcTNmGHyXo1V8ApfN.png' }}
            style={styles.touristImage}
          />
        </View>
        <Text style={styles.touristName}>{item.name}</Text>
      </View>
      <Ionicons name="document-text-outline" size={24} color="#666" />
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Cmkbp0SYpVLZ3pcTNmGHyXo1V8ApfN.png' }}
      style={styles.background}
      blurRadius={5}
    >
      <SafeAreaView style={styles.container}>
        {/* Removed header section */}
        <FlatList
          data={tourists}
          renderItem={renderTourist}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  listContent: {
    padding: 16,
    paddingTop: 32,
  },
  touristCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
  },
  touristInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  touristNumber: {
    position: 'absolute',
    top: -10,
    left: -10,
    backgroundColor: '#007AFF',
    color: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
    fontWeight: 'bold',
    zIndex: 1,
  },
  touristImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  touristName: {
    fontSize: 16,
    fontWeight: '500',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
    paddingTop: 6,
  },
  activeNavText: {
    color: '#007AFF',
  },
});