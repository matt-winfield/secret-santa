import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { flatRoutes } from 'remix-flat-routes';
import mdx from '@mdx-js/rollup';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import svgr from 'vite-plugin-svgr';

installGlobals();

const prettyCodeOptions: Options = {};

export default defineConfig({
    plugins: [
        remix({
            // We're using https://github.com/kiliman/remix-flat-routes so disable the Remix routing
            ignoredRouteFiles: ['**/.*'],
            routes: async (defineRoutes) => {
                return flatRoutes('routes', defineRoutes);
            },
        }),
        tsconfigPaths(),
        {
            enforce: 'pre',
            ...mdx({
                providerImportSource: '@mdx-js/react',
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
            }),
        },
        svgr(),
    ],
});
