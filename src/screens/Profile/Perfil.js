import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text, Card, Searchbar, IconButton, Portal, Dialog, Avatar, Divider, List, Checkbox, Badge } from 'react-native-paper'

const Perfil = ({ navigation }) => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.view}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.img} />
                <Card.Content>
                    <Button
                        icon="login"
                        onPress={() => navigation.navigate("Acceso")}
                        style={styles.button}
                    >
                        Inicia Sesión
                    </Button>
                    <Button
                        mode="contained"
                        icon=""
                        onPress={() => navigation.navigate("Registro")}
                        style={styles.button}
                    >
                        Registrate
                    </Button>
                </Card.Content>
                </View>
            </View >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        padding: 20
    },
    button: {
        borderWidth: 0.5,
        borderColor: '#531949',
        borderRadius: 30,
        padding: 5,
        margin: 10
    },
    view: {
        marginTop: 10, 
        borderStyle: "solid", 
        borderWidth: 2, 
        borderColor: "#E7E2E8", 
        borderRadius:15
    },
    img: {
        // marginTop:10
    }
});
export default Perfil