import React from 'react';
import { RootNavigator } from '@app/features/rootNavigation';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, store } from '@app/redux/store.ts';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
