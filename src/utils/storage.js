import AsyncStorage from '@react-native-async-storage/async-storage';

const PLANTS_KEY = 'plants';

export const savePlants = async (plants) => {
    try {
        await AsyncStorage.setItem(PLANTS_KEY, JSON.stringify(plants));
    } catch (error) {
        console.error('Error saving plants:', error);
    }
};

export const loadPlants = async () => {
    try {
        const stored = await AsyncStorage.getItem(PLANTS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading plants:', error);
        return [];
    }
};
