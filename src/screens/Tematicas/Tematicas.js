import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Tematicas = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Vista general de una tematica</Text> 
      <Text style={styles.big}>Xantolo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  big: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});


export default Tematicas