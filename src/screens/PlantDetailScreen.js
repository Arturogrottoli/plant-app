import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { loadPlants, savePlants } from '../utils/storage';

export default function PlantDetailScreen({ route, navigation }) {
    const { plantId } = route.params;
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        loadPlantData();
    }, []);

    const loadPlantData = async () => {
        const plants = await loadPlants();
        const foundPlant = plants.find(p => p.id === plantId);
        setPlant(foundPlant);
    };

    const deletePlant = () => {
        Alert.alert(
            'Delete Plant',
            'Are you sure you want to delete this plant?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const plants = await loadPlants();
                        const updated = plants.filter(p => p.id !== plantId);
                        await savePlants(updated);
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    if (!plant) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
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
                    <Text style={styles.infoTitle}>💧 Watering</Text>
                    <Text style={styles.infoText}>
                        Every {plant.wateringDays} days
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>📅 Added</Text>
                    <Text style={styles.infoText}>
                        {new Date(plant.createdAt).toLocaleDateString()}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deletePlant}
                >
                    <Text style={styles.deleteButtonText}>🗑️ Delete Plant</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#e0e0e0',
    },
    content: {
        padding: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    species: {
        fontSize: 18,
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 24,
    },
    infoCard: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        color: '#666',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
