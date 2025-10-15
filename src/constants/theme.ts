import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const Colors = {
    light: {
        text: '#11181C',
        background: '#fff',
        icon: '#687076',
        primary: '#FF6B35',
        primaryDark: '#E65100',
        primaryLight: '#FFAB91',
        accent: '#FF8C42',
        border: '#E0E0E0',
        card: '#F5F5F5',
    },
    dark: {
        text: '#ECEDEE',
        background: '#151718',
        icon: '#9BA1A6',
        primary: '#FFB74D',
        primaryDark: '#FF8C42',
        primaryLight: '#FFD699',
        accent: '#FF6B35',
        border: '#2C2C2E',
        card: '#1C1C1E',
    },
};

export const MyTheme = {
    ...DefaultTheme,
    colors: {
        primary: Colors.light.primary,
        background: Colors.light.background,
        card: Colors.light.card,
        text: Colors.light.text,
        border: Colors.light.border,
        notification: Colors.light.accent,
    },
}

export const MyDarkTheme = {
    ...DarkTheme,
    colors: {
        primary: Colors.dark.primary,
        background: Colors.dark.background,
        card: Colors.dark.card,
        text: Colors.dark.text,
        border: Colors.dark.border,
        notification: Colors.dark.accent,
    },
}
