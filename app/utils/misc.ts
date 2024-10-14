import { extendTailwindMerge } from 'tailwind-merge';
import { extendedTheme } from './extendedTheme';
import clsx, { ClassValue } from 'clsx';
import { useEffect, useRef, useState } from 'react';

function formatColors() {
    const colors = [];
    for (const [key, color] of Object.entries(extendedTheme.colors)) {
        if (typeof color === 'string') {
            colors.push(key);
        } else {
            const colorGroup = Object.keys(color).map((subKey) =>
                subKey === 'DEFAULT' ? '' : subKey,
            );
            colors.push({ [key]: colorGroup });
        }
    }
    return colors;
}

const customTwMerge = extendTailwindMerge({
    extend: {
        theme: {
            colors: formatColors(),
            borderRadius: Object.keys(extendedTheme.borderRadius),
        },
        classGroups: {
            'font-size': [
                {
                    text: Object.keys(extendedTheme.fontSize),
                },
            ],
            animate: [
                {
                    animate: Object.keys(extendedTheme.animation),
                },
            ],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return customTwMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
    if (typeof error === 'string') return error;
    if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        return error.message;
    }
    console.error('Unable to get error message for error', error);
    return 'Unknown Error';
}

/**
 * Hook to fade in an image when it's loaded so the "pop-in" effect is less jarring.
 */
export const useImageFadeIn = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // The image may already be loaded if it's cached, in which case onLoad never fires,
        // so we need to check if it's complete when the page first loads
        if (imageRef.current?.complete) {
            setImageLoaded(true);
        }
    }, []);

    const onLoad = () => {
        setImageLoaded(true);
    };

    const imageClasses = cn('transition-opacity', !imageLoaded && 'opacity-0');

    return {
        imageRef,
        imageClasses,
        props: {
            onLoad,
        },
    };
};
