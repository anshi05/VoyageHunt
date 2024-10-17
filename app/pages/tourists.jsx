import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Modal, 
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import bg from '@/assets/images/background.jpg';

const tourists = [
  { id: '1', name: 'Abhijith', phone: '1234567890', email: 'abhijith@gmail.com' },
  { id: '2', name: 'Agnirudra', phone: '0987654321', email: 'rudrasil@gmail.com' },
  { id: '3', name: 'Anshi Sachan', phone: '1122334455', email: 'anshijio@gmail.com' },
  { id: '4', name: 'Shreyas Lal', phone: '5566778899', email: 'shreyaslal03@gmail.com' },
  { id: '5', name: 'Aryan', phone: '9988776655', email: 'aryan@gmail.com' },
];

export default function NearbyTourists() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTourist, setSelectedTourist] = useState(null);

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
      <TouchableOpacity onPress={() => handleIconPress(item)}>
        <Ionicons name="document-text-outline" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const handleIconPress = (tourist) => {
    setSelectedTourist(tourist);
    setModalVisible(true);
  };

  const handleCallPress = () => {
    const phoneNumber = `tel:${selectedTourist.phone}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <ImageBackground
      source={bg}
      style={styles.background}
      blurRadius={2}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={tourists}
          renderItem={renderTourist}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {selectedTourist && (
                <>
                  <Text style={styles.modalTitle}>{selectedTourist.name}</Text>
                  <Text style={styles.modalText}>Name: {selectedTourist.name}</Text>
                  <Text style={styles.modalText}>Email: {selectedTourist.email}</Text>
                  
                  
                  <Text style={styles.modalText}>Phone: {selectedTourist.phone}</Text>

                  <TouchableOpacity onPress={handleCallPress} style={styles.callButton}>
                    <Text style={styles.callButtonText}>Team Up? Call</Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Softer background overlay for elegance
    paddingHorizontal: 20, // Added horizontal padding for spacing
    paddingTop: 20, 
  },
  listContent: {
    padding: 10,
    paddingTop: 30,
  },
  touristCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light transparent card
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    elevation: 4, // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    backgroundColor: '#007AFF', // Bright blue badge for numbering
    color: 'white',
    borderRadius: 10,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    zIndex: 1,
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  touristImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2, // Add a border for emphasis
    borderColor: '#007AFF',
  },
  touristName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Darker text for contrast
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker modal overlay
  },
  modalContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20, // More rounded corners for a smooth effect
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Slightly more lifted
    shadowOpacity: 0.3,
    shadowRadius: 10, // Softer, more diffused shadow
    // Add gradient background
    backgroundColor: 'white', 
    // Add border
    borderWidth: 2, 
    borderColor: '#eaeaea', // Soft border color for elegance
    transform: [{ scale: 1 }], // For subtle animations
    transition: 'transform 0.3s ease-in-out', // Smooth transition when opened
  },
  
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2C3E50', // Darker title for emphasis
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#34495E', // Muted color for modal content
    textAlign: 'center',
    lineHeight: 22,
  },
  callButton: {
    backgroundColor: '#28A745', // Green color to indicate call-to-action
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginBottom: 10,
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Adds depth to the button
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#E74C3C', // Red color for the close button
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Lift the button
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
