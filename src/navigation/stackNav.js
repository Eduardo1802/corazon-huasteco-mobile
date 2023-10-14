import { IconButton, Button } from "react-native-paper";
import Acceso from "../screens/Acces/Acceso";
import { Configuracion } from "../screens/Config/Configuracion";
import Tienda from "../screens/Store/Tienda";
import Inicio from "../screens/Home/Inicio";
import Articulos from "../screens/Articles/Articles";
import Registro from "../screens/Register/Registro";
import Guardados from "../screens/Saved/Guardados";
import Tematicas from "../screens/Thematics/Tematicas";
import SobreNosotros from '../screens/AboutUs/SobreNosotros';
import AcercaDe from "../screens/about/About"
import Notify from "../screens/Notify/Notify";
import Contactanos from "../screens/Contact us/Contactus"
import Terms from "../screens/Terms of use/TermsOfUse"
import Privacidad from "../screens/Privacity/Privacity"
import ChatBot from '../screens/ChatBot/ChatBot';
import ArtGuardados from '../screens/ArticlesSaved/ArtGuardados'
import Producto from '../screens/Store/Producto'
import Carrito from '../screens/Store/Carrito'
import Perfil from '../screens/Profile/Perfil'
import { createStackNavigator } from "@react-navigation/stack";
import { Logo } from "../components/customs/Logo";


const Stack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#531949',
        },
        headerTintColor: '#D9CAAD',
      }}
    >
      <Stack.Screen name="InicioHome" component={Inicio}
        options={({ navigation, color }) => ({
          headerRight: () => (
            <IconButton
              icon="account"
              iconColor="#D9CAAD"
              size={30}
              onPress={() => navigation.navigate("Perfil")}
            />
          ),
          headerTitle: () => (
            <Logo />
          ),
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen name="Perfil" component={Perfil}
        options={({ navigation }) => ({
          title: "Configuración",
          headerLeft: () => (
            <IconButton
              icon="cog"
              iconColor="#D9CAAD"
              onPress={() => navigation.navigate("Configuracion")}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="close-thick" // arrow-left close-thick
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen name="Configuracion" component={Configuracion}
        options={({ navigation }) => ({
          title: 'Configuración',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.navigate("Perfil")}
            />
          ),
          // headerRight: () => (
          //   <IconButton
          //     icon="login"
          //     iconColor="#D9CAAD"
          //     onPress={() => navigation.navigate("Acceso")}
          //   />
          // ),
        })}
      />

      <Stack.Screen name="Acceso" component={Acceso}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          ),

        })}
      />

      <Stack.Screen name="Registro" component={Registro}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          ),

        })}
      />

      <Stack.Screen name="SobreNosotros" component={SobreNosotros}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
      <Stack.Screen name="Notificaciones" component={Notify}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
      <Stack.Screen name="AcercaDe" component={AcercaDe}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />

      <Stack.Screen name="Terms" component={Terms}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />

      <Stack.Screen name="Privacidad" component={Privacidad}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />

      <Stack.Screen name="Contactanos" component={Contactanos}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
      <Stack.Screen name="ChatBot" component={ChatBot}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

export function ArticlesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecientesHome" component={Articulos}
        options={({ navigation }) => ({
          title: 'Artículos',
        })}
      />

      <Stack.Screen name="Tematicas" component={Tematicas}
        options={({ navigation }) => ({
          title: '',
        })}
      />
    </Stack.Navigator>
  );
}

export function SavedStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GuardadosHome" component={Guardados}
        options={({ navigation }) => ({
          title: 'Guardados',
        })}
      />

      <Stack.Screen name="ArtGuardados" component={ArtGuardados}
        options={({ navigation }) => ({
          title: '',
        })}
      />
    </Stack.Navigator>
  );
}

export function StoreStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TiendaHome" component={Tienda}
        options={({ navigation }) => ({
          title: 'Tienda',
          headerRight: () => (
            <Carrito />
          ),
        })}
      />
      <Stack.Screen name="Producto" component={Producto}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <Carrito />
          ),
        })}
      />
    </Stack.Navigator>
  );
}