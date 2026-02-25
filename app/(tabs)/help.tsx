import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HelpScreen() {
    const colorScheme = useColorScheme();
    const tintColor = Colors[colorScheme ?? 'light'].tint;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={[styles.title, { color: tintColor }]}>Cómo funciona la app / How the app works</Text>

            <View style={styles.section}>
                <Text style={styles.headerEs}>🌿 Mis Plantas</Text>
                <Text style={styles.textEs}>
                    En esta pantalla verás todas tus plantas guardadas. El color del borde te indica si necesitan agua:
                    {'\n'}• Verde: Todo bien.
                    {'\n'}• Amarillo: Le falta poco.
                    {'\n'}• Rojo: ¡Necesita agua urgente!
                </Text>

                <Text style={styles.headerEn}>🌿 My Plants</Text>
                <Text style={styles.textEn}>
                    In this screen you'll see all your saved plants. The border color tells you if they need water:
                    {'\n'}• Green: Everything is fine.
                    {'\n'}• Yellow: Soon needs water.
                    {'\n'}• Red: Needs water urgent!
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.headerEs}>➕ Agregar Planta</Text>
                <Text style={styles.textEs}>
                    Usa el botón "+" para agregar una nueva planta. Puedes elegir un nombre, el tipo de planta y cada cuántos días necesita riego.
                </Text>

                <Text style={styles.headerEn}>➕ Add Plant</Text>
                <Text style={styles.textEn}>
                    Use the "+" button to add a new plant. You can choose a name, the plant type, and how many days between waterings.
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.headerEs}>💧 Registro de Riego</Text>
                <Text style={styles.textEs}>
                    Cuando riegues una planta, entra en su detalle y presiona "Regar". El contador se reiniciará automáticamente.
                </Text>

                <Text style={styles.headerEn}>💧 Watering Log</Text>
                <Text style={styles.textEn}>
                    When you water a plant, go to its details and press "Water". The timer will reset automatically.
                </Text>
            </View>

            <View style={[styles.footer, { backgroundColor: tintColor + '10' }]}>
                <Text style={styles.footerText}>
                    ¡Mantén tus plantas felices y saludables!
                    {'\n'}Keep your plants happy and healthy!
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    headerEs: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    textEs: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 15,
    },
    headerEn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        fontStyle: 'italic',
    },
    textEn: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        fontStyle: 'italic',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 15,
    },
    footer: {
        marginTop: 30,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 24,
    },
});
