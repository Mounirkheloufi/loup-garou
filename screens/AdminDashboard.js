import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';

export default function AdminDashboard({ navigation }) {
  // Configuration du bouton de déconnexion dans l'en-tête
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Fonction de déconnexion
  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: () => navigation.replace('Login'), 
        },
      ],
      { cancelable: true }
    );
  };

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
  logoutButton: {
    marginRight: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
