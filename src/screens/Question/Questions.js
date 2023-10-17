import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List, Card, Divider, Text } from 'react-native-paper';

const AccordionExample = () => {
  const [expanded1, setExpanded1] = React.useState(false); // Estado para el primer acordeón
  const [expanded2, setExpanded2] = React.useState(false); // Estado para el segundo acordeón
  const [expanded3, setExpanded3] = React.useState(false); // Estado para el segundo acordeón

  const handlePress1 = () => {
    setExpanded1(!expanded1);
  };

  const handlePress2 = () => {
    setExpanded2(!expanded2);
  };
  const handlePress3 = () => {
    setExpanded3(!expanded3);
  };

  return (
    <View>
      <Card>
        <List.Accordion
          title="¿Qué puedo hacer para subir un archivo?"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded1}
          onPress={handlePress1}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
              Para subir un archivo... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>

      <Card>
        <List.Accordion
          title="¿Qué puedo hacer para solicitar cambio de información?"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded2}
          onPress={handlePress2}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
              Para solicitar un cambio... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>
      <Card>
        <List.Accordion
          title="¿Existen pagos alternos?"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded3}
          onPress={handlePress3}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>
            Los pagos alternos...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Text>
          </ScrollView>
        </List.Accordion>
        <Divider />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default AccordionExample;
