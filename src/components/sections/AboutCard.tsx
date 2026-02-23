'use client';

import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function AboutCard() {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const typingRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const typed = new Typed(typingRef.current, {
            strings: [
                "I am known in the digital realm as Code Monarch.",
                "Specializing in offensive security — I expose vulnerabilities before threat actors can exploit them.",
                "My work involves deep network analysis, system dissection, and crafting tools that test the limits of digital security.",
                "Every line of code is a chess move in the game of cyber defense."
            ],
            typeSpeed: 40,
            backSpeed: 20,
            backDelay: 1500,
            loop: true,
            showCursor: false,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.transform = '';
        }
    }, [isFlipped]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || isFlipped) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        cardRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || isFlipped) return;
        cardRef.current.style.transform = 'rotateX(5deg) rotateY(-5deg)';
    };

    return (
        <div className="relative w-full max-w-5xl h-[75vh] lg:h-[350px] perspective-1400 mx-auto">
            {/* Background Glows */}
            <div className="absolute top-[10%] left-[15%] w-[40%] h-[40%] bg-[var(--main-color)] rounded-full blur-[120px] opacity-20 animate-float"></div>
            <div className="absolute bottom-[10%] right-[15%] w-[40%] h-[40%] bg-[var(--main-color)] rounded-full blur-[120px] opacity-20 animate-float-reverse"></div>

            {/* Card Container */}
            <div
                ref={cardRef}
                onClick={handleFlip}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : 'rotate-x-5 -rotate-y-5'}`}
            >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] border border-[var(--glass-border)] rounded-3xl p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[length:24px_24px]"></div>

                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-[4px] font-mono mb-8 relative inline-block text-[var(--foreground)]">
                            ABOUT <span className="text-[var(--main-color)] drop-shadow-[0_0_15px_var(--main-color)]">ME</span>
                            <div className="absolute -bottom-2 left-0 w-full h-[4px] bg-[var(--main-color)] rounded-full"></div>
                        </h1>

                        <div className="mt-4 min-h-[100px] p-6 bg-[var(--background)]/40 rounded-xl border-l-4 border-[var(--main-color)] shadow-inner">
                            <span ref={typingRef} className="text-xl md:text-2xl font-light leading-relaxed text-[var(--foreground)]"></span>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-8">
                        <div className="flex items-center gap-3 text-sm md:text-base font-mono tracking-widest text-[var(--main-color)]">
                            <div className="w-3 h-3 bg-[var(--main-color)] rounded-full shadow-[0_0_10px_var(--main-color)] animate-pulse"></div>
                            CYBER OPS ACTIVE
                        </div>
                        <div className="text-xs md:text-sm text-[var(--foreground)]/60 tracking-[2px] font-mono animate-pulse">CLICK TO FLIP</div>
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] border border-[var(--glass-border)] rounded-3xl p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-center items-center h-full">
                    <div className="text-4xl md:text-6xl font-extrabold tracking-[3px] font-mono mb-10 relative inline-block text-[var(--foreground)]">
                        Code <span className="text-[var(--main-color)] drop-shadow-[0_0_15px_var(--main-color)]">Monarch</span>
                        <div className="absolute -bottom-2 left-0 w-full h-[4px] bg-[var(--main-color)] rounded-full"></div>
                    </div>

                    <div className="grid gap-6 w-full max-w-2xl px-4">
                        {[
                            { icon: 'discord', label: 'Discord', value: 'discord.gg/5zHfr4wE', url: 'https://discord.gg/5zHfr4wE' },
                            { icon: 'github', label: 'GitHub', value: 'github.com/Code-Monarch', url: 'https://github.com/Code-Monarch' },
                            { icon: 'instagram', label: 'Instagram', value: '@scripting_ninja', url: 'https://instagram.com/scripting_ninja' },
                            { icon: 'gmail', label: 'Email', value: 'calvinkaruga@gmail.com', url: 'mailto:calvinkaruga@gmail.com' },
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-6 p-6 bg-[var(--background)]/60 rounded-xl border border-[var(--foreground)]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--background)] hover:border-[var(--main-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] relative overflow-hidden"
                            >
                                <i className={`bx bxl-${item.icon} text-[var(--main-color)] text-3xl w-10 text-center drop-shadow-[0_0_10px_var(--main-color)]`}></i>
                                <div className="font-mono text-xl text-[var(--foreground)] tracking-wider">
                                    {item.label} ▸ <span className="text-[var(--main-color)] font-semibold ml-2">{item.value}</span>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="absolute bottom-8 text-xs md:text-sm text-[var(--foreground)]/60 tracking-[2px] font-mono animate-pulse">CLICK TO FLIP BACK</div>
                </div>
            </div>
        </div>
    );
}
