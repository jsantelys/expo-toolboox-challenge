import { useAppSelector } from '../../store/hooks';
import { selectIsAuthenticated } from '../../store/slices/userSlice';

export const useIsSignedIn = () => {
    const isSignedIn = useAppSelector(selectIsAuthenticated);
    return isSignedIn;
};

export const useIsSignedOut = () => {
    const isSignedIn = useIsSignedIn();
    return !isSignedIn;
};

export default useIsSignedIn;