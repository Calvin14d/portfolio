'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-[#00ff9c] flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,var(--main-color)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

            <div className="z-10 text-center">
                <h1 className="text-9xl font-bold mb-4 glitch-text" data-text="404">404</h1>
                <div className="w-full h-1 bg-[#00ff9c] mb-8 shadow-[0_0_10px_#00ff9c]"></div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-widest uppercase">
                    System Error
                </h2>

                <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-xl mx-auto">
                    The requested directory path does not exist in this sector.
                </p>

                <Link
                    href="/"
                    className="inline-block px-10 py-4 bg-transparent border-2 border-[#00ff9c] text-[#00ff9c] text-xl font-bold uppercase tracking-wider hover:bg-[#00ff9c] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,255,156,0.2)] hover:shadow-[0_0_40px_rgba(0,255,156,0.6)]"
                >
                    Return to Base
                </Link>
            </div>
        </div>
    );
}
