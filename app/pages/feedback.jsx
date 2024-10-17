import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const improvementOptions = [
  'Overall Service',
  'Map Accuracy',
  'Ease of Team-Up',
  'Meet New People',
  'Guide Match',
  'Guide Ratings',
  'Customer Support',
  'Events Hosted',
  'User-Generated Response',
  'Transparency',
  'Other'
];

export default function FeedbackPage() {
  const [rating, setRating] = useState(4);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedback, setFeedback] = useState('');

  const toggleOption = (option) => {
    setSelectedOptions(prevOptions =>
      prevOptions.includes(option)
        ? prevOptions.filter(item => item !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>

        <Text style={styles.title}>Tell us what you think</Text>

        <Text style={styles.question}>
          How would you rate the overall experience with Agnirudra?
        </Text>

        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'} // Swap heart for star
                size={star <= rating ? 48 : 32}  // Make selected star larger
                color="white"  // White color for stars
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ratingText}>
          {rating < 5 ? 'Good, but still can be better' : 'Excellent!'}
        </Text>

        <Text style={styles.question}>What should we improve?</Text>

        <View style={styles.optionsContainer}>
          {improvementOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedOptions.includes(option) && styles.selectedOption,
              ]}
              onPress={() => toggleOption(option)}
            >
              <Text style={[
                styles.optionText,
                selectedOptions.includes(option) && styles.selectedOptionText,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.question}>
          Please, tell us more about it (not required)
        </Text>

        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Start typing here"
          placeholderTextColor="white" // Placeholder text color changed to white
          value={feedback}
          onChangeText={setFeedback}
        />

        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0FAD', // Dark purple color background
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFD700', // Gold text color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold text color
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFD700', // Gold text color
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  ratingText: {
    textAlign: 'center',
    color: '#FFD700', // Gold text color
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#FFD700', // Gold border color for options
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
  },
  selectedOption: {
    backgroundColor: 'white', // Background for selected options in white
  },
  optionText: {
    color: '#FFD700', // Gold text color
  },
  selectedOptionText: {
    color: 'black', // Change selected text to black for better contrast
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFD700', // Gold border color for input
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: 'white', // White background for send button
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'black', // Change text color to black for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
});