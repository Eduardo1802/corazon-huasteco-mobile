import React from 'react'
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Card, Divider, Avatar, Dialog, Portal, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

const ArtGuardados = () => {
    const route = useRoute();
    const { item } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* CONTENIDO */}
                <Card style={styles.card}>
                    <Text style={styles.big}>{item.titulo}</Text>
                    <Divider style={styles.divider} />
                    <Card.Title title={item.tematica} />
                    <Card.Content>
                        <Card.Cover
                            source={{
                                uri: item.imgPortada,
                            }}
                        />
                        <Text variant="bodyMedium" style={styles.content}>
                            {item.informacion}
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