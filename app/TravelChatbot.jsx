import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function TravelChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! What's your name?", sender: 'bot' },
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
          botResponse = `Hi ${input}! How would you like to travel? (e.g., beach, mountains, city)`;
          setStep(1);
          break;
        case 1:
          botResponse = `Great choice! ${input} travel is amazing. What kind of activities do you enjoy? (e.g., relaxing, adventure, culture)`;
          setStep(2);
          break;
        case 2:
          botResponse = `Based on your preference for ${input}, here are some suggestions:

Activities:
${input === 'relaxing' ? '- Spa treatments\n- Yoga classes\n- Beach lounging' :
 input === 'adventure' ? '- Hiking\n- Water sports\n- Rock climbing' :
 '- Museum visits\n- Local tours\n- Cooking classes'}

Restaurants:
${input === 'relaxing' ? '- Beachfront cafes\n- Rooftop lounges\n- Quiet bistros' :
 input === 'adventure' ? '- Local street food\n- Themed restaurants\n- Picnic spots' :
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
          placeholder="Type a message..."
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
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});