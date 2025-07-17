import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { GameContext } from '../context/GameContext';
import AdminDashboard from '../screens/AdminDashboard';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { users } = useContext(GameContext);

  return (
    <Stack.Navigator>
      {users == null ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ title: 'Tableau de bord' }}
      />
      <Stack.Screen
        name="AddUser"
        component={require('../screens/AddUserScreen').default}
        options={{ title: 'Ajouter un utilisateur' }}
      />
      <Stack.Screen
        name="AddRole"
        component={require('../screens/AddRoleScreen').default}
        options={{ title: 'Ajouter un rôle' }}
      />
      <Stack.Screen
        name="Tirage"
        component={require('../screens/TirageScreen').default}
        options={{ title: 'Faire le tirage' }}
      />
    </>
      )}
    </Stack.Navigator>
  );
}
