import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { GameContext } from '../context/GameContext';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@roles_list';

export default function AddRoleScreen({ navigation }) {
  const [roleName, setRoleName] = useState('');
  const [roleCount, setRoleCount] = useState('');
  const { roles, setRoles } = useContext(GameContext);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const storedRoles = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedRoles) {
        setRoles(JSON.parse(storedRoles));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des rôles :', error);
    }
  };

  const saveRoles = async (newRoles) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRoles));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des rôles :', error);
    }
  };

  const handleAddOrUpdateRole = () => {
    if (!roleName || !roleCount || isNaN(roleCount)) {
      Alert.alert('Erreur', 'Nom du rôle et nombre doivent être valides');
      return;
    }

    const newRole = { name: roleName, count: parseInt(roleCount) };
    let updatedRoles = [...roles];

    if (editingIndex !== null) {
      updatedRoles[editingIndex] = newRole;
      setEditingIndex(null);
    } else {
      updatedRoles.push(newRole);
    }

    setRoles(updatedRoles);
    saveRoles(updatedRoles);
    setRoleName('');
    setRoleCount('');
  };

  const handleEdit = (index) => {
    const role = roles[index];
    setRoleName(role.name);
    setRoleCount(role.count.toString());
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    Alert.alert('Confirmer', 'Supprimer ce rôle ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          const updatedRoles = [...roles];
          updatedRoles.splice(index, 1);
          setRoles(updatedRoles);
          saveRoles(updatedRoles);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.roleRow}>
      <Text style={styles.roleText}>
        {item.name} ({item.count})
      </Text>
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
      <Text style={styles.title}>Ajouter un rôle</Text>

      <TextInput
        placeholder="Nom du rôle"
        style={styles.input}
        value={roleName}
        onChangeText={setRoleName}
      />
      <TextInput
        placeholder="Nombre de joueurs"
        style={styles.input}
        value={roleCount}
        onChangeText={setRoleCount}
        keyboardType="numeric"
      />

      <Button
        title={editingIndex !== null ? 'Modifier' : 'Ajouter'}
        onPress={handleAddOrUpdateRole}
        color="#27ae60"
      />

      <Text style={styles.subtitle}>Rôles définis :</Text>

      <FlatList
        data={roles}
        keyExtractor={(item, index) => `${index}-${item.name}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={<Text style={styles.empty}>Aucun rôle</Text>}
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
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 6,
    elevation: 2,
  },
  roleText: {
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
