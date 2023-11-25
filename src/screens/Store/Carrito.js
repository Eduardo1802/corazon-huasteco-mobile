import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Text,
  Card,
  IconButton,
  Portal,
  Dialog,
  Divider,
  TextInput,
  Avatar,
} from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import {
  doc,
  onSnapshot,
  getDocs,
  collection,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../config/firebaseDB";
import { Picker } from "@react-native-picker/picker";
import { Badge } from "react-native-paper";
import { ScrollView } from "react-native";

const Carrito = () => {
  const { user } = useAuth();
  const [sumaNumeros, setSumaNumeros] = useState(0);
  const [carritoData, setCarritoData] = useState([]);
  const [productosData, setProductosData] = useState({});
  const [etapa, setEtapa] = useState(0); // 0: Carrito, 1: Tarjeta, 2: Dirección
  const [tarjeta, setTarjeta] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [cvv, setCvv] = useState("");
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(1);

  // Ventana emergente carrito de compras
  const [visibleCarrito, setVisibleCarrito] = React.useState(false);
  const closeCarrito = () => setVisibleCarrito(false);
  const openCarrito = () => setVisibleCarrito(true);

  const handleEliminarProducto = async (id) => {
    if (user) {
      const referenciaCarrito = doc(db, `carritoUsuario/${user.uid}`);
      const carritoSnapshot = await getDoc(referenciaCarrito);
      const carritoData = carritoSnapshot.exists()
        ? carritoSnapshot.data()
        : null;

      if (carritoData && carritoData[id] !== undefined) {
        // Creamos una copia del objeto carritoData para evitar la modificación directa del estado
        const carritoDataActualizado = { ...carritoData };
        delete carritoDataActualizado[id];

        // Actualizamos el carritoUsuario en la base de datos con la nueva data sin la id eliminada
        await setDoc(referenciaCarrito, carritoDataActualizado);
        await updateDoc(referenciaCarrito, {
          total: carritoData.total - carritoData[id], // Sumar 1 al total si ya existe, o crearlo con 1 si aún no existe
        });
      }
    }
  };

  const handleSiguiente = async () => {
    // Cambia la etapa al siguiente paso
    setEtapa(etapa + 1);
  };
  
  const editarCantidad = async (item, valor) => {
    const valorNumerico = parseInt(valor);

    const referencia = doc(db, `carritoUsuario/${user.uid}`);
    // Obtener los datos del carrito del usuario
    const docSnap = await getDoc(referencia);
    const data = docSnap.exists() ? docSnap.data() : null;

    // Obtener la cantidad anterior del producto
    const cantidadAnterior = data && data[item] !== undefined ? data[item] : 0;

    // Calcular la diferencia entre la cantidad anterior y la nueva cantidad
    const diferenciaCantidad = valorNumerico - cantidadAnterior;

    // Actualizar el carrito con la nueva cantidad del producto y el total actualizado
    await updateDoc(referencia, {
      [item]: valorNumerico,
      total: data.total + diferenciaCantidad,
    });
  };

  const obtenerDatosCarritoYSumar = async () => {
    if (user) {
      const referenciaCarrito = doc(db, `carritoUsuario/${user.uid}`);
      onSnapshot(referenciaCarrito, (docSnap) => {
        const data = docSnap.exists() ? docSnap.data() : null;
        setSumaNumeros(data ? data.total : 0);
        setCarritoData(data ? Object.entries(data) : []);
      });
      const referenciaUsuario = doc(db, `usuarios/${user.uid}`);
      onSnapshot(referenciaUsuario, (docSnap) => {
        const data = docSnap.exists() ? docSnap.data() : null;
        setTarjeta(data ? data.numeroTarjeta : "");
      });

      const referenciaProductos = collection(db, "producto");
      const querySnapshot = await getDocs(referenciaProductos);
      const productos = {};
      setNombre(user.email);

      querySnapshot.forEach((doc) => {
        const producto = doc.data();
        productos[doc.id] = producto;
      });

      setProductosData(productos);
    }
  };

  useEffect(() => {
    obtenerDatosCarritoYSumar();
  }, [user]);
  useEffect(() => {
    // Calcula el total cuando carritoData o productosData cambien
    var nuevoTotal = carritoData.reduce((total, [productoId, item]) => (
      productoId !== "total" ? total + item * (productosData[productoId]?.costo || 0) : total
    ), 0);

    // Establece el nuevo total en el estado
    setTotal(nuevoTotal.toFixed(2));
  }, [carritoData, productosData]); // Este efecto se ejecutará cuando cambien carritoData o productosData

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="cart"
          onPress={openCarrito}
          color="#531949"
          size={25}
          style={styles.button}
        />
        <Badge style={styles.badge}>{sumaNumeros}</Badge>
      </View>

      {/* DAR CLICK EN EL CARRITO */}
      <Portal>
        <Dialog visible={visibleCarrito} onDismiss={closeCarrito}>
          <Dialog.Title style={styles.title}>Carrito de compras</Dialog.Title>
          <Dialog.Content>
            {etapa === 0 && (
              <ScrollView>
                {carritoData.map(([productoId, item]) => {
                  const producto = productosData[productoId];

                  if (productoId !== "total" && productosData[productoId]) {
                    return (
                      <View key={productoId}>
                        {/* Card con el nombre del producto y su imagen */}
                        <Card.Title
                          title={producto?.nombre ?? "Nombre no disponible"}
                          titleStyle={{ color: "#531949" }}
                          left={(props) => (
                            <Avatar.Image
                              {...props}
                              size={44}
                              source={{ uri: producto?.url ?? "" }}
                            />
                          )}
                        />

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* Nuevo Apartado 2: Selección de Cantidad */}
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text style={{ margin: 20 }}>Cantidad:</Text>
                            <Picker
                              selectedValue={item}
                              onValueChange={(item) => {
                                editarCantidad(productoId, item);
                              }}
                              style={{ height: 50, width: 100 }}
                            >
                              {[...Array(5).keys()].map((num) => (
                                <Picker.Item
                                  key={num}
                                  label={`${num + 1}`}
                                  value={num + 1}
                                />
                              ))}
                            </Picker>
                          </View>

                          {/* Nuevo Apartado 3: Botón de Eliminar */}
                          <Button
                            onPress={() => handleEliminarProducto(productoId)}
                          >
                            Eliminar
                          </Button>
                        </View>
                        <Divider />
                      </View>
                    );
                  }

                  return null; // Asegúrate de devolver algo en todos los casos del map
                })}
                {/* Texto que muestra el total general */}
                <Text style={{ margin: 20, textAlign: "right" }}>Total: ${total} </Text>
              </ScrollView>
            )}

            {etapa === 1 && (
              // Contenido para la etapa de la Tarjeta
              <View style={styles.formContainer}>
                {/* Nombre del Propietario */}
                <TextInput
                  label="Nombre del Propietario"
                  value={nombre}
                  onChangeText={(text) => setNombre(text)}
                  left={<TextInput.Icon name="account" />}
                  style={styles.input}
                />

                {/* Número de Tarjeta */}
                <TextInput
                  label="Número de Tarjeta"
                  value={tarjeta}
                  onChangeText={(text) => setTarjeta(text)}
                  keyboardType="numeric"
                  left={<TextInput.Icon name="credit-card" />}
                  style={styles.input}
                />

                {/* Fecha de Caducidad */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <TextInput
                      label="Mes"
                      value={mes}
                      onChangeText={(text) => {
                        // Limitar la entrada del mes entre 1 y 12
                        const numericValue = parseInt(text, 10);
                        if (
                          !isNaN(numericValue) &&
                          numericValue >= 1 &&
                          numericValue <= 12
                        ) {
                          setMes(text);
                        }
                      }}
                      keyboardType="numeric"
                      left={<TextInput.Icon name="calendar-month" />}
                      style={styles.input}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      label="Año"
                      value={anio}
                      onChangeText={(text) => setAnio(text)}
                      keyboardType="numeric"
                      left={<TextInput.Icon name="calendar-check" />}
                      style={styles.input}
                    />
                  </View>
                </View>

                {/* Código CVV */}
                <TextInput
                  label="CVV"
                  value={cvv}
                  onChangeText={(text) => setCvv(text)}
                  keyboardType="numeric"
                  left={<TextInput.Icon name="lock" />}
                  style={styles.input}
                />
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            {/* Botón de Cancelar */}
            <Button onPress={closeCarrito}>Cancelar</Button>

            {/* Botón de Regresar */}
            {etapa === 1 && (
              <Button onPress={() => setEtapa(etapa - 1)}>Regresar</Button>
            )}

            {/* Botón de Comprar */}
            {etapa === 1 && (
              <Button onPress={() => console.log("Comprar")}>Comprar</Button>
            )}

            {/* Botón de Siguiente */}
            {etapa === 0 && (
              <Button onPress={handleSiguiente}>Siguiente</Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginLeft: 5,
  },
  badge: {
    position: "absolute",
    top: -1,
    right: -1,
    backgroundColor: "red",
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 5,
    padding: 5,
  },
  formContainer: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default Carrito;
