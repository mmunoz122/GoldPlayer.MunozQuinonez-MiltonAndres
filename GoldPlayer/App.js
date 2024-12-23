// Importacions necessàries per a la navegació i altres funcionalitats
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import loginScreen from "./components/Screens/loginScreen";
import favouriteScreen from "./components/Screens/favouritesScreen";
import listScreen from "./components/Screens/listScreen";
import newVideoScreen from "./components/Screens/newVideoScreen";
import userScreen from "./components/Screens/userScreen";
import RegisterScreen from "./components/Screens/registerScreen";

import { styles } from "./components/Styles.js";
import { useRef } from "react";
import React from "react";

// Importació de dependències de navegació
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Crear el stack de navegació
const Stack = createNativeStackNavigator();

// Pantalla d'inici
function HomeScreen({ navigation }) {
  const imageRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Contingut addicional pot anar aquí */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// Component principal de l'aplicació
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginScreen">
        {/* Pantalles del stack de navegació */}
        <Stack.Screen
          name="newVideoScreen"
          component={newVideoScreen}
          options={{ animation: "none", headerShown: false }}
        />
        <Stack.Screen
          name="favouriteScreen"
          component={favouriteScreen}
          options={{ animation: "none", headerShown: false }}
        />
        <Stack.Screen
          name="listScreen"
          component={listScreen}
          options={{ animation: "none", headerShown: false }}
        />
        <Stack.Screen
          name="loginScreen"
          component={loginScreen}
          options={{ animation: "none", headerShown: false }}
        />
        <Stack.Screen
          name="userScreen"
          component={userScreen}
          options={{ animation: "none", headerShown: false }}
        />
        <Stack.Screen
          name="registerScreen"
          component={RegisterScreen}
          options={{ animation: "none", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
