// Importarem els components necessaris
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FButton from './FButton';

// Crearem el component FSection per gestionar seccions amb botons
export default function FSection({ currentSection, onPress }) {
  return (
    // Aplicarem un gradient de fons al component
    <LinearGradient
      colors={['rgba(52, 152, 219, 0.5)', 'rgba(41, 128, 185, 0.5)', 'rgba(26, 188, 156, 0.5)']} 
      style={styles.gradientBackground}
    >
      {/* Organitzarem els botons en una fila */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          {/* Botó per a la secció 2 */}
          <FButton 
            selectedIcon="heart" 
            unselectedIcon="heart-outline"
            id={2} 
            onPress={onPress}
            isSelected={currentSection == 2} 
            iconSize={20} // Ajustarem la mida de la icona
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Botó per a la secció 1 */}
          <FButton 
            selectedIcon="plus" 
            unselectedIcon="plus-outline" 
            id={1} 
            onPress={onPress} 
            isSelected={currentSection == 1} 
            iconSize={20} // Ajustarem la mida de la icona
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Botó per a la secció 3 */}
          <FButton 
            selectedIcon="account" 
            unselectedIcon="account-outline"
            id={3} 
            onPress={onPress}
            isSelected={currentSection == 3} 
            iconSize={20} // Ajustarem la mida de la icona
          />
        </View>
      </View>
    </LinearGradient>
  );
}

// Definirem els estils del component
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, // Fons que ocupa tot l'espai disponible
    justifyContent: 'center', // Centrarem els continguts verticalment
    alignItems: 'center', // Centrarem els continguts horitzontalment
    padding: 20, // Afegirem espai al voltant del contingut
  },
  buttonRow: {
    flexDirection: 'row', // Organitzarem els botons en fila
    justifyContent: 'space-around', // Distribuirem els botons uniformement
    alignItems: 'center', // Centrarem els botons verticalment
    width: '100%', // La fila ocupa tot l'ample disponible
    height: 100, // Assegurarem una alçada suficient per als botons
  },
  buttonContainer: {
    marginHorizontal: 25, // Afegirem espai horitzontal entre botons
    justifyContent: 'center', // Centrarem els botons dins el contenidor
    alignItems: 'center', // Centrarem els botons horitzontalment
    flex: 1, // Farem que cada botó ocupi l'espai proporcionalment
  }
});
