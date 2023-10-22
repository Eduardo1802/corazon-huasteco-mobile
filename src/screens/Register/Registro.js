import React, { useState, useEffect } from "react";
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
  const [nombreError, setNombreError] = useState("");
  const [apellido, setApellido] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [cp, setCp] = useState("");
  const [cpError, setCpError] = useState("");
  const [estado, setEstado] = useState("");
  const [estadoError, setEstadoError] = useState(""); // Nuevo estado de error
  const [pregunta, setPregunta] = useState("");
  const [preguntaError, setPreguntaError] = useState(""); // Nuevo estado de error
  const [respuesta, setRespuesta] = useState("");
  const [gmail, setGmail] = useState("");
  const [gmailError, setGmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedSex, setSelectedSex] = useState("");
  const [sexMenuVisible, setSexMenuVisible] = useState(false);
  const [preguntaMenuVisible, setPreguntaMenuVisible] = useState(false);
  const [respuestaError, setRespuestaError] = useState("");
  const showSexMenu = () => setSexMenuVisible(true);
  const hideSexMenu = () => setSexMenuVisible(false);
  const selectSex = (sex) => {
    setSelectedSex(sex);
    hideSexMenu();
  };

  const showPreguntaMenu = () => setPreguntaMenuVisible(true);
  const hidePreguntaMenu = () => setPreguntaMenuVisible(false);
  const selectPregunta = (selectedOption) => {
    setPregunta(selectedOption);
    hidePreguntaMenu();
  };

  const preguntaOptions = [
    "¿Nombre de tu primera mascota?",
    "¿Nombre de tu artista favorito?",
    "¿País donde deseas vivir?",
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

  // Función para validar el formato del correo electrónico
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Función para validar la contraseña
  const isPasswordValid = (password) => {
    // La contraseña debe tener al menos 6 caracteres
    if (password.length < 6) return false;
    // La contraseña debe tener un mínimo de una letra mayúscula, una letra minúscula, un número y un carácter especial
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!?/-_%$&^])[A-Za-z\d@#$!?/-_%$&^]+$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    // Validación del nombre
    if (nombre.length < 2) {
      setNombreError("El nombre debe tener al menos 2 caracteres");
    } else {
      setNombreError("");
    }

    // Validación del apellido
    if (apellido.length < 2) {
      setApellidoError("El apellido debe tener al menos 2 caracteres");
    } else {
      setApellidoError("");
    }

    // Validación del código postal
    if (!/^\d{5}$/.test(cp)) {
      setCpError("El código postal debe tener 5 dígitos numéricos");
    } else {
      setCpError("");
    }

    // Validación del correo electrónico
    if (!isEmailValid(gmail)) {
      setGmailError("El correo no es válido");
    } else {
      setGmailError("");
    }

    // Validación de la contraseña
    if (!isPasswordValid(pass)) {
      setPassError(
        "La contraseña debe tener al menos 6 caracteres y cumplir los requisitos"
      );
    } else {
      setPassError("");
    }

    // Validación del sexo
    if (selectedSex === "") {
      setSexMenuVisible(true);
    } else {
      setSexMenuVisible(false);
    }

    // Validación del estado
    if (estado.trim() === "") {
      setEstadoError("El estado no puede estar vacío");
    } else {
      setEstadoError("");
    }

    // Validación de la pregunta secreta
    if (pregunta.trim() === "") {
      setPreguntaError("Debe seleccionar una pregunta secreta");
    } else {
      setPreguntaError("");
    }
    // Validación de la respuesta de la pregunta secreta
    if (respuesta.trim() === "") {
      setRespuestaError("La respuesta no puede estar vacía");
    } else {
      setRespuestaError("");
    }
  }, [
    nombre,
    apellido,
    cp,
    gmail,
    pass,
    selectedSex,
    estado,
    pregunta,
    respuesta,
  ]);

  const formValid =
    nombreError === "" &&
    apellidoError === "" &&
    cpError === "" &&
    gmailError === "" &&
    passError === "" &&
    estadoError === "" &&
    preguntaError === "" &&
    respuestaError === "" &&
    checked;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="displayMedium">Regístrate</Text>
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
              onChangeText={(text) => {
                setNombre(text);
              }}
              style={styles.textInput}
            />
            <Text style={styles.errorText}>{nombreError}</Text>
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              label="Apellido"
              value={apellido}
              mode="outlined"
              onChangeText={(text) => {
                setApellido(text);
              }}
              style={styles.textInput}
            />
            <Text style={styles.errorText}>{apellidoError}</Text>
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
                  style={{ marginRight: -10 }}
                />
              }
            />
            <Text style={styles.errorText}>
              {selectedSex === "" ? "Este campo es obligatorio" : ""}
            </Text>
            <Menu
              visible={sexMenuVisible}
              onDismiss={hideSexMenu}
              anchor={
                <Button onPress={showSexMenu}>
                  <TextInput.Icon name="chevron-down" size={25} />
                </Button>
              }
            >
              {sexoOptions.map((sex) => (
                <Menu.Item
                  key={sex}
                  onPress={() => selectSex(sex)}
                  title={sex}
                />
              ))}
            </Menu>
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              label="Código postal"
              value={cp}
              mode="outlined"
              onChangeText={(text) => {
                setCp(text);
              }}
              style={styles.textInput}
            />
            <Text style={styles.errorText}>{cpError}</Text>
          </View>
        </View>
        <TextInput
          label="Estado"
          value={estado}
          mode="outlined"
          onChangeText={(text) => setEstado(text)}
          style={styles.textInput}
        />
        <Text style={styles.errorText}>{estadoError}</Text>
        <TextInput
          label="Correo"
          value={gmail}
          mode="outlined"
          onChangeText={(text) => {
            setGmail(text);
          }}
          style={styles.textInput}
        />
        <Text style={styles.errorText}>{gmailError}</Text>
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
        <Text style={styles.errorText}>{passError}</Text>
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
                style={{ marginRight: -10 }}
              />
            }
          />
          <Text style={styles.errorText}>{preguntaError}</Text>
          <Menu
            visible={preguntaMenuVisible}
            onDismiss={hidePreguntaMenu}
            anchor={
              <Button onPress={showPreguntaMenu}>
                <TextInput.Icon name="chevron-down" size={25} />
              </Button>
            }
          >
            {preguntaOptions.map((preguntaOption) => (
              <Menu.Item
                key={preguntaOption}
                onPress={() => selectPregunta(preguntaOption)}
                title={preguntaOption}
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
        <Text style={styles.errorText}>{respuestaError}</Text>
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
            onPress={() => {
              if (formValid) {
                console.log("Campos correctos");
              } else {
                console.log("Campos incorrectos");
              }
            }}
            disabled={!formValid} // Aquí se deshabilita el botón si formValid es falso
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
    alignItems: "center",
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Registro;
