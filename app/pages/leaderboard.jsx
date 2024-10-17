import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { styled } from 'nativewind';
import ViewShot from 'react-native-view-shot';
import { createClient } from '@supabase/supabase-js';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Share } from 'react-native';
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
                    <StyledView key={index} className="items-center">
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

export default Leaderboard