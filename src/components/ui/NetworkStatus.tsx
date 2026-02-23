'use client';

import React, { useState, useEffect } from 'react';

export default function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-center p-4 backdrop-blur-md">
            <div className="text-[var(--main-color)] flex flex-col items-center animate-pulse">
                <i className='bx bx-wifi-off text-9xl mb-8 drop-shadow-[0_0_20px_var(--main-color)]'></i>
                <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter mb-4">
                    CONNECTION LOST
                </h1>
                <p className="text-xl md:text-2xl font-mono text-[var(--foreground)] opacity-80 max-w-lg">
                    Uplink to the mainframe has been severed. Re-establishing secure protocol...
                </p>
                <div className="mt-8 w-64 h-1 bg-[var(--foreground)]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--main-color)] w-full animate-progress-indeterminate"></div>
                </div>
            </div>
        </div>
    );
}
