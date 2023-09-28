// SobreNosotrosScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Badge, Button, Card, IconButton, Tooltip } from 'react-native-paper';

const SobreNosotros = () => {
  return (
    <>
        <View>
            <Card>
                <Card.Title title="Sobre Nosotros" subtitle="Subtitulo" left={(props) => <Avatar.Icon {...props} icon="information" />} />
                <Card.Content>
                    <Text>Contenido</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
            <Text>hello there   </Text>
            <Avatar.Text size={44} label="XD" />
            <Badge>30</Badge>
        
            <Text>Sobre nosotros: Aquí puedes agregar información sobre tu empresa o equipo.</Text>

            
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SobreNosotros;
