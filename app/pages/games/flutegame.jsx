import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { router } from 'expo-router';
const questions = [
  {
    question: "What is the traditional name of Lord Krishna's flute?",
    options: ["Bansuri", "Veena", "Rudra Veena", "Mridangam"],
    correctAnswer: "Bansuri",
    explanation: "Krishna's flute is known as the 'Bansuri,' a traditional bamboo flute widely used in Indian classical music. It holds great significance in the stories of Lord Krishna."
  },
  {
    question: "What type of wood is Lord Krishna's flute traditionally made from?",
    options: ["Sandalwood", "Bamboo", "Rosewood", "Neem"],
    correctAnswer: "Bamboo",
    explanation: "Krishna's flute is made of bamboo, symbolizing simplicity and purity. The melodious sound of the flute captivated all living beings in the legends."
  },
  {
    question: "In Hindu mythology, Krishna's flute is said to have the power to:",
    options: ["Summon animals and birds", "Enchant the hearts of all beings", "Control the weather", "Create illusions"],
    correctAnswer: "Enchant the hearts of all beings",
    explanation: "Krishna's flute is known for its divine melody that enchants the hearts of not only humans but also animals, birds, and even the Gopis (cowherd girls) of Vrindavan."
  },
  {
    question: "Which famous Raga (musical scale) is often associated with Krishna's flute?",
    options: ["Raga Yaman", "Raga Kafi", "Raga Bhairav", "Raga Hamsadhwani"],
    correctAnswer: "Raga Kafi",
    explanation: "Raga Kafi is often associated with the playful and romantic nature of Krishna's flute, echoing through the melodies and bringing the essence of love and longing."
  },
  {
    question: "In which ancient Indian text is the magic of Krishna's flute frequently described?",
    options: ["Bhagavad Gita", "Mahabharata", "Srimad Bhagavatam", "Ramayana"],
    correctAnswer: "Srimad Bhagavatam",
    explanation: "The Srimad Bhagavatam contains many poetic descriptions of Krishna playing the flute and its effect on the people of Vrindavan, highlighting its divine power and charm."
  }
];

export default function KrishnaFluteQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaveGame, setLeaveGame] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // To track the selected answer

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer); // Track selected answer
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setScore(prevScore => prevScore + (correct ? 1 : 0)); // Increment score only on correct answer
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null); // Reset selected answer for the next question
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setGameOver(false);
    setLeaveGame(false);
    setSelectedAnswer(null); // Reset selected answer
  };

  const leaveQuiz = () => {
    setLeaveGame(true);
  };

  if (leaveGame) {
    return (
      <ImageBackground
        source={{ uri: 'https://vrundavan.wordpress.com/wp-content/uploads/2012/07/damodhara.jpg' }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Madhusudhan has his flute control all! You choose to differ?!</Text>
            <Text>Do you want to leave the game or stay?</Text>
            <View style={styles.leaveButtonsContainer}>
              <TouchableOpacity 
               
               style={styles.exitButton}
               onPress={() => router.push('/hunt')}  // Use router.push to navigate to the page
             >
                <Text style={styles.buttonText}>Exit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stayButton} onPress={restartQuiz}>
                <Text style={styles.buttonText}>Stay on Site</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (gameOver) {
    return (
      <ImageBackground
        source={{ uri: 'https://vrundavan.wordpress.com/wp-content/uploads/2012/07/damodhara.jpg' }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Quiz Complete!</Text>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>Your Final Score: {score}</Text>
            </View>
            <Text style={styles.quoteText}>
              "Jai Shree Krishna! He naath narayan vasudeva"
            </Text>
            <TouchableOpacity style={styles.button} onPress={restartQuiz}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://vrundavan.wordpress.com/wp-content/uploads/2012/07/damodhara.jpg' }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option, index) => {
            const isCorrect = option === questions[currentQuestion].correctAnswer;
            const isSelected = option === selectedAnswer;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  isSelected
                    ? isCorrect
                      ? styles.correctAnswer
                      : styles.wrongAnswer
                    : isCorrect && showExplanation
                    ? styles.correctAnswer
                    : {}
                ]}
                onPress={() => handleAnswer(option)}
                disabled={showExplanation}
              >
                <Text style={styles.buttonText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
          {showExplanation && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationText}>
                {questions[currentQuestion].explanation}
              </Text>
              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.buttonText}>Next Question</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.leaveContainer}>
            <TouchableOpacity style={styles.leaveButton} onPress={leaveQuiz}>
              <Text style={styles.buttonText}>Leave</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>Score: {score}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4A0E4E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  correctAnswer: {
    backgroundColor: '#32CD32',
  },
  wrongAnswer: {
    backgroundColor: '#DC143C',
  },
  explanationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  explanationText: {
    fontSize: 16,
    color: '#4A0E4E',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  leaveContainer: {
    marginTop: 20,
  },
  leaveButton: {
    backgroundColor: '#DC143C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 20,
  },
  leaveButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  exitButton: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center'
  },
  stayButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center'
  },
  scoreBox: {
    backgroundColor: '#007C92', // Peacock color
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});