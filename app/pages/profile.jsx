import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const EditProfile = () => {
  const [user, setuser] = useState()
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  // State for managing user profile
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function getUserByUID() {
      const data = await SecureStore.getItemAsync('session');
      const uid = JSON.parse(data).session.user.id;
      try {
        const { data, error } = await supabase
          .from('Users') // The table name is 'Users'
          .select('*') // Selecting all columns
          .eq('uid', uid); // Where the 'uid' column matches the provided UID

        if (error) {
          console.error('Error fetching user:', error);
          return null;
        }
        if (data.length > 0) {
          console.log('User found:', data[0]);

          setuser(data[0]) // Return the first matching user
        } else {
          console.log('No user found with this UID');
          return null;
        }
      } catch (error) {
        console.error('Error during fetching user by UID:', error);
        return null;
      }
    }
    getUserByUID()
  }, [])
  useEffect(() => {
    console.log(user)
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])


  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-4">
        {isEditing ? 'Edit Profile' : 'My Profile'}
      </Text>

      {isEditing ? (
        // Edit Mode
        <>
          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              value={name}
              onChangeText={setName}
            />
          </View>

        

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 h-24"
              value={email}
              onChangeText={setEmail}
              multiline
            />
          </View>

          <TouchableOpacity onPress={handleSave} className="bg-blue-500 rounded-lg p-3 mb-4">
            <Text className="text-white text-center font-bold">Save Changes</Text>
          </TouchableOpacity>
        </>
      ) : (
        // View Mode
        <>
          <View className="mb-6">
            <Text className="text-lg font-bold">Name:</Text>
            <Text className="text-gray-700">{name}</Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold">email:</Text>
            <Text className="text-gray-700">{email}</Text>
          </View>

        </>
      )}
    </View>
  );
};

export default EditProfile;
