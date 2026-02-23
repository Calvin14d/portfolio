'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Portfolio' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-[9%] py-8 flex justify-between items-center transition-all duration-300 bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] text-[var(--foreground)] border-b border-[var(--glass-border)]">
            <Link href="#home" className="text-3xl font-extrabold cursor-pointer text-gradient">
                Code Monarch
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-xl font-medium ml-16 transition-all duration-300 hover:text-[var(--main-color)] border-b-2 border-transparent hover:border-[var(--main-color)]">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Desktop CTA + Theme */}
            <div className="hidden md:flex items-center">
                <Link href="#contact" className="inline-block px-12 py-4 bg-transparent text-[var(--main-color)] border-2 border-[var(--main-color)] rounded-full text-xl font-semibold transition-all duration-300 hover:bg-[var(--main-color)] hover:text-[var(--background)] hover:shadow-[0_0_20px_var(--main-color)] hover:scale-105">
                    Contact
                </Link>
                <ThemeToggle />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center md:hidden gap-4">
                <ThemeToggle />
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-4xl text-[var(--main-color)] cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] border-b border-[var(--glass-border)] flex flex-col items-center py-6 gap-6 md:hidden z-50">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-medium transition-all duration-300 hover:text-[var(--main-color)]"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-10 py-3 bg-[var(--main-color)] text-[var(--background)] rounded-full text-xl font-semibold"
                    >
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
}
