import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { createClient } from '@supabase/supabase-js';

const SnapSeek = () => {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  const [clues, setClues] = useState([]);
  const [selectedClue, setSelectedClue] = useState(null);
  const [guess, setGuess] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchClues() {
      const { data, error } = await supabase.from('hotspots').select('*');
      if (error) console.error(error);
      else setClues(data);
    }

    fetchClues();
  }, []);

  const startHunt = () => {
    const startTime = new Date().toISOString();
    console.log('Hunt started at:', startTime);
  };

  const handleClueSelection = (clue) => {
    setSelectedClue(clue);
    setModalVisible(true);
  };

  const checkGuess = () => {
    const p = { latitude: selectedClue.latitude, longitude: selectedClue.longitude }
    console.log(p)
    if (guess.toLowerCase() === selectedClue.place_names.toLowerCase()) {
      setModalVisible(false);
      router.push({
        pathname: '/pages/map',
        params: p,
      });
    } else {
      alert('Incorrect guess, try again!');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Start the Hunt" onPress={startHunt} />
      <FlatList
        data={clues}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { handleClueSelection(item); console.log(item) }}>
            <View style={{ padding: 20, backgroundColor: '#ccc', marginBottom: 10 }}>
              <Text>{item.clue}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

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

export default SnapSeek