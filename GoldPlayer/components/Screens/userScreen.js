import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig'; // Assegurem d'importar auth i db correctament
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import FSection from '../FSection'; // Footer de seccions

export default function UserScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Crearem un efecte per carregar les dades de l'usuari
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email); // Establim el correu actual
        try {
          const userDocRef = doc(db, 'usuaris', auth.currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username || '');
            setPassword(userData.password || '');
          }
        } catch (error) {
          console.error('Error al obtenir dades de l’usuari:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Funció per guardar els canvis de l'usuari
  const handleSave = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'El nom d’usuari i la contrasenya no poden estar buits.');
      return;
    }

    try {
      const userDocRef = doc(db, 'usuaris', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        username: username,
        password: password,
      });
      Alert.alert('Èxit', 'Les dades s’han guardat correctament.');
    } catch (error) {
      console.error('Error al guardar les dades:', error);
      Alert.alert('Error', 'No s’han pogut guardar les dades.');
    }
  };

  // Funció per tancar la sessió de l'usuari
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Tanquem la sessió
      navigation.replace('loginScreen'); // Redirigim a la pantalla de login
    } catch (error) {
      console.error('Error al tancar sessió:', error);
      Alert.alert('Error', 'No s’ha pogut tancar la sessió. Torna-ho a intentar.');
    }
  };

  // Funció per canviar la imatge de l'usuari
  const handleChangePicture = () => {
    console.log('Canviar imatge de l’usuari');
  };

  // Navegarem a diferents pantalles segons l'ID
  const handlePress = (id) => {
    if (id === 1) navigation.navigate('listScreen');
    else if (id === 2) navigation.navigate('favouriteScreen');
    else if (id === 3) navigation.navigate('userScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Creem el header amb logo */}
      <View style={styles.header}>
        <Image source={require('../images/logo.jpg')} style={styles.logo} />
      </View>

      {/* Afegim un fons amb imatge */}
      <ImageBackground
        source={require('../images/fondo.jpg')} // Ruta de la imatge de fons
        style={styles.background}
      >
        {/* Creem el formulari de configuració */}
        <View style={styles.settingsContainer}>
          <Text style={styles.title}>Configuració d'usuari</Text>
          <View style={styles.imageRow}>
            <TouchableOpacity style={styles.imageContainer}>
              <Text style={styles.imageIcon}>👤</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangePicture}>
              <Text style={styles.changeText}>Canviar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nom d'usuari</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contrasenya</Text>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email} // Mostrem el correu actual
              editable={false} // Evitem que sigui editable
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar canvis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Tancar sessió</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Footer amb seccions */}
      <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                <FSection currentSection={3} onPress={handlePress} />
              </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e44ad', // Mateix color que el footer
  },
  logo: {
    width: 80,
    height: 80,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsContainer: {
    width: '90%',
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // Per l'ombra
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066',
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#bbdefb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imageIcon: {
    fontSize: 30,
    color: '#333',
  },
  changeText: {
    fontSize: 16,
    color: '#1e88e5',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#e53935',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e44ad', // Mateix color que el header
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
