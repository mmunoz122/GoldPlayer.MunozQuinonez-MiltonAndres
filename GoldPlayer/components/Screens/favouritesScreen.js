// Importem els components i mòduls necessaris
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import FSection from '../FSection';
import VideoCard from '../CartaDeVideo';

// Declarem el component principal de la pantalla de favorits
export default function FavouriteScreen({ navigation }) {
  // Creem els estats per gestionar vídeos favorits i missatges d'error
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const currentUser = auth.currentUser; // Obtenim l'usuari actual

  useEffect(() => {
    // Fem la crida per obtenir els vídeos favorits de l'usuari
    const fetchFavoriteVideos = async () => {
      if (currentUser) {
        try {
          // Accedim al document de l'usuari a la base de dades
          const userDocRef = doc(db, 'usuaris', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          // Comprovem si existeixen dades de favorits
          if (userDocSnap.exists()) {
            setFavoriteVideos(userDocSnap.data().favorites || []);
          } else {
            setFavoriteVideos([]);
          }
        } catch (error) {
          // Gestionem els errors de la crida
          console.error('Error en obtenir els vídeos favorits:', error);
          setErrorMsg('Hi ha hagut un error en carregar els vídeos favorits.');
        }
      }
    };

    fetchFavoriteVideos(); // Cridem la funció de recuperació
  }, [currentUser]);

  // Definim la funció per afegir o eliminar vídeos favorits
  const toggleFavorite = async (video) => {
    const userDocRef = doc(db, 'usuaris', currentUser.uid);
    const isFavorite = favoriteVideos.some(fav => fav.url === video.url); // Comprovem si ja és favorit

    try {
      if (isFavorite) {
        // Eliminem el vídeo dels favorits
        await setDoc(userDocRef, {
          favorites: arrayRemove(video)
        }, { merge: true });

        // Actualitzem l'estat dels vídeos favorits
        setFavoriteVideos(prevState => prevState.filter(fav => fav.url !== video.url));
      } else {
        // Afegim el vídeo als favorits
        await setDoc(userDocRef, {
          favorites: arrayUnion(video)
        }, { merge: true });

        // Actualitzem l'estat dels vídeos favorits
        setFavoriteVideos(prevState => [...prevState, video]);
      }
    } catch (error) {
      // Gestionem errors durant l'actualització
      console.error('Error en actualitzar els favorits:', error);
      setErrorMsg('Hi ha hagut un error en actualitzar els favorits.');
    }
  };

  // Gestionem la navegació quan es fa clic en un botó
  const handlePress = (id) => {
    console.log("S'ha clicat el botó " + id);
    if (id == 1) {
      navigation.navigate("listScreen"); // Naveguem a la pantalla de llista
    } else if (id == 2) {
      navigation.navigate("favouriteScreen"); // Naveguem a la pantalla de favorits
    } else if (id == 3) {
      navigation.navigate("userScreen"); // Naveguem a la pantalla de l'usuari
    }
  };

  return (
    // Renderitzem la interfície d'usuari
    <ImageBackground
      source={require('../images/fondo.jpg')} // Afegim una imatge de fons
      style={styles.backgroundImage}
    >
      <View style={styles.headerContainer}>
        {/* Mostrem el logotip */}
        <Image
          source={require('../images/logo.jpg')}
          style={styles.logo}
        />
      </View>

      <View style={styles.videoListContainer}>
        <ScrollView>
          {favoriteVideos.length > 0 ? (
            // Mostrem els vídeos favorits si n'hi ha
            favoriteVideos.map((video, index) => (
              <View key={index} style={styles.videoItem}>
                <VideoCard
                  videoUrl={video.url}
                  title={video.title}
                  createdAt={video.createdAt}
                  description={video.description}
                  onToggleFavorite={() => toggleFavorite(video)} // Funció per afegir/eliminar favorits
                  isFavorite={favoriteVideos.some(fav => fav.url === video.url)}
                />
              </View>
            ))
          ) : (
            // Missatge quan no hi ha vídeos favorits
            <Text style={styles.noVideosText}>No tens vídeos favorits.</Text>
          )}
        </ScrollView>
      </View>

      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        {/* Mostrem la secció de navegació */}
        <FSection currentSection={1} onPress={handlePress} />
      </View>
    </ImageBackground>
  );
}

// Definim els estils de la pantalla
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainer: {
    backgroundColor: '#6c3483',
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  videoListContainer: {
    flex: 7,
    width: '100%',
  },
  videoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#8e44ad',
    borderRadius: 10,
    padding: 10,
  },
  noVideosText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#d2dae2',
    fontSize: 16,
  },
  footerContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#2f3640',
  },
});
