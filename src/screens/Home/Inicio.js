import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Divider, Text } from "react-native-paper";
import baseImage from '../../../assets/img/app/image-preview.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../../config/firebase'
import { useAuth } from "../../context/AuthContext";


const Inicio = ({ navigation }) => {
  const { login } = useAuth();
  const [storedCredentials, setStoredCredentials] = useState(null);

  const obtenerCredencialesAlmacenadas = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      const userPassword = await AsyncStorage.getItem("userPassword");
      if (userEmail && userPassword) {
        setStoredCredentials({ email: userEmail, password: userPassword });
      }
      console.log("Credenciales recuperadas",userEmail,userPassword)
    } catch (error) {
      console.error("Error al recuperar credenciales:", error);
    }
  }

  const handleAutoLogin = async () => {
    if (storedCredentials) {
      try {
        const { email, password } = storedCredentials;
        await login(email, password);
      } catch (error) {
        console.error("Error al iniciar sesión automáticamente:", error);
      }
    }
  }

  useEffect(() => {
    obtenerCredencialesAlmacenadas();
    handleAutoLogin(); // Intenta el inicio de sesión automático al cargar la pantalla.
  }, []);

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
          Huejutla: Descubriendo Nuestra Historia.
        </Text>
        <Text variant="" style={styles.Text}>
          Hace milenios, los tenec o huaxtecos fundaron "Tantocoy," un lugar de sauces. Más tarde, los toltecas lo rebautizaron como "Huexotlan," que significa lo mismo. En 1522, la expedición de Francisco de Garay trajo cambios a la región, sometida por Hernán Cortés, quien en diciembre conquistó Huexotlan, llamándolo desde entonces Huejutla. Este es solo un vistazo a la historia. Haz clic para descubrir más sobre la fascinante herencia cultural de esta tierra ancestral.
        </Text>
        <Text style={styles.subtitle}>
          Nuestros Colaboradores: Voces Auténticas de la Huasteca Hidalguense
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          Conoce a los Apasionados Guardianes de la Cultura y la Región
        </Text>
        <Text style={styles.Text}>
          Nuestra plataforma es un faro de conocimiento y autenticidad gracias a nuestros dedicados colaboradores. Ellos son los narradores de historias, los guardianes de tradiciones y los informantes de la Huasteca Hidalguense. Con una profunda pasión por su cultura y región, nuestros colaboradores aportan información verídica y perspectivas únicas a través de sus artículos. Desde relatos históricos hasta exploraciones de festivales locales, sus contribuciones enriquecen nuestra comunidad y te sumergen en la riqueza de la Huasteca.
        </Text>
        <Button style={styles.button} mode="contained">
          EXPLORA SUS VOCES
        </Button>
        <Divider style={styles.dividerStyle}/>
        <Text style={styles.titleText}>
          Riqueza Botánica de la Huasteca Hidalguense
        </Text>
        <Text style={styles.normalText}>
          Explora la abundante biodiversidad de Huejutla: árboles frutales, madera fina, plantas medicinales y una profusión de flora.
        </Text>
        <Button style={styles.button} mode="contained">
          VER MÁS
        </Button>
        <Divider style={styles.dividerStyle}/>
        <Text style={styles.titleText}>
          Diversidad Faunística de Huejutla
        </Text>
        <Text style={styles.normalText}>
          Descubre la fascinante variedad de vida silvestre en Huejutla, desde mamíferos y aves hasta reptiles y más.
        </Text>
        <Button style={styles.button} mode="contained">
          VER MÁS
        </Button>
        <Divider style={styles.dividerStyle}/>
        <Text style={styles.titleText}>
          Colindancias
        </Text>
        <Text style={styles.normalText}>
          Huejutla colinda al norte con el municipio de Orizatlán, el estado de Veracruz; al este con Veracruz, Huautla y Atlapexco; al sur con Atlapexco, Huazalingo y Tlanchinol; y al oeste con Tlanchinol, Jaltocan y Orizatlán.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 6,
    margin: 10
  },
  title:{
    fontWeight: 'bold',
    fontSize: 35,
    margin: 10
  },
  titleText:{
    fontWeight: 'bold',
    fontSize: 35,
    margin: 10,
    textAlign: 'center'
  },
  subtitle:{
    fontSize: 35,
    margin: 10,
    textAlign: 'center'
  },
  normalText: {
    fontSize: 20, // Tamaño de fuente más pequeño
    fontWeight: 'normal', // Estilo de fuente normal
    lineHeight: 25,
    margin: 10,
    color: '#666666',
    textAlign: 'center'
  },
  Text: {
    fontSize: 20, // Tamaño de fuente más pequeño
    fontWeight: 'normal', // Estilo de fuente normal
    lineHeight: 25,
    margin: 10,
    color: '#666666',
    
  },
  button: {
    margin: 10,
    backgroundColor: 'transparent', 
    borderRadius: 15,     
    color: '#000'  ,     
    borderColor: '#000',
    borderWidth: 1,
  },
  dividerStyle: {
    backgroundColor: '#b5b5b5',
    pading: 50
  },
});

export default Inicio;