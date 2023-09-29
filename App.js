import * as React from 'react';
import {  SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider>
          <Navigation/>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
}
