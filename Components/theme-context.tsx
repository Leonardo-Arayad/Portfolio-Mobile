import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

export type AppThemeType = typeof DefaultTheme;

export interface ThemeContextType {
    isDarkMode: boolean;
    theme: AppThemeType;
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    theme: DefaultTheme,
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const theme = isDarkMode ? MD3DarkTheme : DefaultTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, theme }}>
            <PaperProvider theme={theme}>
                {children}
            </PaperProvider>
        </ThemeContext.Provider>
    )
};
