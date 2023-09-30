import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const Recientes = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>
        Recientes, vista general de tematicas
      </Text>
      <Button
        mode="contained"
        icon="information"
        style={{backgroundColor: 'red'}}
        onPress={() => navigation.navigate('Tematicas')}
      >Mira una tematica</Button>
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


export default Recientes