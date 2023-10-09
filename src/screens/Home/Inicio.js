import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import baseImage from '../../../assets/img/app/image-preview.png'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


const Inicio = ({ navigation }) => {

  const data = [{title: "Todo lo que debes saber acerca de las vestimentas tradicionales", time: "Hace 1 hora", img: baseImage},{title: "Xantolo, ¿Qué debes hacer cuando ya está cerca esta fecha?", time: "Hace 1 dia", img: baseImage}, {title: "Los bailes tipicos de la huasteca hidalguense", time: "Hace 1 semana", img: baseImage}, {title: "Todo lo que debes saber acerca de las vestimentas tradicionales", time: "Hace 1 hora", img: baseImage},{title: "Xantolo, ¿Qué debes hacer cuando ya está cerca esta fecha?", time: "Hace 1 dia", img: baseImage}];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          La Huasteca Hidalguense
        </Text>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slider}
        >
          {data.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Card mode="contained" style={styles.card}>
                <Card.Cover source={item.img} />
                <Card.Content>
                  <Text variant="bodyMedium">{item.time}</Text>
                  <Text variant="titleLarge">{item.title.slice(0, 40)}...</Text>
                </Card.Content>
              </Card>
            </View>
          ))}
        </ScrollView>

        <Card mode="contained" style={styles.card}>
          {/* <Card.Title title="Card Title" subtitle="Card Subtitle"/> */}
          <Card.Cover source={baseImage} onPress={()=> alert("hello there")}/>
          <Card.Content>
            <Text variant="bodyMedium">Hace 1 hora</Text>
            <Text variant="titleLarge">Todo lo que debes saber a cerca de las vestimentas tradicionales</Text>
          </Card.Content>
        </Card>
        
        <Card mode="contained" style={styles.card}>
          {/* <Card.Title title="Card Title" subtitle="Card Subtitle"/> */}
          <Card.Cover source={baseImage} />
          <Card.Content>
            <Text variant="bodyMedium">Hace 1 hora</Text>
            <Text variant="titleLarge">Todo lo que debes saber a cerca de las vestimentas tradicionales</Text>
          </Card.Content>
        </Card>
        
        <Card mode="contained" style={styles.card}>
          {/* <Card.Title title="Card Title" subtitle="Card Subtitle"/> */}
          <Card.Cover source={baseImage} />
          <Card.Content>
            <Text variant="bodyMedium">Hace 1 hora</Text>
            <Text variant="titleLarge">Todo lo que debes saber a cerca de las vestimentas tradicionales</Text>
          </Card.Content>
        </Card>
        
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slider}
        >
          {data.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Card mode="contained" style={styles.card}>
                <Card.Cover source={item.img} />
                <Card.Content>
                  <Text variant="bodyMedium">{item.time}</Text>
                  <Text variant="titleLarge">{item.title.slice(0, 40)}...</Text>
                </Card.Content>
              </Card>
            </View>
          ))}
        </ScrollView>

        {/* <Button
          mode="contained"
          icon="information"
          onPress={() => navigation.navigate('Recientes')}
        >Sobre nosotros</Button>
        
        <Button
          mode="contained"
          icon="information"
          onPress={() => navigation.navigate('elder')}
        >Hola buen día Elder</Button>

        <Button
          mode="outlined"
          icon="comment-question"
          onPress={() => navigation.navigate('Preguntas Frecuentes')}

        >Preguntas frecuentes</Button> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 3,
  },

  title:{
    fontWeight: 700,
    marginBottom: 10,
  },

  slider: {
    flexDirection: 'row',
  },
  slide: {
    width: 300, // Ancho de cada slide
    padding: 3
  },
  card: {
    marginHorizontal: 3,
    marginVertical: 5,
  },
});

export default Inicio;
