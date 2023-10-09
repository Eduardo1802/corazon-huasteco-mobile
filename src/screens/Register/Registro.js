import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import {
  Button,
  Checkbox,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
const Registro = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [gmail, setGmail] = useState("");
  const [pass, setPass] = useState("");
  const [passC, setPassC] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [checked, setChecked] = React.useState(false);

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
        <TextInput
          label="Nombre"
          value={nombre}
          mode="outlined"
          onChangeText={(text) => setNombre(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Apellido"
          value={apellido}
          mode="outlined"
          onChangeText={(text) => setApellido(text)}
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
        <TextInput
          label="Repetir contraseña"
          value={passC}
          mode="outlined"
          onChangeText={(text) => setPassC(text)}
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
  contentContainer: {
    alignItems: "center",
  },
  textInput: {
    marginTop: 15,
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
    alignItems: "center", // Centra verticalmente los elementos
    justifyContent: "center", // Centra horizontalmente los elementos
    marginTop: 10,
  },
  linea: {
    flex: 1, // Para que las líneas ocupen todo el espacio disponible
    height: 1, // Altura de la línea
    backgroundColor: "black", // Color de la línea (puedes personalizarlo)
    marginHorizontal: 5, // Espacio horizontal entre las líneas y el texto
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
