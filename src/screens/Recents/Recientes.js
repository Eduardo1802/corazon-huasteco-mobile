import * as React from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import {
  SegmentedButtons,
  List,
  Card,
  Avatar,
  IconButton,
} from "react-native-paper";

const Recientes = ({ navigation }) => {
  // Menu
  const [value, setValue] = React.useState("");
  // Temàticas
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);


  return (
    <View style={styles.container}>
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
              value: "todas",
              label: "Todas",
              icon: "clipboard-text-multiple",
            },
            // {
            //   value: "Tematicas",
            //   label: "Temáticas",
            //   icon: "text-box",
            // },
          ]}
        />

        <Text style={styles.text}>Texto para {value}</Text>
      </SafeAreaView>
      {value === "todas" && (
         <>
          <Card.Title
            title="Vestimenta"
            subtitle="La vestimenta en Huejutla de Reyes Hidalgo en su representación tiene a su barrio de Chililico lugar del chililitet (piedra de obsidiana) tierra de alfareros descendientes de aquellos trabajadores del barro que prepararon cerámica desde la época prehispánica que por su diseño y acabado es única en el mundo."
            style={[styles.card, styles.cardTop]}
            left={(props) => <Avatar.Icon {...props} size={44} icon="folder" />}
          />
          <Card.Title
            title="Danza"
            subtitle="La danza tradicional en Huejutla de Reyes Hidalgo es denominada la danza de las inditas; tradición que viene de generación en generación y sigue viva en las comunidades de la Huasteca Hidalguense. La danza se lleva a cabo al son del trio de huapangueros que interpretan sones y alabanzas religiosas."
            style={[styles.card, styles.cardTop]}
            left={(props) => <Avatar.Icon {...props} size={44} icon="folder" />}
          />
          <Card.Title
            title="Gastronomía"
            subtitle="La gastronomía en Huejutla de Reyes Hidalgo es sin duda, un atractivo muy importante, ofreciendo exquisitas enchiladas de chile seco, tomate verde o rojo o ajonjolí, el zacahuil, cecina, tamales, bocoles, el xohol, pollo huasteco o ranchero, barbacoa de res, carnitas de puerco, mole verde y rojo, capiado y tampiqueñas, entre otros."
            style={[styles.card, styles.cardTop]}
            left={(props) => <Avatar.Icon {...props} size={44} icon="folder" />}
          />
          <Card.Title
            title="Música"
            subtitle="La música tradicional en Huejutla de reyes Hidalgo es el sistema musical de los nahuas la cual se estructura a partir de la oposición entre un eje que establece, por un lado, un ámbito religioso, y por el otro, un ámbito secular. Ambos se encuentran en el campo de lo sagrado, qué solo se define por su oposición a lo profrano."
            style={[styles.card, styles.cardTop]}
            left={(props) => <Avatar.Icon {...props} size={44} icon="folder" />}
          />
          <Card.Title
            title="Tradicciones"
            subtitle="Las tradiciones en Huejutla de Reyes Hidalgo se forjaron a partir de las costumbres, noticias, composiciones literarias y doctrinas, que pasaron de generación en generación. Las tradiciones más importantes en esta región son el carnaval, la fiesta del tordo, semana santa, Xantolo, fiesta guadalupana, feria de nochebuena y las fiestas patrias."
            style={[styles.card, styles.cardTop]}
            left={(props) => <Avatar.Icon {...props} size={44} icon="folder" />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  SafeAreaView: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0.2,
    marginBottom: 20
  },
});

export default Recientes;
