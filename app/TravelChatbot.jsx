import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function TravelChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, your assistant here! May I know your name?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      let botResponse;

      switch (step) {
        case 0:
          botResponse = `Hi ${input}! How would you like to travel? (e.g., Beach, Mountains, Temples)`;
          setStep(1);
          break;
        case 1:
          botResponse = `Great choice! What kind of activities do you enjoy? (e.g., Relaxing, Adventure, Culture)`;
          setStep(2);
          break;
        case 2:
          botResponse = `Based on your preference for ${input}, here are some suggestions:

Activities:
${input === 'Relaxing' ? '- Spa treatments\n- Yoga classes\n- Beach lounging' :
 input === 'Adventure' ? '- Hiking\n- Water sports\n- Rock climbing' :
 '- Museum visits\n- Local tours\n- Cooking classes'}

Restaurants:
${input === 'Relaxing' ? '- Beachfront cafes\n- Rooftop lounges\n- Quiet bistros' :
 input === 'Adventure' ? '- Local street food\n- Themed restaurants\n- Picnic spots' :
 '- Fine dining\n- Local cuisine\n- Food markets'}

Is there anything specific you'd like to know more about?`;
          setStep(3);
          break;
        default:
          botResponse = "I'm glad I could help! If you have any more questions, feel free to ask.";
      }

      const botMessage = { id: messages.length + 2, text: botResponse, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message!"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  // Darker, sleek background
  },
  chatContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#1E1E1E', // Dark mode panel feel
  },
  messageBubble: {
    maxWidth: '100%',
    padding: 12,
    borderRadius: 25,  // More rounded for a modern look
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,  // Subtle shadow for depth
    shadowRadius: 5,
    elevation: 3,  // For Android shadow effect
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0A84FF', // Vibrant blue for user messages
    borderTopRightRadius: 0,  // Extra style by tweaking one corner
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#2D2D2D',  // Contrast color for bot messages
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  messageText: {
    fontSize: 16,
    color: '#E1E1E1',  // Lighter text for dark background
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#292929', // Input background to match the dark theme
    borderTopWidth: 1,
    borderTopColor: '#444',  // Light border to separate input area
    alignItems: 'center',  // Align the input and button nicely
  },
  input: {
    flex: 1,
    backgroundColor: '#404040',  // Dark input field
    borderRadius: 30,  // More rounded for a clean look
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFF',  // White text for better readability
    marginRight: 10,  // Space between input and button
  },
  sendButton: {
    backgroundColor: '#0A84FF',  // Consistent vibrant blue for the button
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,  // Subtle shadow for a lifted button effect
    elevation: 3,  // For Android elevation effect
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

