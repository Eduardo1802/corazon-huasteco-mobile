import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import { Button, Text, Card, Divider, Avatar } from 'react-native-paper'


const windowWidth = Dimensions.get('window').width;

const Producto = () => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / windowWidth);
    setCurrentIndex(newIndex);
  };

  const imageUrls = [
    'https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2F1684462760728?alt=media&token=0651d14c-2663-40b9-9190-9f32315567a4',
    'https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2F1684462760728?alt=media&token=0651d14c-2663-40b9-9190-9f32315567a4',
    'https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2F1684462760728?alt=media&token=0651d14c-2663-40b9-9190-9f32315567a4',
  ];

  const renderImages = () => {
    return imageUrls.map((imageUrl, index) => (
      <View key={index} style={styles.slide}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* CARRUSEL */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          contentContainerStyle={styles.scrollViewContent}
        >
          {renderImages()}
        </ScrollView>
        <View style={styles.dotsContainer}>
          {imageUrls.map((_, index) => (
            <Text
              key={index}
              style={[
                styles.dot,
                { color: index === currentIndex ? '#531949' : 'lightgray' },
              ]}
            >
              ⬤
            </Text>
          ))}
        </View>

        {/* DATOS DEL PRODUCTO */}
        <View style={styles.viewContent}>
          <Card>
            <Card.Title
              title="TORTILLERO COLOR ROJO"
              subtitle="$139.99 MXN"
              titleStyle={styles.title}
              subtitleStyle={{ textAlign: 'center' }}
            />
            <Card.Content style={styles.cardContent}>
              <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
                Tortillero de barro color cafe originario de Chililico, Huejutla de Reyes Hidalgo.
              </Text>
              <Text style={{ marginTop: 10 }}>Categoría(s):</Text>
              <Button style={styles.button}>Tortillero</Button>
            </Card.Content>
            <Divider style={{ margin: 5 }} />
            <Card.Content style={styles.cardContent}>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  icon="currency-usd"
                  mode="contained"
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  style={styles.button}
                >
                  Comprar
                </Button>
                <Button
                  icon="cart"
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  style={styles.button}
                >
                  Añadir
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>

        
{/* Testimonios */}
<Card style={{ margin: 20 }}>
          <Card.Title
            title="Testimonios"
            titleStyle={styles.title}
          />
          {/* Persona */}
          <Card style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
            <Card.Content>
              <Card.Title
                title={<Text>Great product</Text>}
                left={(props) => (
                  <Avatar.Image
                    size={44}
                    source={require("../../../assets/img/chatbot/perfil.png")}
                  />
                  // <Avatar.Text size={44} label="R" />
                )}
              />
              <Text style={{ textAlign: 'justify' }}>Remy Sharp — Despite seeing no many bad reviews on them coming in broken , I took the risk and happy I did. I got the 8 piece and they were all in perfect condition. Thanks!</Text>
            </Card.Content>
          </Card>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: windowWidth - 20,
    height: 220,
    marginLeft: 20
  },
  button: {
    borderWidth: 0.5,
    borderColor: '#531949',
    margin: 10,
  },
  image: {
    flex: 1,
    width: windowWidth - 40,
    height: 220,
    borderRadius: 10,
    marginTop: 20
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  dot: {
    fontSize: 20,
    margin: 5,
  },
  viewContent: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default Producto;
