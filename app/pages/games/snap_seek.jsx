import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import { useLocalSearchParams } from 'expo-router';

import * as SecureStore from 'expo-secure-store';
import { StyleSheet } from 'react-native';

const SnapSeek = () => {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  const [uid, setuid] = useState()
  useEffect(() => {
    async function getUid() {
      const data = await SecureStore.getItemAsync('session');
      console.log(JSON.parse(data).session.user.id)
      return JSON.parse(data).session.user.id;
    }
    setuid(getUid())
  }, [])

  const updateUserPoints = async (uid) => {
    console.log(uid._j)
    let { data: user, error: fetchError } = await supabase
      .from('Users')
      .select('*')
      .eq('uid', uid._j)

    if (fetchError) {
      console.error('Error fetcdfhing user points:', fetchError);
      return;
    }
    else {
      console.log("points: ", user[0].points)
    }

    // Update the points (increment by 25)
    const newPoints = user[0].points + 25;
    console.log(newPoints)
    const { data, error: updateError } = await supabase
      .from('Users')
      .update({ points: newPoints })
      .eq('uid', uid._j);

    if (updateError) {
      console.error('Error updating user points:', updateError);
    } else {
      console.log('User points updated:', data);
    }
  };

  const [clues, setClues] = useState([]);
  const [selectedClue, setSelectedClue] = useState(null);
  const [guess, setGuess] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [showClues, setshowClues] = useState(false)

  useEffect(() => {
    async function fetchClues() {
      const { data, error } = await supabase.from('hotspots').select('*');
      if (error) console.error(error);
      else setClues(data);
    }

    fetchClues();
  }, []);

  const startHunt = () => {
    setshowClues(true)
  };
  const exitHunt = () => {
    setshowClues(false)
  };

  const handleClueSelection = (clue) => {
    setSelectedClue(clue);
    setModalVisible(true);
  };

  const checkGuess = () => {
    console.log(selectedClue)
    const p = { latitude: selectedClue.latitude, longitude: selectedClue.longitude, info_history: selectedClue.info_history, place_names: selectedClue.place_names, visitors: selectedClue.visitors }
    if (guess.toLowerCase() === selectedClue.place_names.toLowerCase()) {
      setModalVisible(false);
      alert('Congrats. you won 25% of points. \nClick on the pin on the map. If you are near, you get an option to upload photo. Else you can view details on click');
      updateUserPoints(uid);
      router.push({
        pathname: '/pages/map2',
        params: p,
      });
    } else {
      alert('Incorrect guess, try again!');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {!showClues && <Button title="Start the Hunt" onPress={startHunt} />}
      {showClues && <Button title="Exit" onPress={exitHunt} />}
      {showClues && <FlatList
        data={clues}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => { handleClueSelection(item); console.log(item) }}>
            <View style={{ padding: 20, backgroundColor: '#ccc', marginBottom: 10 }}>
              <Text style={styles.cardTitle}>{item.clue}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />}

      {/* Modal for guessing */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Guess the place for this clue:</Text>
            <TextInput
              placeholder="Your guess"
              value={guess}
              onChangeText={setGuess}
              style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Submit Guess" onPress={checkGuess} />
            <Button title="Close" onPress={() => { setModalVisible(false) }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D3D3D3', // Light gray color for card
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', // Black color for text
  },
});

export default SnapSeek