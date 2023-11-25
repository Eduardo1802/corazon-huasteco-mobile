import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Text,
  Button,
  Divider,
  Avatar,
  Card,
  Searchbar,
} from "react-native-paper";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ChatBot = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const { user } = useAuth();
  const [user_query, setUser_query] = useState("");
  const [predictionData, setPredictionData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyResponse, setIsEmptyResponse] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const value_query = searchQuery;
      setUser_query(value_query);
      setIsLoading(true);
      setIsEmptyResponse(false);
      const data = { answer: value_query };
      const response = await axios.post(
        "https://eduazuara.pythonanywhere.com/api/predict",
        data
      );
      console.log("Respuesta del servidor:", response.data);
      const value_response = response.data;
      setPredictionData(value_response);
      setIsLoading(false);
      setSearchQuery("");
    } catch (error) {
      console.error("Error al hacer la solicitud POST:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <Divider />
          <Searchbar
            placeholder="Pregunta sobre los artículos" // "Envia tu pregunta sobre Huejutla"
            icon="send"
            onChangeText={onChangeSearch}
            onIconPress={handleSubmit}
            value={searchQuery}
            style={styles.Searchbar}
          />
          <Divider />

          {/* PREGUNTA DEL USUARIO */}
          {user_query !== "" ? (
            <Card style={styles.card}>
              <Card.Content>
                <Card.Title
                  title={
                    <Text style={{ fontWeight: "bold" }}>{user.email}</Text>
                  }
                  left={(props) => (
                    <Avatar.Image
                      size={44}
                      source={require("../../../assets/img/chatbot/perfil.png")}
                    />
                  )}
                />
                <Text style={{ textAlign: "justify" }}>
                  Pregunta: {user_query}
                </Text>
                <Text style={{ textAlign: "justify" }}>
                  {isLoading && "Cargando..."}
                </Text>
              </Card.Content>
            </Card>
          ) : (
            <Text style={{ textAlign: "justify" }}></Text>
          )}

          {/* RESPUESTA DEL CHATBOT */}
          {predictionData !== "" ? (
            <Card style={styles.card}>
              <Card.Content>
                <Card.Title
                  subtitle={
                    <Text style={{ textAlign: "right", fontWeight: "bold" }}>
                      ChatBot
                    </Text>
                  }
                  right={(props) => (
                    <Avatar.Image
                      size={44}
                      source={require("../../../assets/img/chatbot/bot.jpg")}
                    />
                  )}
                />
                <Text style={{ textAlign: "justify" }}>
                  Respuesta: {isLoading && "Cargando..."}
                </Text>
                <Text style={{ textAlign: "justify" }}>
                  {isEmptyResponse
                    ? "La respuesta está vacía."
                    : predictionData.answer}
                </Text>
              </Card.Content>
            </Card>
          ) : (
            <Text style={{ textAlign: "justify" }}></Text>
          )}
        </View>
      ) : (
        <View>
          <Card>
            <Text
              style={{
                textAlign: "center",
                flexDirection: "row",
                alignItems: "center",
                margin: 20,
              }}
            >
              Para poder utilizar el chatbot, es necesario que inicies sesión.
            </Text>
            <Card.Content>
              <Button
                icon="login"
                onPress={() => navigation.navigate("Acceso")}
                style={styles.button2}
              >
                Iniciar sesión
              </Button>
            </Card.Content>
          </Card>
        </View>
      )}
    </>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    marginBottom: 30,
  },
  Searchbar: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    marginTop: 20,
  },
  letters: {
    color: "white",
  },
  button2: {
    borderWidth: 0.5,
    borderColor: "#531949",
    borderRadius: 30,
    padding: 5,
    margin: 10,
  },
});
