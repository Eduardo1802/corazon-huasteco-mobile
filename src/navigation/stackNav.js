import { IconButton, Text } from "react-native-paper";
import Acceso from "../screens/Acces/Acceso";
import { Configuracion } from "../screens/Config/Configuracion";
import Explorar from "../screens/Explore/Explorar";
import Inicio from "../screens/Home/Inicio";
import Recientes from "../screens/Recents/Recientes";
import Registro from "../screens/Register/Registro";
import Guardados from "../screens/Saved/Guardados";
import Tematicas from "../screens/Tematicas/Tematicas";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InicioHome" component={Inicio}
        options={({ navigation }) => ({
          title: 'Corazón Huasteco',
          headerRight: () => (
            <IconButton
              icon="cog"
              onPress={() => {
                navigation.navigate("Configuración")
              }}
            />
          ),
        })}
      />

      <Stack.Screen name="Configuración" component={Configuracion} 
        options={({ navigation }) => ({
          title: 'Configuración',
          headerLeft: () => (
            <IconButton
              icon="arrow-left" 
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="login" 
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
              onPress={() => navigation.goBack()}
            />
          ),
         
        })}
      />
      

    </Stack.Navigator>
  );
}

export function RecentStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecientesHome" component={Recientes}
        options={({ navigation }) => ({
          title: 'Recientes',
          headerRight: () => (
            <Text>adicionales</Text>
          ),
        })}
      />

      <Stack.Screen name="Tematicas" component={Tematicas}
        options={({ navigation }) => ({
          title: 'Tematicas',
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
    </Stack.Navigator>
  );
}

export function ExploreStackScreen(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExplorarHome" component={Explorar}
        options={({ navigation }) => ({
          title: 'Explorar',
        })}
      />   
    </Stack.Navigator>
  );
}