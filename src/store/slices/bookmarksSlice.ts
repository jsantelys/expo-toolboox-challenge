import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookmarkedVideo {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
    imageUrl?: string;
    timestamp: number;
}

interface BookmarksState {
    items: BookmarkedVideo[];
}

const initialState: BookmarksState = {
    items: [],
};

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addBookmark: (
            state,
            action: PayloadAction<Omit<BookmarkedVideo, 'timestamp'>>
        ) => {
            const exists = state.items.find(item => item.videoUrl === action.payload.videoUrl);
            if (!exists) {
                state.items.push({
                    ...action.payload,
                    timestamp: Date.now(),
                });
            }
        },
        removeBookmark: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.videoUrl !== action.payload);
        },
        clearBookmarks: (state) => {
            state.items = [];
        },
    },
});

export const { addBookmark, removeBookmark, clearBookmarks } =
    bookmarksSlice.actions;
export default bookmarksSlice.reducer;

// Selectors
export const selectAllBookmarks = (state: { bookmarks: BookmarksState }) =>
    state.bookmarks.items;

export const selectIsBookmarked = (videoUrl: string) =>
    (state: { bookmarks: BookmarksState }) =>
        state.bookmarks.items.some(item => item.videoUrl === videoUrl);

