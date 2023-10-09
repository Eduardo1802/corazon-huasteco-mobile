import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Card, Searchbar } from 'react-native-paper'

const Guardados = ({ navigation }) => {
  // Buscador
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Card >
        <Card.Content> 
          <Searchbar
            placeholder="Buscar..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            // style={styles.searchBar}
          />
        </Card.Content>
      </Card> 

      <Card style={styles.card}>
        <Card.Content>
          <Card.Cover
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fcarnaval.jpg?alt=media&token=861b6e9f-2e59-43a8-a28b-46f62d43d2c9",
            }}
          />
          <Text variant="titleLarge" style={styles.text}>
            Carnaval
          </Text>
          <Text variant="bodySmall" style={styles.text}>
            30 de febrero
          </Text>
          <Button
            icon="text-box"
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate("ArtGuardados")}
          >
            Leer artículo
          </Button>
        </Card.Content>
      </Card>
      {/* <Text>Despues de leer el articulo puedes encontrarlo aquí para leerlo más tarde sin conexión</Text> */}
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20
  },
  card: {
    marginTop: 15,
  },
  text: {
    marginTop: 10,
    textAlign: "center"
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10
  },  
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 18,
    borderColor: 'black',
    borderWidth: 1,
  },
});


export default Guardados