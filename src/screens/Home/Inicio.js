import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import baseImage from '../../../assets/img/app/image-preview.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../../config/firebase'



const Inicio = ({ navigation }) => {

  const obtenerDatosDeFirebase = async () => {
    try {
      const productoSnapshot = await app.firestore().collection("producto").get();
      const productoData = productoSnapshot.docs.map((doc) => doc.data());

      const tematicasSnapshot = await app.firestore().collection("tematicas").get();
      const tematicasData = tematicasSnapshot.docs.map((doc) => doc.data());
      
      const usuariosSnapshot = await app.firestore().collection("usuarios").get();
      const usuariosData = usuariosSnapshot.docs.map((doc) => doc.data());

      const usuarioCorreoSnapshot = await app.firestore().collection("usuarios").get();
      const usuariosCorreoData = usuarioCorreoSnapshot.docs.map((doc) => doc.data());

      const datosCombinados = {
        producto: productoData,
        tematicas: tematicasData,
        usuarios: usuariosData,
        usuarios_correo: usuariosCorreoData
      };
      // console.log(datosCombinados)
      guardarDatosLocalmente(datosCombinados);
    }catch (error) {
      console.error("Error al obtener datos de Firebase:", error);
    }
  }

  const guardarDatosLocalmente = async (data) => {
    try {
      const existingData = await AsyncStorage.getItem("datosLocal");
      if (existingData) {
        console.log("Los datos ya existen en el almacenamiento local.");
        return;
      }
      const dataString = JSON.stringify(data);
      await AsyncStorage.setItem("datosLocal", dataString);
      console.log("Datos guardados localmente.");
    } catch (error) {
      console.error("Error al guardar datos localmente:", error);
    }
  }
  
  const eliminarDatosLocalmente = async () => {
    try {
      await AsyncStorage.removeItem("datosLocal");
      console.log("Datos eliminados del almacenamiento local.");
    } catch (error) {
      console.error("Error al eliminar datos localmente:", error);
    }
  }
  
  useEffect(() => {
    obtenerDatosDeFirebase();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          La Huasteca Hidalguense
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 3,
  },
});

export default Inicio;
