import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Guardados = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Despues de leer el articulo puedes encontrarlo aquí para leerlo más tarde sin conexión</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Guardados