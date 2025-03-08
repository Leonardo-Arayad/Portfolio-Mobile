import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useAppTheme } from '../App';

const { width } = Dimensions.get('window');
const height = 180;

const FondoAzul = () => {
    const { isDarkMode, theme } = useAppTheme();
    
    const primaryColor = isDarkMode ? theme.colors.primary : '#4285F4';
    const secondaryColor = isDarkMode ? theme.colors.primaryContainer : '#3B7ADB';

    return (
        <View style={styles.container}>
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
                        <Stop offset="100%" stopColor={secondaryColor} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Path
                    d={`M 0 0 Q ${width / 2} ${height + 50}, ${width} 0 L ${width} ${height} L 0 ${height} Z`}
                    fill="url(#grad)"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
});

export default FondoAzul;
