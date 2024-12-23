// Estils per a components amb React Native
import { StyleSheet } from 'react-native';

// Crearem i exportarem els estils
export const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa tot l'espai disponible
    justifyContent: 'center', // Centrarem verticalment
    alignItems: 'center', // Centrarem horitzontalment
  },
  backgroundImage: {
    flex: 1, // Ocupa tota la pantalla
    resizeMode: 'cover', // Ens assegurem que la imatge cobreixi tota la pantalla
    justifyContent: 'center', // Centrarem el contingut
  },
  logo: {
    width: 100, // Amplada del logo
    height: 100, // Alçada del logo
    marginBottom: 20, // Espai sota el logo
  },
  title: {
    fontSize: 24, // Tamany del text
    marginBottom: 20, // Espai sota el títol
    color: '#5A2D82', // Color morat fosc per al text
    textAlign: 'center', // Text centrat
  },
  formContainer: {
    width: '90%', // Amplada del contenidor del formulari
    padding: 30, // Espai intern per al contingut
    borderWidth: 1, // Amplada del borde
    borderColor: '#FF69B4', // Color rosa per al borde
    borderRadius: 10, // Esquemarem les cantonades
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fons blanc semi-transparent
    alignItems: 'center', // Centrarem els elements dins
    shadowColor: '#000', // Color de l'ombra
    shadowOffset: { width: 0, height: 2 }, // Desplaçament de l'ombra
    shadowOpacity: 0.2, // Opacitat de l'ombra
    shadowRadius: 5, // Radi de l'ombra
    elevation: 5, // Ombra per a Android
  },
  input: {
    width: '100%', // Amplada completa
    padding: 10, // Espai intern
    borderWidth: 1, // Amplada del borde
    borderColor: '#5A2D82', // Borde de color morat fosc
    borderRadius: 5, // Esquemarem les cantonades
    marginBottom: 20, // Espai sota cada entrada
    backgroundColor: '#F3E6F5', // Fons morat clar per a l'entrada
    color: '#5A2D82', // Text morat fosc
  },
  button: {
    backgroundColor: '#FF0000', // Botó de color vermell
    padding: 10, // Espai intern
    borderRadius: 5, // Esquemarem les cantonades
    alignItems: 'center', // Centrarem el text
    marginBottom: 10, // Espai sota cada botó
    width: '100%', // Amplada completa
  },
  buttonText: {
    color: '#FFFFFF', // Text blanc per als botons
    fontSize: 16, // Tamany del text
  },
  link: {
    color: 'yellow', // Text groc per als enllaços
    marginTop: 20, // Espai sobre els enllaços
    textDecorationLine: 'underline', // Subratllat per al text
  },
  headerButtons: {
    flexDirection: 'row', // Botons en fila
    justifyContent: 'center', // Centrarem horitzontalment
    marginBottom: 20, // Espai sota els botons
  },
  headerButton: {
    marginHorizontal: 5, // Espai entre botons
    padding: 10, // Espai intern
    alignItems: 'center', // Centrarem el text
    backgroundColor: '#D3D3D3', // Botó gris per defecte
    borderRadius: 5, // Esquemarem les cantonades
    width: 150, // Amplada dels botons
    transition: 'background-color 0.5s ease', // Transició suau de color
  },
  headerButtonSelected: {
    backgroundColor: '#FF0000', // Botó seleccionat de color vermell
  },
  headerButtonText: {
    color: '#FFFFFF', // Text blanc per als botons
    fontSize: 16, // Tamany del text
  },
});
