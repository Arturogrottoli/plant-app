import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
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

const PLANT_ID_KEY = '4ulRk3vtVYXO0MMoYMqnbbOwjadPQ4MW8oHc7lnWt2knHFSbgj';

async function identifyPlant(imageUri: string) {
    const base64 = await uriToBase64(imageUri);
    const response = await fetch('https://plant.id/api/v3/identification', {
        method: 'POST',
        headers: {
            'Api-Key': PLANT_ID_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            images: [base64],
            classification_level: 'species',
            details: 'common_names,description,watering,sunlight,toxicity',
        }),
    });
    const data = await response.json();
    return data;
}

async function uriToBase64(uri: string): Promise<string> {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export default function AddPlantScreen() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [plantName, setPlantName] = useState('');
    const [species, setSpecies] = useState('');
    const [wateringDays, setWateringDays] = useState('3');
    const [identifying, setIdentifying] = useState(false);
    const [description, setDescription] = useState('');
    const [wateringInfo, setWateringInfo] = useState('');
    const [sunlight, setSunlight] = useState('');
    const [toxicity, setToxicity] = useState('');

    const handleImage = async (uri: string) => {
        setImage(uri);
        setIdentifying(true);
        try {
            const result = await identifyPlant(uri);
            const best = result?.result?.classification?.suggestions?.[0];
            if (best) {
                setSpecies(best.name || '');
                setPlantName(best.details?.common_names?.[0] || best.name || '');
                setDescription(best.details?.description?.value || '');
                const w = best.details?.watering;
                setWateringInfo(w?.max ? `Cada ${w.min}-${w.max} días` : '');
                const sun = best.details?.sunlight;
                setSunlight(Array.isArray(sun) ? sun.join(', ') : sun || '');
                setToxicity(best.details?.toxicity?.value || '');
            }
        } catch (e) {
            Alert.alert('Error', 'No se pudo identificar la planta');
        } finally {
            setIdentifying(false);
        }
    };

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
        if (!result.canceled) handleImage(result.assets[0].uri);
    };

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });
        if (!result.canceled) handleImage(result.assets[0].uri);
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
            image,
            wateringDays: parseInt(wateringDays) || 3,
            description,
            wateringInfo,
            sunlight,
            toxicity,
            createdAt: new Date().toISOString(),
        };
        const existingPlants = await loadPlants();
        await savePlants([...existingPlants, newPlant]);
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
                        <Text style={styles.placeholderSubtext}>Tomá una foto</Text>
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

            {identifying && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={styles.loadingText}>Identificando planta... 🌿</Text>
                </View>
            )}

            {image && !identifying && (
                <View style={styles.formSection}>
                    <Text style={styles.label}>Nombre de la planta *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ej. Potos de la cocina"
                        value={plantName}
                        onChangeText={setPlantName}
                    />
                    <Text style={styles.label}>Especie</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ej. Monstera, Potos..."
                        value={species}
                        onChangeText={setSpecies}
                    />

                    {description ? (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>📖 Descripción</Text>
                            <Text style={styles.infoText}>{description}</Text>
                        </View>
                    ) : null}

                    {wateringInfo ? (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>💧 Riego recomendado</Text>
                            <Text style={styles.infoText}>{wateringInfo}</Text>
                        </View>
                    ) : null}

                    {sunlight ? (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>☀️ Luz</Text>
                            <Text style={styles.infoText}>{sunlight}</Text>
                        </View>
                    ) : null}

                    {toxicity ? (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>⚠️ Toxicidad</Text>
                            <Text style={styles.infoText}>{toxicity}</Text>
                        </View>
                    ) : null}

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
        width: '100%', height: 300, borderRadius: 12, backgroundColor: '#f5f5f5',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: '#ddd', borderStyle: 'dashed',
    },
    placeholderText: { fontSize: 60, marginBottom: 8 },
    placeholderSubtext: { fontSize: 16, color: '#999' },
    buttonRow: { flexDirection: 'row', marginTop: 16, gap: 12 },
    imageButton: { flex: 1, backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, alignItems: 'center' },
    imageButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
    loadingContainer: { alignItems: 'center', padding: 32 },
    loadingText: { marginTop: 12, fontSize: 16, color: '#4CAF50' },
    formSection: { padding: 16 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
    input: {
        borderWidth: 1, borderColor: '#ddd', padding: 12,
        borderRadius: 8, marginBottom: 20, fontSize: 16, backgroundColor: '#fafafa',
    },
    infoBox: { backgroundColor: '#f0f8f0', padding: 16, borderRadius: 12, marginBottom: 16 },
    infoTitle: { fontSize: 15, fontWeight: '700', color: '#2e7d32', marginBottom: 6 },
    infoText: { fontSize: 14, color: '#444', lineHeight: 20 },
    saveButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});