import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Theme, setThemeCookie } from './themeUtils';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps extends PropsWithChildren {
    initialTheme: Theme;
}
export const ThemeProvider = ({
    children,
    initialTheme,
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState(initialTheme);

    const _setTheme = (theme: Theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.cookie = setThemeCookie(theme);
        setTheme(theme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: _setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
