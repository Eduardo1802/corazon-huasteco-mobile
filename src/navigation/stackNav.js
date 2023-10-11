import { IconButton, Text } from "react-native-paper";
import Acceso from "../screens/Acces/Acceso";
import { Configuracion } from "../screens/Config/Configuracion";
import Tienda from "../screens/Store/Store";
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
import { createStackNavigator } from "@react-navigation/stack";
import { Logo } from "../components/customs/Logo";


const Stack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#531949', // Cambia el color de fondo de la barra de navegación aquí
        },
        headerTintColor: '#D9CAAD', // Cambia el color del texto en la barra de navegación aquí
      }}
    >
      <Stack.Screen name="InicioHome" component={Inicio}
        options={({ navigation, color }) => ({
          headerRight: () => (
            <IconButton
              icon="cog"
              iconColor="#D9CAAD"
              onPress={() => {
                navigation.navigate("Configuración")
              }}
            />
          ),
          headerTitle: () => (
            <Logo/>
          )
        })}
      />

      <Stack.Screen name="Configuración" component={Configuracion} 
        options={({ navigation }) => ({
          title: 'Configuración',
          headerLeft: () => (
            <IconButton
              icon="arrow-left" 
              iconColor="#D9CAAD"
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="login" 
              iconColor="#D9CAAD"
              onPress={() => navigation.navigate("Acceso")}
            />
          ),
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
          // headerRight: () => (
          //   <Text>adicionales</Text>
          // ),
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

export function SavedStackScreen(){
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

export function StoreStackScreen(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="TiendaHome" component={Tienda}
        options={({ navigation }) => ({
          title: 'Tienda',
        })}
      />   
    </Stack.Navigator>
  );
}