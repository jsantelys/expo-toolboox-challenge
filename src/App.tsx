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

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

export function App() {
  const colorScheme = useColorScheme();
  const { store, persistor } = useStore();

  const theme = colorScheme === 'dark' ? MyDarkTheme : MyTheme

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}
