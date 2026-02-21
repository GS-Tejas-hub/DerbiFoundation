import React, { useState, useEffect } from 'react';
import { ParticleTextEffect } from './ui/particle-text-effect';

const SplashScreen = ({ onComplete }) => {
    const [isReadyToFade, setIsReadyToFade] = useState(false);

    // The animation sequence requested:
    const words = ["Hello", "Welcome To", "Derbi Foundations", "Fueling Dreams", "Fueling Dreams.", "Fueling Dreams..", "Fueling Dreams..."];

    const handleSequenceComplete = () => {
        // Start fade out process
        setIsReadyToFade(true);

        // After fade out transition (1000ms), unmount the component
        setTimeout(() => {
            onComplete();
        }, 1000);
    };

    return (
        <div
            className={`fixed inset-0 z-[100] bg-pitch-black flex items-center justify-center transition-opacity duration-1000 ease-in-out ${isReadyToFade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* Video temporarily disabled to test pitch black background */}
            {/*
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/Videos/speed_meteor_remix.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-neutral-900/65"></div>
            </div>
            */}

            <ParticleTextEffect
                words={words}
                onSequenceComplete={handleSequenceComplete}
            />
        </div>
    );
};

export default SplashScreen;
