import * as React from 'react';
import {  SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import Navigation from './src/navigation/Navigation';

export default function App() {

  const customColors = {
    "primary": "#531949",
    "onPrimary": "#e0b7d5",
    "primaryContainer": "slateblue",
    "onPrimaryContainer": "red",
    "secondary": "red",
    "onSecondary": "red",
    "secondaryContainer": "#e0b7d5",
    "onSecondaryContainer": "#781c5b",

    "background": "#e0b7d5",
    "onBackground": "blue",
    "surface": "orange",
    "onSurface": "#531949",
    "surfaceVariant": "#f2e2ed",
    "onSurfaceVariant": "#531949",
  };
  
  

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...customColors, // Agrega los colores personalizados al tema
    },
  };

  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Navigation/>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
}
