import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Text,
  Card,
  Searchbar,
  Portal,
  Dialog,
  List,
  Checkbox,
} from "react-native-paper";
import { app } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebaseDB";
import { Alert } from "react-native";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import AwesomeAlert from "react-native-awesome-alerts";

const Tienda = ({ navigation }) => {
  const { user } = useAuth();

  const [alert, setAlert] = useState({
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",
  });

  const showAlertSuccess = (title, message) => {
    setAlert({
      showAlert: true,
      alertTitle: title,
      alertMessage: message,
      alertType: "success",
    });
  };

  const showAlertError = (title, message) => {
    setAlert({
      showAlert: true,
      alertTitle: title,
      alertMessage: message,
      alertType: "error",
    });
  };

  //Añadir
  const registrarProducto = async (idProduct) => {
    console.log("Button clicked with product ID:", idProduct);

    // Verificar si user está definido y tiene la propiedad uid
    if (user && user.uid) {
      // Obtener la referencia del documento del carrito del usuario
      const referencia = doc(db, `carritoUsuario/${user.uid}`);

      // Obtener los datos del carrito del usuario
      const docSnap = await getDoc(referencia);
      const data = docSnap.exists() ? docSnap.data() : null;

      // Si el carrito no existe, crearlo con el producto y cantidad 1
      if (!data) {
        await setDoc(referencia, { [idProduct]: 1, total: 1 });
      } else {
        // Si el producto ya existe en el carrito, aumentar la cantidad
        if (data.hasOwnProperty(idProduct)) {
          if (data[idProduct] >= 5) {
            showAlertError(
              "A ocurrido un error",
              `No se puede agregar 5 veces el mismo producto`
            );
            return;
          }
          await updateDoc(referencia, {
            [idProduct]: data[idProduct] + 1,
            total: data.total ? data.total + 1 : 1,
          });
        } else {
          // Si el producto no existe en el carrito, agregarlo con cantidad 1
          await updateDoc(referencia, {
            [idProduct]: 1,
            total: data.total ? data.total + 1 : 1,
          });
        }
      }
      const referencia2 = doc(db, `producto/${idProduct}`);
      const docSnap2 = await getDoc(referencia2);
      const data2 = docSnap2.exists() ? docSnap2.data() : null;
      // Mostrar una alerta
      showAlertSuccess(
        "Producto añadido al carrito",
        `El producto ${data2.nombre} se ha añadido correctamente al carrito.`
      );
    } else {
      console.error("El usuario no está autenticado o no tiene un UID.");
    }
  };

  // Buscador
  const [productos, setProductos] = useState([]);
  const [tablaProyectos, setTablaProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const onChangeSearch = (query) => {
    setBusqueda(query);
    filtrar(query);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = tablaProyectos.filter((elemento) => {
      // Verificar si el término de búsqueda está presente en la propiedad "titulo"
      if (
        elemento.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setProductos(resultadoBusqueda);
  };


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

  const recuperarDatosLocalmente = async () => {
    try {
      const datos = await AsyncStorage.getItem("datosLocal");
      if (datos !== null) {
        const datosParseados = JSON.parse(datos);
        const datosTabla = datosParseados.producto;
        // console.log(datosTabla)
        setProductos(datosTabla);
        setTablaProyectos(datosTabla);
        console.log("Productos obtenidos del Storage.");
      } else {
        const productoSnapshot = await app
          .firestore()
          .collection("producto")
          .get();
        const productoData = productoSnapshot.docs.map((doc) => doc.data());
        setProductos(productoData);
        setTablaProyectos(productoData);
        console.log("Productos obtenidos de firebase.");
      }
    } catch (error) {
      console.error("Error al recuperar datos locales:", error);
    }
  };

  useEffect(() => {
    recuperarDatosLocalmente();
  }, []);


  const alertStyles = {
    container: {
      backgroundColor: "#fff",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#531949",
      textAlign: "center",
    },
    messageText: {
      fontSize: 16,
      color: "#333",
    },
    buttonContainer: {
      marginTop: 10,
    },
    button: {
      backgroundColor: "#531949",
      borderRadius: 5,
      paddingVertical: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
  };

  return (
    <ScrollView>
      <AwesomeAlert
        show={alert.showAlert}
        showProgress={false}
        title={alert.alertTitle}
        message={alert.alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#531949"
        onConfirmPressed={() => {
          setAlert({ showAlert: false });
        }}
        contentContainerStyle={alertStyles.container}
        titleStyle={alertStyles.titleText}
        messageStyle={alertStyles.messageText}
        buttonContainerStyle={alertStyles.buttonContainer}
        confirmButtonStyle={alertStyles.button}
        confirmButtonTextStyle={alertStyles.buttonText}
      />
      <View style={styles.container}>
        {/* BUSCAR Y CARRITO */}
        <Card>
          <View style={styles.searchBarContainer}>
            <Searchbar
            placeholder="Buscar..."
            onChangeText={onChangeSearch}
            value={busqueda}
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
            <Dialog.Title style={styles.title}>Filtros</Dialog.Title>
            <Dialog.Content>
              <List.Section>
                <View style={styles.folder}>
                  <List.Accordion
                    title="Categoria"
                    left={(props) => (
                      <List.Icon {...props} icon="format-list-bulleted" />
                    )}
                  >
                    <List.Item
                      title="Portavela"
                      right={(props) => (
                        <Checkbox
                          status={portavela ? "checked" : "unchecked"}
                          onPress={() => {
                            setPortavela(!portavela);
                          }}
                        />
                      )}
                    />
                    <List.Item
                      title="Plato"
                      right={(props) => (
                        <Checkbox
                          status={plato ? "checked" : "unchecked"}
                          onPress={() => {
                            setPlato(!plato);
                          }}
                        />
                      )}
                    />
                    <List.Item
                      title="Tequilero"
                      right={(props) => (
                        <Checkbox
                          status={tequilero ? "checked" : "unchecked"}
                          onPress={() => {
                            setTequilero(!tequilero);
                          }}
                        />
                      )}
                    />
                  </List.Accordion>
                </View>

                <View style={styles.folder}>
                  <List.Accordion
                    title="Color"
                    left={(props) => (
                      <List.Icon {...props} icon="border-color" />
                    )}
                  >
                    <List.Item
                      title="Rojo"
                      right={(props) => (
                        <Checkbox
                          status={rojo ? "checked" : "unchecked"}
                          onPress={() => {
                            setRojo(!rojo);
                          }}
                        />
                      )}
                    />
                    <List.Item
                      title="Blanco"
                      right={(props) => (
                        <Checkbox
                          status={blanco ? "checked" : "unchecked"}
                          onPress={() => {
                            setBlanco(!blanco);
                          }}
                        />
                      )}
                    />
                    <List.Item
                      title="Azul"
                      right={(props) => (
                        <Checkbox
                          status={azul ? "checked" : "unchecked"}
                          onPress={() => {
                            setAzul(!azul);
                          }}
                        />
                      )}
                    />
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
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "#E7E2E8",
              borderRadius: 15,
            }}
          >
            <Card.Cover
              source={{
                uri: producto.url,
              }}
              style={{ width: 100, height: "auto" }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignContent: "flex-start",
                width: "70%",
                padding: 10,
              }}
            >
              <Text variant="bodyLarge" style={styles.title}>
                {producto.nombre}
              </Text>
              <Text variant="bodyMedium" style={{ paddingBottom: 3 }}>
                {producto.descripcion}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  icon="chevron-right"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  style={styles.buttonProduct}
                  onPress={() =>
                    navigation.navigate("Producto", { item: producto })
                  }
                  // onPress={() => navigation.navigate("Producto")}
                >
                  Ver
                </Button>
                <Button
                  icon="cart"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  style={styles.buttonProduct}
                  onPress={() => registrarProducto(producto.id)}
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
    padding: 20,
  },
  buttonProduct: {
    borderWidth: 0.5,
    borderColor: "#531949",
  },
  card: {
    marginTop: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  searchbar: {
    flex: 1,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 5,
    padding: 5,
  },
  buttonFilter: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
  title: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    flexGrow: 1,
  },
  folder: {
    marginTop: 20,
  },
  card: {
    marginTop: 10,
  },
});

export default Tienda;
