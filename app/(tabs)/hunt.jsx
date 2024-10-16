import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const locations = [
  {
    id: '1',
    name: 'Sri Krishna Temple',
    clue: 'To find your first stop, seek the place where prayers fill the air, and colorful flags dance with flair.',
    image: 'https://kediyoorhotels.com/wp-content/uploads/2023/12/udupi-temple-1.jpg',
    info: 'A famous temple dedicated to Lord Krishna, known for its unique architecture.',
  },
  {
    id: '2',
    name: 'Malpe Beach',
    clue: 'Now head to the shores where the waves crash and play, where sun and surf welcome you every day.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/45/6c/bb/early-morning-at-the.jpg?w=1200&h=-1&s=1',
    info: 'A beautiful beach known for its serene beauty and water sports.',
  },
  {
    id: '3',
    name: 'Udupi Sri Krishna Matha',
    clue: 'Next, visit the birthplace of a wise philosopher, where devotion runs deep and the food is a flavor.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgGYJZ_IyvOINE6_-AiN9AocYtD1skcKVUg&s',
    info: 'The birthplace of the famous Dvaita philosopher Madhvacharya.',
  },
  {
    id: '4',
    name: 'Kaup Beach',
    clue: 'Finally, to finish this treasure hunt with glee, find the lighthouse that watches over the sea.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/45/6c/bb/early-morning-at-the.jpg?w=1200&h=-1&s=1',
    info: 'Known for its lighthouse and stunning sunset views.',
  },
];

const Hunt = () => {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  const [places, setplaces] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getplaces();
  }, []);
  useEffect(() => {
    places.map((place, index) => (
      setLocations(prevItems => [...prevItems, {
        id: index,
        name: place.place_names,
        clue: place.clue,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/45/6c/bb/early-morning-at-the.jpg?w=1200&h=-1&s=1',
      }])
    ));
  }, [places]);
  useEffect(() => {
    console.log(locations)
  }, [locations])

  async function getplaces() {
    const { data } = await supabase.from("hotspots").select().limit(4);
    setplaces(data);
  }
  const [completedLocations, setCompletedLocations] = useState([]);
  const [rewards, setRewards] = useState(0);
  const [guess, setGuess] = useState('');
  const [currentClueIndex, setCurrentClueIndex] = useState(0);

  const handleGuess = () => {
    const currentLocation = locations[currentClueIndex];

    if (guess.toLowerCase() === currentLocation.name.toLowerCase()) {
      Alert.alert('Correct!', `You guessed ${currentLocation.name}!\n\n${currentLocation.info}`, [
        {
          text: 'Next Clue',
          onPress: () => {
            setRewards(rewards + 1);
            setCompletedLocations([...completedLocations, currentLocation.id]);
            setGuess('');
            setCurrentClueIndex(currentClueIndex + 1);
          },
        },
      ]);
    } else {
      Alert.alert('Try Again!', 'Your guess is not correct. Please try again.');
    }
  };

  const restartGame = () => {
    setCompletedLocations([]);
    setRewards(0);
    setGuess('');
    setCurrentClueIndex(0);
  };
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const renderCurrentClue = () => {
    const currentLocation = locations[currentClueIndex];
    const newlocations = shuffle(locations);

    return (
      <View style={styles.clueContainer}>
        <Text style={styles.clue}>{currentLocation.clue}</Text>
        <Text>Select your guess here</Text>
        <Picker
          selectedValue={guess}
          onValueChange={(itemValue) => setGuess(itemValue)}
        >
          {newlocations.map((location, index) => (
            <Picker.Item label={location.name} value={location.name} />
          ))}

        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleGuess}>
          <Text style={styles.buttonText}>Submit Guess</Text>
        </TouchableOpacity>
        <Image source={{ uri: currentLocation.image }} style={styles.cardImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Udupi Treasure Hunt</Text>
      {currentClueIndex < locations.length ? (
        renderCurrentClue()
      ) : (
        <View style={styles.congratulationsContainer}>
          <Text style={styles.congratulations}>
            Congratulations! You've completed the treasure hunt! Total Rewards: {rewards}
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.restartButtonText}>Restart Game</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.footer}>
        Rewards Earned: {rewards}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
    textAlign: 'center',
  },
  clueContainer: {
    marginBottom: 16,
  },
  clue: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#A0A0A0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFF',
    backgroundColor: '#2A2A3A',
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  restartButton: {
    backgroundColor: '#FF6347',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  restartButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
    marginTop: 10,
  },
  footer: {
    marginTop: 16,
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  congratulations: {
    marginTop: 16,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  congratulationsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Hunt;
