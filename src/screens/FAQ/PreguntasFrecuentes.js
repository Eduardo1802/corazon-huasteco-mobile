// PreguntasFrecuentesScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PreguntasFrecuentesS = () => {
  return (
    <View style={styles.container}>
      <Text>Preguntas frecuentes: Responde aquí las preguntas más comunes de tus usuarios.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreguntasFrecuentesS;
