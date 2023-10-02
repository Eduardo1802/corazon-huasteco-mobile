import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Acceso = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Acceso (entra en tu cuenta)</Text>
      <Button
        mode="contained"
        icon="information"
        onPress={() => navigation.navigate('Registro')}
      >Registrate aquí</Button>
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


export default Acceso