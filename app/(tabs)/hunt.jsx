import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

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

const Hunt = () => {
  // Dummy data for game cards
  const games = [
    {
      title: "Photo Quest",
      clue: "Unravel the Clues, Spot the Landmarks—Can You Guess the Place?",
      difficulty: "Easy",
      icon: require('@/assets/images/hunt1.png'), // Add your image path,
      href: "pages/games/photo_quest"
    },
    {
      title: "Nritya Gyaan",
      clue: "Yakshagana Unveiled: Truth or Tale? Test Your Knowledge!",
      difficulty: "Medium",
      icon: require('@/assets/images/hunt1.png'), // Add your image path
      href: "pages/games/nritya_gyaan"
    },
    {
      title: "Snap & Seek: Udupi Edition",
      clue: "Capture the Spirit of Udupi: Your Lens, Your Adventure!",
      difficulty: "Hard",
      icon: require('@/assets/images/hunt1.png'), // Add your image path
      href: "pages/games/snap_seek"
    }
  ];

  const startQuest = (href) => {
    router.push(href)
  };

  return (
    <ScrollView className="bg-yellow-200">
      <View className="p-4">
        {/* Title Section */}
        <Text className="text-2xl font-bold text-center mb-6">Select Your Treasure Hunt</Text>

        {/* Game Cards */}
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            clue={game.clue}
            difficulty={game.difficulty}
            icon={game.icon}
            onStart={() => startQuest(game.href)}
          />
        ))}
        {/* Link to Leaderboard */}
        <View className="mt-6">
          <Link href="/leaderboard" className="text-center text-blue-600 underline">
            View Leaderboard
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Hunt;
