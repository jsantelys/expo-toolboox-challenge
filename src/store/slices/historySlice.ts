import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryVideo {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
    imageUrl?: string;
    watchedAt: number; // Timestamp when video was last watched
    currentTime: number; // Current playback position in seconds
    duration?: number; // Total video duration in seconds (optional)
}

interface HistoryState {
    items: HistoryVideo[];
}

const initialState: HistoryState = {
    items: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addToHistory: (
            state,
            action: PayloadAction<Omit<HistoryVideo, 'watchedAt' | 'currentTime'>>
        ) => {
            const existingIndex = state.items.findIndex(
                item => item.videoUrl === action.payload.videoUrl
            );

            if (existingIndex >= 0) {
                // Update existing history item
                state.items[existingIndex] = {
                    ...action.payload,
                    watchedAt: Date.now(),
                    currentTime: 0,
                    duration: state.items[existingIndex].duration,
                };
            } else {
                // Add new history item
                state.items.unshift({
                    ...action.payload,
                    watchedAt: Date.now(),
                    currentTime: 0,
                });
            }
        },
        updatePlaybackPosition: (
            state,
            action: PayloadAction<{ videoUrl: string; currentTime: number; duration?: number }>
        ) => {
            const video = state.items.find(
                item => item.videoUrl === action.payload.videoUrl
            );
            if (video) {
                video.currentTime = action.payload.currentTime;
                video.watchedAt = Date.now();
                if (action.payload.duration !== undefined) {
                    video.duration = action.payload.duration;
                }
            }
        },
        removeFromHistory: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                item => item.videoUrl !== action.payload
            );
        },
        clearHistory: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToHistory,
    updatePlaybackPosition,
    removeFromHistory,
    clearHistory,
} = historySlice.actions;

export default historySlice.reducer;

// Selectors
export const selectAllHistory = (state: { history: HistoryState }) =>
    state.history.items;

export const selectHistoryByVideoUrl = (videoUrl: string) =>
    (state: { history: HistoryState }) =>
        state.history.items.find(item => item.videoUrl === videoUrl);

// Helper selector to get videos watched in the last N days
export const selectRecentHistory = (daysAgo: number = 7) =>
    (state: { history: HistoryState }) => {
        const cutoffTime = Date.now() - daysAgo * 24 * 60 * 60 * 1000;
        return state.history.items.filter(item => item.watchedAt >= cutoffTime);
    };

// Helper to format time ago
export const getTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
    return `${Math.floor(seconds / 2592000)} months ago`;
};

