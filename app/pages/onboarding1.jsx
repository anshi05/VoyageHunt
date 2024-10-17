import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';

const questions = [
    {
        question: "Which types of places best suit you?",
        options: [
            { label: "Nature", image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZdM4Naw6g6mBZtWbsk8r4u0DEauhmvKrpFg&s' } },
            { label: "Culture", image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcx_leYJGylcrx2s8xvEFQsHx5iK1XfXHvfw&s' } },
            { label: "Adventure", image: { uri: 'https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg=' } },
            { label: "Relaxation", image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS646dY8bh1UNbEWSrvEXotUkqO5R57plmpKw&s' } },
            { label: "Beach", image: { uri: 'https://www.newdelhiairport.in/src/images/family-on-summer-vacation-at-beach.jpg' } },
            { label: "Foodie", image: { uri: 'https://cdn.pixabay.com/photo/2017/04/05/01/12/food-2203671_1280.jpg' } },
        ],
    },
    {
        question: "How are you planning to use this app? (Select all that apply)",
        options: [
            { label: "Explore new travel destinations" },
            { label: "Book tours or activities" },
            { label: "Get travel tips and recommendations" },
            { label: "Find local experiences" },
            { label: "Plan my next trip" },
            { label: "Connect with other travelers here" },
        ],
    },
];

const QuestionScreen = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionSelect = (option) => {
        const newSelection = selectedOptions.includes(option)
            ? selectedOptions.filter((item) => item !== option)
            : [...selectedOptions, option];

        setSelectedOptions(newSelection);
    };

    const handleNext = () => {
        // Check if at least one option is selected
        if (selectedOptions.length === 0) {
            Alert.alert('Alert', 'Please select at least one option.');
            return;
        }

        // Move to the next question or navigate to the login page
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOptions([]); // Reset selection for the next question
        } else {
            router.replace('/pages/login'); // Navigate to the login page
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOptions([]); // Optionally reset selection when going back
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.questionBox}>
                <Text style={styles.questionText}>
                    {questions[currentQuestionIndex].question}
                </Text>
                <ScrollView contentContainerStyle={styles.optionsContainer}>
                    {questions[currentQuestionIndex].options.map((option) => (
                        <TouchableOpacity
                            key={option.label}
                            style={[
                                styles.optionCard,
                                selectedOptions.includes(option.label) && styles.selectedCard,
                            ]}
                            onPress={() => handleOptionSelect(option.label)}
                        >
                            {option.image && <Image source={option.image} style={styles.optionImage} />}
                            <Text style={styles.optionText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>
                            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2E',
    },
    questionBox: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        backgroundColor: '#FFFFFF', // Added background color for better contrast
    },
    questionText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 28,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    optionCard: {
        width: '40%', // Adjust width for two columns
        borderRadius: 10,
        margin: 3,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedCard: {
        borderColor: '#FFD700', // Outline color for selected card
        borderWidth: 2,
    },
    optionImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },
    optionText: {
        fontSize: 14,
        color: '#1E1E2E',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    nextButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    nextButtonText: {
        fontWeight: 'bold',
        color: '#000000',
    },
});

export default QuestionScreen;
