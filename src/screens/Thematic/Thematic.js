import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Card, Divider, Avatar } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";

const Thematic  = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* CONTENIDO */}
        <Card style={styles.card}>
          <Text style={styles.big}>Carnaval</Text>
          <Divider style={styles.divider} />
          <Card.Title title="Tradición" />
          <Card.Content>
            <Card.Cover
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fcarnaval.jpg?alt=media&token=861b6e9f-2e59-43a8-a28b-46f62d43d2c9",
              }}
            />
            <Text variant="bodyMedium" style={styles.content}>
              Se efectúa a fines de febrero, alguna excepción a principios de
              marzo, cuatro días antes del miércoles de ceniza, martes antes del
              miércoles de ceniza se lleva acabo el desfile de disfrazados,
              carros alegóricos, participa el pueblo en general, escuelas,
              comunidades aledañas, presentando danzas, comparsas, música de
              viento y la tradición pintada.
            </Text>
          </Card.Content>
        </Card>

        {/* COMENTARIOS */}
        <Card style={styles.card}>
          <Card.Title title="Comentarios" />
          <Card.Content>
            <Button
              icon="comment-text-multiple"
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate("Tematicas")}
            >
              Agregar comentario
            </Button>
          </Card.Content>
          <Divider style={{ margin: 10 }} />
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Card.Title
                title="eduazuara0@gmail.com"
                subtitle={<AirbnbRating size={20} showRating={false} defaultRating={2}/>}
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
});

export default Thematic ;
