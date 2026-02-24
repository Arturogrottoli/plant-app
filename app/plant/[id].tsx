import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { loadPlants, savePlants } from '../../src/utils/storage';

export default function PlantDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [plant, setPlant] = useState<any>(null);

    useFocusEffect(
        useCallback(() => {
            loadPlantData();
        }, [id])
    );

    const loadPlantData = async () => {
        const plants = await loadPlants();
        const foundPlant = plants.find((p: any) => p.id === id);
        setPlant(foundPlant);
    };

    const deletePlant = () => {
        Alert.alert(
            'Eliminar Planta',
            '¿Estás seguro de que querés borrar esta planta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const plants = await loadPlants();
                        const updated = plants.filter((p: any) => p.id !== id);
                        await savePlants(updated);
                        router.back();
                    }
                }
            ]
        );
    };

    if (!plant) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: plant.image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.name}>{plant.name}</Text>
                <Text style={styles.species}>{plant.species}</Text>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>💧 Riego</Text>
                    <Text style={styles.infoText}>
                        Cada {plant.wateringDays} días
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>📅 Agregada</Text>
                    <Text style={styles.infoText}>
                        {new Date(plant.createdAt).toLocaleDateString()}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deletePlant}
                >
                    <Text style={styles.deleteButtonText}>🗑️ Eliminar Planta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    image: { width: '100%', height: 300, backgroundColor: '#e0e0e0' },
    content: { padding: 20 },
    name: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    species: { fontSize: 18, color: '#666', fontStyle: 'italic', marginBottom: 24 },
    infoCard: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    infoTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#333' },
    infoText: { fontSize: 16, color: '#666' },
    deleteButton: {
        backgroundColor: '#f44336',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    deleteButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
