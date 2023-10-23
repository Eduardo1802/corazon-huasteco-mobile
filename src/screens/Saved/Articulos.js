import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, Card, Searchbar } from "react-native-paper";
import { app } from '../../config/firebase'
import { useAuth } from "../../context/AuthContext";

const Articulos = ({ navigation }) => {
  const { user } = useAuth();

  // const { item } = route.params;
  
  // Buscador
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const [articulos, setArticulos] = useState([]);

  const obtenerInfo = async () => {
    const docList = await app.firestore().collection("guardados").get();
    const datos = docList.docs
      .filter((doc) => doc.data().email === user.email)
      .map((doc) => doc.data());

    setArticulos(datos);
  }

  useEffect(() => {
    obtenerInfo()
  }, [])

  return (
    <>
      {articulos.length === 0 ? (
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
          No tienes ningún artículo guardado.
          </Text>
          <Card.Content>
            <Button
              icon="book-open-outline"
              onPress={() => navigation.navigate("RecientesHome")}
              style={styles.button2}
            >
              Ver artículos
            </Button>
          </Card.Content>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Card>
              <Card.Content>
                <Searchbar
                  placeholder="Buscar..."
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
              </Card.Content>
            </Card>
            {articulos.map((articulo, index) => (
              <Card style={styles.card} key={index}>
                <Card.Content>
                  <Card.Cover
                    source={{
                      uri: articulo.imgPortada,
                    }}
                  />
                  <Text variant="titleLarge" style={styles.text}>
                    {articulo.titulo}
                  </Text>
                  <Text variant="bodySmall" style={styles.text}>
                    {articulo.fecha}
                  </Text>
                  <Button
                    icon="text-box"
                    mode="contained"
                    style={styles.button}
                    onPress={() => navigation.navigate("ArtGuardados", { item: articulo })}
                  >
                    Leer artículo
                  </Button>
                  <Button
                    icon="delete-forever-outline"
                    // onPress={() => navigation.navigate("Acceso")}
                    style={styles.button3}
                  >
                    Eliminar de Guardados
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10,
  },
  button2: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
  button3: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 10,
    marginTop: 10,
  },
  card: {
    marginTop: 15,
  },
  text: {
    textAlign: "center",
  },
});

export default Articulos;
