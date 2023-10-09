import * as React from 'react';
import {  SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/Navigation';

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
