// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // pantallas
// import Inicio from '../screens/Home/Inicio';
// import SobreNosotros from '../screens/AboutUs/SobreNosotros';
// import PreguntasFrecuentesS from '../screens/FAQ/PreguntasFrecuentes';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();


// function MyTabs(){
//   return(
//     <Tab.Navigator
//       initialRouteName='Inicio'
//       screenOptions={{
//         tabBarActiveTintColor: 'green',
//       }}
//     >
//       <Tab.Screen 
//         name="Inicio" component={Inicio} 
//         options={{
//           tabBarLabel: 'Inicio',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name='home' color={color} size={30} />
//           )
//         }}
//       />
//       <Tab.Screen 
//         name="Sobre Nosotros" component={SobreNosotros} 
//         options={{
//           tabBarLabel: 'Nosotros',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name='information' color={color} size={30} />
//           )
//         }}
//       />
//       <Tab.Screen 
//         name="Preguntas Frecuentes" component={PreguntasFrecuentesS} 
//         options={{
//           tabBarLabel: 'FaQ',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name='home' color={color} size={30} />
//           )
//         }}
//       />
//     </Tab.Navigator>
//   )
// }


// function Navigation() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//       {/* <Stack.Navigator initialRouteName="Inicio">
//         <Stack.Screen 
//           name="Inicio" 
//           component={Inicio} 
//           options={{title: "Inicio"}}
//         />
//         <Stack.Screen name={"Sobre Nosotros"} component={SobreNosotros} />
//         <Stack.Screen
//           name="Preguntas Frecuentes" 
//         >
//           {(props) => <PreguntasFrecuentesS {...props} extraData={"some data"} />}
//         </Stack.Screen>
//       </Stack.Navigator> */}
//     </NavigationContainer>
//   );
// }

// export default Navigation;



import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { ExploreStackScreen, HomeStackScreen, RecentStackScreen, SavedStackScreen } from './stackNav';


const Tab = createMaterialBottomTabNavigator();


export default function Navigation() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Incio"
        // activeColor="#e91e63"
        // activeColor="#e91e63"
        // barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Recientes"
          component={RecentStackScreen}
          options={{
            tabBarLabel: 'Recientes',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="text-box" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Guardados"
          component={SavedStackScreen}
          options={{
            tabBarLabel: 'Guardados',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bookmark" color={color} size={26} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Explorar"
          component={ExploreStackScreen}
          options={{
            tabBarLabel: 'Explorar',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

