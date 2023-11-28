import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Button,
  Card,
  Divider,
  IconButton,
  TouchableRipple,
} from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { app } from "../../config/firebase";

const Usuario = ({ navigation, user }) => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("InicioHome");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [datos, setDatos] = useState([]);

  const obtenerName = async () => {
    const coleccionRef = app.firestore().collection("usuarios");
    coleccionRef.where("email", "==", user.email).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setDatos(data);
    });
  };

  useEffect(() => {
    obtenerName();
  }, []);

  return (
    <>
      {user && (
        <>
          <Card.Cover
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/PROFILE%2Ffinally.jpg?alt=media&token=70888ed0-ffda-441c-8ba6-b0f46263e60e&_gl=1*3106xz*_ga*NjQ4NjA4NzUxLjE6OTU0NjExOTc.*_ga_CW55HF8NVT*MTY5Nzg4MTkwMS4yMy4xLjE2OTc4ODMwOTQuNDYuMC4w",
            }}
            style={styles.img}
          />

          <View style={styles.container}>
            <Card.Content style={styles.cardContent}>
              <Button icon="account" style={styles.button}>
                Consultador
              </Button>
              <Text variant="titleLarge">Hola, Bienvenido</Text>
              <Text variant="titleMedium">
                {datos.length > 0 ? datos[0].name : "Nombre no disponible"}
              </Text>
            </Card.Content>
            <Button icon="pencil" contentStyle={{ flexDirection: "row-reverse" }} mode="contained" style={styles.buttonEdit}>
              Editar perfil
            </Button>

            <Divider style={styles.divider} />

            <View style={styles.rowContainer}>
              <TouchableRipple
                style={styles.column}
                onPress={() => navigation.navigate("GuardadosHome")}
              >
                <View style={styles.centerContent}>
                  <IconButton icon="book-multiple-outline" size={25} />
                  <Text variant="titleMedium">Guardados</Text>
                  <Text variant="bodySmall">
                    Consulta y elimina tus artículos favoritos
                  </Text>
                </View>
              </TouchableRipple>

              <TouchableRipple style={styles.column}>
                <View style={styles.centerContent}>
                  <IconButton icon="cart-check" size={25} />
                  <Text variant="titleMedium">Historial de pedidos</Text>
                  <Text variant="bodySmall" style={{ marginBottom: 15 }}>
                    Encuentra tus pedidos anteriores y en curso
                  </Text>
                </View>
              </TouchableRipple>
            </View>

            <Button
              icon="login"
              style={styles.buttonClose}
              contentStyle={{ flexDirection: "row-reverse" }}
              onPress={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    // marginTop: 20,
    // marginLeft: 20,
    // marginRight: 20,
  },
  img: {
    borderRadius: 0,
    height: 135,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E7E2E8",
    // margin: 5,
    // borderRadius: 15
  },
  centerContent: {
    alignItems: "left",
  },
  buttonClose: {
    borderWidth: 0.5,
    borderColor: "#531949",
    marginTop: 30,
    borderRadius: 0,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    margin: 10,
  },
  buttonEdit: {
    borderWidth: 0.5,
    borderColor: "#531949",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 0,
  },
});

export default Usuario;
