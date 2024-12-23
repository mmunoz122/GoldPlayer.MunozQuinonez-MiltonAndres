import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { styles } from '../Styles';
import { auth } from '../firebaseConfig'; // Assegurem-nos d'importar la configuració de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  // Creem i declarem els estats per al correu electrònic, contrasenya, re-contrasenya, càrrega i missatges d'error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedButton, setSelectedButton] = useState('register'); // Estat per al botó seleccionat

  // Funció per manejar el registre
  const handleRegister = async () => {
    // Comprovem que els camps no estiguin buits
    if (!email || !password || !confirmPassword) {
      setErrorMsg("Si us plau, ompli tots els camps.");
      return;
    }

    // Comprovem que les contrasenyes coincideixin
    if (password !== confirmPassword) {
      setErrorMsg("Les contrasenyes no coincideixen.");
      return;
    }

    // Establim l'estat de càrrega a true i reinicialitzem el missatge d'error
    setLoading(true);
    setErrorMsg(null);

    try {
      // Intentem registrar l'usuari amb el correu electrònic i la contrasenya
      await createUserWithEmailAndPassword(auth, email, password);
      // Si el registre és exitós, naveguem a la pantalla principal
      Alert.alert('¡Èxit!', 'Compte creada amb èxit.', [
        { text: 'OK', onPress: () => navigation.navigate('loginScreen') }
      ]);
    } catch (error) {
      // Si es produeix un error, mostrem un missatge
      setErrorMsg("Error al registrar. Verifica les teves dades.");
    } finally {
      // Establim l'estat de càrrega a false un cop finalitzat el procés
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../images/fondo.jpg')} // Ruta de la imatge de fons
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={require('../images/logo.jpg')} style={styles.logo} /> {/* Afegeix el logotip */}
        
        <View style={styles.formContainer}>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={[styles.headerButton, selectedButton === 'login' && styles.headerButtonSelected]} 
              onPress={() => {
                setSelectedButton('login');
                navigation.navigate('loginScreen');
              }}
            >
              <Text style={styles.headerButtonText}>Iniciar sessió</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerButton, selectedButton === 'register' && styles.headerButtonSelected]}
              onPress={() => setSelectedButton('register')}
            >
              <Text style={styles.headerButtonText}>Registrar-se</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>Benvingut a Gold Player</Text>

          {/* Mostrar error si existeix */}
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Correu electrònic"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Contrasenya"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Re-contrasenya"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleRegister} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Creant compte..." : "Registrar-se"}</Text>
          </TouchableOpacity>
        </View>

        <Text 
          style={styles.link} 
          onPress={() => navigation.navigate('loginScreen')} // Navegar a la pantalla de login
        >
          Ja tens compte? Inicia sessió aquí.
        </Text>
      </View>
    </ImageBackground>
  );
}
