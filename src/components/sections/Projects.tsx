'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Projects.module.css';

const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? '/portfolio' : '';

const projects = [
    { title: "AI Security Analyzer", desc: "Analyzes system vulnerabilities using AI.", stack: "Python, TensorFlow", link: "#", image: `${base}/img/projects/ai_sec.jpg` },
    { title: "Network Visualizer", desc: "3D real-time network mapping.", stack: "Three.js, Node", link: "#", image: `${base}/img/projects/net_vis.jpg` },
    { title: "Encryption Dashboard", desc: "Secure data encryption interface.", stack: "React, CryptoJS", link: "#", image: `${base}/img/projects/enc_dash.jpg` },
    { title: "Packet Monitor", desc: "Real-time packet tracking tool.", stack: "Python, Scapy", link: "#", image: `${base}/img/projects/packet_mon.jpg` },
    { title: "Secure Chat App", desc: "End-to-end encrypted messaging.", stack: "Socket.io, Node", link: "#", image: `${base}/img/projects/chat_app.jpg` },
    { title: "Auth System", desc: "Multi-layer authentication engine.", stack: "Next.js, JWT", link: "#", image: `${base}/img/projects/auth_sys.jpg` },
    { title: "Malware Detector", desc: "Detects suspicious software behavior.", stack: "Python", link: "#", image: `${base}/img/projects/malware_det.jpg` },
    { title: "Threat Dashboard", desc: "Live cyber threat analytics.", stack: "Vue, D3.js", link: "#", image: `${base}/img/projects/threat_dash.jpg` },
    { title: "Password Vault", desc: "Encrypted credential storage.", stack: "Electron, SQLite", link: "#", image: `${base}/img/projects/pass_vault.JPG` },
    { title: "Log Analyzer", desc: "Server log anomaly detection.", stack: "Python", link: "#", image: `${base}/img/projects/landing.jpg` },
];

const others = [
    { title: "Portfolio Site", desc: "Personal portfolio.", stack: "Next.js", link: "#", image: `${base}/img/projects/portfolio.jpg` },
    { title: "Landing Page", desc: "Modern UI landing page.", stack: "HTML, CSS", link: "#", image: `${base}/img/projects/landing.JPG` },
    { title: "Task Manager", desc: "Track daily work.", stack: "React", link: "#", image: `${base}/img/projects/task_mgr.jpg` },
];

/**
 * Returns the translateZ radius in px based on current viewport width.
 *
 * For N=10 cards the formula for a given gap G between adjacent cards is:
 *   r = (cardWidth / 2 + G) / sin(π / N)
 *   sin(π/10) = sin(18°) ≈ 0.309
 *
 * Card sizes (from CSS breakpoints):
 *   ≥1100px → 220px card  →  r = (110 + 40) / 0.309 ≈ 485  → use 490
 *   768–1100 → 190px card →  r = (95  + 36) / 0.309 ≈ 424  → use 430
 *   480–768  → 160px card →  r = (80  + 32) / 0.309 ≈ 362  → use 370
 *   <480     → 140px card →  r = (70  + 28) / 0.309 ≈ 317  → use 325
 */
function getRadius(): number {
    const w = window.innerWidth;
    if (w < 480) return 325;
    if (w < 768) return 370;
    if (w < 1100) return 430;
    return 490;
}

const AUTO_SPIN = 0.22;   // degrees per frame when idle (~13°/s at 60 fps)
const FRICTION = 0.94;   // velocity decay multiplier on release
const DRAG_SENSITIVITY = 0.4; // swipe px → degrees

export default function Projects() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const rotationRef = useRef(0);       // current Y rotation in degrees
    const velocityRef = useRef(0);       // momentum after drag release
    const isDraggingRef = useRef(false);
    const lastXRef = useRef(0);       // last pointer/touch X position
    const rafRef = useRef<number | null>(null);
    const radiusRef = useRef(400);

    /** Main animation loop — JS-driven, replaces CSS animation */
    const animate = useCallback(() => {
        if (!isDraggingRef.current) {
            if (Math.abs(velocityRef.current) > 0.05) {
                // Coast with momentum after release
                rotationRef.current += velocityRef.current;
                velocityRef.current *= FRICTION;
            } else {
                // Auto-spin
                velocityRef.current = 0;
                rotationRef.current += AUTO_SPIN;
            }
        }

        if (carouselRef.current) {
            carouselRef.current.style.transform =
                `translate(-50%, -50%) rotateX(-10deg) rotateY(${rotationRef.current}deg)`;
        }

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    // Update card translateZ values on resize
    const updateRadius = useCallback(() => {
        radiusRef.current = getRadius();
        if (!carouselRef.current) return;
        const cards = carouselRef.current.querySelectorAll<HTMLDivElement>('[data-angle]');
        cards.forEach((card) => {
            const angle = card.dataset.angle ?? '0';
            card.style.transform = `rotateY(${angle}deg) translateZ(${radiusRef.current}px)`;
        });
    }, []);

    useEffect(() => {
        radiusRef.current = getRadius();
        rafRef.current = requestAnimationFrame(animate);

        window.addEventListener('resize', updateRadius);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', updateRadius);
        };
    }, [animate, updateRadius]);

    /* ── Pointer events (covers mouse + touch via pointer events API) ── */
    const onPointerDown = (e: React.PointerEvent) => {
        isDraggingRef.current = true;
        velocityRef.current = 0;
        lastXRef.current = e.clientX;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDraggingRef.current) return;
        const dx = e.clientX - lastXRef.current;
        velocityRef.current = dx * DRAG_SENSITIVITY;   // keep last velocity for momentum
        rotationRef.current += dx * DRAG_SENSITIVITY;
        lastXRef.current = e.clientX;
    };

    const onPointerUp = () => {
        isDraggingRef.current = false;
        // velocityRef keeps its last value → momentum coast kicks in
    };

    const quantity = projects.length;

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h1 className="text-gradient">TOP PROJECTS</h1>
                <p className={styles.dragHint}>
                    <i className='bx bx-hand-left'></i> Drag or swipe to spin
                </p>
            </div>

            {/* ===== 3D Carousel — all screen sizes ===== */}
            <div className={styles.carouselContainer}>
                <div
                    ref={carouselRef}
                    className={styles.carousel}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
                >
                    {projects.map((p, i) => {
                        const angle = (360 / quantity) * i;
                        return (
                            <div
                                key={i}
                                className={styles.card}
                                data-angle={angle}
                                style={{ transform: `rotateY(${angle}deg) translateZ(${radiusRef.current}px)` }}
                            >
                                <div className={styles.imageContainer}>
                                    <img src={p.image} alt={p.title} className={styles.projectImage} draggable={false} />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3>{p.title}</h3>
                                    <p>{p.desc}</p>
                                    <p className={styles.stack}>{p.stack}</p>
                                    <a
                                        href={p.link}
                                        className={styles.projectLink}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        View Project
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ===== Other Projects grid ===== */}
            <div className={styles.bottomProjects}>
                <div className={styles.noteBlock}>
                    <h2>Other Projects</h2>
                    <p>Additional experimental and support tools developed alongside major projects.</p>
                </div>

                <div className={styles.grid}>
                    {others.map((p, i) => (
                        <div key={i} className={styles.gridCard}>
                            <div className={styles.gridImageContainer}>
                                <img src={p.image} alt={p.title} className={styles.projectImage} />
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                            <p className={styles.stack}>{p.stack}</p>
                            <a href={p.link} className={styles.projectLink}>View Project</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
