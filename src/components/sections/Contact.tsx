'use client';

import React, { useState } from 'react';

export default function Contact() {
    const [isPending, setIsPending] = useState(false);
    const [state, setState] = useState({ success: false, message: '' });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsPending(true);
        setState({ success: false, message: '' });

        const formData = new FormData(e.currentTarget);
        const rawFormData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
        };

        const webhookUrl = 'https://discord.com/api/webhooks/1468598182622531585/tr-SE3PiylahVgUGs0fT0GYlG13fKWVtzEp6-xYVRKgzwcNlzalHmFrkoEv7QWU_11cM';

        const embed = {
            title: "📬 New Contact Form Submission (GitHub Pages)",
            color: 0x00ff41,
            fields: [
                { name: "Name", value: rawFormData.name || "N/A", inline: true },
                { name: "Email", value: rawFormData.email || "N/A", inline: true },
                { name: "Phone", value: rawFormData.phone || "N/A", inline: true },
                { name: "Message", value: rawFormData.message || "No message provided" },
            ],
            footer: {
                text: "Code Monarch Portfolio",
                icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
            },
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: "Portfolio Bot",
                    avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
                    embeds: [embed],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setState({ success: true, message: 'Message sent successfully!' });
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Submission error:', error);
            setState({ success: false, message: 'Failed to send message. Please try again.' });
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-12 max-w-7xl mx-auto items-stretch">
            {/* Vertical Header */}
            <div className="hidden lg:flex [writing-mode:vertical-rl] rotate-180 text-8xl font-extrabold tracking-tighter text-[var(--main-color)] opacity-90 uppercase items-center justify-center select-none">
                Contact Me
            </div>

            {/* Left Content */}
            <div className="flex flex-col gap-10">
                <div className="flex items-center gap-6">
                    <div className="w-1.5 h-24 bg-[var(--main-color)] rounded-full"></div>
                    <h2 className="text-5xl font-bold leading-tight text-[var(--foreground)]">
                        Have Any Work?<br />
                        Please Drop a Message
                    </h2>
                </div>

                <p className="text-xl text-[var(--foreground)] opacity-90 leading-relaxed max-w-md">
                    Get in touch and let me know how I can help. Fill out the form and I&apos;ll be in touch as soon as possible.
                </p>

                <div className="flex flex-col gap-8 mt-4">
                    <div className="flex items-start gap-5">
                        <span className="text-3xl text-[var(--main-color)] mt-1">📍</span>
                        <div className="text-lg text-[var(--foreground)]">
                            <strong className="block mb-1">Address:</strong>
                            P.O. Box 2508-60100, Embu.
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <span className="text-3xl text-[var(--main-color)] mt-1">📞</span>
                        <div className="text-lg text-[var(--foreground)]">
                            <strong className="block mb-1">Phone:</strong>
                            <a href="tel:+254746841767" className="hover:text-[var(--main-color)] transition-colors">+254 746 841 767</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <span className="text-3xl text-[var(--main-color)] mt-1">✉️</span>
                        <div className="text-lg text-[var(--foreground)]">
                            <strong className="block mb-1">Email:</strong>
                            <a href="mailto:calvinkaruga@gmail.com" className="hover:text-[var(--main-color)] transition-colors">calvinkaruga@gmail.com</a>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 mt-8">
                    <a href="https://instagram.com/scripting_ninja" target="_blank" rel="noopener noreferrer" className="text-3xl text-[var(--foreground)]/60 hover:text-[var(--main-color)] hover:-translate-y-1 transition-all"><i className='bx bxl-instagram'></i></a>
                    <a href="https://github.com/Code-Monarch" target="_blank" rel="noopener noreferrer" className="text-3xl text-[var(--main-color)] hover:-translate-y-1 transition-all"><i className='bx bxl-github'></i></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-3xl text-[var(--foreground)]/60 hover:text-[var(--main-color)] hover:-translate-y-1 transition-all"><i className='bx bxl-linkedin-square'></i></a>
                    <a href="https://discord.gg/5zHfr4wE" target="_blank" rel="noopener noreferrer" className="text-3xl text-[var(--foreground)]/60 hover:text-[var(--main-color)] hover:-translate-y-1 transition-all"><i className='bx bxl-discord-alt'></i></a>
                </div>
            </div>

            {/* Right Form Card */}
            <div className="backdrop-blur-[var(--glass-blur)] bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-3xl p-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[var(--foreground)]/70 font-medium ml-1">Name</label>
                        <input name="name" type="text" placeholder="e.g Calvin Karuga" className="w-full p-4 bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl text-[var(--foreground)] placeholder-gray-500 focus:border-[var(--main-color)] focus:shadow-[0_0_0_4px_rgba(0,255,65,0.1)] outline-none transition-all" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[var(--foreground)]/70 font-medium ml-1">Email</label>
                        <input name="email" type="email" placeholder="e.g calvinkaruga@gmail.com" className="w-full p-4 bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl text-[var(--foreground)] placeholder-gray-500 focus:border-[var(--main-color)] focus:shadow-[0_0_0_4px_rgba(0,255,65,0.1)] outline-none transition-all" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[var(--foreground)]/70 font-medium ml-1">Phone Number</label>
                        <input name="phone" type="tel" placeholder="+254 7XX XXX XXX" className="w-full p-4 bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl text-[var(--foreground)] placeholder-gray-500 focus:border-[var(--main-color)] focus:shadow-[0_0_0_4px_rgba(0,255,65,0.1)] outline-none transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[var(--foreground)]/70 font-medium ml-1">Message</label>
                        <textarea name="message" rows={5} placeholder="Hi Calvin, I have a project..." className="w-full p-4 bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl text-[var(--foreground)] placeholder-gray-500 focus:border-[var(--main-color)] focus:shadow-[0_0_0_4px_rgba(0,255,65,0.1)] outline-none resize-none transition-all" required></textarea>
                    </div>

                    {state.message && (
                        <div className={`p-4 rounded-xl text-center font-medium ${state.success ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                            {state.message}
                        </div>
                    )}

                    <button disabled={isPending} type="submit" className="w-full py-4 bg-[var(--main-color)] text-[var(--background)] rounded-xl text-lg font-bold uppercase tracking-wider shadow-lg hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:-translate-y-1 hover:shadow-[0_10px_25px_var(--main-color)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isPending ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
