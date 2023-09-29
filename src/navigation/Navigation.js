import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// pantallas
import Inicio from '../screens/Home/Inicio';
import SobreNosotros from '../screens/AboutUs/SobreNosotros';
import PreguntasFrecuentesS from '../screens/FAQ/PreguntasFrecuentes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs(){
  return(
    <Tab.Navigator
      initialRouteName='Inicio'
      screenOptions={{
        tabBarActiveTintColor: 'green',
      }}
    >
      <Tab.Screen 
        name="Inicio" component={Inicio} 
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          )
        }}
      />
      <Tab.Screen 
        name="Sobre Nosotros" component={SobreNosotros} 
        options={{
          tabBarLabel: 'Nosotros',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='information' color={color} size={30} />
          ),
          tabBarBadge: 3,
          headerShown: true,
        }}
      />
      <Tab.Screen 
        name="Preguntas Frecuentes" component={PreguntasFrecuentesS} 
        options={{
          tabBarLabel: 'FAQ',
        }}
      />
    </Tab.Navigator>
  )
}


function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
      {/* <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{title: "Inicio"}}
        />
        <Stack.Screen name={"Sobre Nosotros"} component={SobreNosotros} />
        <Stack.Screen
          name="Preguntas Frecuentes" 
        >
          {(props) => <PreguntasFrecuentesS {...props} extraData={"some data"} />}
        </Stack.Screen>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default Navigation;
