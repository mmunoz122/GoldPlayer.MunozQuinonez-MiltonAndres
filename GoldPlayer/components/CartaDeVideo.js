// Importarem els components necessaris
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome'; // Per als icones de cor

// Crearem el component VideoCard per mostrar el vídeo
export default function VideoCard({ videoUrl, title, description, createdAt, onToggleFavorite, isFavorite }) {
  // Identificarem si la URL és de YouTube (llarga o curta) o un Reel d'Instagram
  const isYouTubeLong = videoUrl.includes('youtube.com/watch'); // URL llarga de YouTube
  const isYouTubeShort = videoUrl.includes('youtu.be/'); // URL curta de YouTube
  const isInstagramReel = videoUrl.includes('instagram.com/reel'); // URL de Reel d'Instagram

  // Extraurem el videoId per a URL llarga de YouTube
  const videoIdLong = isYouTubeLong ? videoUrl.split('v=')[1] : null;

  // Extraurem el videoId per a URL curta de YouTube
  const videoIdShort = isYouTubeShort ? videoUrl.split('/').pop().split('?')[0] : null;

  // Assignarem la URL del Reel d'Instagram
  const instagramReelUrl = isInstagramReel ? videoUrl : null;

  return (
    <View style={{ margin: 10, position: 'relative' }}>
      {/* Crearem el botó de favorits a la cantonada superior dreta */}
      <TouchableOpacity
        onPress={onToggleFavorite}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
        }}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'}
          size={30}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      {/* Mostrarem el títol i la descripció */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <Text>{description}</Text>

      {/* Mostrarem la data de creació */}
      {createdAt && (
        <Text style={{ fontSize: 14, color: '#000', marginTop: 5 }}>
          Data de creació: {new Date(createdAt).toLocaleDateString()}
        </Text>
      )}

      {/* Incrustarem vídeos de YouTube (llargs o curts) */}
      {isYouTubeLong || isYouTubeShort ? (
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoIdLong || videoIdShort}` }}
          style={{ height: 200, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true} // Permetrem pantalla completa als vídeos de YouTube
        />
      ) : isInstagramReel ? (
        // Incrustarem Reels d'Instagram
        <WebView
          source={{ uri: instagramReelUrl }}
          style={{ height: 580, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true} // Permetrem pantalla completa als Reels
        />
      ) : (
        <Text>El link no és compatible.</Text>
      )}
    </View>
  );
}
