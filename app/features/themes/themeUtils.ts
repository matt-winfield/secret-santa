import cookie from 'cookie';

export const THEME_COOKIE_NAME = 'theme';
export const DEFAULT_THEME = 'dark';
export const VALID_THEMES = ['light', 'dark'] as const;
export type Theme = (typeof VALID_THEMES)[number];

export function getTheme(request: Request) {
    const cookieHeader = request.headers.get('cookie');
    const cookies = cookie.parse(cookieHeader || '');
    const parsed = cookies[THEME_COOKIE_NAME]?.toLowerCase();

    if (!parsed || !VALID_THEMES.includes(parsed as Theme)) {
        return DEFAULT_THEME;
    }

    return parsed as Theme;
}

export function setThemeCookie(theme: Theme) {
    return cookie.serialize(THEME_COOKIE_NAME, theme, { path: '/' });
}
