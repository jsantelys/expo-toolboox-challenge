import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToStoreChanges, getCurrentStore } from './index';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

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