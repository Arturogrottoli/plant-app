import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { loadPlants, savePlants } from '../src/utils/storage';

export default function AddPlantScreen() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [plantName, setPlantName] = useState('');
    const [species, setSpecies] = useState('');
    const [wateringDays, setWateringDays] = useState('3');

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso necesario', '¡Se requiere permiso de cámara!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const savePlant = async () => {
        if (!plantName.trim()) {
            Alert.alert('Error', 'Por favor ingresá un nombre');
            return;
        }

        if (!image) {
            Alert.alert('Error', 'Por favor tomá una foto');
            return;
        }

        const newPlant = {
            id: Date.now().toString(),
            name: plantName,
            species: species || 'Desconocida',
            image: image,
            wateringDays: parseInt(wateringDays) || 3,
            createdAt: new Date().toISOString(),
        };

        const existingPlants = await loadPlants();
        const updatedPlants = [...existingPlants, newPlant];
        await savePlants(updatedPlants);

        Alert.alert('Éxito', '¡Planta añadida! 🌱', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageSection}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderText}>📷</Text>
                        <Text style={styles.placeholderSubtext}>Tomar una foto</Text>
                    </View>
                )}

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        <Text style={styles.imageButtonText}>📷 Cámara</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageButton} onPress={pickFromGallery}>
                        <Text style={styles.imageButtonText}>🖼️ Galería</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {image && (
                <View style={styles.formSection}>
                    <Text style={styles.label}>Nombre de la planta *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ej. Potos de la cocina"
                        value={plantName}
                        onChangeText={setPlantName}
                    />

                    <Text style={styles.label}>Especie (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ej. Monstera, Potos..."
                        value={species}
                        onChangeText={setSpecies}
                    />

                    <Text style={styles.label}>Regar cada cuántos días</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="3"
                        value={wateringDays}
                        onChangeText={setWateringDays}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={savePlant}>
                        <Text style={styles.saveButtonText}>💾 Guardar Planta</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    imageSection: { padding: 16 },
    image: { width: '100%', height: 300, borderRadius: 12, backgroundColor: '#e0e0e0' },
    imagePlaceholder: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },
    placeholderText: { fontSize: 60, marginBottom: 8 },
    placeholderSubtext: { fontSize: 16, color: '#999' },
    buttonRow: { flexDirection: 'row', marginTop: 16, gap: 12 },
    imageButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    imageButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
    formSection: { padding: 16 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
