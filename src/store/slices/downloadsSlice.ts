import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system/legacy';

export interface DownloadedVideo {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
    localUri?: string;
    progress: number;
    status: 'pending' | 'downloading' | 'completed' | 'failed';
    timestamp: number;
    savable: FileSystem.DownloadPauseState;
}

interface DownloadsState {
    items: DownloadedVideo[];
}

const initialState: DownloadsState = {
    items: [],
};

const downloadsSlice = createSlice({
    name: 'downloads',
    initialState,
    reducers: {
        addDownload: (
            state,
            action: PayloadAction<Omit<DownloadedVideo, 'timestamp' | 'progress' | 'status'>>
        ) => {
            state.items.push({
                ...action.payload,
                progress: 0,
                status: 'pending',
                timestamp: Date.now(),
            });
        },
        updateDownloadProgress: (
            state,
            action: PayloadAction<{ id: string; progress: number }>
        ) => {
            const download = state.items.find(item => item.id === action.payload.id);
            if (download) {
                download.progress = action.payload.progress;
                download.status = 'downloading';
            }
        },
        completeDownload: (
            state,
            action: PayloadAction<{ id: string; localUri: string }>
        ) => {
            const download = state.items.find(item => item.id === action.payload.id);
            if (download) {
                download.status = 'completed';
                download.localUri = action.payload.localUri;
                download.progress = 100;
            }
        },
        failDownload: (state, action: PayloadAction<string>) => {
            const download = state.items.find(item => item.id === action.payload);
            if (download) {
                download.status = 'failed';
            }
        },
        removeDownload: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearDownloads: (state) => {
            state.items = [];
        },
    },
});

export const {
    addDownload,
    updateDownloadProgress,
    completeDownload,
    failDownload,
    removeDownload,
    clearDownloads,
} = downloadsSlice.actions;
export default downloadsSlice.reducer;

export const selectAllDownloads = (state: { downloads: DownloadsState }) =>
    state.downloads.items;

export const selectDownloadById = (id: string) =>
    (state: { downloads: DownloadsState }) =>
        state.downloads.items.find(item => item.id === id);

export const selectDownloadedVideoUri = (id: string) =>
    (state: { downloads: DownloadsState }) => {
        const download = state.downloads.items.find(item => item.id === id);
        return download?.status === 'completed' ? download.localUri : undefined;
    };

export const selectHasActiveDownloads = (state: { downloads: DownloadsState }) =>
    state.downloads.items.some(item => item.status === 'downloading' || item.status === 'pending');

