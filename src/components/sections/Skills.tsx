'use client';

import React from 'react';
import styles from './Skills.module.css';

export default function Skills() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className={styles.dashboard}>
                <div className={styles.tile} data-terminal=">>> Python ready">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                    <span>Python</span>
                </div>
                <div className={styles.tile} data-terminal=">>> Nmap scanning">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nmap/nmap-original.svg" alt="Nmap" />
                    <span>Nmap</span>
                </div>
                <div className={styles.tile} data-terminal=">>> EvilLimiter loaded">
                    {/* Using a fallback for EvilLimiter as the wikipedia SVG might not be ideal or exists, using the provided one */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/EvilLim.svg" alt="EvilLimiter" />
                    <span>EvilLimiter</span>
                </div>
                <div className={styles.tile} data-terminal=">>> Wireshark sniffing">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Wireshark_logo.svg" alt="Wireshark" />
                    <span>Wireshark</span>
                </div>
                <div className={styles.tile} data-terminal=">>> C/C++ compiling">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C/C++" />
                    <span>C / C++</span>
                </div>
                <div className={styles.tile} data-terminal=">>> HTML loaded">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" />
                    <span>HTML</span>
                </div>
                <div className={styles.tile} data-terminal=">>> CSS styled">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" />
                    <span>CSS</span>
                </div>
                <div className={styles.tile} data-terminal=">>> React ready">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                    <span>React</span>
                </div>
            </div>
        </div>
    );
}
