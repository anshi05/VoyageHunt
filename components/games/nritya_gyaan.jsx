import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Modal } from 'react-native';

const questions = {
  easy: [
    {
      question: 'Yakshagana is a traditional dance form from Karnataka. (True/False)',
      answer: true,
      info: 'Yakshagana combines dance, music, and drama, originating in the coastal regions of Karnataka.',
      correctImage: 'https://link-to-happy-yakshagana-image.png', // Replace with actual image URL
      incorrectImage: 'https://link-to-angry-yakshagana-image.png', // Replace with actual image URL
      score: 1,
    },
    {
      question: 'Yakshagana performances are usually based on stories from the Mahabharata and Ramayana. (True/False)',
      answer: true,
      info: 'Yakshagana performances often depict themes from these two epic stories.',
      correctImage: 'https://link-to-happy-yakshagana-image.png',
      incorrectImage: 'https://link-to-angry-yakshagana-image.png',
      score: 1,
    },
    {
      question: 'Yakshagana costumes are simple and without much ornamentation. (True/False)',
      answer: false,
      info: 'Yakshagana costumes are elaborate, with bright colors, heavy makeup, and ornate jewelry.',
      correctImage: 'https://link-to-happy-yakshagana-image.png',
      incorrectImage: 'https://link-to-angry-yakshagana-image.png',
      score: 1,
    },
    {
      question: 'The main language of Yakshagana is Hindi. (True/False)',
      answer: false,
      info: 'The main languages used in Yakshagana are Kannada and Tulu.',
      correctImage: 'https://link-to-happy-yakshagana-image.png',
      incorrectImage: 'https://link-to-angry-yakshagana-image.png',
      score: 1,
    },
  ],
  //... (rest of the questions remain unchanged) 
};

export default function YakshaganaQuiz() {
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalScoreMessage, setFinalScoreMessage] = useState('');

  const handleAnswer = (userAnswer) => {
    if (userAnswer === questions[currentLevel][currentQuestion].answer) {
      setIsCorrect(true);
      setScore(prevScore => prevScore + questions[currentLevel][currentQuestion].score);
    } else {
      setIsCorrect(false);
    }
    setShowInfo(true);
    setTimeout(handleNextQuestion, 2000); // Automatically move to the next question after 2 seconds
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => {
      if (prev + 1 < questions[currentLevel].length) {
        return prev + 1;
      } else {
        // Move to the next level or finish the game
        if (currentLevel === 'easy') {
          setCurrentLevel('intermediate');
        } else if (currentLevel === 'intermediate') {
          setCurrentLevel('hard');
        } else {
          // Game Over, show final score
          setFinalScoreMessage(getFinalScoreMessage(score));
          setShowModal(true);
          resetGame();
          return 0; // Reset to first question
        }
      }
      return 0; // Reset to first question of next level
    });
    setIsCorrect(null);
    setShowInfo(false);
  };

  const getFinalScoreMessage = (totalScore) => {
    if (totalScore < 15) return "Better luck next time!";
    if (totalScore <= 20) return "Good Try... Yakshagana is pleased.";
    return "Are you one of the Yakshganas?!!";
  };

  const resetGame = () => {
    setScore(0);
    setCurrentLevel('easy');
    setCurrentQuestion(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>
        {currentLevel === 'easy'
          ? "Easy Round \n In the realm of Yakshagana, stories hold secrets! Will you uncover them, or be lost in shadows?"
          : currentLevel === 'intermediate'
          ? "Intermediate Round \n Can You Tackle These?"
          : "Hard Round \n Your heart holds all the answers. Look within and become one of the stancers"}
      </Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.questionText}>{questions[currentLevel][currentQuestion].question}</Text>
      <View style={styles.buttonContainer}>
        <Button title="True" onPress={() => handleAnswer(true)} />
        <Button title="False" onPress={() => handleAnswer(false)} />
      </View>
      {showInfo && (
        <View style={styles.feedbackContainer}>
          <Image
            source={{ uri: isCorrect ? questions[currentLevel][currentQuestion].correctImage : questions[currentLevel][currentQuestion].incorrectImage }}
            style={styles.feedbackImage}
          />
          <Text style={styles.speechBubble}>{isCorrect ? 'Sadhu!' : 'Oh, how the mighty have fallen! I shall reveal the truth to you!'}</Text>
          <Text style={styles.infoText}>{questions[currentLevel][currentQuestion].info}</Text>
        </View>
      )}

      <View style={styles.endButtonContainer}>
        <Button title="End" onPress={() => setShowModal(true)} />
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{getFinalScoreMessage(score)}</Text>
            <Button title="Close" onPress={() => {
              setShowModal(false);
              resetGame();
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2D132C', // Dark purple background
  },
  levelText: {
    fontSize: 20,
    color: '#FFD700', // Gold for level text
    marginBottom: 10,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    color: '#FFD700', // Gold for score
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    color: '#FFDEAD', // Light color for visibility
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  speechBubble: {
    fontSize: 18,
    color: '#FFD700', // Gold text for speech bubble
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#4B0082', // Dark purple background for the bubble
    overflow: 'hidden',
  },
  infoText: {
    fontSize: 16,
    color: '#FFD700', // Gold text for info
    textAlign: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#2D132C', // Dark background for modal
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    color: '#FFD700', // Gold for modal text
    marginBottom: 20,
    textAlign: 'center',
  },
  endButtonContainer: {
    position: 'absolute', // Position it absolutely
    bottom: 20, // Place it 20 units from the bottom
    right: 30, // Place it 30 units from the right
  },
});