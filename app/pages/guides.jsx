import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const guideslist = [
  {
    id: '1',
    name: 'John Doe',
    image: 'data:image/png;base64,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',
    email: 'john@example.com',
    phone: '1234567890',
    bio: 'Experienced guide with a passion for adventure.',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: 'data:image/png;base64,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',
    email: 'jane@example.com',
    phone: '0987654321',
    bio: 'Expert in cultural tours and local history.',
    rating: 4.8,
  },
];

export default function Guides() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showSelection, setShowSelection] = useState(false);
  const [hired, setHired] = useState(false);

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide);
    setShowSelection(true);
    setHired(false); // Reset hired state when selecting a new guide
  };

  const handleHire = () => {
    setHired(true);
  };

  const handleCall = () => {
    if (selectedGuide) {
      Linking.openURL(`tel:${selectedGuide.phone}`);
    }
  };

  const renderGuide = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleGuideSelect(item)}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.guideImage} />
            <View style={styles.guideDetails}>
              <Text style={styles.guideName}>{item.name}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="document-text-outline" size={24} color="#FFD700" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={guideslist}
        renderItem={renderGuide}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {showSelection && selectedGuide && (
        <View style={styles.selectionOverlay}>
          <Text style={styles.selectionText}>Guide Selected: {selectedGuide.name}</Text>
          <Text style={styles.infoText}>Email: {selectedGuide.email}</Text>
          <Text style={styles.infoText}>Phone: {selectedGuide.phone}</Text>
          <Text style={styles.bioText}>{selectedGuide.bio}</Text>
          <Text style={styles.ratingText}>Rating: {selectedGuide.rating} ⭐ </Text>

          {!hired ? (
            <TouchableOpacity style={styles.hireButton} onPress={handleHire}>
              <Text style={styles.hireButtonText}>Hire</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.hiredMessage}>We’ve let {selectedGuide.name} know!</Text>
              <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                <Text style={styles.callButtonText}>Call and get a quote!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowSelection(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#1E1E2E',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  guideImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  guideDetails: {
    flex: 1,
    marginLeft: 10,
  },
  guideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionOverlay: {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    right: '10%',
    backgroundColor: '#3A3A4A',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#AFAFAF',
    fontSize: 14,
    marginVertical: 4,
  },
  bioText: {
    color: '#AFAFAF',
    fontSize: 14,
    marginVertical: 8,
    textAlign: 'center',
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hireButton: {
    backgroundColor: '#1ABC9C',
    padding: 5,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    marginTop: 10,
  },
  hireButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hiredMessage: {
    marginTop: 10,
    fontSize: 16,
    color: '#50C878',
  },
  callButton: {
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginTop: 10,
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
