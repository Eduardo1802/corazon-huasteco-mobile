import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Card, Divider, Avatar, Dialog, Portal, TextInput } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

const Tematicas = () => {
  const route = useRoute();
  const { item } = route.params; // Acceder al ID
  // Ventana emergente
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  // Comentario
  const [comentatio, setComentatio] = useState("");
  const [puntuación, setPuntuación] = useState(0);

  const enviarComentario = () => {
    console.log("Comentario:", comentatio);
    console.log("Puntuación:", puntuación);
  };

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


        {/* FORMULALIO COMENTARIO */}
        <Portal>
          <Dialog visible={visible} onDismiss={close}>
            <Dialog.Title style={styles.title}>
              Agregar Comentario
            </Dialog.Title>
            <Dialog.Content>
              <Divider style={styles.divider2} />
              <Text>Usuario: eduazuara0@gmail.com</Text>
              <Divider style={styles.divider2} />
              <Text>Foto de perfil</Text>
              <Avatar.Image size={100} style={styles.img} source={require('../../../assets/img/chatbot/perfil.png')} />
              <Divider style={styles.divider2} />
              <TextInput
                label="Comentario"
                value={comentatio}
                onChangeText={text => setComentatio(text)}
                style={styles.textinput}
              />
              <Text>Puntuación</Text>
              <AirbnbRating size={20} showRating={false} onFinishRating={(value) => setPuntuación(value)} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={close}>Cancelar</Button>
              <Button onPress={enviarComentario}>Agregar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* COMENTARIOS */}
        <Card style={styles.card}>
          <Card.Title title="Comentarios" />
          <Card.Content>
            <Button
              icon="comment-text-multiple"
              mode="contained"
              style={styles.button}
              onPress={open}
            >
              Agregar comentario
            </Button>
          </Card.Content>
          <Divider style={{ margin: 10 }} />
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Card.Title
                title="eduazuara0@gmail.com"
                subtitle={<AirbnbRating size={20} showRating={false} defaultRating={2} />}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    size={44}
                    source={require("../../../assets/img/chatbot/perfil.png")}
                  />
                )}
              />
              <Text variant="bodyMedium">Contenido del comentario</Text>
            </Card.Content>
          </Card>
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
    textAlign: "center"
  },
  divider2: {
    marginTop: 20,
    marginBottom: 20
  },
  img: {
    alignSelf: 'center'
  },
  textinput: {
    marginBottom:10
  } 
});

export default Tematicas;
