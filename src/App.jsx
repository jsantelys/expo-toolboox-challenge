import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Navigation } from './navigation/RootStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from './store/hooks';
import { MyDarkTheme, MyTheme } from './constants/theme';
import { I18nProvider } from './i18n/I18nProvider';
import { useTokenRefresh } from './hooks/useTokenRefresh';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/fallbackImage.png'),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

function AppContent() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MyDarkTheme : MyTheme;

  useTokenRefresh();

  return (
    <I18nProvider>
      <Navigation
        theme={theme}
        linking={{
          enabled: 'auto',
          prefixes: [prefix],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </I18nProvider>
  );
}

export function App() {
  const { store, persistor } = useStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
