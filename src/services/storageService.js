import { MMKV } from 'react-native-mmkv';

export const globalStorage = new MMKV({
    id: 'global-storage',
    encryptionKey: 'global-storage-encryption-key',
});

const userStorageInstances = new Map()

export const DEFAULT_USER_ID = 'default-id'
const CURRENT_USER_KEY = 'current-user-key'

export const getUserStorage = (userId) => {
    let storageId = `storage-${userId}`
    if (!userId || userId === DEFAULT_USER_ID) {
        storageId = `storage-${DEFAULT_USER_ID}`
    }

    if (userStorageInstances.has(storageId)) {
        return userStorageInstances.get(storageId)
    }
    const userStorage = new MMKV({
        id: storageId,
        encryptionKey: `${storageId}-encryption-key`,
    });
    userStorageInstances.set(storageId, userStorage)
    return userStorage
}

export const clearUserStorage = (userId) => {
    if (!userId || userId === DEFAULT_USER_ID) {
        return
    }
    const storageId = `storage-${userId}`
    const storageInstance = userStorageInstances.get(storageId)
    if (storageInstance) {
        storageInstance.clearAll()
    } else {
        const storageInstance = new MMKV({
            id: storageId,
            encryptionKey: `${storageId}-encryption-key`,
        })
        storageInstance.clearAll()
    }
}

export const createReduxPersistStorage = (userId) => {
    const storage = getUserStorage(userId)
    return {
        setItem: (key, value) => {
            storage.set(key, value);
            return Promise.resolve(true);
        },
        getItem: (key) => {
            const value = storage.getString(key);
            return Promise.resolve(value);
        },
        removeItem: (key) => {
            storage.delete(key);
            return Promise.resolve();
        },
    }
};

export const setCurrentUserId = (userId) => {
    globalStorage.set(CURRENT_USER_KEY, userId)
}
export const getCurrentUserId = () => {
    return globalStorage.getString(CURRENT_USER_KEY) || DEFAULT_USER_ID
}

export const clearCurrentUserId = () => {
    globalStorage.delete(CURRENT_USER_KEY)
}