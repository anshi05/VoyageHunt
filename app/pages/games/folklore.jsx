import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Animated } from 'react-native';

// Full page background image
const backgroundImage = 'https://img.freepik.com/premium-photo/feeding-frenzy-unraveling-competition-food-amongst-horde-fishes_983420-176657.jpg';

const stories = [
  {
    title: "The Creation of Coastal Karnataka",
    shortDescription: "The sage Parashurama created Udupi from the sea, blessing the coastal people.",
    fullDescription: "According to legend, the sage Parashurama, an avatar of Lord Vishnu, was responsible for creating the coastal land of Karnataka, including Udupi. After reclaiming the land from the sea, it became a fertile area for fishing and other coastal activities. The people of the coast, known as the Mogaveeras, were traditionally fishermen, and their livelihood was tied to the sea, a blessing attributed to Parashurama."
  },
  {
    title: "The Tale of the Mogaveera Fishermen",
    shortDescription: "The Mogaveeras were warrior fishermen blessed by their deity for safe return.",
    fullDescription: "The Mogaveeras, an ancient community of fisherfolk in Udupi, have a fascinating story about their origins. It is believed that they were warriors who later adopted fishing as their primary occupation. These fishermen would embark on perilous sea voyages in their small wooden boats, trusting in the blessings of their deity, Shri Brahma Baidarkala Garadi, for good catch and safe return."
  },
  {
    title: "Koti-Chennaya: The Legendary Brothers",
    shortDescription: "The twin warrior brothers had adventures with local fishermen along the coast.",
    fullDescription: "The folk epic of Koti-Chennaya, two legendary twin brothers from the Tulu-speaking regions of coastal Karnataka, includes stories of their adventures along the coast. While primarily known as warrior heroes, some versions of the story narrate their encounters with fishermen and how they were once aided by local fisherfolk to cross dangerous seas or catch fish during times of scarcity."
  },
  {
    title: "Boji Malpe: The Tragic Love Story",
    shortDescription: "A fisherman named Boji Malpe lost at sea, serves as a cautionary tale.",
    fullDescription: "In Udupi, a famous local legend is the story of Boji Malpe, a fisherman from the Malpe region, who was in love with a beautiful woman from a neighboring village. He set off on a dangerous fishing voyage, hoping to return with a large catch to win her hand in marriage. However, he never returned, lost to the treacherous waters. His story serves as a reminder of the unpredictable nature of the sea."
  },
  {
    title: "The Sacred Fish of Krishna Matha",
    shortDescription: "Feeding sacred fish at Krishna Matha brings good fortune to fishermen.",
    fullDescription: "At Udupi's famous Krishna Matha temple, there is a pond that houses sacred fish. It is believed that feeding the fish brings good fortune, and they are considered descendants of the ancient fish revered by local fishermen. Fishermen who encountered trouble at sea would often return to the temple to offer thanks for their safe passage."
  },
  {
    title: "Bhootada Kola: Spirit Worship",
    shortDescription: "Rituals invoking spirits protect fishermen from dangers at sea.",
    fullDescription: "In coastal Karnataka, particularly in Udupi, the Bhootada Kola (spirit worship) tradition includes rituals where spirits, or Bhootas, are invoked to protect fishermen. Ancient stories tell of how these Bhootas, especially spirits like Panjurli and Kallurti, have guided fishermen, warning them of storms, bad tides, or where to find the best catch."
  }
];

const InteractiveCard = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [visibleCards, setVisibleCards] = useState(3); // Show only first 3 cards by default

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const showMoreCards = () => {
    setVisibleCards(stories.length); // Show all cards
  };

  const renderStoryCard = (story, index) => (
    <View key={index} style={styles.card}>
      <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.touchable}>
        <Text style={styles.cardTitle}>{story.title}</Text>
        <Text style={styles.cardDescription}>
          {expandedIndex === index ? story.fullDescription : story.shortDescription}
        </Text>
      </TouchableOpacity>
      <Text style={styles.expandToggle}>
        {expandedIndex === index ? 'Show Less' : 'Read More'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {stories.slice(0, visibleCards).map((story, index) => renderStoryCard(story, index))}

          {visibleCards < stories.length && (
            <TouchableOpacity onPress={showMoreCards} style={styles.showMoreButton}>
              <Text style={styles.buttonText}>Show More</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFD700', // Yellow color for the card
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  touchable: {
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007C92', // Peacock color
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  expandToggle: {
    fontSize: 14,
    color: '#007C92',
    textAlign: 'right',
    marginTop: 5,
  },
  showMoreButton: {
    backgroundColor: '#007C92',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default InteractiveCard;