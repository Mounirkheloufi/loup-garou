import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GameProvider>
  );
}
