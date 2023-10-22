import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Button,
  Card,
  Divider,
  IconButton,
  TouchableRipple,
} from "react-native-paper";

const Usuario = ({ navigation, user }) => {
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
              <Text variant="titleSmall">{user.email}</Text>
              <Button icon="pencil" mode="contained" style={styles.button}>
                Editar perfil
              </Button>
            </Card.Content>

            <Divider style={styles.divider} />

            {/* <Text style={{ marginBottom: 20, textAlign: "justify" }}>
              "En nuestra empresa, valoramos tu experiencia y pasión por la
              cultura. Trabajamos juntos para promover la libre expresión
              cultural, fomentar la creatividad y estimular la investigación en
              el ámbito científico, literario y artístico. Tu contribución es
              fundamental para enriquecer nuestros proyectos. ¡Únete a nosotros
              y juntos impulsemos la cultura y su difusión!"
            </Text> */}

            <View style={styles.rowContainer}>
              <TouchableRipple style={styles.column}>
                <View style={styles.centerContent}>
                  <IconButton icon="account-outline" size={28} />
                  <Text variant="titleMedium">Mi cuenta</Text>
                  <Text variant="bodySmall">
                    Administra tus datos personales
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
                  <IconButton icon="book-open-outline" size={28} />
                  <Text variant="titleMedium">Agenda de direcciones</Text>
                  <Text variant="bodySmall" style={{ marginBottom: 15 }}>
                    Agrega o edita tus direcciones de envío
                  </Text>
                </View>
              </TouchableRipple>
            </View>

            <Button
              icon="login"
              style={styles.buttonClose}
              contentStyle={{ flexDirection: "row-reverse" }}
              // onPress={() => navigation.navigate("InicioHome")}
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
  button: {
    borderWidth: 0.5,
    borderColor: "#531949",
    margin: 10,
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
});

export default Usuario;
