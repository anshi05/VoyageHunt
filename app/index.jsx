
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../utils/supabase';

export default function Index() {
  useEffect(() => {
    const getEvents = async () => {
      try {

        const { data, error } = await supabase
          .from('PlaceDetails')
          .select('*')  // Fetches all columns

        if (error) {
          console.error('Error fetching data:', error)
        } else {
          console.log('Data:', data)
        }
        return data
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    getEvents();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo List</Text>
    </View>
  );
};

