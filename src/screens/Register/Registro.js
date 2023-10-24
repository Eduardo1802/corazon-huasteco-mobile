import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Checkbox, Text, TextInput, Menu } from "react-native-paper";
import ModalSelector from 'react-native-modal-selector';

const Registro = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellido, setApellido] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [cp, setCp] = useState("");
  const [cpError, setCpError] = useState("");
  const [estado, setEstado] = useState("");
  const [estadoError, setEstadoError] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [preguntaError, setPreguntaError] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [gmail, setGmail] = useState("");
  const [gmailError, setGmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sexo, setSexo] = useState("");
  const [sexoError, setSexoError] = useState("");
  const [preguntaMenuVisible, setPreguntaMenuVisible] = useState(false);
  const [respuestaError, setRespuestaError] = useState("");
  
  const selectSex = (sex) => {
    setSexo(sex);
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
  // const codigoPostal = async () => {
  //   if (cp.length === 5) {
  //     const response = await fetch(`https://api.zippopotam.us/mx/${cp}`);
  //     const data = await response.json();
  //     setResult(data.places[0]);
  //   } else {
  //     setResult(null);
  //     setEstado(""); // Restablece el valor del estado est a una cadena vacía
  //     cpError("El codigo postal no existe");
  //   }
  // };
  // useEffect(() => {
  //   if (cp) {
  //     codigoPostal();
  //   }
  //   if (result && result.state) {
  //     setEst(result.state);
  //     cpError("");
  //   } else {
  //     setEstado("");
  //     cpError("El codigo postal no existe");
  //   }
  //   // eslint-disable-next-line
  // }, [cp, result]);

  useEffect(() => {
    if (nombre.length < 2) setNombreError("El nombre debe tener al menos 2 caracteres");
    else setNombreError("");

    if (apellido.length < 2) setApellidoError("El apellido debe tener al menos 2 caracteres");
    else setApellidoError("");

    if (!/^\d{5}$/.test(cp)) setCpError("El código postal debe tener 5 dígitos numéricos");
    else setCpError("");

    if (!isEmailValid(gmail)) setGmailError("El correo no es válido");
    else setGmailError("");

    if (!isPasswordValid(pass)) setPassError("La contraseña debe tener al menos 6 caracteres y cumplir ciertos requisitos");
    else setPassError("");

    if (estado.trim() === "") setEstadoError("El estado no puede estar vacío");
    else setEstadoError("");

    if (pregunta.trim() === "") setPreguntaError("Debe seleccionar una pregunta secreta");
    else setPreguntaError("");

    if (respuesta.trim() === "") setRespuestaError("La respuesta no puede estar vacía");
    else setRespuestaError("");
    if (sexo.trim() === "") setSexoError("Debe seleccionar un sexo");
    else setSexoError("");
    
  }, [nombre, apellido, cp, gmail, pass, sexo, estado, pregunta, respuesta]);

  const formValid =
    nombreError === "" &&
    apellidoError === "" &&
    cpError === "" &&
    gmailError === "" &&
    passError === "" &&
    estadoError === "" &&
    preguntaError === "" &&
    respuestaError === "" &&
    sexoError === "" &&
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
            <View style={styles.pickerContainer}>
              <ModalSelector
                data={sexoOptions.map((sex, index) => ({ key: index, label: sex }))}
                initValue="Seleccione..."
                onChange={(option) => selectSex(option.label)}
              >
                <TextInput
                  label="Sexo"
                  value={sexo}
                  mode="outlined"
                  editable={false}
                />
              </ModalSelector>
            </View>
            <Text style={styles.errorText}>{sexoError}</Text>
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
                Seleccionar pregunta
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
   pickerContainer: {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  pickerLabel: {
    paddingLeft: 8,
    color: "rgba(0, 0, 0, 0.54)",
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
