import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { useColorScheme } from '@/hooks/use-color-scheme';
import i18n from '../src/i18n';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Separate component so useTranslation() runs inside I18nextProvider
function AppStack() {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-plant" options={{ title: t('addPlant.title') }} />
      <Stack.Screen name="plant/[id]" options={{ title: t('plantDetail.title') }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppStack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </I18nextProvider>
  );
}
