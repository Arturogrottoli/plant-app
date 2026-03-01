import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { LangProvider, useLang } from '../src/i18n/LanguageContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppStack() {
  const { t } = useLang();
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
    <LangProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppStack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </LangProvider>
  );
}
