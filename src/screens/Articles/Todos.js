import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Avatar,
  Dialog,
  Portal,
  Text,
  Button,
  Checkbox,
  Searchbar,
} from "react-native-paper";
import { app } from "../../config/firebase";

const Todos = ({ navigation }) => {
  // Ventana emergente menu tematicas
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  // Selección de Temáticas
  const [vestimenta, setVestimenta] = useState(false);
  const [danza, setDanza] = useState(false);
  const [grastonomia, setGrastonomia] = useState(false);
  const [musica, setMusica] = useState(false);
  const [tradicciones, setTradicciones] = useState(false);
  const [temas, setTemas] = useState([]);
  // Buscador
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const selectTematicas = () => {
    const tematicasSeleccionadas = [];
    if (vestimenta) {
      tematicasSeleccionadas.push("Vestimenta");
    }
    if (danza) {
      tematicasSeleccionadas.push("Danza");
    }
    if (grastonomia) {
      tematicasSeleccionadas.push("Gastronomía");
    }
    if (musica) {
      tematicasSeleccionadas.push("Música");
    }
    if (tradicciones) {
      tematicasSeleccionadas.push("Tradicciones");
    }
    setTemas(tematicasSeleccionadas);
    setVisible(false);
  };

  // RecuperarDatosLocalmente
  const [tematicas, setTematicas] = useState([]);
  const recuperarDatosLocalmente = async () => {
    try {
      const datos = await AsyncStorage.getItem("datosLocal");
      if (datos !== null) {
        const datosParseados = JSON.parse(datos);
        const datosTabla = datosParseados.tematicas;
        setTematicas(datosTabla)
        console.log("Temáticas sección todos obtenidas del Storage.");
      } else {
        const tematicasSnapshot = await app.firestore().collection("producto").get();
        const tematicasData = tematicasSnapshot.docs.map((doc) => doc.data());
        setTematicas(tematicasData)
        console.log("Temáticas sección todos obtenidas de firebase.");
      }
    } catch (error) {
      console.error("Error al recuperar datos locales:", error);
    }
  };

  useEffect(() => {
    recuperarDatosLocalmente();
  }, []);

  return (
    <View>
      <Card>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Buscar..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchbar}
          />
        </View>

        <Button
          icon="checkbox-marked-circle-outline"
          onPress={open}
          style={styles.buttonFilter}
        >
          Filtros
        </Button>
      </Card>

      {/* MENU  */}
      <Portal>
        <Dialog visible={visible} onDismiss={open}>
          <Dialog.Title style={styles.title}>
            Seleccione la temática
          </Dialog.Title>
          <Dialog.Content>
            <Card.Title
              title="Vestimenta"
              titleStyle={{ color: "#531949" }}
              left={(props) => (
                <Avatar.Icon {...props} size={44} icon="hanger" />
              )}
              right={(props) => (
                <Checkbox
                  status={vestimenta ? "checked" : "unchecked"}
                  onPress={() => {
                    setVestimenta(!vestimenta);
                  }}
                />
              )}
            />
            <Card.Title
              title="Danza"
              left={(props) => (
                <Avatar.Icon {...props} size={44} icon="human-female-dance" />
              )}
              right={(props) => (
                <Checkbox
                  status={danza ? "checked" : "unchecked"}
                  onPress={() => {
                    setDanza(!danza);
                  }}
                />
              )}
            />
            <Card.Title
              title="Gastronomía"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  size={44}
                  icon="silverware-fork-knife"
                />
              )}
              right={(props) => (
                <Checkbox
                  status={grastonomia ? "checked" : "unchecked"}
                  onPress={() => {
                    setGrastonomia(!grastonomia);
                  }}
                />
              )}
            />
            <Card.Title
              title="Música"
              left={(props) => (
                <Avatar.Icon {...props} size={44} icon="music-note-eighth" />
              )}
              right={(props) => (
                <Checkbox
                  status={musica ? "checked" : "unchecked"}
                  onPress={() => {
                    setMusica(!musica);
                  }}
                />
              )}
            />
            <Card.Title
              title="Tradicciones"
              left={(props) => <Avatar.Icon {...props} size={44} icon="flag" />}
              right={(props) => (
                <Checkbox
                  status={tradicciones ? "checked" : "unchecked"}
                  onPress={() => {
                    setTradicciones(!tradicciones);
                  }}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={close}>Cancelar</Button>
            <Button onPress={selectTematicas}>Filtrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">
            Temáticas seleccionadas: {temas.join(", ")}
          </Text>
        </Card.Content>
      </Card> */}

      {/* TEMÁTICAS */}
      {tematicas.map((producto, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Card.Cover
              source={{
                uri: producto.imgPortada
              }}
            />
            <Text variant="titleLarge" style={styles.text}>
              {producto.titulo}
            </Text>
            <Text variant="titleSmall" style={styles.text}>
              {producto.tematica}
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
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10,
  },
  buttonFilter: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  searchbar: {
    flex: 1,
  },
});

export default Todos;
