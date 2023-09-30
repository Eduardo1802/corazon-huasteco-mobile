import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const Inicio = ({navigation}) => {
  return (
    <View style={styles.container}>

      <Text>Este es el inicio</Text>
      {/* <Button
        mode="contained"
        icon="information"
        onPress={() => navigation.navigate('Recientes')}
      >Sobre nosotros</Button>
      
      <Button
        mode="contained"
        icon="information"
        onPress={() => navigation.navigate('elder')}
      >Hola buen día Elder</Button>

      <Button
        mode="outlined"
        icon="comment-question"
        onPress={() => navigation.navigate('Preguntas Frecuentes')}

      >Preguntas frecuentes</Button> */}
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
