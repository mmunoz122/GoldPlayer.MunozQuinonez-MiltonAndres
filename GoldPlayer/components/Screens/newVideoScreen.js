// Importarem els mòduls necessaris
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ImageBackground, StyleSheet, Image } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, updateDoc, arrayUnion, collection, getDocs } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

// Component principal per a la pantalla de nous vídeos
export default function NewVideoScreen({ navigation }) {
  // Definirem els estats per gestionar les dades
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;

  // Farem una crida per obtenir les llistes de l'usuari
  useEffect(() => {
    const fetchUserLists = async () => {
      if (!currentUser) {
        Alert.alert("Error", "No hi ha un usuari autenticat.");
        return;
      }

      try {
        const listsCollectionRef = collection(db, 'usuaris', currentUser.uid, 'llistes');
        const listsSnapshot = await getDocs(listsCollectionRef);

        if (!listsSnapshot.empty) {
          const lists = listsSnapshot.docs.map(doc => doc.id);
          setUserLists(lists);
        } else {
          setUserLists([]);
        }
      } catch (error) {
        console.error('Error en obtenir les llistes: ', error);
        Alert.alert('Error', 'Hi ha hagut un problema en carregar les llistes.');
      }
    };

    fetchUserLists();
  }, [currentUser]);

  // Funció per crear una nova llista
  const handleCreateList = async () => {
    if (!newListName.trim()) {
      Alert.alert('Error', 'Si us plau, ingresa un nom per a la llista.');
      return;
    }

    try {
      const listRef = doc(db, 'usuaris', currentUser.uid, 'llistes', newListName);

      await setDoc(listRef, { videos: [] });
      setUserLists(prevLists => [...prevLists, newListName]);
      setSelectedList(newListName);
      setNewListName('');

      Alert.alert('Èxit', 'Llista creada correctament!');
    } catch (error) {
      console.error('Error en crear la llista: ', error);
      Alert.alert('Error', 'Hi ha hagut un problema en crear la llista.');
    }
  };

  // Funció per guardar un vídeo a la llista seleccionada
  const handleSave = async () => {
    if (!url.trim() || !title.trim() || !description.trim() || !selectedList) {
      Alert.alert('Error', 'Si us plau, completa tots els camps i selecciona una llista.');
      return;
    }

    setLoading(true);

    try {
      const video = {
        url,
        title,
        description,
        createdAt: new Date().toISOString(),
      };

      const listDocRef = doc(db, 'usuaris', currentUser.uid, 'llistes', selectedList);

      await updateDoc(listDocRef, {
        videos: arrayUnion(video),
      });

      Alert.alert('Èxit', 'Vídeo guardat correctament!');
      navigation.goBack();
    } catch (error) {
      console.error('Error en guardar el vídeo: ', error);
      Alert.alert('Error', 'Hi ha hagut un problema en guardar el vídeo.');
    } finally {
      setLoading(false);
    }
  };

  // Renderitzarem la interfície de l'usuari
  return (
    <ImageBackground
      source={require('../images/fondo.jpg')} // Afegirem una imatge de fons
      style={styles.backgroundImage}
    >
      {/* Logo de l'aplicació */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logo.jpg')} // Ruta del logo
          style={styles.logo}
        />
      </View>

      {/* Formulari per guardar vídeos */}
      <View style={styles.container}>
        <Text style={styles.title}>Guardar un nou vídeo</Text>

        <TextInput
          style={styles.input}
          placeholder="URL del vídeo"
          value={url}
          onChangeText={setUrl}
        />

        <TextInput
          style={styles.input}
          placeholder="Títol del vídeo"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Descripció"
          value={description}
          onChangeText={setDescription}
        />

        {/* Selector de llistes */}
        <Text style={styles.label}>Selecciona una llista</Text>
        {userLists.length > 0 ? (
          <Picker
            selectedValue={selectedList}
            onValueChange={setSelectedList}
            style={styles.picker}
          >
            {userLists.map((list, index) => (
              <Picker.Item key={index} label={list} value={list} />
            ))}
          </Picker>
        ) : (
          <Text style={styles.noLists}>No tens cap llista creada.</Text>
        )}

        {/* Crear una nova llista */}
        <Text style={styles.label}>Crea una nova llista</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom de la nova llista"
          value={newListName}
          onChangeText={setNewListName}
        />
        <TouchableOpacity onPress={handleCreateList} style={styles.createListButton}>
          <Text style={styles.buttonText}>Crear nova llista</Text>
        </TouchableOpacity>

        {/* Botó per guardar el vídeo */}
        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveButton, loading && styles.disabledButton]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Guardant..." : "Guardar Vídeo"}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,  // Agrega separación debajo del logo
  },
  logo: {
    width: 100,  // Ajusta el tamaño del logo según sea necesario
    height: 100,
    resizeMode: 'contain',  // Mantiene las proporciones de la imagen
  },
  container: {
    flex: 0,
    width: '90%',
    maxWidth: 350,
    padding: 30,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#F06292',  // Borde rosat
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#6a1b9a',  // Color morat per al títol
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#8e24aa',  // Borde morat en inputs
    borderRadius: 5,
    color: '#6a1b9a',  // Color morat per al text
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 14,
    color: '#6a1b9a',
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 40,
    borderColor: '#8e24aa',
    borderWidth: 1,
    marginBottom: 12,
    color: '#6a1b9a',  // Color del text del Picker
  },
  noLists: {
    color: '#6a1b9a',
    marginBottom: 20,
  },
  createListButton: {
    padding: 8,
    backgroundColor: '#D32F2F',  // Rojo fuerte para el botón
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  saveButton: {
    padding: 8,
    backgroundColor: '#D32F2F',  // Rojo fuerte para el botón de guardar
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1C4E9',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
