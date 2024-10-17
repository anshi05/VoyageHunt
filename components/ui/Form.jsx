// FormUI.js
import { createClient } from '@supabase/supabase-js';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const FormUI = () => {
  // State variables
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

  const [eventName, setEventName] = useState('Event 1');
  const [place, setPlace] = useState('Plce');
  const [fromDateTime, setFromDateTime] = useState('gh');
  const [toDateTime, setToDateTime] = useState('hhgfd');
  const [desc, setDesc] = useState('Plce');
  const [locations, setLocations] = useState([]);
  // const [eventName, setEventName] = useState(formData.name);
  // const [place, setPlace] = useState(formData.place);
  // const [fromDateTime, setFromDateTime] = useState(formData.form);
  // const [toDateTime, setToDateTime] = useState(formData.to);
  // const [locations, setLocations] = useState(formData.location);


  // Function to add a new location field
  const addLocation = () => {
    setLocations([...locations, { location: '', latitudes: '', longitudes: '', clue: '', hint: '' }]);
  };

  // Function to remove a location field
  const removeLocation = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  // Function to handle change in location fields
  const handleLocationChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const formdata = {
      event_name: eventName,
      event_place: place,
      locations: locations, // array of maps of locations
      desc: desc
    };
    async function insertData() {
      const { error } = await supabase
        .from('Events')  // Replace 'Users' with your table name
        .insert(formdata);
      console.log(error)
    }
    insertData()

    // You can store the data in state or send it to a server here
    console.log(formdata);
    Alert.alert('Form Submitted', 'Data has been logged to the console.');
  };

  return (
    <View className="p-4">
      {/* Event Name */}
      <Text className="text-lg font-bold mb-2">Event Name</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter event name"
        value={eventName}
        onChangeText={setEventName}
      />

      {/* Place */}
      <Text className="text-lg font-bold mb-2">Place</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter place"
        value={place}
        onChangeText={setPlace}
      />

      {/* Description */}
      <Text className="text-lg font-bold mb-2">Description</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter place"
        value={desc}
        onChangeText={setDesc}
      />

      {/* From Date, Time */}
      {/* <Text className="text-lg font-bold mb-2">From Date and Time</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter from date and time"
        value={fromDateTime}
        onChangeText={setFromDateTime}
      /> */}

      {/* To Date, Time */}
      {/* <Text className="text-lg font-bold mb-2">To Date and Time</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter to date and time"
        value={toDateTime}
        onChangeText={setToDateTime}
      /> */}

      {/* Locations */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">Locations</Text>
        {/* '+' Button to add location */}
        <TouchableOpacity
          className="bg-blue-500 rounded p-2"
          onPress={addLocation}
        >
          <Text className="text-white text-center">+ Add Location</Text>
        </TouchableOpacity>
      </View>

      {locations.map((loc, index) => (
        <View key={index} className="border rounded p-4 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-semibold">Location {index + 1}</Text>
            {/* '-' Button to remove location */}
            <TouchableOpacity
              className="bg-red-500 rounded p-2"
              onPress={() => removeLocation(index)}
            >
              <Text className="text-white text-center">Remove</Text>
            </TouchableOpacity>
          </View>
          {/* Location */}
          <TextInput
            className="border rounded p-2 mb-2"
            placeholder="Location"
            value={loc.location}
            onChangeText={(text) => handleLocationChange(index, 'location', text)}
          />
          {/*  Latitudes */}
          <TextInput
            className="border rounded p-2 mb-2"
            placeholder="Latitudes"
            value={loc.latitudes}
            onChangeText={(text) => handleLocationChange(index, 'latitudes', text)}
          />
          {/* Longitudes */}
          <TextInput
            className="border rounded p-2 mb-2"
            placeholder="Longitudes"
            value={loc.longitudes}
            onChangeText={(text) => handleLocationChange(index, 'longitudes', text)}
          />
          {/* Clue */}
          <TextInput
            className="border rounded p-2 mb-2"
            placeholder="Clue"
            value={loc.clue}
            onChangeText={(text) => handleLocationChange(index, 'clue', text)}
          />
          {/* Hint */}
          <TextInput
            className="border rounded p-2 mb-2"
            placeholder="Hint"
            value={loc.hint}
            onChangeText={(text) => handleLocationChange(index, 'hint', text)}
          />
        </View>
      ))}

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-green-500 rounded p-2"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormUI;