import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLang } from '../../src/i18n/LanguageContext';

export default function HelpScreen() {
    const { t, lang, setLang } = useLang();

    const handleToggleLanguage = () => {
        setLang(lang === 'es' ? 'en' : 'es');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity style={styles.langButton} onPress={handleToggleLanguage}>
                <Text style={styles.langButtonText}>{t('help.switchLanguage')}</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{t('help.title')}</Text>

            <View style={styles.section}>
                <Text style={styles.header}>{t('help.myPlants')}</Text>
                <Text style={styles.body}>{t('help.myPlantsDesc')}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.header}>{t('help.addPlant')}</Text>
                <Text style={styles.body}>{t('help.addPlantDesc')}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.header}>{t('help.wateringLog')}</Text>
                <Text style={styles.body}>{t('help.wateringLogDesc')}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{t('help.footer')}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    contentContainer: { padding: 20, paddingBottom: 40 },
    langButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 20,
    },
    langButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#4CAF50',
    },
    section: { marginBottom: 20 },
    header: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    body: { fontSize: 16, color: '#666', lineHeight: 22 },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    footer: {
        marginTop: 30,
        padding: 20,
        borderRadius: 12,
        backgroundColor: '#f0f8f0',
        alignItems: 'center',
    },
    footerText: { fontSize: 16, color: '#444', textAlign: 'center', fontWeight: '500', lineHeight: 24 },
});
