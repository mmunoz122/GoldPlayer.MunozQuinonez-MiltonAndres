import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FSection from '../FSection';
import VideoCard from '../CartaDeVideo.js';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, getDocs, collection, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export default function ListScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null); // Crearem un estat per a missatges d'error
  const [userVideos, setUserVideos] = useState([]); // Crearem un estat per als vídeos de l'usuari
  const [userllistes, setUserllistes] = useState([]); // Crearem un estat per a les llistes de l'usuari
  const [selectedList, setSelectedList] = useState(''); // Crearem un estat per a la llista seleccionada
  const [favoriteVideos, setFavoriteVideos] = useState([]); // Crearem un estat per als vídeos favorits
  const currentUser = auth.currentUser; // Obtenim l'usuari actual

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          // Farem una consulta per obtenir les llistes de l'usuari
          const llistesCollectionRef = collection(db, 'usuaris', currentUser.uid, 'llistes');
          const llistesSnapshot = await getDocs(llistesCollectionRef);

          if (!llistesSnapshot.empty) {
            // Actualitzarem les llistes si existeixen
            const llistes = llistesSnapshot.docs.map(doc => doc.id);
            setUserllistes(llistes);
          } else {
            setUserllistes([]); // Cap llista trobada
          }

          // Farem una consulta per obtenir els vídeos de l'usuari
          const userDocRef = doc(db, 'usuaris', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserVideos(userDocSnap.data().videos || []); // Actualitzarem els vídeos
            setFavoriteVideos(userDocSnap.data().favorites || []); // Actualitzarem els favorits
          } else {
            setUserVideos([]); // Cap vídeo trobat
            setFavoriteVideos([]);
          }
        } catch (error) {
          console.error('Error al obtenir les dades:', error); // Mostrarem un error
          setErrorMsg('Hi ha hagut un error en carregar els vídeos i llistes.');
        }
      };

      fetchUserData(); // Cridarem la funció per obtenir dades
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchVideosFromList = async () => {
      if (selectedList) {
        try {
          // Farem una consulta per obtenir vídeos de la llista seleccionada
          const listDocRef = doc(db, 'usuaris', currentUser.uid, 'llistes', selectedList);
          const listDocSnap = await getDoc(listDocRef);

          if (listDocSnap.exists()) {
            const videos = listDocSnap.data().videos || [];
            setUserVideos(videos); // Actualitzarem els vídeos de la llista
          } else {
            setUserVideos([]); // Cap vídeo trobat
          }
        } catch (error) {
          console.error('Error al obtenir els vídeos de la llista:', error);
          setErrorMsg('Hi ha hagut un error en carregar els vídeos de la llista.');
        }
      }
    };

    fetchVideosFromList(); // Cridarem la funció per obtenir vídeos de la llista
  }, [selectedList, currentUser]);

  const toggleFavorite = async (video) => {
    const userDocRef = doc(db, 'usuaris', currentUser.uid);
    const isFavorite = favoriteVideos.some(fav => fav.url === video.url); // Comprovar si és favorit

    try {
      if (isFavorite) {
        // Eliminarem el vídeo dels favorits
        await setDoc(userDocRef, { favorites: arrayRemove(video) }, { merge: true });
        setFavoriteVideos(prevState => prevState.filter(fav => fav.url !== video.url));
      } else {
        // Afegirem el vídeo als favorits
        await setDoc(userDocRef, { favorites: arrayUnion(video) }, { merge: true });
        setFavoriteVideos(prevState => [...prevState, video]);
      }
    } catch (error) {
      console.error('Error en marcar vídeo com a favorit:', error);
      setErrorMsg('Hi ha hagut un error en guardar el vídeo com a favorit.');
    }
  };

  const handlePress = (id) => {
    // Navegarem a altres pantalles segons l'id
    if (id == 1) navigation.navigate("newVideoScreen");
    else if (id == 2) navigation.navigate("favouriteScreen");
    else if (id == 3) navigation.navigate("userScreen");
  };

  const handleListChange = (value) => setSelectedList(value); // Canviarem la llista seleccionada

  return (
    <ImageBackground source={require('../images/fondo.jpg')} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Secció del logo i gradient */}
        <LinearGradient
          colors={['#8e44ad', '#9b59b6', '#663399']}
          style={{ padding: 20, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#4a235a' }}
        >
          <Image
            source={require('../images/logo.jpg')}
            style={{ width: 70, height: 70, resizeMode: 'contain' }}  
          />
        </LinearGradient>

        {/* Selector de llista */}
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 10, color: '#fff' }}>Selecciona una llista per veure els vídeos:</Text>
          {userllistes.length > 0 ? (
            <ScrollView>
              {userllistes.map((list, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedList(list)}
                  style={{
                    padding: 10,
                    marginVertical: 5,
                    backgroundColor: '#8e44ad',
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>{list}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={{ color: '#fff' }}>No tens llistes creades.</Text> 
          )}
        </View>

        {/* Llista de vídeos */}
        <View style={{ flex: 7, width: '100%' }}>
          <ScrollView>
            {userVideos.length > 0 ? (
              [...userVideos].reverse().map((video, index) => (
                <View
                  key={index}
                  style={{
                    margin: 10,
                    padding: 15,
                    backgroundColor: '#9b59b6', // Fondo més clar per als contenidors
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <VideoCard
                    videoUrl={video.url}
                    title={video.title}
                    description={video.description}
                    createdAt={video.createdAt}  
                    onToggleFavorite={() => toggleFavorite(video)}
                    isFavorite={favoriteVideos.some(fav => fav.url === video.url)}
                  />
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#fff' }}>
                {/* Missatge quan no hi ha vídeos */}
              </Text>
            )}
          </ScrollView>
        </View>

        {/* Secció inferior (Footer) */}
        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
          <FSection currentSection={1} onPress={handlePress} />
        </View>
      </View>
    </ImageBackground>
  );
}
