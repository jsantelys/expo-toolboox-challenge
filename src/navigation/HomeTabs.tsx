import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Bookmarks from "../screens/Bookmarks";
import Downloads from "../screens/Downloads";
import History from "../screens/History";

const HomeTabs = createBottomTabNavigator({
    screens: {
        Home: {
            screen: Home,
            options: {
                title: 'Home',
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ? "home" : "home-outline"}
                        tintColor={color}
                        color={color}
                        size={size}
                    />
                ),
            },
        },
        History: {
            screen: History,
            options: {
                title: 'History',
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ? "history" : "history"}
                        tintColor={color}
                        color={color}
                        size={size}
                    />
                ),
            },
        },
        Bookmarks: {
            screen: Bookmarks,
            options: {
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons name={focused ? "bookmark" : "bookmark-outline"} tintColor={color} color={color} size={size} />
                ),
            },
        },
        Downloads: {
            screen: Downloads,
            options: {
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons name={focused ? "download" : "download-outline"} tintColor={color} color={color} size={size} />
                ),
            },
        },
        Profile: {
            screen: Profile,
            options: {
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ? "account" : "account-outline"}
                        tintColor={color}
                        color={color}
                        size={size}
                    />
                ),
            },
        },
    },
});

export default HomeTabs;