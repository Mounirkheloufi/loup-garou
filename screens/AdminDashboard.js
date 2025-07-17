import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function AdminDashboard({ navigation }) {
  const handleAddUser = () => {
   navigation.navigate('AddUser');
  };

  const handleAddRole = () => {
   navigation.navigate('AddRole');
  };

  const handleStartDraw = () => {
    navigation.navigate('Tirage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue Admin 👑</Text>
      <Text style={styles.subtitle}>Gérez le jeu ici :</Text>

      <View style={styles.buttonContainer}>
        <Button title="➕ Ajouter un utilisateur" onPress={handleAddUser} color="#2980b9" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="🧩 Ajouter un rôle" onPress={handleAddRole} color="#27ae60" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="🎲 Faire le tirage" onPress={handleStartDraw} color="#c0392b" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ecf0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});
