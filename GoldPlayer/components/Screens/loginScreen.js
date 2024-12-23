import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { styles } from '../Styles';
import { auth } from '../firebaseConfig'; // Assegurem-nos d'importar la configuració de Firebase
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  // Creem i declarem els estats per al correu electrònic, la contrasenya, la càrrega i els missatges d'error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedButton, setSelectedButton] = useState('login'); // Estat per al botó seleccionat

  // Funció per manejar l'inici de sessió
  const handleLogin = async () => {
    // Comprovem que els camps de correu electrònic i contrasenya no estiguin buits
    if (!email || !password) {
      setErrorMsg("Si us plau, introdueix un correu electrònic i una contrasenya.");
      return;
    }
    
    // Establim l'estat de càrrega a true i reinicialitzem el missatge d'error
    setLoading(true);
    setErrorMsg(null);

    try {
      // Intentem iniciar sessió amb el correu electrònic i la contrasenya
      await signInWithEmailAndPassword(auth, email, password);
      // Si l'inici de sessió és exitós, naveguem a la següent pantalla
      navigation.navigate('listScreen'); // Reemplaça 'ListScreen' amb el nom de la teva pantalla principal
    } catch (error) {
      // Si es produeix un error, mostrem un missatge
      setErrorMsg("Error a l'iniciar sessió. Verifica les teves credencials.");
    } finally {
      // Establim l'estat de càrrega a false un cop finalitzat el procés
      setLoading(false);
    }
  };

  // Funció per manejar la recuperació de contrasenya
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Si us plau, introdueix el teu correu electrònic.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Correu enviat', 'S\'ha enviat un codi de recuperació al teu correu electrònic.');
      })
      .catch(error => {
        Alert.alert('Error', 'No s\'ha pogut enviar el correu de recuperació. Verifica el teu correu electrònic.');
      });
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
              onPress={() => { 
                setSelectedButton('register'); 
                navigation.navigate('registerScreen'); // Naveguem a la pantalla de registre
              }}
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

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Entrant..." : "Iniciar sessió"}</Text>
          </TouchableOpacity>
        </View>

        <Text 
          style={styles.link} 
          onPress={handleForgotPassword} // Utilitzem la funció per manejar la recuperació de contrasenya
        >
          Heu oblidat la contrasenya?
        </Text>
      </View>
    </ImageBackground>
  );
}
