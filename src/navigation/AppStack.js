import { createStackNavigator } from '@react-navigation/stack';
import Inicio from '../screens/Home/Inicio';
import SobreNosotros from '../screens/AboutUs/SobreNosotros';
import PreguntasFrecuentesS from '../screens/FAQ/PreguntasFrecuentes';



const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name={"Sobre Nosotros"} component={SobreNosotros} />
      <Stack.Screen name="Preguntas Frecuentes" component={PreguntasFrecuentesS} />
    </Stack.Navigator>
  );
}

export default AppStack;
