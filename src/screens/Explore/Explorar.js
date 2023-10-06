import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';

const Explorar = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const windowWidth = Dimensions.get('window').width;
  const searchBarWidth = windowWidth * 0.85;

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder ="Explorar temáticas"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={[
          styles.searchBar,
          { width: searchBarWidth, position: 'absolute', top: 0 },
        ]}
        iconColor="black"
        placeholderTextColor="#4B4B4B"
      />
      <Text style={styles.text}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative'
  },
  text: {
    color: 'black',
  },
  searchBar: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 18,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Explorar;