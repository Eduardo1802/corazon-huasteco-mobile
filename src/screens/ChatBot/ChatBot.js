import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, List, Divider, Avatar, Card, Searchbar} from "react-native-paper";
 
const ChatBot = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    // <ScrollView>
      <View style={styles.container}>
        {/* <Text variant="displaySmall" style={styles.title}>
          Chatbot
        </Text> */}
        <Divider />

        <Searchbar
          placeholder= "Pregunta sobre los artículos"// "Envia tu pregunta sobre Huejutla"
          icon="send"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.Searchbar}
        />
        <Divider />

        <Card style={styles.card}>
          <Card.Content>
            <Card.Title
              title={<Text style={{fontWeight: 'bold'}}>eduazuara0@gmail.com</Text>} 
              left={(props) => (
                <Avatar.Image
                  size={44}
                  source={require("../../../assets/img/chatbot/perfil.png")}
                />
              )}
            />
            <Text style={{ textAlign: 'center' }}>¿Cuales es el traje regional de Huejutla?</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Card.Title
              subtitle={<Text style={{ textAlign: 'right', fontWeight: 'bold' }}>ChatBot</Text>}
              right={(props) => (
                <Avatar.Image
                  size={44}
                  source={require("../../../assets/img/chatbot/bot.jpg")}
                />
              )}
            />
            <Text style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta aspernatur provident dolores debitis, doloribus eum id quisquam molestias accusamus architecto aliquid doloremque ducimus. Nihil vitae odit aliquam adipisci tenetur ipsum.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nisi pariatur ex velit corrupti numquam dolore eius voluptatibus ea obcaecati earum, deserunt beatae labore accusantium, temporibus incidunt ipsam rem. Unde.</Text>
          </Card.Content>
        </Card>

      </View>
    // </ScrollView>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    paddingTop: 20,
  },
  title: {
    marginBottom: 30
  },
  Searchbar: {
    marginTop: 20,
    marginBottom: 20,
    // borderWidth: 1,
    // borderColor: "black",
    // backgroundColor: "white"
  },
  card: {
    marginTop: 20,
    // backgroundColor: "#531949"
  },
  letters: {
    color: "white"
  }

});
