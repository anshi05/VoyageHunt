import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const guides = [
  { id: '1', name: 'Abhijith', image: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 4.1, booked: false },
  { id: '2', name: 'Agniudra', image: 'https://randomuser.me/api/portraits/men/2.jpg', rating: 2.4, booked: true },
  { id: '3', name: 'Anshi Sachan', image: 'https://randomuser.me/api/portraits/men/3.jpg', rating: 4.5, booked: false },
  { id: '4', name: 'Marcus J.', image: 'https://randomuser.me/api/portraits/men/4.jpg', rating: 3.2, booked: true },
  { id: '5', name: 'Aryan', image: 'https://randomuser.me/api/portraits/men/5.jpg', rating: 4.6, booked: false },
];

export default function GuideSelection() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showSelection, setShowSelection] = useState(false);

  const handleGuideSelect = (guide, scaleAnim) => {
    setSelectedGuide(guide);
    setShowSelection(true);

    // Subtle enlargement animation
    Animated.timing(scaleAnim, {
      toValue: 1.05, // Slightly larger size
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Reverse the animation after some delay
      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 1, // Back to original size
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, 3000);  // Time to keep the guide enlarged
    });

    setTimeout(() => setShowSelection(false), 1000); // Hide the selected text after 3 seconds
  };

  const renderGuide = ({ item }) => {
    const scaleAnim = new Animated.Value(1);  // Unique animation value for each guide item
    return (
      <TouchableOpacity onPress={() => handleGuideSelect(item, scaleAnim)}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.row}>
            
            <Image source={{ uri: item.image }} style={styles.guideImage} />
            <View style={styles.guideDetails}>
              <Text style={styles.guideName}>{item.name}</Text>
              <View style={styles.statusRow}>
                <Ionicons
                  name={item.booked ? "close-circle" : "checkmark-circle"}
                  size={14}
                  color={item.booked ? "#FF6347" : "#50C878"} // Red for booked, Green for Available
                />
                <Text style={item.booked ? styles.bookedText : styles.availableText}>
                  {item.booked ? 'booked' : 'Available'}
                </Text>
              </View>
            </View>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
      </View>

      <FlatList
        data={guides}
        renderItem={renderGuide}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {showSelection && selectedGuide && (
        <View style={styles.selectionOverlay}>
          <Text style={styles.selectionText}>Guide Selected: {selectedGuide.name}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#1E1E2E',
  },
  header: {
    
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A4A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 16,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#2A2A3A',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rankCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#50505A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  guideImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 16,
  },
  guideDetails: {
    marginLeft: 16,
  },
  guideName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  bookedText: {
    color: '#FF6347', // Red for Unbooked
    marginLeft: 4,
    fontSize: 12,
  },
  availableText: {
    color: '#50C878', // Green for Available
    marginLeft: 4,
    fontSize: 12,
  },
  rating: {
    marginLeft: 'auto',
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectionOverlay: {
    position: 'absolute',
    bottom: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: '#50505A',
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
});