import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'react-native-encrypted-storage';
import { Platform } from 'react-native';

import { reducers } from './reducers';

type CoreReduxState = ReturnType<typeof reducers>;

const whitelist: (keyof CoreReduxState)[] = ['theme', 'auth'];

export const persistConfig = {
  key: 'root',
  storage,
  whitelist,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: Platform.OS === 'ios' ? { warnAfter: 128 } : false,
    }),
  enhancers: __DEV__
    ? (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires,global-require
          require('./ReactotronConfig').default.createEnhancer!(),
        )
    : undefined,
});

export const persistedStore = persistStore(store);
