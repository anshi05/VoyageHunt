// components/ui/card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export const CardContent = ({ children }) => {
  return <View style={styles.cardContent}>{children}</View>;
};

export const CardFooter = ({ children }) => {
  return <View style={styles.cardFooter}>{children}</View>;
};

export const CardHeader = ({ children }) => {
  return <View style={styles.cardHeader}>{children}</View>;
};

export const CardTitle = ({ children, style }) => {
  return <Text style={[styles.cardTitle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    marginBottom: 16,
  },
  cardFooter: {
    marginTop: 16,
    alignItems: 'center',
  },
});
