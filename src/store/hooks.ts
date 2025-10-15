import { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { subscribeToStoreChanges, getCurrentStore, type RootState, type AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStore = () => {
    const [{ store, persistor }, setStoreInstance] = useState(getCurrentStore());

    useEffect(() => {
        const unsubscribe = subscribeToStoreChanges(() => {
            setStoreInstance(getCurrentStore());
        });
        return unsubscribe;
    }, []);

    return { store, persistor };
}