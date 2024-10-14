import {
    Link,
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useLocation,
    useMatches,
    useOutlet,
} from '@remix-run/react';
import tailwindStylesheetUrl from './styles/tailwind.css?url';
import fontsStylesheetUrl from './styles/fonts.css?url';
import { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { cn } from './utils/misc';
import { NavMenu } from './features/navMenu';
import { Footer } from './features/footer';
import { ThemeSwitch } from './features/themes/themeSwitcher';
import { getTheme } from './features/themes/themeUtils';
import { ThemeProvider, useTheme } from './features/themes/themeProvider';
import { GeneralErrorBoundary } from './components/errorBoundary';
import { ChevronLeft } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from 'mdx/types';
import { useEffect } from 'react';
import { posthog } from 'posthog-js';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: tailwindStylesheetUrl, as: 'style' },
        { rel: 'stylesheet', href: fontsStylesheetUrl, as: 'style' },
    ].filter(Boolean);
};

export const meta: MetaFunction = () => {
    return [
        { title: 'Secret Santa' },
        { name: 'description', content: `Generate secret santa pairings, with the ability to prevent certain group members from matching with each other.` },
    ];
};

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
const mdxComponents: MDXComponents = {
    h1: (props) => <h1 className="mb-4 mt-8 text-4xl font-bold" {...props} />,
    h2: (props) => <h2 className="mb-4 mt-8 text-3xl font-bold" {...props} />,
    h3: (props) => <h3 className="mb-4 mt-8 text-2xl font-bold" {...props} />,
    h4: (props) => <h4 className="mb-3 mt-6 text-xl font-bold" {...props} />,
    h5: (props) => <h5 className="mb-2 mt-6 font-bold" {...props} />,
    h6: (props) => <h6 className="mb-1 mt-6 font-semibold" {...props} />,
    p: (props) => <p className="my-2" {...props} />,
    a: (props) => (
        <a className="text-accent-foreground hover:underline" {...props} />
    ),
    ul: (props) => <ul className="list-inside list-disc pl-10" {...props} />,
    ol: (props) => <ol className="list-inside list-decimal pl-10" {...props} />,
    li: (props) => <li className="my-2" {...props} />,
    blockquote: (props) => (
        <blockquote className="border-l-4 border-gray-300 pl-2" {...props} />
    ),
    pre: (props) => (
        <pre
            className="max-w-full overflow-x-auto rounded-lg bg-card text-foreground"
            {...props}
        />
    ),
    code: (props) => (
        <code
            className="w-fit rounded-lg bg-card p-1 text-foreground"
            {...props}
        />
    ),
    img: (props) => (
        <div className="m-2 flex w-full items-center justify-center">
            <img className="max-h-[500px] w-auto" {...props} />
        </div>
    ),
};

function Layout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <html lang="en" className={theme}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <script
                    defer
                    data-domain="matt-winfield.com"
                    src="https://pl.matt-winfield.com/js/script.js"
                ></script>
                {/* Standard favicon */}
                <link rel="icon" type="image/x-icon" href="favicon.ico" />

                {/* Specific size images */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="favicon-16.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="favicon-32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="64x64"
                    href="favicon-64.png"
                />

                {/* Apple touch icons */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="favicon-180.png"
                />

                {/* Android icons */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="favicon-192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="512x512"
                    href="favicon-512.png"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <MDXProvider components={mdxComponents}>{children}</MDXProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

const Header = () => {
    const matches = useMatches();
    const isOnIndexPage = matches.find((m) => m.id === 'routes/index');

    return (
        <div className="w-full overflow-hidden">
            <header
                // The header uses w-screen instead of w-full so it doesn't resize when the (vertical) scrollbar appears (which would cause a layout shift between pages)
                // The container has overflow-hidden to prevent the horizontal scrollbar from appearing due to this when the vertical scrollbar is visible
                className={cn(
                    isOnIndexPage && 'fixed',
                    'z-10 flex w-screen items-center py-6',
                )}
            >
                <nav
                    className={cn(
                        'flex flex-1 items-center justify-between',
                        isOnIndexPage && 'container',
                    )}
                >
                    {isOnIndexPage && <ThemeSwitch />}
                    <div className="mx-3 min-w-0 flex-1">
                        {!isOnIndexPage && <NavMenu />}
                    </div>
                    <div></div>
                </nav>
            </header>
        </div>
    );
};

export const loader: LoaderFunction = async ({ request }) => {
    const theme = getTheme(request);

    return { theme };
};

export default function App() {
    const { theme } = useLoaderData<typeof loader>();
    const matches = useMatches();
    const outlet = useOutlet();
    const location = useLocation();
    const isOnIndexPage = matches.find((m) => m.id === 'routes/index');

    useEffect(() => {
        posthog.capture('$pageview');
    }, [location.pathname]);

    return (
        <ThemeProvider initialTheme={theme}>
            <Layout>
                <div className="flex min-h-full flex-col justify-between">
                    <Header />
                    <div className="flex-1 basis-[1px]">{outlet}</div>
                    {!isOnIndexPage && <Footer />}
                </div>
            </Layout>
        </ThemeProvider>
    );
}

export function ErrorBoundary() {
    const location = useLocation();
    return (
        <GeneralErrorBoundary
            statusHandlers={{
                404: () => (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <h1>We can&apos;t find this page:</h1>
                            <pre className="whitespace-pre-wrap break-all text-body-lg">
                                {location.pathname}
                            </pre>
                        </div>
                        <Link to="/" className="flex gap-1">
                            <ChevronLeft />
                            <span>Back to home</span>
                        </Link>
                    </div>
                ),
            }}
        />
    );
}
