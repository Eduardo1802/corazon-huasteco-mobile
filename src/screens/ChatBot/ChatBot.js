import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Text,
  List,
  Divider,
  Chip,
  Avatar,
  Card,
  Searchbar,
  Drawer,
} from "react-native-paper";

const ChatBot = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={{ marginBottom: 30 }}>
        Chatbot
      </Text>
      <Divider/>
      <Searchbar
        placeholder="Envia tu pregunta sobre Huejutla"
        icon="send"
        // right={(props) => <Avatar.Icon size={34} icon="send"/>}
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.Searchbar}
      />

      <Divider />

      <Card.Title
        // title="Card Title"
        subtitle="Card Subtitle"
        style={styles.card}
        // titleStyle={styles.letters}
        subtitleStyle={styles.letters}
        left={(props) => (
          <Avatar.Image
            size={44}
            source={require("../../../assets/img/chatbot/perfil.png")}
          />
        )}
      />

      <Card.Title
        // title="Card Title"
        subtitle="Card Subtitle"
        style={styles.card}
        // titleStyle={styles.letters}
        subtitleStyle={styles.letters}
        right={(props) => (
          <Avatar.Image
            size={44}
            source={require("../../../assets/img/chatbot/bot.jpg")}
          />
        )}
      />
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  card: {
    backgroundColor: "#531949",
    padding: 10,
    marginTop: 15,
    borderRadius: 25,
  },
  letters: {
    color: "white",
  },
  Searchbar: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
});
