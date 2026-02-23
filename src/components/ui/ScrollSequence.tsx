'use client';

import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollSequenceProps {
    images: string[];
}

export default function ScrollSequence({ images }: ScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll();

    const currentIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, images.length - 1]
    );

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            const promises = images.map((src) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            });

            try {
                const results = await Promise.all(promises);
                setLoadedImages(results);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load images', error);
                setIsLoading(false);
            }
        };

        loadImages();
    }, [images]);

    // Draw frame to canvas
    const renderFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx || loadedImages.length === 0) return;

            const img = loadedImages[Math.round(index)];
            if (!img) return;

            // Handle high DPI displays correctly
            const dpr = window.devicePixelRatio || 1;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            canvas.width = viewportWidth * dpr;
            canvas.height = viewportHeight * dpr;
            canvas.style.width = `${viewportWidth}px`;
            canvas.style.height = `${viewportHeight}px`;

            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, viewportWidth, viewportHeight);

            // "Cover" logic — use viewport dimensions (not canvas.width which includes DPR)
            const scale = Math.max(viewportWidth / img.width, viewportHeight / img.height);

            const drawWidth = img.width * scale;
            const drawHeight = img.height * scale;

            const offsetX = (viewportWidth - drawWidth) / 2;
            const offsetY = (viewportHeight - drawHeight) / 2;

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        },
        [loadedImages]
    );

    useEffect(() => {
        if (!isLoading && loadedImages.length > 0) {
            renderFrame(0);
        }
    }, [isLoading, loadedImages, renderFrame]);

    useMotionValueEvent(currentIndex, 'change', (latest) => {
        renderFrame(latest);
    });

    useEffect(() => {
        const handleResize = () => renderFrame(currentIndex.get());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [renderFrame, currentIndex]);

    return (
        <div className="fixed inset-0 w-full h-full z-0 bg-[#050505] pointer-events-none">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
