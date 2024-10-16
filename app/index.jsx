
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../utils/supabase';

export default function Index() {
  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data, error } = await supabase.from('Events').select();

        if (error) {
          console.error('Error fetching todos:', error.message);
          return;
        }

        if (data) {
          console.log(data)
        }
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };

    getTodos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo List</Text>
    </View>
  );
};

