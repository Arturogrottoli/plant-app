import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLang } from '../../src/i18n/LanguageContext';
import { loadPlants } from '../../src/utils/storage';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLang();
  const [plants, setPlants] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadPlantsData();
    }, [])
  );

  const loadPlantsData = async () => {
    const data = await loadPlants();
    setPlants(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlantsData();
    setRefreshing(false);
  };

  const renderPlantCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/plant/[id]', params: { id: item.id } })}
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.plantName}>{item.name || t('home.noName')}</Text>
        <Text style={styles.species}>{item.species || t('home.unknownSpecies')}</Text>
        <Text style={styles.waterInfo}>
          {t('home.waterEvery', { days: item.wateringDays })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={renderPlantCard}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🌿</Text>
            <Text style={styles.emptySubtext}>{t('home.noPlants')}</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-plant')}
      >
        <Text style={styles.addButtonText}>{t('home.addPlant')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 200, backgroundColor: '#e0e0e0' },
  cardContent: { padding: 16 },
  plantName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  species: { fontSize: 14, color: '#666', fontStyle: 'italic', marginBottom: 8 },
  waterInfo: { fontSize: 14, color: '#4CAF50' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 80, marginBottom: 16 },
  emptySubtext: { fontSize: 18, color: '#999', textAlign: 'center' },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
