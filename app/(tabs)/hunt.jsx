import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { createClient } from '@supabase/supabase-js';

const GameCard = ({ title, clue, difficulty, icon, onStart }) => {
  return (
    <View className="bg-yellow-100 p-4 m-2 rounded-lg shadow-md">
      <Image source={icon} className="w-12 h-12 mb-4" />
      <Text className="text-xl font-bold mb-2">{title}</Text>
      <Text className="text-gray-700 mb-4">{clue}</Text>
      <View className="flex-row items-center mb-2">
        <Text className="text-sm font-bold text-gray-800">Difficulty: </Text>
        <Text className="text-yellow-600">{difficulty}</Text>
      </View>
      <TouchableOpacity onPress={onStart} className="bg-yellow-600 p-2 rounded-lg">
        <Text className="text-white text-center">Start Quest</Text>
      </TouchableOpacity>
    </View>
  );
};
const EventCard = ({ event_name, event_place, from, to, desc, onStart }) => {
  return (
    <View className="bg-yellow-100 p-4 m-2 rounded-lg shadow-md">
      <Image source={require('@/assets/images/hunt1.png')} className="w-12 h-12 mb-4" />
      <Text className="text-xl font-bold mb-2">{event_name}</Text>
      <Text className="text-gray-700 mb-4">{event_place}</Text>
      <Text className="text-gray-700 mb-4">{desc}</Text>
      <TouchableOpacity onPress={onStart} className="bg-yellow-600 p-2 rounded-lg">
        <Text className="text-white text-center">Start Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

const Hunt = () => {
  const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
  const [events, setEvents] = useState([]);
  const [indiEvents, setIndiEvents] = useState([]);
  useEffect(() => {
    getEvents();
    getIndiEvents();
  }, []);

  async function getEvents() {
    const { data } = await supabase.from("Events").select();
    setEvents(data);
  }
  async function getIndiEvents() {
    const { data } = await supabase.from("individual_events").select();
    setIndiEvents(data);
  }

  const startQuest = (href, mode) => {
    router.push({
      pathname: href,
      params: { mode },
    });
  };

  return (
    <ScrollView className="bg-yellow-200">
      {/* Link to Leaderboard */}
      <Link href="/pages/leaderboard" className="m-3 text-center text-blue-600 underline bg-yellow-600 p-2 rounded-lg">
        <Text className="text-white text-center">Leaderboard</Text>
      </Link>
      <View className="p-4">
        {/* Individual Section */}
        <Text className="text-2xl font-bold text-center mb-6">Individual games</Text>
        {/* Game Cards */}
        {indiEvents.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            clue={game.clue}
            difficulty={game.difficulty}
            icon={require('@/assets/images/hunt1.png')}
            onStart={() => startQuest(game.href, "game")}
          />
        ))}


        {/* Multiplayer Events Section */}
        <Text className="text-2xl font-bold text-center mb-6">Multiplayer Events</Text>
        {/* Game Cards */}
        {events.map((event, index) => (
          <EventCard
            key={index}
            event_name={event.event_name}
            event_place={event.event_place}
            desc={event.desc}
            onStart={() => startQuest('pages/games/business_event', event.id)}
          />
        ))}
      </View >
    </ScrollView >
  );
};

export default Hunt;
