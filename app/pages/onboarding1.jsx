import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const OnboardingStep1 = () => {
    const [reason, setReason] = useState('');

    const handleNext = () => {
        if (!reason) {
            alert('Please provide a reason.');
        } else {
            // Navigate to next step with reason stored
            router.push({
                pathname: '/onboardingStep2',
                params: { reason },
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Why do you prefer our app?</Text>
            <TextInput
                style={styles.input}
                placeholder="Tell us why..."
                placeholderTextColor="#A0A0A0"
                value={reason}
                onChangeText={setReason}
            />
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    // Add your styles here
});

export default OnboardingStep1;
