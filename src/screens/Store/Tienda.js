import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text, Card, Searchbar, Portal, Dialog, List, Checkbox } from 'react-native-paper'
import { app } from '../../config/firebase'

const Tienda = ({ navigation }) => {
  // Buscador
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  // Ventana emergente filtros
  const [visibleFiltros, setVisibleFiltros] = useState(false);
  const closefiltros = () => setVisibleFiltros(false);
  const openfiltros = () => setVisibleFiltros(true);
  // Categoria
  const [portavela, setPortavela] = useState(false);
  const [plato, setPlato] = useState(false);
  const [tequilero, setTequilero] = useState(false);
  // Color
  const [rojo, setRojo] = useState(false);
  const [blanco, setBlanco] = useState(false);
  const [azul, setAzul] = useState(false);

  // recuperarDatosLocalmente
  const [productos, setProductos] = useState([]);

  const recuperarDatosLocalmente = async () => {
    try {
      const datos = await AsyncStorage.getItem('datosLocal');
      if (datos !== null) {
        const datosParseados = JSON.parse(datos);
        const datosTabla = datosParseados.producto;
        setProductos(datosTabla)
        console.log("Datos obtenidos del Storage.")
      }else{
        const productoSnapshot = await app.firestore().collection("producto").get();
        const productoData = productoSnapshot.docs.map((doc) => doc.data());
        setProductos(productoData)
        console.log("Datos obtenidos de firebase.")
      }
    } catch (error) {
      console.error('Error al recuperar datos locales:', error);
    }
  }

  useEffect(() => {
    recuperarDatosLocalmente();
  }, []);

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

        {productos.map((producto, index) => (
          <View key={index} style={{ display: 'flex', flexDirection: 'row', marginTop: 10, borderStyle: "solid", borderWidth: 2, borderColor: "#E7E2E8", borderRadius: 15 }}>
            <Card.Cover
              source={{
                uri: producto.url, 
              }}
              style={{ width: 100, height: "auto" }}
            />
            <View style={{ display: "flex", flexDirection: 'column', justifyContent: "space-around", alignContent: "flex-start", width: "70%", padding: 10 }}>
              <Text variant="bodyLarge" style={styles.title}>{producto.nombre}</Text> 
              <Text variant="bodyMedium" style={{ paddingBottom: 3 }}>{producto.descripcion}</Text> 
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
        ))}


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