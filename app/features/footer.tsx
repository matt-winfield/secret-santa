import { Link } from '@remix-run/react';
import { ThemeSwitch } from '@/features/themes/themeSwitcher';

export const Footer = () => {
    return (
        <div className="mb-2 mt-10 flex flex-col items-center justify-between gap-2 px-5 text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-5">
                <Link
                    to="/privacy-policy"
                    className="transition-colors hover:text-accent-foreground"
                >
                    Privacy Policy
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <ThemeSwitch />
            </div>
        </div>
    );
};
