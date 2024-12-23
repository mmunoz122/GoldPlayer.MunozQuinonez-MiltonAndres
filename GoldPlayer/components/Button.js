// Importarem els components necessaris
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

// Crearem el component Button amb diferents temes
export default function Button({ label, theme, onPress }) {
  // Configurarem l'estil del botó principal
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <MaterialCommunityIcons
            name="tortoise"
            size={24}
            color="#1ecc09"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  // Configurarem l'estil del botó secundari
  if (theme === "secondary") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#002eff", borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress}>
          <MaterialCommunityIcons
            name="turtle"
            size={50}
            color="#1ecc09"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  // Configurarem l'estil per al tema addPhotos
  if (theme === "addPhotos") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#002eff", borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress}>
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  // Configurarem l'estil per al tema loginTheme
  if (theme === "loginTheme") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#002eff", borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress}>
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  // Configurarem l'estil per al tema postButton
  if (theme === "postButton") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#002eff", borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress}>
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  // Configurarem l'estil per al botó d'inici de sessió
  if (theme === "signIn") {
    return (
      <View>
        <LinearGradient
          // Aplicarem el gradient al botó
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.buttonSignin}>
          <Text style={styles.textSignin}>SignIn</Text>
        </LinearGradient>
      </View>
    );
  }

  // Configurarem l'estil per defecte
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

// Definirem els estils utilitzant StyleSheet
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#fff", // Establirem un fons blanc per defecte
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },

  // Estils específics per al botó d'inici de sessió
  containerSignin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  backgroundSignin: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  buttonSignin: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  textSignin: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});
