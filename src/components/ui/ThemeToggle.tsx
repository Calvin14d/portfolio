'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="ml-8 text-3xl text-[var(--main-color)] border-2 border-[var(--main-color)] rounded-full w-12 h-12 flex items-center justify-center transition-all hover:bg-[var(--main-color)] hover:text-[var(--background)] hover:shadow-[0_0_15px_var(--main-color)]"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <i className='bx bx-sun'></i>
            ) : (
                <i className='bx bx-moon'></i>
            )}
        </button>
    );
}
