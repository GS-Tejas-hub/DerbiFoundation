import React, { useEffect, useRef, useState } from 'react';

export const CursorGlow = () => {
    const glowRef = useRef(null);
    const trailRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let trailX = 0;
        let trailY = 0;
        let animFrame;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!visible) setVisible(true);
        };

        const handleMouseLeave = () => {
            setVisible(false);
        };

        const animate = () => {
            // Main glow follows tightly
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;

            // Trail follows with more lag
            trailX += (mouseX - trailX) * 0.08;
            trailY += (mouseY - trailY) * 0.08;

            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            }
            if (trailRef.current) {
                trailRef.current.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
            }

            animFrame = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        animFrame = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animFrame);
        };
    }, [visible]);

    return (
        <>
            {/* Main golden glow - follows cursor closely */}
            <div
                ref={glowRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 35%, transparent 70%)',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    willChange: 'transform',
                }}
            />
            {/* Trailing outer ring - follows with delay for depth */}
            <div
                ref={trailRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, rgba(245,208,97,0.02) 40%, transparent 65%)',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    willChange: 'transform',
                }}
            />
        </>
    );
};
