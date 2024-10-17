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

const PhotoQuest = () => {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  const [places_db, setplaces_db] = useState([]);
  const [locations, setLocations] = useState([]);
  const [pickeroptions, setpickeroptions] = useState([])

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  useEffect(() => {
    getplaces_db();
  }, []);
  useEffect(() => {
    if (locations.length === 0) {

      let newlocations = shuffle(places_db).slice(0, 5);
      newlocations.map((place, index) => (
        console.log(place.place_names)
      ));
      newlocations.map((place, index) => (
        setLocations(prevItems => [...prevItems, {
          id: index,
          name: place.place_names,
          clue: place.clue,
          image: place.image,
          info: place.info_history
        }])
      ));
      places_db.map((place, index) => (
        setpickeroptions(prevItems => [...prevItems, place.place_names])
      ));

    }

  }, [places_db]);
  async function getplaces_db() {
    const { data } = await supabase.from("hotspots").select();
    if (places_db.length === 0) {
      setplaces_db(data);
    }
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
  const renderCurrentClue = () => {
    const currentLocation = locations[currentClueIndex];
    return (
      <View style={styles.clueContainer}>
        <Text style={styles.clue}>{currentLocation.clue}</Text>
        <Image source={{ uri: currentLocation.image }} style={styles.cardImage} />
        <Text className="mt-5 ml-3 text-gray-500">Select your guess here</Text>
        <Picker
          selectedValue={guess}
          onValueChange={(itemValue) => setGuess(itemValue)}
        >
          {pickeroptions.map((location, index) => (
            <Picker.Item key={index} label={location} value={location} />
          ))}
        </Picker>
        

        <TouchableOpacity style={styles.button} onPress={handleGuess}>
          <Text style={styles.buttonText}>Submit Guess</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Udupi Heritage Hunt</Text>
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
    textAlign: 'center',
    marginTop: 8,
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
  buttonText: {
    textAlign: 'center'
  }
});

export default PhotoQuest;
