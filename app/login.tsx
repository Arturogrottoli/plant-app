import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { useLang } from '../src/i18n/LanguageContext';

export default function LoginScreen() {
    const router = useRouter();
    const { login, register } = useAuth();
    const { t } = useLang();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', t('login.fillAll'));
            return;
        }
        setLoading(true);
        try {
            if (isRegister) {
                await register(email.trim(), password);
            } else {
                await login(email.trim(), password);
            }
            router.replace('/(tabs)');
        } catch (e: any) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.inner}>
                <Text style={styles.logo}>🌿</Text>
                <Text style={styles.title}>Plant App</Text>
                <Text style={styles.subtitle}>
                    {isRegister ? t('login.createAccount') : t('login.welcome')}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={t('login.email')}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('login.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isRegister ? t('login.register') : t('login.login')}
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                    <Text style={styles.toggle}>
                        {isRegister ? t('login.haveAccount') : t('login.noAccount')}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    inner: {
        flex: 1,
        justifyContent: 'center',
        padding: 28,
    },
    logo: { fontSize: 72, textAlign: 'center', marginBottom: 8 },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4CAF50',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
        marginBottom: 36,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 14,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 20,
    },
    buttonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
    toggle: {
        textAlign: 'center',
        color: '#4CAF50',
        fontSize: 15,
        fontWeight: '600',
    },
});
