// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postsActions';
import { logout } from '../actions/authActions';
import { useTranslation } from 'react-i18next';
import ScrollableText from '../components/ScrollableText';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLogoff = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with hamburger menu, title, and logoff button */}
      <ScrollableText />
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>{t('dashboard.title')}</Text>
        {/* <TouchableOpacity onPress={handleLogoff} style={styles.logoffButton}>
          <Text style={styles.logoffText}>Logoff</Text>
        </TouchableOpacity> */}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  header: {
    height: 50,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 3,
    justifyContent: 'space-between',
  },
  menu: { fontSize: 24 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  logoffButton: { padding: 5 },
  logoffText: { fontSize: 16, color: 'red' },
  loader: { marginTop: 20 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
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
});

export default HomeScreen;
