import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
// Import these even if they don't exist yet, to match user's code
// I'll create placeholder or empty files if needed, but the user said they'll pass them next.
// Actually, I should probably wait for the other screens before adding the imports if I want it to build,
// but the user's snippet HAS them. I'll include them.
import AddPlantScreen from '../screens/AddPlantScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#4CAF50' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: '🌱 My Plants' }}
            />
            <Stack.Screen
                name="AddPlant"
                component={AddPlantScreen}
                options={{ title: '➕ Add Plant' }}
            />
            <Stack.Screen
                name="PlantDetail"
                component={PlantDetailScreen}
                options={{ title: '🪴 Plant Details' }}
            />
        </Stack.Navigator>
    );
}
