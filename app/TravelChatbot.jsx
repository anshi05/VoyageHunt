import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for the close icon

export default function TravelChatbot({ onClose }) {  // Pass the onClose prop to control modal close
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
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>

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
    position: 'absolute',
    bottom: 80,
    right: 10,
    width: '80%',
    height: '50%',
    backgroundColor: '#121212',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  chatContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messageBubble: {
    maxWidth: '100%',
    padding: 12,
    borderRadius: 25,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0A84FF',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#2D2D2D',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  messageText: {
    fontSize: 16,
    color: '#E1E1E1',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#292929',
    borderTopWidth: 1,
    borderTopColor: '#444',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#404040',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFF',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0A84FF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,  // Ensures the button stays on top
    backgroundColor: '#0A84FF',
    padding: 1,
    borderRadius: 100,
  },
});
