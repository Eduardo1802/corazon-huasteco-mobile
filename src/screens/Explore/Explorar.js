import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Searchbar, Text, TextInput } from 'react-native-paper'

const Explorar = ({navigation}) => {

    const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
      <Text>Aquí puedes buscar lo que quieras</Text>
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


export default Explorar