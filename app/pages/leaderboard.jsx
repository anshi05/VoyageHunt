import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Share } from 'react-native';
import { styled } from 'nativewind';
import { createClient } from '@supabase/supabase-js';

// Styling component
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const Leaderboard = () => {
    const imgurl = "https://avatar.iran.liara.run/public/boy";
    const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

    const [users, setUsers] = useState([]);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [loading, setLoading] = useState(true); // Add loading state
    const leaderboardRef = useRef(null); // Reference for screenshot

    useEffect(() => {
        const getTopUsers = async () => {
            const { data, error } = await supabase
                .from('Users')
                .select('name, points')
                .order('points', { ascending: false })
                .limit(10);

            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(data);
            }
            setLoading(false); // Set loading to false after fetching
        };

        getTopUsers();

        if (status === null) {
            requestPermission();
        }
    }, [status, requestPermission]);

    const onCapture = async () => {
        try {
            const localUri = await captureRef(leaderboardRef, {
                height: 800,
                quality: 1,
            });
    
            await MediaLibrary.saveToLibraryAsync(localUri);
    
            Alert.alert('Screenshot Taken', 'Screenshot has been saved to your library.');
        } catch (error) {
            console.error('Error capturing screenshot:', error);
            Alert.alert('Error', 'Failed to capture and save the screenshot.');
        }
    };
    return (
        <GestureHandlerRootView style={styles.container}>
            {loading ? (
                <Text>Loading leaderboard...</Text>
            ) : (
                <View style={styles.leaderboardContainer} ref={leaderboardRef}>
                    <ScrollView>
                        {/* Top 3 Users */}
                        <StyledView style={styles.topUsers}>
                            {users.slice(0, 3).map((user, index) => (
                                <StyledView key={index} style={styles.userCard}>
                                    <StyledImage
                                        source={{ uri: imgurl }}
                                        style={styles.topUserImage}
                                        resizeMode="cover"
                                    />
                                    <StyledText style={styles.userName}>{user.name}</StyledText>
                                    <StyledText style={styles.userScore}>Score: {user.points}</StyledText>
                                </StyledView>
                            ))}
                        </StyledView>

                        {/* Remaining Users */}
                        <StyledView>
                            {users.slice(3, 10).map((user, index) => (
                                <StyledView key={index} style={styles.regularUserCard}>
                                    <StyledImage
                                        source={{ uri: imgurl }}
                                        style={styles.userImage}
                                        resizeMode="cover"
                                    />
                                    <StyledView style={styles.userInfo}>
                                        <StyledText style={styles.userName}>{user.name}</StyledText>
                                        <StyledText style={styles.userScore}>Score: {user.points}</StyledText>
                                    </StyledView>
                                </StyledView>
                            ))}
                        </StyledView>
                    </ScrollView>
                </View>
            )}

            {/* Button to Capture Screenshot */}
            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={onCapture}
                >
                    <Text style={styles.buttonLabel}>Capture & Save Leaderboard</Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

export default Leaderboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    leaderboardContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    topUsers: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    userCard: {
        alignItems: 'center',
    },
    topUserImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    regularUserCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userScore: {
        fontSize: 14,
        color: '#777',
    },
    footerContainer: {
        padding: 16,
        alignItems: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#1a73e8',
    },
    primaryButton: {
        backgroundColor: '#1a73e8',
    },
    buttonLabel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
