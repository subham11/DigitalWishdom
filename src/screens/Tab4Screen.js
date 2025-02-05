// src/screens/Tab4Screen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter } from '../actions/characterActions';
import { useTranslation } from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Tab4Screen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [characterId, setCharacterId] = useState('');
  const { character, loading, error } = useSelector((state) => state.character);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset imageLoaded state whenever a new character is fetched
  useEffect(() => {
    if (character) {
      setImageLoaded(false);
    }
  }, [character]);

  const handleFetchCharacter = () => {
    if (characterId.trim() !== '') {
      dispatch(fetchCharacter(characterId));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{t('tabs.tab4') || 'Character Details'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Character ID"
        value={characterId}
        onChangeText={setCharacterId}
        keyboardType="numeric"
      />
      <Button title="Fetch Character" onPress={handleFetchCharacter} />
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {character && (
        <View style={styles.characterContainer}>
          {/* Image wrapper with skeleton placeholder */}
          <View style={styles.imageWrapper}>
            {!imageLoaded && (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  width={200}
                  height={200}
                  borderRadius={100}
                />
              </SkeletonPlaceholder>
            )}
            <Image
              source={{ uri: character.image }}
              style={[
                styles.characterImage,
                { position: imageLoaded ? 'relative' : 'absolute' },
              ]}
              onLoadEnd={() => setImageLoaded(true)}
            />
          </View>
          <Text style={styles.characterName}>Name: {character.name}</Text>
          <Text>Status: {character.status}</Text>
          <Text>Species: {character.species}</Text>
          <Text>Type: {character.type || 'N/A'}</Text>
          <Text>Gender: {character.gender}</Text>
          <Text>Origin: {character.origin?.name}</Text>
          <Text>Location: {character.location?.name}</Text>
          {character.episode && character.episode.length > 0 && (
            <>
              <Text style={styles.subHeader}>Episodes:</Text>
              {character.episode.map((ep) => (
                <Text key={ep.id} style={styles.episodeText}>
                  {ep.name} ({ep.episode})
                </Text>
              ))}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  characterContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  episodeText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default Tab4Screen;
