import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AppStack from './src/routes/AppStack'

export default function App() {
  return (
      <AppStack/>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8ab6d6"
  }
})
