import { clearUserStorage } from '../services/storageService';
import { store, switchUserStorage } from './index';
import { login } from './slices/userSlice';
import type { User } from './slices/userSlice';

/**
 * Login user and switch to their storage
 */
export const loginUser = async (user: User) => {
    await switchUserStorage(user.id, user);
    console.log(`User ${user.name} logged in with storage ID: ${user.id}`);
};

/**
 * Logout user and switch back to default storage
 */
export const logoutUser = async () => {
    const currentUser = store.getState().user.currentUser;
    await switchUserStorage(null);
    console.log(`User ${currentUser?.name || 'Unknown'} logged out`);
};

/**
 * Delete user data completely (for account deletion)
 */
export const deleteUserData = async (userId: string) => {
    const currentUser = store.getState().user.currentUser;

    // If deleting current user's data, logout first
    if (currentUser?.id === userId) {
        await logoutUser();
    }

    // Clear and delete user's storage
    clearUserStorage(userId);

    console.log(`User data deleted for user ID: ${userId}`);
};

/**
 * Switch between users (for testing or multi-account support)
 */
export const switchUser = async (user: User) => {
    await loginUser(user);
};

