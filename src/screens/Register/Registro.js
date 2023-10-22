import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";
import {
  Button,
  Checkbox,
  IconButton,
  Text,
  Title,
  TextInput,
  Menu,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
const Registro = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cp, setCp] = useState("");
  const [estado, setEstado] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [gmail, setGmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [selectedSex, setSelectedSex] = useState("");
  const [sexMenuVisible, setSexMenuVisible] = useState(false);

  const showSexMenu = () => setSexMenuVisible(true);
  const hideSexMenu = () => setSexMenuVisible(false);
  const selectSex = (sex) => {
    setSelectedSex(sex);
    hideSexMenu();
  };
  const [preguntaMenuVisible, setPreguntaMenuVisible] = useState(false);

  const showPreguntaMenu = () => setPreguntaMenuVisible(true);
  const hidePreguntaMenu = () => setPreguntaMenuVisible(false);
  const selectPregunta = (selectedOption) => {
    setPregunta(selectedOption);
    hidePreguntaMenu();
  };

  const preguntaOptions = [
    "¿Nombre de tu primera mascota?",
    "¿Nombre de tu artista favorito?",
    "¿Pais donde deseas vivir?",
    "¿Comida favorita?",
    "¿Nombre de tu padre o madre?",
  ];

  const sexoOptions = ["Hombre", "Mujer"];

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="displayMedium">Registrate</Text>
        <View style={styles.registrationContainer}>
          <Text variant="titleMedium">¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Acceso")}>
            <Text variant="titleMedium" style={styles.registerLink}>
              Ingresa ahora
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineaCompleta}></View>
        <View style={styles.enlinea}>
          <View style={styles.halfWidth}>
            <TextInput
              label="Nombre"
              value={nombre}
              mode="outlined"
              onChangeText={(text) => setNombre(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              label="Apellido"
              value={apellido}
              mode="outlined"
              onChangeText={(text) => setApellido(text)}
              style={styles.textInput}
            />
          </View>
        </View>

        <View style={styles.enlinea}>
          <View style={styles.halfWidth}>
            <TextInput
              label="Sexo"
              value={selectedSex}
              mode="outlined"
              editable={false}
              right={
                <TextInput.Icon
                  name="chevron-down"
                  onPress={showSexMenu}
                  style={{ marginRight: -10 }} // Ajusta el margen del ícono
                />
              }
            />
            <Menu
              visible={sexMenuVisible}
              onDismiss={hideSexMenu}
              anchor={
                <Button onPress={showSexMenu}>
                  <TextInput.Icon name="chevron-down" size={25} />
                </Button>
              }
            >
              {sexoOptions.map((option, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => selectSex(option)}
                  title={option}
                />
              ))}
            </Menu>
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              label="Código potal"
              value={cp}
              mode="outlined"
              onChangeText={(text) => setCp(text)}
              style={styles.textInput}
            />
          </View>
        </View>
        <TextInput
          label="Estado"
          value={estado}
          mode="outlined"
          onChangeText={(text) => setEstado(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Correo"
          value={gmail}
          mode="outlined"
          onChangeText={(text) => setGmail(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Contraseña"
          value={pass}
          mode="outlined"
          onChangeText={(text) => setPass(text)}
          secureTextEntry={!showPassword}
          style={styles.textInput}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={toggleShowPassword}
            />
          }
        />
        <View style={styles.halfWidth}>
          <TextInput
            label="Pregunta secreta"
            value={pregunta}
            mode="outlined"
            editable={false}
            right={
              <TextInput.Icon
                name="chevron-down"
                onPress={showPreguntaMenu}
                style={{ marginRight: -10 }} // Ajusta el margen del ícono
              />
            }
          />
          <Menu
            visible={preguntaMenuVisible}
            onDismiss={hidePreguntaMenu}
            anchor={
              <Button onPress={showPreguntaMenu}>
                <TextInput.Icon name="chevron-down" size={25} />
              </Button>
            }
          >
            {preguntaOptions.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => selectPregunta(option)}
                title={option}
              />
            ))}
          </Menu>
        </View>
        <TextInput
          label="Respuesta a la pregunta secreta"
          value={respuesta}
          mode="outlined"
          onChangeText={(text) => setRespuesta(text)}
          secureTextEntry={!showPassword2}
          style={styles.textInput}
          right={
            <TextInput.Icon
              icon={showPassword2 ? "eye-off" : "eye"}
              onPress={toggleShowPassword2}
            />
          }
        />
        <View style={styles.terminos}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text variant="titleMedium">Al continuar, aceptas nuestros </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
            <Text variant="titleMedium" style={styles.registerLink}>
              Términos y condiciones
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Button
            mode="contained"
            style={styles.sendbutton}
            onPress={() => console.log("Pressed")}
          >
            Crear cuenta
          </Button>

          <View style={styles.separador}>
            <Text style={styles.linea}></Text>
            <Text variant="">O</Text>
            <Text style={styles.linea}></Text>
          </View>
          <Button
            icon="google"
            mode="outlined"
            style={styles.googlebutton}
            onPress={() => console.log("Pressed")}
          >
            Continuar con Google
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  enlinea: {
    flexDirection: "row",
  },
  halfWidth: {
    flex: 1,
    marginLeft: 4,
    marginEnd: 4,
  },
  contentContainer: {
    alignItems: "center",
  },

  terminos: {
    alignItems: "center", // Cambia alignContent a alignItems
    paddingLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  registrationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  separador: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
  registerLink: {
    textDecorationLine: "underline",
    paddingLeft: 5,
    color: "#0000FF",
  },
  googlebutton: {
    marginTop: 20,
  },
  texto: {
    fontSize: 15,
  },
  restaurar: {
    textDecorationLine: "underline",
    color: "#0000FF",
    marginTop: 10,
  },
  sendbutton: {
    marginTop: 20,
    marginBottom: 10,
  },
  lineaCompleta: {
    borderBottomWidth: 0.6, // Grosor de la línea
    borderBottomColor: "black", // Color de la línea (puedes personalizarlo)
    marginVertical: 10, // Espacio vertical entre la línea y otros elementos
  },
});

export default Registro;
