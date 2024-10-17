import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const EditProfile = () => {
  useEffect(() => {
    async function getUid() {
      const data = await SecureStore.getItemAsync('session');
      console.log(JSON.parse(data).session.user.id)
      return data;
    }
    getUid()
  }, [])


  // State for managing user profile
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit
  const [name, setName] = useState('John Doe');
  const [location, setLocation] = useState('Udupi');
  const [bio, setBio] = useState('Adventurer, Explorer, and Udupi lover.');

  // Function to handle save
  const handleSave = () => {
    // Logic to save changes to the database
    console.log('Profile updated:', { name, location, bio });
    setIsEditing(false); // Switch back to view mode after saving
  };

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
            <Text className="text-gray-600 mb-1">Location</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Bio</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 h-24"
              value={bio}
              onChangeText={setBio}
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
            <Text className="text-lg font-bold">Location:</Text>
            <Text className="text-gray-700">{location}</Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold">Bio:</Text>
            <Text className="text-gray-700">{bio}</Text>
          </View>

          <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-blue-500 rounded-lg p-3">
            <Text className="text-white text-center font-bold">Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default EditProfile;
