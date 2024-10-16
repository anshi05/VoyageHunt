// FormUI.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const FormUI = () => {
  // State variables


  const [eventName, setEventName] = useState('Event 1');
  const [place, setPlace] = useState('Plce');
  const [fromDateTime, setFromDateTime] = useState('gh');
  const [toDateTime, setToDateTime] = useState('hhgfd');
  const [locations, setLocations] = useState([]);
  // const [eventName, setEventName] = useState(formData.name);
  // const [place, setPlace] = useState(formData.place);
  // const [fromDateTime, setFromDateTime] = useState(formData.form);
  // const [toDateTime, setToDateTime] = useState(formData.to);
  // const [locations, setLocations] = useState(formData.location);


  // Function to add a new location field
  const addLocation = () => {
    setLocations([...locations, { location: '', mapLink: '', clue: '', hint: '' }]);
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
    const data = {
      name: eventName,
      place: place,
      from: fromDateTime,
      to: toDateTime,
      location: locations, // array of maps of locations
    };
    // You can store the data in state or send it to a server here
    console.log(data);
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

      {/* From Date, Time */}
      <Text className="text-lg font-bold mb-2">From Date and Time</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter from date and time"
        value={fromDateTime}
        onChangeText={setFromDateTime}
      />

      {/* To Date, Time */}
      <Text className="text-lg font-bold mb-2">To Date and Time</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter to date and time"
        value={toDateTime}
        onChangeText={setToDateTime}
      />

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
          {/* Map Link */}
          <TextInput
            className="border rounded p-2 mb-2"
            placeholder="Map Link"
            value={loc.mapLink}
            onChangeText={(text) => handleLocationChange(index, 'mapLink', text)}
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