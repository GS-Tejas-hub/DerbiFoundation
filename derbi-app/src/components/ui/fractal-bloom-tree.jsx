"use client";

import { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

// Fractal Bloom Canvas Component adapted for production-ready bounded containers
export const FractalBloomTree = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const isVisibleRef = useRef(false);
    const depthRef = useRef(0); // Migrate currentDepth to a ref so the reset button can affect the render loop
    const [phase, setPhase] = useState('idle'); // 'idle' | 'pouring' | 'blooming'
    const phaseRef = useRef('idle');

    useEffect(() => {
        phaseRef.current = phase;
    }, [phase]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Use container dimensions so the animation fits responsively
        const mouse = { x: container.clientWidth / 2, y: container.clientHeight };
        depthRef.current = 0; // Initialize securely
        const maxDepth = 9;

        const resizeCanvas = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            // Recenter mouse on resize so it doesn't snap to origin visually
            mouse.x = canvas.width / 2;
            mouse.y = canvas.height;
        };

        const drawBranch = (x, y, angle, length, depth) => {
            if (depth > depthRef.current) return;

            ctx.beginPath();
            ctx.moveTo(x, y);

            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;

            ctx.lineTo(endX, endY);

            const opacity = 1 - (depth / maxDepth);
            // Adapted strictly to the website theme: Royal Gold lines instead of white
            // Royal Gold rgb is roughly rgb(212, 175, 55)
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.8})`;
            ctx.lineWidth = 1 - (depth / maxDepth) * 0.5;
            ctx.stroke();

            // Draw leaves at the end of branches as depth increases
            if (depth > maxDepth - 4 && depth <= depthRef.current) {
                // Leaf opacity increases as depth reaches maxDepth
                const leafOpacity = (depth - (maxDepth - 4)) / 4;
                ctx.beginPath();
                // Simple leaf shape using an ellipse
                ctx.ellipse(endX, endY, length * 0.4, length * 0.15, angle, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(212, 175, 55, ${leafOpacity * 0.6})`;
                ctx.fill();

                // Add a slight glow/highlight to the leaf
                ctx.beginPath();
                ctx.ellipse(endX, endY, length * 0.2, length * 0.08, angle, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(255, 223, 100, ${leafOpacity * 0.4})`;
                ctx.fill();
            }

            // Calculate mouse influence on branching angle precisely within the element bounds
            const distToMouse = Math.hypot(endX - mouse.x, endY - mouse.y);
            const mouseEffect = Math.max(0, 1 - distToMouse / (canvas.height / 2));
            const angleOffset = (Math.PI / 8) * mouseEffect;

            drawBranch(endX, endY, angle - (Math.PI / 10) - angleOffset, length * 0.8, depth + 1);
            drawBranch(endX, endY, angle + (Math.PI / 10) + angleOffset, length * 0.8, depth + 1);
        };

        const animate = () => {
            // Pitch black fading effect to match theme instead of the old slate background
            // Pitch Black rgb is roughly rgb(11, 11, 11)
            ctx.fillStyle = 'rgba(11, 11, 11, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const startX = canvas.width / 2;
            // Shift the starting point up by 25% to make room for the text at the bottom
            const startY = canvas.height * 0.90;
            const startLength = canvas.height / 5;

            drawBranch(startX, startY, -Math.PI / 2, startLength, 0);

            // Access visibility directly from the ref to avoid stale closures in requestAnimationFrame
            // The tree ONLY grows if the phase is strictly 'blooming'
            if (isVisibleRef.current && phaseRef.current === 'blooming' && depthRef.current < maxDepth) {
                depthRef.current += 0.03;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = canvas.width / 2;
            mouse.y = canvas.height;
        };

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Setup Intersection Observer so we only bloom when scrolled into view
        const observer = new IntersectionObserver(
            (entries) => {
                const isIntersecting = entries[0].isIntersecting;
                isVisibleRef.current = isIntersecting;

                // Trigger the watering can sequence on first intersection
                if (isIntersecting && phaseRef.current === 'idle') {
                    setPhase('pouring');
                    setTimeout(() => {
                        setPhase('blooming');
                    }, 2500); // Pour for 2.5 seconds, then bloom
                }
            },
            { threshold: 0.3 }
        );

        if (container) {
            observer.observe(container);
        }

        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            if (canvas) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (container) {
                observer.unobserve(container);
            }
        };
    }, []);

    const resetAnimation = () => {
        // Reset the mutable depth ref and trigger the watering sequence again
        depthRef.current = 0;
        setPhase('pouring');
        setTimeout(() => {
            setPhase('blooming');
        }, 2500);
    }

    return (
        <div ref={containerRef} className="relative w-full h-full rounded-[32px] overflow-hidden bg-pitch-black shadow-[0_10px_30px_rgba(212,175,55,0.08)] flex flex-col justify-end">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full cursor-crosshair" />
            <div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-transparent to-transparent z-10 pointer-events-none"></div>

            {/* Watering Can Animation Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none flex justify-center pb-[10%]">
                <motion.div
                    initial={{ opacity: 0, x: 80, y: -50 }}
                    animate={
                        phase === 'pouring'
                            ? { opacity: 1, x: 39, y: -0, transition: { duration: 0.8, ease: "easeOut" } }
                            : { opacity: 0, scale: 0.95, transition: { duration: 0.5 } }
                    }
                    className="absolute bottom-1/2 flex items-center justify-center transform-gpu"
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={phase === 'pouring' ? { rotate: -55 } : { rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]">
                            {/* Watering Can Body */}
                            <path d="M70 45H40C34.4772 45 30 49.4772 30 55V85C30 90.5228 34.4772 95 40 95H70C75.5228 95 80 90.5228 80 85V55C80 49.4772 75.5228 45 70 45Z" fill="#D4AF37" />
                            {/* Handle */}
                            <path d="M80 55C87 55 93 60 93 68C93 76 87 81 80 81" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" />
                            {/* Spout */}
                            <path d="M30 65L8 45" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" />
                            {/* Spout Mouth/Rose */}
                            <ellipse cx="6" cy="45" rx="4" ry="8" fill="#D4AF37" transform="rotate(-40 6 45)" />
                            <circle cx="30" cy="55" r="4" fill="#D4AF37" />
                            {/* Text "DERBI" - reduced size by another 10% */}
                            <text x="55" y="75" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#0B0B0B" textAnchor="middle">DERBI</text>
                        </svg>
                    </motion.div>

                    {/* Animated Water Stream / Drops (Unrotated, falling straight down to ground) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === 'pouring' ? 1 : 0 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        className="absolute"
                        style={{ left: "15px", top: "96px" }}
                    >
                        <motion.div
                            animate={phase === 'pouring' ? { y: [0, 160], opacity: [0, 1, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                            className="w-1 h-5 bg-cyan-300 rounded-full absolute left-0 blur-[1px]"
                        />
                        <motion.div
                            animate={phase === 'pouring' ? { y: [0, 180], opacity: [0, 1, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.7, delay: 0.2, ease: "linear" }}
                            className="w-1.5 h-4 bg-cyan-200 rounded-full absolute left-2 blur-[1px]"
                        />
                        <motion.div
                            animate={phase === 'pouring' ? { y: [0, 140], opacity: [0, 1, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.5, delay: 0.4, ease: "linear" }}
                            className="w-1 h-6 bg-cyan-100 rounded-full absolute left-4 blur-[1px]"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <button
                onClick={resetAnimation}
                className="absolute top-4 left-4 z-30 p-2 rounded-full bg-royal-gold/20 text-royal-gold hover:bg-royal-gold/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-royal-gold/60"
                aria-label="Reset Fractal Bloom Animation"
            >
                <RefreshCw size={20} />
            </button>

            <div className="relative z-20 pb-8 px-8 md:px-12 pointer-events-none text-center">
                <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    &quot;Every great startup begins as a seed. <br className="hidden sm:block" /> At Derbi startups don’t just launch, <span className="text-royal-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">they bloom</span>.&quot;
                </p>
            </div>
        </div>
    );
};
