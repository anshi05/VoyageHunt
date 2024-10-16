// app/pages/EditProfile.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabase'; // Adjust path if needed

const EditProfile = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch current user profile data
    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                const { data, error } = await supabase
                    .from('TouristsData') // Table where user profile data is stored
                    .select('name, location, bio')
                    .eq('uid', session.user.id) // Assuming uid stores the user ID
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                } else {
                    setName(data.name);
                    setLocation(data.location);
                    setBio(data.bio);
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            const { error } = await supabase
                .from('TouristsData') // Table where profile data is stored
                .update({ name, location, bio })
                .eq('uid', session.user.id); // Update data for the current user

            if (error) {
                Alert.alert('Error', 'There was an issue updating your profile.');
                console.error('Update error:', error);
            } else {
                Alert.alert('Success', 'Profile updated successfully!');
            }
        }
    };

    if (loading) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
                multiline
            />

            <Button title="Save Changes" onPress={handleUpdateProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default EditProfile;
