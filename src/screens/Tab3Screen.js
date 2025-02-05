// src/screens/Tab3Screen.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../actions/pokemonActions';
import { useTranslation } from 'react-i18next';

const Tab3Screen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { pokemon, loading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text>ID: {item.id}</Text>
      <Text>Height: {item.height}</Text>
      <Text>Order: {item.order}</Text>
      <Text>Species ID: {item.pokemon_species_id}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('tabs.tab3')}</Text>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  list: { paddingBottom: 20 },
  item: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default Tab3Screen;
