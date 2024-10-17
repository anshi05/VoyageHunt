import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import ViewShot from 'react-native-view-shot';
import { createClient } from '@supabase/supabase-js';

// Dummy data for leaderboard users
const leaderboardData = [
    { id: 1, name: 'User 1', avatar: 'https://avatar.iran.liara.run/public/boy', score: 120 },
    { id: 2, name: 'User 2', avatar: 'https://avatar.iran.liara.run/public/boy', score: 110 },
    { id: 3, name: 'User 3', avatar: 'https://avatar.iran.liara.run/public/boy', score: 100 },
    { id: 4, name: 'User 4', avatar: 'https://avatar.iran.liara.run/public/boy', score: 90 },
    { id: 5, name: 'User 5', avatar: 'https://avatar.iran.liara.run/public/boy', score: 80 },
    { id: 6, name: 'User 6', avatar: 'https://avatar.iran.liara.run/public/boy', score: 75 },
    { id: 7, name: 'User 7', avatar: 'https://avatar.iran.liara.run/public/boy', score: 70 },
    { id: 8, name: 'User 8', avatar: 'https://avatar.iran.liara.run/public/boy', score: 65 },
    { id: 9, name: 'User 9', avatar: 'https://avatar.iran.liara.run/public/boy', score: 60 },
    { id: 10, name: 'User 10', avatar: 'https://avatar.iran.liara.run/public/boy', score: 55 },
];

// Styling component
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const Leaderboard = () => {
    const imgurl = "https://avatar.iran.liara.run/public/boy";
    const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
    const [users, setusers] = useState([])
    useEffect(() => {
        const getTopUsers = async () => {
            const { data, error } = await supabase
                .from('Users')                  // The table you're querying
                .select('name, points')                 // Selecting only the 'name' column
                .order('points', { ascending: false })  // Ordering by 'points' in descending order
                .limit(10);                     // Limiting the results to 10

            if (error) {
                console.error('Error fetching users:', error);
            } else {
                console.log('Top 10 users by points:', data);
            }
            setusers(data)
        };

        // Example usage
        getTopUsers();
    }, [])



    const viewShotRef = useRef(null);
    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            {/* Top 3 Users */}
            <StyledView className="flex-row justify-around mb-6">
                {users.slice(0, 3).map((user, index) => (
                    <StyledView key={user.id} className="items-center">
                        <StyledImage
                            source={{ uri: imgurl }}
                            className="w-20 h-20 rounded-full border-2 border-yellow-400"
                            resizeMode="cover"
                        />
                        <StyledText className="text-lg font-semibold mt-2">{user.name}</StyledText>
                        <StyledText className="text-sm text-gray-600">Score: {user.points}</StyledText>
                    </StyledView>
                ))}
            </StyledView>

            {/* Users from 4th to 10th */}
            <StyledView>
                {users.slice(3, 10).map((user, index) => (
                    <StyledView
                        key={user.id}
                        className="flex-row items-center p-4 mb-3 bg-white rounded-lg shadow-sm"
                    >
                        <StyledImage
                            source={{ uri: imgurl }}
                            className="w-12 h-12 rounded-full mr-4"
                            resizeMode="cover"
                        />
                        <StyledView className="flex-1">
                            <StyledText className="font-semibold">{user.name}</StyledText>
                            <StyledText className="text-gray-600">Score: {user.points}</StyledText>
                        </StyledView>
                    </StyledView>
                ))}
            </StyledView>

        </ScrollView>
    );
};

export default Leaderboard;
