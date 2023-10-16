import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { app } from "../../config/firebase";

const Recientes = ({ navigation }) => {
  // recuperarDatosLocalmente
  const [tematicasfecha, setTematicasfecha] = useState([]);

  const recuperarDatosLocalmente = async () => {
    try {
      const datos = await AsyncStorage.getItem("datosLocal");
      if (datos !== null) {
        const datosParseados = JSON.parse(datos);
        const datosTabla = datosParseados.tematicas;
        const tradiciones = datosTabla.filter(
          (item) => item.tematica === "Tradiciones"
        );
        const fechaActual = new Date();
        // console.log(fechaActual);

        const tradicionesConFechas = tradiciones.map((item) => {
          const fechaTematica = item.fecha;
          const palabrasFecha = fechaTematica.split(" ");
          const dia = parseInt(palabrasFecha[0]);
          const mes = palabrasFecha[2];
          let numMes;
          if (mes === "enero") {numMes = 0;} 
          else if (mes === "febrero") {numMes = 1;} 
          else if (mes === "marzo") {numMes = 2;} 
          else if (mes === "abril") {numMes = 3;} 
          else if (mes === "mayo") {numMes } 
          else if (mes === "junio") {numMes = 5;} 
          else if (mes === "julio") {numMes = 6;} 
          else if (mes === "agosto") {numMes = 7;} 
          else if (mes === "septiembre") {numMes = 8;} 
          else if (mes === "octubre") {numMes = 9;} 
          else if (mes === "noviembre") {numMes = 10;} 
          else if (mes === "diciembre") {numMes = 11;}
          const fechaTematicaObj = new Date(fechaActual.getFullYear(),numMes,dia);
          const diferenciaDias = Math.floor((fechaTematicaObj - fechaActual) / (1000 * 60 * 60 * 24));
          if(diferenciaDias>0){return { item, diferenciaDias};}
        });
        tradicionesConFechas.sort((a, b) => a.diferenciaDias - b.diferenciaDias);
        // console.log(tradicionesConFechas)
        setTematicasfecha(tradicionesConFechas);
        console.log("Temáticas sección recientes obtenidas del Storage.");
      } else {
        console.log("Temáticas sección recientes obtenidos de firebase.");
      }
    } catch (error) {
      console.error("Error al recuperar datos locales:", error);
    }
  };

  useEffect(() => {
    recuperarDatosLocalmente();
  }, []);

  return (
    <>
      {tematicasfecha.map((producto, index) => (
        <View key={index}>
          {producto && (
            <Card style={{ marginTop: 20 }}>
              <Card.Content>
                <Card.Cover
                  source={{
                    uri: producto.item.imgPortada,
                  }}
                />
                <Text variant="titleLarge" style={styles.text}>
                  {producto.item.titulo}
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  {producto.item.fecha}
                </Text>
                <Button
                  icon="text-box"
                  mode="contained"
                  style={styles.button}
                  onPress={() => navigation.navigate("Tematicas")}
                >
                  Leer artículo
                </Button>
                <Button
                  icon="arrow-down-circle-outline"
                  mode="contained"
                  style={styles.button}
                >
                  Guardar artículo
                </Button>
              </Card.Content>
            </Card>
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10,
  },
});

export default Recientes;
