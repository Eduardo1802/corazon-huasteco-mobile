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
  SafeAreaView,
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
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseDB";
import { Picker } from "@react-native-picker/picker";
import { Badge } from "react-native-paper";
import { ScrollView } from "react-native";
import {
  createPaymentMethod,
  CardField,confirmPayment
} from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { createToken } from "@stripe/stripe-react-native";
import creatPaymentIntent from "../../apis/stripeApis";
import ButtonComp from "../../components/customs/ButtonComp";

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
  const [cardInfo, setCardInfo] = useState(null);
  const SP_KEYP="pk_test_51OGS1EKVFUQAyuHt7Yj0R5H6ZkS6xp8h2XEAZX2Q2EDWTKYv0wBYgAV9lLnkJNMR2Wy0Ge8BgYefbHNKQe6toHH400wGmAdu97"
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: "",
    expMes: "",
    expAnio: "",
    cvc: "",
  });
  const SP_KEY =
    "pk_test_51Gv593DMjMrn6fVZMhwb2YX4gyzXEWhP0ihV5otr858CmPRUECpONtETyCCT9CSrMZfNtI58Rk0GXdboxGrsswXE00VyAarhnk";

  // Ventana emergente carrito de compras
  const [visibleCarrito, setVisibleCarrito] = React.useState(false);
  const closeCarrito = () => setVisibleCarrito(false);
  const openCarrito = () => setVisibleCarrito(true);
  const [errorPago, setErrorPago] = useState(null);

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
  const fetchCardDetail = (cardDetail) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };
  const onDone = async () => {
    let apiData = {
      amount: total*100,
      currency: "mxn",
      description:`ID cliente ${user.uid}`
    };

    try {
      const res = await creatPaymentIntent(apiData);
      console.log("payment intent create succesfully...!!!", res);

      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = await confirmPayment(
          res?.data?.paymentIntent,
          { paymentMethodType: "Card" }
        );
        console.log("confirmPaymentIntent res++++", confirmPaymentIntent);
        alert("Payment succesfully...!!!");
        closeCarrito();
      }
    } catch (error) {
      console.log("Error rasied during payment intent", error);
    }
  };


  useEffect(() => {
    obtenerDatosCarritoYSumar();
  }, [user]);
  useEffect(() => {
    // Calcula el total cuando carritoData o productosData cambien
    var nuevoTotal = carritoData.reduce(
      (total, [productoId, item]) =>
        productoId !== "total"
          ? total + item * (productosData[productoId]?.costo || 0)
          : total,
      0
    );

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
                <Text style={{ margin: 20, textAlign: "right" }}>
                  Total: ${total}{" "}
                </Text>
              </ScrollView>
            )}

            {etapa === 1 && (
              <View style={styles.formContainer}>
                {/* Nombre del Propietario */}

                <TextInput
                  label="Nombre del Propietario"
                  value={nombre}
                  onChangeText={(text) => setNombre(text)}
                  left={<TextInput.Icon name="account" />}
                  style={styles.input}
                />
                <StripeProvider
              publishableKey={SP_KEYP}
              merchantIdentifier="merchant.identifier" // required for Apple Pay
              urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            >
              
                  <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                      number: "4242 4242 4242 4242",
                    }}
                    cardStyle={{
                      backgroundColor: "#FFFFFF",
                      textColor: "#000000",
                    }}
                    style={{
                      width: "100%",
                      height: 50,
                      marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                      fetchCardDetail(cardDetails);
                    }}
                    onFocus={(focusedField) => {
                      console.log("focusField", focusedField);
                    }}
                  />

                
              
            </StripeProvider>
                 
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
               <ButtonComp onPress={onDone} disabled={!cardInfo} />
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
