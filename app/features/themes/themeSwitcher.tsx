import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from './themeProvider';

export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const modeLabel = {
        light: <SunIcon>Light</SunIcon>,
        dark: <MoonIcon>Dark</MoonIcon>,
    };

    const onClick = () => {
        setTheme(nextTheme);
    };

    return (
        <Button onClick={onClick} variant="ghost" size="sm">
            {modeLabel[theme]}
        </Button>
    );
};
