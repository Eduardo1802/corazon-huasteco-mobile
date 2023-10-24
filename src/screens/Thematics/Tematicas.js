import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Text,
  Card,
  Divider,
  Avatar,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { useAuth } from "../../context/AuthContext";
import { app } from "../../config/firebase";
import moment from "moment";

const Tematicas = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { item } = route.params;
  // Ventana emergente
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  // Comentario
  const [comentario, setComentario] = useState("");
  const [puntuación, setPuntuación] = useState(3);
  // Fecha
  const fecha = moment().format("YYYY-MM-DD");
  // Palabras prohibidas
  const palabrasProhibidas = [
    "puto",
    "puta",
    "pendejo",
    "pendeja",
    "imbécil",
    "estupido",
    "estupida",
    "culero",
    "culera",
    "zorra",
    "maldita",
    "maldito",
    "pinche",
    "maricón",
    "puñetas",
    "puñetón",
  ];

  // Puntuación
  const textosPuntuacion = {
    1: "Inútil",
    2: "Pobre",
    3: "De Acuerdo",
    4: "Bueno",
    5: "Excelente",
  };

  const enviarComentario = async () => {
    if (comentario.trim() === "") {
      alert("El comentario es requerido.");
      return;
    }
    const comentarioExistente = datosComentarios.find(
      (comentario) =>
        comentario.usuario === user.email && comentario.titulo === item.titulo
    );

    if (comentarioExistente) {
      alert("Ya has ingresado un comentario en esta temática.");
      setVisible(false);
      setComentario("");
      return;
    }

    const comentarioSinEspacios = comentario.toLowerCase().replace(/\s/g, "");
    for (const palabraProhibida of palabrasProhibidas) {
      if (comentarioSinEspacios.includes(palabraProhibida)) {
        alert("El comentario contiene palabras prohibidas.");
        return;
      }
    }
    // console.log("Fecha: ",fecha)
    // console.log("Comentario:", comentario);
    // console.log("Puntuación:", puntuación);
    // console.log("usuario: ", user.email)
    // console.log("Titulo: ", item.titulo)
    // console.log("Temática: ", item.tematica)
    const coleccionRef = app.firestore().collection("comentarios");
    await coleccionRef.doc(`${new Date().getTime()}`).set({
      fecha: fecha,
      puntuacion: String(puntuación),
      usuario: user.email,
      titulo: item.titulo,
      tematica: item.tematica,
      comentario: comentario,
    });
    alert("Comentario enviado con exito.");
    setVisible(false);
    setComentario("");
  };

  const [datosComentarios, setDatosComentarios] = useState([]);

  const obtenerInfo = async () => {
    const coleccionRef = app.firestore().collection("comentarios");
    coleccionRef.where("titulo", "==", item.titulo).onSnapshot((snapshot) => {
      const comentarios = snapshot.docs.map((doc) => doc.data());
      setDatosComentarios(comentarios);
    });
  };

  useEffect(() => {
    obtenerInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* CONTENIDO */}
        <Card style={styles.card}>
          <Text style={styles.big}>{item.titulo}</Text>
          <Divider style={styles.divider} />
          <Card.Title title={item.tematica} />
          <Card.Content>
            <Card.Cover
              source={{
                uri: item.imagen,
              }}
            />
            <Text variant="bodyMedium" style={styles.content}>
              {item.informacion}
            </Text>
          </Card.Content>
        </Card>

        {/* FORMULARIO COMENTARIO */}
        {user ? (
          <Portal>
            <Dialog visible={visible} onDismiss={close}>
              <Dialog.Title style={styles.title}>
                <Text>Agregar Comentario</Text>
              </Dialog.Title>
              <Dialog.Content>
                <Divider style={styles.divider2} />
                <Text>Usuario: {user.email}</Text>
                <Divider style={styles.divider2} />
                <Text>Foto de perfil</Text>
                <Avatar.Image
                  size={100}
                  style={styles.img}
                  source={require("../../../assets/img/chatbot/perfil.png")}
                />
                <Divider style={styles.divider2} />
                <TextInput
                  label="Comentario"
                  value={comentario}
                  onChangeText={(text) => setComentario(text)}
                  style={styles.textinput}
                />
                <Text>Puntuación: {textosPuntuacion[puntuación]}</Text>
                {/*Usa textosPuntuacion*/}
                <AirbnbRating
                  size={20}
                  showRating={false}
                  onFinishRating={(value) => setPuntuación(value)}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={close}>Cancelar</Button>
                <Button onPress={enviarComentario}>Agregar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        ) : (
          <Portal>
            <Dialog visible={visible} onDismiss={close}></Dialog>
          </Portal>
        )}

        {/* COMENTARIOS */}
        <Card style={styles.card}>
          <Card.Title title="Comentarios" />
          {user ? (
            <>
              <Card.Content>
                <Button
                  icon="comment-text-multiple"
                  mode="contained"
                  style={styles.button}
                  onPress={open}
                >
                  Agregar comentario
                  {/* <Text>"Agregar comentario"</Text> */}
                </Button>
              </Card.Content>
              <Divider style={{ margin: 10 }} />
            </>
          ) : (
            <></>
          )}
          {datosComentarios.map((datos, index) => (
            <Card style={{ margin: 10 }} key={index}>
              <Card.Content>
                <Card.Title
                  title={datos.usuario}
                  subtitle={
                    <AirbnbRating
                      size={20}
                      showRating={false}
                      defaultRating={parseInt(datos.puntuacion, 10)}
                    />
                  }
                  left={(props) => (
                    <Avatar.Image
                      {...props}
                      size={44}
                      source={require("../../../assets/img/chatbot/perfil.png")}
                    />
                  )}
                />
                <Text variant="bodyMedium">{datos.comentario}</Text>
              </Card.Content>
            </Card>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  big: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 20,
  },
  content: {
    textAlign: "justify",
    marginTop: 10,
  },
  divider: {
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    marginBottom: 10,
  },

  button: {
    // marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10,
    // margin: 20,
  },
  title: {
    textAlign: "center",
  },
  divider2: {
    marginTop: 20,
    marginBottom: 20,
  },
  img: {
    alignSelf: "center",
  },
  textinput: {
    marginBottom: 10,
  },
});

export default Tematicas;
