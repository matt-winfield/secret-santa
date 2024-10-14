/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import posthog from 'posthog-js';

const Posthog = () => {
    useEffect(() => {
        posthog.init('phc_Bqs0AaEVFhy17YJL7TTcuHQbdQGZxRNc4VFV3YUBcMk', {
            api_host: 'https://ph.matt-winfield.com',
            ui_host: 'https://eu.i.posthog.com',
            person_profiles: 'always',
            capture_pageview: false, // We capture pageviews manually in the Root component for SPA navigation
        });
    }, []);

    return null;
};

startTransition(() => {
    hydrateRoot(
        document,
        <StrictMode>
            <RemixBrowser />
            <Posthog />
        </StrictMode>,
    );
});
