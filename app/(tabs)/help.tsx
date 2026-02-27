import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { setLanguage } from '../../src/i18n';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function HelpScreen() {
    const colorScheme = useColorScheme();
    const tintColor = Colors[colorScheme ?? 'light'].tint;
    const { t } = useTranslation();

    const handleToggleLanguage = () => {
        const nextLang = i18next.language === 'es' ? 'en' : 'es';
        setLanguage(nextLang);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity
                style={[styles.langButton, { borderColor: tintColor }]}
                onPress={handleToggleLanguage}
            >
                <Text style={[styles.langButtonText, { color: tintColor }]}>
                    {t('help.switchLanguage')}
                </Text>
            </TouchableOpacity>

            <Text style={[styles.title, { color: tintColor }]}>{t('help.title')}</Text>

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

            <View style={[styles.footer, { backgroundColor: tintColor + '10' }]}>
                <Text style={styles.footerText}>{t('help.footer')}</Text>
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
    langButton: {
        alignSelf: 'flex-end',
        borderWidth: 1.5,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 20,
    },
    langButtonText: {
        fontSize: 14,
        fontWeight: '600',
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
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    body: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
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
