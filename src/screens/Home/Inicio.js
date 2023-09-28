import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="information"
        onPress={() => navigation.navigate('Sobre Nosotros')}
      >Sobre nosotros</Button>

      <Button
        mode="outlined"
        icon="comment-question"
        onPress={() => navigation.navigate('Preguntas Frecuentes')}

      >Preguntas frecuentes</Button>
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

export default Inicio;
