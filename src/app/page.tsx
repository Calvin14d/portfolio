'use client';

import ScrollSequence from '@/components/ui/ScrollSequence';
import MatrixRain from '@/components/ui/MatrixRain';
import Particles from '@/components/ui/Particles';
import Navbar from '@/components/layout/Navbar';
import AboutCard from '@/components/sections/AboutCard';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { useTheme } from 'next-themes';

// Generate the 51 image paths for Dark Mode
const darkFrameCount = 51;
const darkImages = Array.from({ length: darkFrameCount }, (_, i) => {
  const index = i + 1;
  const id = index.toString().padStart(3, '0');
  return `/dark_animated_laptop/ezgif-frame-${id}.jpg`;
});

// Generate the 51 image paths for Light Mode
const lightFrameCount = 51;
const lightImages = Array.from({ length: lightFrameCount }, (_, i) => {
  const index = i + 1;
  const id = index.toString().padStart(3, '0');
  return `/light_animated_laptop/ezgif-frame-${id}.jpg`;
});

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const el = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Choose images based on theme (default to dark if not mounted or undefined)
  const currentImages = (mounted && resolvedTheme === 'light') ? lightImages : darkImages;

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Cybersecurity Engineer",
        "Front-end developer",
        "Back-end developer",
        "Vulnerability Analyst",
        "Threat Hunter",
      ],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 1200,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen font-sans antialiased overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">

      {/* Visual Background Layers */}
      <div className="fixed inset-0 z-0 opacity-40">
        <ScrollSequence images={currentImages} />
      </div>

      <div className="fixed inset-0 z-[5]">
        <Particles />
      </div>

      <div className="fixed inset-0 z-[10] opacity-20 pointer-events-none">
        <MatrixRain />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Content Overlay */}
      <div className="relative z-20 w-full">

        {/* Section 1: Hero */}
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-[9%] gap-20 pt-32">

          {/* Content */}
          <div className="flex-1 max-w-2xl">
            <h3 className="text-4xl font-bold mb-4">Welcome</h3>
            <h1 className="text-7xl font-bold leading-tight mb-4 text-gradient">
              Code Monarch
            </h1>
            <h3 className="text-4xl font-bold mb-8">
              I&apos;m a <span ref={el} className="text-[var(--main-color)]"></span>
            </h3>

            <p className="text-xl leading-relaxed mb-12 text-[var(--foreground)] opacity-90">
              Learning and staying ahead of evolving cyber threats.
              Feel free to explore my work, connect, and let&apos;s discuss
              how we can secure the digital world together!
            </p>

            <div className="flex gap-6 mb-12">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center border-2 border-[var(--main-color)] rounded-full text-[var(--main-color)] text-3xl transition-all duration-300 hover:bg-[var(--main-color)] hover:text-[var(--background)] hover:shadow-[0_0_20px_var(--main-color)] hover:-translate-y-2">
                <i className='bx bxl-linkedin-square'></i>
              </a>
              <a href="https://github.com/Code-Monarch" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center border-2 border-[var(--main-color)] rounded-full text-[var(--main-color)] text-3xl transition-all duration-300 hover:bg-[var(--main-color)] hover:text-[var(--background)] hover:shadow-[0_0_20px_var(--main-color)] hover:-translate-y-2">
                <i className='bx bxl-github'></i>
              </a>
              <a href="mailto:calvinkaruga@gmail.com" className="w-16 h-16 flex items-center justify-center border-2 border-[var(--main-color)] rounded-full text-[var(--main-color)] text-3xl transition-all duration-300 hover:bg-[var(--main-color)] hover:text-[var(--background)] hover:shadow-[0_0_20px_var(--main-color)] hover:-translate-y-2">
                <i className='bx bx-mail-send'></i>
              </a>
              <a href="tel:+254746841767" className="w-16 h-16 flex items-center justify-center border-2 border-[var(--main-color)] rounded-full text-[var(--main-color)] text-3xl transition-all duration-300 hover:bg-[var(--main-color)] hover:text-[var(--background)] hover:shadow-[0_0_20px_var(--main-color)] hover:-translate-y-2">
                <i className='bx bxs-phone'></i>
              </a>
            </div>

            <a href="/resume.pdf" download className="inline-block px-12 py-4 bg-[var(--main-color)] text-[var(--background)] border-2 border-[var(--main-color)] rounded-full text-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_var(--main-color)]">
              Resume
            </a>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-[25vw] h-[30vw] min-w-[220px] min-h-[220px] bg-[var(--second-bg-color)]/50 overflow-hidden relative animate-morph border-4 border-[var(--main-color)] flex items-center justify-center">
              <img
                src="/profile_photo/profile_photo.png"
                alt="Code Monarch Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </section>

        <section id="skills" className="py-24 px-[9%] min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-6xl font-bold text-center mb-24">
            My <span className="text-[var(--main-color)]">Skills</span>
          </h2>
          <Skills />
        </section>

        {/* Section 2: Projects - Split Grid to reveal center */}
        <section id="projects" className="py-24 px-[9%] min-h-screen">
          <Projects />
        </section>

        {/* Section 3: About */}
        <section id="about" className="py-24 px-4 md:px-[9%] text-center relative flex items-center justify-center min-h-screen lg:min-h-[1000px]">
          <AboutCard />
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="py-24 px-[9%] pb-40">
          <Contact />
        </section>

        <footer className="relative w-full py-6 text-center text-xl text-[var(--foreground)]/70 bg-[var(--second-bg-color)] z-50 border-t border-[var(--main-color)]">
          &copy; 2024 CODE MONARCH. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
