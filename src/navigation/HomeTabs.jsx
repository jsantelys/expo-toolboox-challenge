import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Bookmarks from "../screens/Bookmarks";
import Downloads from "../screens/Downloads";
import History from "../screens/History";
import { useTranslation } from "../i18n/useTranslation";
import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { selectHasActiveDownloads } from "../store/slices/downloadsSlice";

const Tab = createBottomTabNavigator();

function HomeTabsNavigator() {
    const { t } = useTranslation();
    const hasActiveDownloads = useAppSelector(selectHasActiveDownloads);

    const screenOptions = useMemo(() => ({
        home: {
            title: t('tabs.home'),
            tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                    name={focused ? "home" : "home-outline"}
                    color={color}
                    size={size}
                />
            ),
        },
        history: {
            title: t('tabs.history'),
            tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                    name="history"
                    color={color}
                    size={size}
                />
            ),
        },
        bookmarks: {
            title: t('tabs.bookmarks'),
            tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                    name={focused ? "bookmark" : "bookmark-outline"}
                    color={color}
                    size={size}
                />
            ),
        },
        downloads: {
            title: t('tabs.downloads'),
            tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                    name={focused ? "download" : "download-outline"}
                    color={color}
                    size={size}
                />
            ),
            tabBarBadge: hasActiveDownloads ? '' : undefined,
        },
        profile: {
            title: t('tabs.profile'),
            tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                    name={focused ? "account" : "account-outline"}
                    color={color}
                    size={size}
                />
            ),
        },
    }), [t, hasActiveDownloads]);

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={screenOptions.home} />
            <Tab.Screen name="Bookmarks" component={Bookmarks} options={screenOptions.bookmarks} />
            <Tab.Screen name="History" component={History} options={screenOptions.history} />
            <Tab.Screen name="Downloads" component={Downloads} options={screenOptions.downloads} />
            <Tab.Screen name="Profile" component={Profile} options={screenOptions.profile} />
        </Tab.Navigator>
    );
}

export default HomeTabsNavigator;