import { clearUserStorage } from '../services/storageService';
import { store, switchUserStorage } from './index';

//This file was created as a mean to self implement the bookmarks, downloads and histories without using a server.

export const loginUser = async (user, token, apiServiceInstance) => {
    console.log('loginUser', user, token);
    await switchUserStorage(user.id, { user, token });

    if (token && apiServiceInstance) {
        apiServiceInstance.setToken(token);
    }

    console.log(`User ${user.name} logged in with storage ID: ${user.id}`);
};

export const logoutUser = async (apiServiceInstance) => {
    const currentUser = store.getState().user.currentUser;

    if (apiServiceInstance) {
        apiServiceInstance.clearToken();
    }

    await switchUserStorage(null);
    console.log(`User ${currentUser?.name || 'Unknown'} logged out`);
};

export const deleteUserData = async (userId, apiServiceInstance) => {
    const currentUser = store.getState().user.currentUser;

    if (currentUser?.id === userId) {
        await logoutUser(apiServiceInstance);
    }

    clearUserStorage(userId);

    console.log(`User data deleted for user ID: ${userId}`);
};


