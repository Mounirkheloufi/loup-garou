import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { GameContext } from '../context/GameContext';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@users_list';

export default function AddUserScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { users, setUsers } = useContext(GameContext);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs :', error);
    }
  };

  const saveUsers = async (newUsers) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUsers));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des utilisateurs :', error);
    }
  };

  const handleAddOrUpdateUser = () => {
    if (!username || !password) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }

    const newUser = { username, password };

    let updatedUsers = [...users];
    if (editingIndex !== null) {
      updatedUsers[editingIndex] = newUser;
      setEditingIndex(null);
    } else {
      updatedUsers.push(newUser);
    }

    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    setUsername('');
    setPassword('');
  };

  const handleEdit = (index) => {
    const user = users[index];
    setUsername(user.username);
    setPassword(user.password);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    Alert.alert('Confirmation', 'Supprimer cet utilisateur ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          const updatedUsers = [...users];
          updatedUsers.splice(index, 1);
          setUsers(updatedUsers);
          saveUsers(updatedUsers);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.userRow}>
      <Text style={styles.userText}>{item.username}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(index)}>
          <Text style={styles.editBtn}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Text style={styles.deleteBtn}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un utilisateur</Text>

      <TextInput
        placeholder="Nom d'utilisateur"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={editingIndex !== null ? 'Modifier' : 'Ajouter'}
        onPress={handleAddOrUpdateUser}
        color="#2980b9"
      />

      <Text style={styles.subtitle}>Utilisateurs enregistrés :</Text>

      <FlatList
        data={users}
        keyExtractor={(item, index) => `${index}-${item.username}`}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun utilisateur</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ecf0',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 6,
    elevation: 2,
  },
  userText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  editBtn: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  deleteBtn: {
    fontSize: 20,
    color: 'red',
    marginHorizontal: 5,
  },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
  },
});
