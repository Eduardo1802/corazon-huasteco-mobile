import React from 'react'
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Card, Divider, Avatar, Dialog, Portal, TextInput } from "react-native-paper";

const ArtGuardados = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* CONTENIDO */}
                <Card style={styles.card}>
                    <Text style={styles.big}>Carnaval</Text>
                    <Divider style={styles.divider} />
                    <Card.Title title="Tradición" />
                    <Card.Content>
                        <Card.Cover
                            source={{
                                uri: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fcarnaval.jpg?alt=media&token=861b6e9f-2e59-43a8-a28b-46f62d43d2c9",
                            }}
                        />
                        <Text variant="bodyMedium" style={styles.content}>
                            Se efectúa a fines de febrero, alguna excepción a principios de
                            marzo, cuatro días antes del miércoles de ceniza, martes antes del
                            miércoles de ceniza se lleva acabo el desfile de disfrazados,
                            carros alegóricos, participa el pueblo en general, escuelas,
                            comunidades aledañas, presentando danzas, comparsas, música de
                            viento y la tradición pintada.
                        </Text>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 30,
        display: "flex",
        justifyContent: "center",
        padding: 20,
    },
    big: {
        fontSize: 30,
        fontWeight: "bold",
        padding: 20,
    },
    content: {
        textAlign: "justify",
        marginTop: 10,
    },
    divider: {
        marginLeft: 20,
        marginRight: 20,
    },
    // card: {
    //     marginBottom: 10,
    // }
});

export default ArtGuardados