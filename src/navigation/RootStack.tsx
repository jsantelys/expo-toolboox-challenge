import {
    createStaticNavigation,
    StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotFound } from '../screens/NotFound';
import { VideoPlayer } from '../screens/VideoPlayer';
import HomeTabs from './HomeTabs';

const RootStack = createNativeStackNavigator({
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
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
