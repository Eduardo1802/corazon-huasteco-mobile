import * as React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { SegmentedButtons, Card, Avatar, Dialog, Portal, Text, Button, Checkbox } from "react-native-paper";

const Articles = ({ navigation }) => {
  // Menu
  const [value, setValue] = React.useState("recientes");

  // Ventana emergente
  const [visible, setVisible] = React.useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);

  // Selección de Temáticas
  const [vestimenta, setVestimenta] = React.useState(false);
  const [danza, setDanza] = React.useState(false);
  const [grastonomia, setGrastonomia] = React.useState(false);
  const [musica, setMusica] = React.useState(false);
  const [tradicciones, setTradicciones] = React.useState(false);
  const [temas, setTemas] = React.useState("");

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

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* MENU */}
        <SafeAreaView style={styles.SafeAreaView}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "recientes",
                label: "Recientes",
                icon: "clipboard-text-clock",
              },
              {
                value: "todos",
                label: "Todos",
                icon: "clipboard-text-multiple",
                onPress: open,
              },
            ]}
          />
        </SafeAreaView>

        {/* MENU OPCIONES */}
        <Portal>
          <Dialog visible={visible} onDismiss={close}>
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
                left={(props) => (
                  <Avatar.Icon {...props} size={44} icon="flag" />
                )}
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

        {/* OPCIÓN  TODOS */}
        {value === "todos" && (
          <>
            {temas.length > 0 && (
              <>
                <Card>
                  <Card.Content>
                    <Text variant="titleMedium">
                      Temáticas seleccionadas: {temas.join(", ")}
                    </Text>
                  </Card.Content>
                </Card>

                <Card style={styles.card}>
                  <Card.Content>
                    <Card.Cover
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fcarnaval.jpg?alt=media&token=861b6e9f-2e59-43a8-a28b-46f62d43d2c9",
                      }}
                    />
                    <Text variant="titleLarge" style={styles.text}>
                      Carnaval
                    </Text>
                    <Text variant="bodySmall" style={styles.text}>
                      30 de febrero
                    </Text>
                    {/* <Text variant="bodySmall" style={styles.full_text}>
                      Se efectúa a fines de febrero, alguna excepción a
                      principios de marzo, cuatro días antes del miércoles de
                      ceniza, martes antes del miércoles...
                    </Text> */}
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
                      Descargar artículo
                    </Button>
                  </Card.Content>
                </Card>
              </>
            )}
          </>
        )}

        {/* OPCIÓN RECIENTES */}
        {value === "recientes" && (
          <>
            <Card>
              <Card.Content>
                <Card.Cover
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fcarnaval.jpg?alt=media&token=861b6e9f-2e59-43a8-a28b-46f62d43d2c9",
                  }}
                />
                <Text variant="titleLarge" style={styles.text}>
                  Carnaval
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  30 de febrero
                </Text>
                {/* <Text variant="bodySmall" style={styles.full_text}>
                  Se efectúa a fines de febrero, alguna excepción a principios
                  de marzo, cuatro días antes del miércoles de ceniza, martes
                  antes del miércoles...
                </Text> */}
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
                  Descargar artículo
                </Button>
              </Card.Content>
            </Card>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20
  },
  SafeAreaView: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20
  },
  text: {
    marginTop: 10,
    textAlign: "center"
  },
  full_text: {
    marginTop: 5,
    textAlign: "justify"
  },
  title: {
    textAlign: "center"
  },
  card: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#531949",
    borderRadius: 10
  },
});

export default Articles;
