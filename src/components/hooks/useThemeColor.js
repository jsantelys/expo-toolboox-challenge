import { Colors } from '../../constants/theme';
import { useColorScheme } from 'react-native';

export function useThemeColor(
    props,
    colorName
) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}