import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text, Card, Searchbar, Portal, Dialog, List, Checkbox } from 'react-native-paper'

const Tienda = ({ navigation }) => {
  // Buscador
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  // Ventana emergente filtros
  const [visibleFiltros, setVisibleFiltros] = React.useState(false);
  const closefiltros = () => setVisibleFiltros(false);
  const openfiltros = () => setVisibleFiltros(true);
  // Categoria
  const [portavela, setPortavela] = React.useState(false);
  const [plato, setPlato] = React.useState(false);
  const [tequilero, setTequilero] = React.useState(false);
  // Color
  const [rojo, setRojo] = React.useState(false);
  const [blanco, setBlanco] = React.useState(false);
  const [azul, setAzul] = React.useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>

        {/* BUSCAR Y CARRITO */}
        <Card>
          <View style={styles.searchBarContainer}>
            <Searchbar
              placeholder="Buscar..."
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchbar}
            />
          </View>
          <Button
            icon="checkbox-marked-circle-outline"
            onPress={openfiltros}
            style={styles.buttonFilter}
          >
            Filtros
          </Button>
        </Card>

        {/* DAR CLICK EN FILTROS */}
        <Portal>
          <Dialog visible={visibleFiltros} onDismiss={closefiltros}>
            <Dialog.Title style={styles.title}>
              Filtros
            </Dialog.Title>
            <Dialog.Content>
              <List.Section>
                <View style={styles.folder}>

                  <List.Accordion
                    title="Categoria"
                    left={props => <List.Icon {...props} icon="format-list-bulleted" />}
                  >
                    <List.Item title="Portavela" right={(props) => (
                      <Checkbox
                        status={portavela ? "checked" : "unchecked"}
                        onPress={() => {
                          setPortavela(!portavela);
                        }}
                      />
                    )} />
                    <List.Item title="Plato" right={(props) => (
                      <Checkbox
                        status={plato ? "checked" : "unchecked"}
                        onPress={() => {
                          setPlato(!plato);
                        }}
                      />
                    )} />
                    <List.Item title="Tequilero" right={(props) => (
                      <Checkbox
                        status={tequilero ? "checked" : "unchecked"}
                        onPress={() => {
                          setTequilero(!tequilero);
                        }}
                      />
                    )} />
                  </List.Accordion>
                </View>

                <View style={styles.folder}>
                  <List.Accordion
                    title="Color"
                    left={props => <List.Icon {...props} icon="border-color" />}
                  >
                    <List.Item title="Rojo" right={(props) => (
                      <Checkbox
                        status={rojo ? "checked" : "unchecked"}
                        onPress={() => {
                          setRojo(!rojo);
                        }}
                      />
                    )} />
                    <List.Item title="Blanco" right={(props) => (
                      <Checkbox
                        status={blanco ? "checked" : "unchecked"}
                        onPress={() => {
                          setBlanco(!blanco);
                        }}
                      />
                    )} />
                    <List.Item title="Azul" right={(props) => (
                      <Checkbox
                        status={azul ? "checked" : "unchecked"}
                        onPress={() => {
                          setAzul(!azul);
                        }}
                      />
                    )} />
                  </List.Accordion>
                </View>
              </List.Section>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closefiltros}>Cancelar</Button>
              <Button>Filtrar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* PRODUCTOS */}
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, borderStyle: "solid", borderWidth: 2, borderColor: "#E7E2E8", borderRadius:15}}>
          <Card.Cover
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2F1684462760728?alt=media&token=0651d14c-2663-40b9-9190-9f32315567a4&_gl=1*46jhgd*_ga*NjQ4NjA4NzUxLjE2OTU0NjExOTc.*_ga_CW55HF8NVT*MTY5Njg4NjUwNC4xMy4xLjE2OTY4ODY1MjQuNDAuMC4w",
            }}
            style={{ width: 100, height: "auto"}}
          />
          <View style={{ display: "flex", flexDirection: 'column', justifyContent: "space-around", alignContent: "flex-start", width: "70%",  padding: 10 }}>
            <Text variant="bodyLarge" style={styles.title}>TORTILLERO COLOR ROJO</Text>
            <Text variant="bodyMedium" style={{paddingBottom: 3}}>Tortillero de barro color cafe originario de Chililico, Huejutla de Reyes Hidalgo....</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button
                icon="chevron-right"
                contentStyle={{ flexDirection: 'row-reverse' }}
                style={styles.buttonProduct}
                onPress={() => navigation.navigate("Producto")}
              >
                Ver
              </Button>
              <Button
                icon="cart"
                contentStyle={{ flexDirection: 'row-reverse' }}
                style={styles.buttonProduct}
              >
                Añadir
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20
  },
  buttonProduct: {
    borderWidth: 0.5,
    borderColor: '#531949',
  },
  card: {
    marginTop: 10
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  searchbar: {
    flex: 1,
  },
  button: {
    borderWidth: 0.5,
    borderColor: '#531949',
    borderRadius: 5,
    padding: 5,
  },
  buttonFilter: {
    borderWidth: 0.5,
    borderColor: '#531949',
    borderRadius: 30,
    padding: 5,
    margin: 10
  },
  title: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flexGrow: 1,
  },
  folder: {
    marginTop: 20
  },
  card: {
    marginTop: 10
  },
});

export default Tienda;