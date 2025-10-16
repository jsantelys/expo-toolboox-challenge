import {
    createStaticNavigation,
    StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotFound } from '../screens/NotFound';
import { VideoPlayer } from '../screens/VideoPlayer';
import HomeTabs from './HomeTabs';
import Login from '../screens/Login';
import { useIsSignedIn, useIsSignedOut } from './hooks/useIsSigned';

const RootStack = createNativeStackNavigator({
    groups: {
        LoggedIn: {
            if: useIsSignedIn,
            screens: {
                HomeTabs: {
                    screen: HomeTabs,
                    options: {
                        title: 'Home',
                        headerShown: false,
                    },
                },
                VideoPlayer: {
                    screen: VideoPlayer,
                    options: {
                        headerShown: false,
                    },
                },
            }
        },
        LoggedOut: {
            if: useIsSignedOut,
            screens: {
                Login: {
                    screen: Login,
                    options: {
                        headerShown: false,
                    },
                },
            },
        },
        General: {
            screens: {
                NotFound: {
                    screen: NotFound,
                    options: {
                        title: '404',
                    },
                    linking: {
                        path: '*',
                    },
                },
            },
        },
    },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
