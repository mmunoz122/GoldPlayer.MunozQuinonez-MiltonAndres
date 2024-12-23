// Importarem els components necessaris
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Crearem el component FButton amb opcions seleccionades i no seleccionades
export default function FButton({ 
    selectedIcon, // Icona per a l'estat seleccionat
    unselectedIcon, // Icona per a l'estat no seleccionat
    id, // Identificador del botó
    isSelected, // Estat de selecció
    onPress // Funció per gestionar el clic
}) {
    return (
        // Configurarem el TouchableOpacity per detectar el clic
        <TouchableOpacity onPress={() => onPress(id)} style={styles.buttonContainer}>
            <View style={styles.iconContainer}>
                {/* Mostrarem la icona segons l'estat */}
                <Icon
                    name={isSelected ? selectedIcon : unselectedIcon}
                    size={50}
                    color="white"
                    style={styles.icon}
                />
                {isSelected}
            </View>
        </TouchableOpacity>
    );
}

// Estils per al component
const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center', // Centrarem el botó
    },
    iconContainer: {
        alignItems: 'center', // Centrarem la icona dins del contenidor
    },
    icon: {
        margin: 10, // Afegirem un marge al voltant de la icona
    },
});
