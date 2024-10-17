import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, TouchableOpacity } from 'react-native';

// Sample images and clues
const images = [
  { uri: 'https://i.pinimg.com/originals/5c/b2/f1/5cb2f10d2121c42e75050949889a7ed9.jpg' },
  { uri: 'https://i.pinimg.com/originals/5c/b2/f1/5cb2f10d2121c42e75050949889a7ed9.jpg' },
  { uri: 'https://i.pinimg.com/originals/5c/b2/f1/5cb2f10d2121c42e75050949889a7ed9.jpg' },
];

const clues = [
  { text: "First Clue: I represent the battle between good and evil.", score: 30 },
  { text: "Second Clue: My costume is as elaborate as my story.", score: 30 },
  { text: "Third Clue: I'm from a southern coastal region.", score: 50 },

];

const options = [
  { answer: 'Option 1', isCorrect: true },
  { answer: 'Option 2', isCorrect: false },
  { answer: 'Option 3', isCorrect: false },
];

export default function TournamentGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [clueIndex, setClueIndex] = useState(null);  // To store the index of the clicked clue
  const [score, setScore] = useState(0);  // To store the user's score
  const [animations, setAnimations] = useState(images.map(() => new Animated.Value(0)));  // Initialize animation values
  const [currentOption, setCurrentOption] = useState([]);  // To store answer options for each clue
  const [imagesClicked, setImagesClicked] = useState(new Array(images.length).fill(false));  // Track clicked images
  const [answeredClues, setAnsweredClues] = useState(new Array(clues.length).fill(false));  // Track which clues have been answered
  const [hintMessage, setHintMessage] = useState('');  // To store hint messages
  const [pointMessage, setPointMessage] = useState('');  // To display messages about points
  const [gameOver, setGameOver] = useState(false);  // To track game over state

  // Start the game by resetting all states
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    resetGameStates();  // Reset all necessary game states
  };

  const resetGameStates = () => {
    setScore(0);  // Reset score
    setClueIndex(null);
    setAnimations(images.map(() => new Animated.Value(0)));  // Reset animations
    setImagesClicked(new Array(images.length).fill(false));  // Reset images clicked status
    setAnsweredClues(new Array(clues.length).fill(false));  // Reset answered clues
    setHintMessage('');
    setPointMessage('');
  };

  // Resets the game to initial state after it ends
  const resetGame = () => {
    resetGameStates();
    setGameOver(false);  // Reset game over state
  };

  // Handle image clicks
  const handleImagePress = (index) => {
    if (imagesClicked[index]) return;  // Prevent re-clicking of the same image

    // Set the clue for the clicked image
    setClueIndex(index);
    setCurrentOption(options);  // Show options for the clue
    setHintMessage('');  // Reset hint message

    // Animate the clicked image
    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1,  // End animation value
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animations[index], {
        toValue: 0,  // Reset animation back to original state
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const updatedClicked = [...imagesClicked];
      updatedClicked[index] = true;  // Mark image as clicked
      setImagesClicked(updatedClicked);
    });
  };

  // Animation styles for images
  const getAnimationStyle = (index) => {
    const translateX = animations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 500],
    });
    return {
      transform: [{ translateX }],
      opacity: animations[index].interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],  // Fade out effect
      }),
    };
  };

  // Handle the answer selection
  const handleAnswer = (isCorrect, clueScore) => {
    if (clueIndex !== null && !answeredClues[clueIndex]) {
      let newScore = score;
      if (isCorrect) {
        newScore += clueScore;  // Add score if correct
        setPointMessage(`Correct! Score added: ${clueScore}`);
      } else {
        setPointMessage('Incorrect! Try again!');
      }

      const updatedAnsweredClues = [...answeredClues];
      updatedAnsweredClues[clueIndex] = true;  // Mark clue as answered
      setAnsweredClues(updatedAnsweredClues);
      setScore(newScore);

      // Check if all clues have been answered
      if (updatedAnsweredClues.every(Boolean)) {
        router.push('pages/feedback')
        setGameOver(true);  // End the game
        setPointMessage(`Game Over! Your final score is: ${newScore}`);
      }
    } else {
      setPointMessage('This clue has already been answered.');
    }
  };

  // Skip a clue
  const handleLeave = () => {
    if (clueIndex !== null) {
      const updatedAnsweredClues = [...answeredClues];
      updatedAnsweredClues[clueIndex] = true;  // Skip the current clue
      setAnsweredClues(updatedAnsweredClues);

      setClueIndex(null);
      setHintMessage('');
    }
  };

  // Show a hint for the current clue
  const showHint = () => {
    if (clueIndex !== null) {
      setHintMessage('This is a less obvious clue!');
    }
  };

  if (!gameStarted) {
    return (
      <View style={styles.startScreen}>
        <Button title="Start Game" onPress={startGame} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.progressText}>
        {answeredClues.filter(Boolean).length} of {clues.length} clues answered
      </Text>

      {images.map((image, index) => (
        !answeredClues[index] && (
          <View key={index} style={styles.imageContainer}>
            <TouchableOpacity onPress={() => handleImagePress(index)} disabled={imagesClicked[index]}>
              <Animated.Image
                source={image}
                style={[styles.image, getAnimationStyle(index)]}
              />
            </TouchableOpacity>
            {clueIndex === index && (
              <View style={styles.clueContainer}>
                <Text style={styles.clueText}>{clues[clueIndex].text}</Text>
                <View style={styles.buttonsContainer}>
                  {currentOption.map((option, idx) => (
                    <Button
                      key={idx}
                      title={option.answer}
                      onPress={() => handleAnswer(option.isCorrect, clues[clueIndex].score)}
                    />
                  ))}
                  <Button title="Hint" onPress={showHint} />
                  <Button title="Leave" onPress={handleLeave} />
                </View>
                {hintMessage !== '' && (
                  <Text style={styles.hintText}>{hintMessage}</Text>
                )}
              </View>
            )}
          </View>
        )
      ))}

      {pointMessage !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{pointMessage}</Text>
        </View>
      )}

      {gameOver && (
        <View style={styles.replayContainer}>
          <Text style={styles.finalScoreText}>{pointMessage}</Text>
          <Button title="Play Again" onPress={resetGame} />
          <Button title="Exit" onPress={() => setGameStarted(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  startScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800080',  // Purple background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Black background
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scoreText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  clueContainer: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  clueText: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  messageBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  messageText: {
    color: '#FFD700',
    fontSize: 18,
  },
  hintText: {
    color: '#0f0', // Change color as desired
    fontSize: 16,
    marginTop: 10, // Add margin for better spacing
  },
  replayContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  finalScoreText: {
    color: '#FFD700',
    fontSize: 24,
    marginBottom: 10,
  },
});