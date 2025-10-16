import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer, { login } from './slices/userSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import downloadsReducer from './slices/downloadsSlice';
import historyReducer from './slices/historySlice';
import { createReduxPersistStorage, DEFAULT_USER_ID, setCurrentUserId } from '../services/storageService';
import { getCurrentUserId } from '../services/storageService';

const rootReducer = combineReducers({
    user: userReducer,
    bookmarks: bookmarksReducer,
    downloads: downloadsReducer,
    history: historyReducer,
});

function createStoreForUser(userId) {
    const persistConfig = {
        key: userId,
        storage: createReduxPersistStorage(userId),
        whitelist: ['user', 'bookmarks', 'downloads', 'history'],
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
}

//This function switch between multiple users storage instance of MMKV
export const switchUserStorage = async (userId, userData) => {
    if (getCurrentUserId() === userId) {
        return
    }

    currentStoreInstance.persistor.pause();
    await currentStoreInstance.persistor.flush();

    setCurrentUserId(userId || DEFAULT_USER_ID);

    currentStoreInstance = createStoreForUser(userId || DEFAULT_USER_ID);

    store = currentStoreInstance.store;
    persistor = currentStoreInstance.persistor;

    if (userData) {
        store.dispatch(login(userData));
    }

    notifyStoreChanged();
};

let currentStoreInstance = createStoreForUser(getCurrentUserId());

const storeChangeListeners = new Set();

export function subscribeToStoreChanges(listener) {
    storeChangeListeners.add(listener);
    return () => {
        storeChangeListeners.delete(listener);
    };
}

function notifyStoreChanged() {
    storeChangeListeners.forEach(listener => listener());
}

export function getCurrentStore() {
    return { store, persistor };
}

export let store = currentStoreInstance.store;
export let persistor = currentStoreInstance.persistor;

