import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Registro = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Registro (registrate)</Text>
      <Button
        mode="outlined"
        icon="information"
        onPress={() => navigation.navigate('Acceso')}
      >Accede a tu cuenta</Button>
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


export default Registro