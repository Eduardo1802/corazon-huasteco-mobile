import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text, Card, Searchbar, IconButton, Portal, Dialog, Avatar, Divider, List, Checkbox, Badge } from 'react-native-paper'

const Carrito = () => {
    // Ventana emergente carrito de compras
    const [visibleCarrito, setVisibleCarrito] = React.useState(false);
    const closeCarrito = () => setVisibleCarrito(false);
    const openCarrito = () => setVisibleCarrito(true);
    // Ventana icono
    const [visible, setVisible] = React.useState(true);
    const open = () => setVisible(true);

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <IconButton
                    icon="cart"
                    onPress={openCarrito}
                    color="#531949"
                    size={25}
                    style={styles.button}
                />
                <Badge style={styles.badge}>1</Badge>
            </View>

            {/* DAR CLICK EN EL CARRITO */}
            <Portal>
                <Dialog visible={visibleCarrito} onDismiss={closeCarrito}>
                    <Dialog.Title style={styles.title}>
                        Carrito de compras
                    </Dialog.Title>
                    <Dialog.Content>
                        <Card.Title
                            title="Producto"
                            titleStyle={{ color: "#531949" }}
                            left={(props) => (
                                <Avatar.Icon {...props} size={44} icon="cart" />
                            )}
                        />
                        <Divider />
                        <Text style={{ margin: 20, textAlign: 'right' }}>Total: 59.99</Text>
                        <Divider />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={closeCarrito}>Cancelar</Button>
                        <Button>Siguiente</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        padding: 20
    },
    buttonContainer: {
        alignItems: 'center',
        marginLeft: 5,
    },
    badge: {
        position: 'absolute',
        top: -1,
        right: -1,
        backgroundColor: 'red',
    },
    button: {
        borderWidth: 0.5,
        borderColor: '#531949',
        borderRadius: 5,
        padding: 5,
    },
});


export default Carrito