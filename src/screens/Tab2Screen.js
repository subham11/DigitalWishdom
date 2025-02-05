// src/screens/Tab2Screen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productsActions';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Tab2Screen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [refreshing, setRefreshing] = useState(false);

  // Load products on initial mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handler for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    // dispatch returns a promise when using redux-thunk with async actions
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* Thumbnail */}
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Horizontal scroll for product images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroll}
      >
        {item.images.map((imgUri, index) => (
          <Image
            key={index}
            source={{ uri: imgUri }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <QRCode value={`https://dummyjson.com/products/${item.id}`} size={100} />
      </View>
    </View>
  );

  // If initially loading (and not a pull-to-refresh) show a full-list skeleton placeholder.
  if (loading && !refreshing) {
    return (
      <SkeletonPlaceholder>
        <View style={{ margin: 16 }}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              {/* Simulated product title */}
              <View style={{ width: '50%', height: 20, borderRadius: 4 }} />
              {/* Simulated product description */}
              <View style={{ width: '80%', height: 40, borderRadius: 4, marginTop: 10 }} />
              {/* Simulated thumbnail */}
              <View style={{ width: 300, height: 200, borderRadius: 4, marginTop: 10 }} />
              {/* Simulated horizontal images */}
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {[...Array(3)].map((__, idx) => (
                  <View
                    key={idx}
                    style={{ width: 120, height: 120, borderRadius: 4, marginRight: 8 }}
                  />
                ))}
              </View>
              {/* Simulated QR code */}
              <View style={{ marginTop: 10, width: 100, height: 100, borderRadius: 4 }} />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('tabs.tab2')}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  list: { paddingBottom: 20 },
  item: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  description: { marginBottom: 6 },
  thumbnail: { width: 300, height: 200, borderRadius: 4, marginBottom: 10 },
  imageScroll: { marginBottom: 10 },
  productImage: { width: 120, height: 120, borderRadius: 4, marginRight: 8 },
  qrContainer: { alignItems: 'center', marginTop: 10 },
});

export default Tab2Screen;
