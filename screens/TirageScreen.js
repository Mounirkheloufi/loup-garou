import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { GameContext } from '../context/GameContext';

export default function TirageScreen() {
  const { users, roles } = useContext(GameContext);
  const [assignments, setAssignments] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
  const loadAssignments = async () => {
    try {
      const stored = await AsyncStorage.getItem('assignments');
      if (stored) {
        setAssignments(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tirages :', error);
    }
  };

  loadAssignments();
}, []);


 const handleDraw = async () => {
  if (users.length === 0 || roles.length === 0) {
    alert("Ajoutez des utilisateurs et des rôles d'abord.");
    return;
  }

  const rolePool = [];
  roles.forEach((role) => {
    for (let i = 0; i < role.count; i++) {
      rolePool.push(role.name);
    }
  });

  if (rolePool.length < users.length) {
    alert("Pas assez de rôles pour tous les utilisateurs !");
    return;
  }

  const shuffledRoles = rolePool.sort(() => Math.random() - 0.5);

  setIsDrawing(true);

  setTimeout(async () => {
    const result = users.map((user, index) => ({
      username: user.username,
      role: shuffledRoles[index],
      state: 'vivant',
    }));
    setAssignments(result);
    setIsDrawing(false);
    await AsyncStorage.setItem('assignments', JSON.stringify(result));
  }, 2000);
};


  const toggleState = async (index) => {
  const updated = [...assignments];
  updated[index].state = updated[index].state === 'vivant' ? 'mort' : 'vivant';
  setAssignments(updated);
  await AsyncStorage.setItem('assignments', JSON.stringify(updated));
};

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleState(index)}>
      <View
        style={[
          styles.row,
          { backgroundColor: item.state === 'mort' ? '#f8d7da' : '#d4edda' },
        ]}
      >
        <Text style={styles.cell}>{item.username}</Text>
        <Text style={styles.cell}>{item.role}</Text>
        <Text
          style={[
            styles.cell,
            { color: item.state === 'mort' ? 'red' : 'green' },
          ]}
        >
          {item.state}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tirage des rôles</Text>
      <Button title="🎲 Lancer le tirage" onPress={handleDraw} color="#2980b9" />

      {isDrawing && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2980b9" />
          <Text style={styles.loadingText}>Tirage en cours...</Text>
        </View>
      )}

      {!isDrawing && assignments.length > 0 && (
        <>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, styles.header]}>Utilisateur</Text>
            <Text style={[styles.cell, styles.header]}>Rôle</Text>
            <Text style={[styles.cell, styles.header]}>État</Text>
          </View>

          <FlatList
            data={assignments}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }} 
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  loading: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#bdc3c7',
    padding: 10,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
