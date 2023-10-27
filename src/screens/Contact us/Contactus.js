import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, TextInput, Button, Text } from 'react-native-paper';

export default function ContactUsScreen() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    
  };

  return (
    <Card>
    <View style={styles.container}>
      <Text variant="displaySmall" style={{ marginBottom: 0, fontWeight: '700' }}>
        Contactanos
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          label="Nombre"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          label="Correo Electrónico"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Mensaje"
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.input}
          multiline
          numberOfLines={4}
        />
        <Button mode="contained" onPress={handleSendMessage} style={styles.button}>
          Enviar Mensaje
        </Button>
        {message && <Text style={styles.confirmationMessage}>Mensaje enviado: {message}</Text>}
      </View>
    </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
    flex: 1,
  },
  
  formContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  confirmationMessage: {
    marginTop: 10,
    color: 'green',
  },
});
