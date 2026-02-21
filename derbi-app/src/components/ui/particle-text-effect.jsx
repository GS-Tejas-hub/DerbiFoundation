import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

class Particle {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.vel = { x: 0, y: 0 };
        this.acc = { x: 0, y: 0 };
        this.target = { x: 0, y: 0 };

        this.closeEnoughTarget = 100;
        this.maxSpeed = 1.0;
        this.maxForce = 0.1;
        this.particleSize = 10;
        this.isKilled = false;
        this.settled = false;

        this.startColor = { r: 0, g: 0, b: 0 };
        this.targetColor = { r: 0, g: 0, b: 0 };
        this.colorWeight = 0;
        this.colorBlendRate = 0.01;
        this.currentColorStr = null;
    }

    move() {
        // Check if particle has settled (very close to target and barely moving)
        const dx = this.target.x - this.pos.x;
        const dy = this.target.y - this.pos.y;
        const distSq = dx * dx + dy * dy;

        if (!this.isKilled && distSq < 2.25 && Math.abs(this.vel.x) < 0.1 && Math.abs(this.vel.y) < 0.1) {
            // Snap to target and stop - no jittering
            this.pos.x = this.target.x;
            this.pos.y = this.target.y;
            this.vel.x = 0;
            this.vel.y = 0;
            this.acc.x = 0;
            this.acc.y = 0;
            this.settled = true;
            return;
        }

        this.settled = false;

        let proximityMult = 1;
        const closeSq = this.closeEnoughTarget * this.closeEnoughTarget;
        if (distSq < closeSq) {
            proximityMult = Math.sqrt(distSq) / this.closeEnoughTarget;
        }

        const magnitude = Math.sqrt(distSq);
        let towardsTargetX = dx;
        let towardsTargetY = dy;

        if (magnitude > 0) {
            towardsTargetX = (dx / magnitude) * this.maxSpeed * proximityMult;
            towardsTargetY = (dy / magnitude) * this.maxSpeed * proximityMult;
        }

        let steerX = towardsTargetX - this.vel.x;
        let steerY = towardsTargetY - this.vel.y;

        const steerSq = steerX * steerX + steerY * steerY;
        const maxForceSq = this.maxForce * this.maxForce;

        if (steerSq > maxForceSq) {
            const steerMagnitude = Math.sqrt(steerSq);
            steerX = (steerX / steerMagnitude) * this.maxForce;
            steerY = (steerY / steerMagnitude) * this.maxForce;
        }

        this.acc.x += steerX;
        this.acc.y += steerY;
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.acc.x = 0;
        this.acc.y = 0;
    }

    draw(ctx) {
        if (this.colorWeight < 1.0) {
            this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);

            const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight);
            const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight);
            const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight);

            this.currentColorStr = `rgb(${r}, ${g}, ${b})`;
        } else if (!this.currentColorStr) {
            this.currentColorStr = `rgb(${this.targetColor.r}, ${this.targetColor.g}, ${this.targetColor.b})`;
        }

        ctx.fillStyle = this.currentColorStr;
        ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    }

    kill(width, height) {
        if (!this.isKilled) {
            this.settled = false;
            // Explode outward from center with high velocity
            const angle = Math.random() * Math.PI * 2;
            const explosionDist = (width + height) * 0.6;
            this.target.x = width / 2 + Math.cos(angle) * explosionDist;
            this.target.y = height / 2 + Math.sin(angle) * explosionDist;

            // Boost speed for explosive exit
            this.maxSpeed = Math.random() * 12 + 8;
            this.maxForce = this.maxSpeed * 0.15;

            this.startColor = {
                r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
                g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
                b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
            };
            this.targetColor = { r: 0, g: 0, b: 0 };
            this.colorWeight = 0;
            this.currentColorStr = null;

            this.isKilled = true;
        }
    }
}

function generateRandomPos(x, y, mag) {
    const angle = Math.random() * Math.PI * 2;
    return {
        x: x + Math.cos(angle) * mag,
        y: y + Math.sin(angle) * mag,
    };
}

export function ParticleTextEffect({ words, onSequenceComplete }) {
    const canvasRef = useRef(null);
    const animationRef = useRef();
    const particlesRef = useRef([]);
    const wordIndexRef = useRef(0);
    const phaseRef = useRef("forming"); // "forming" | "holding" | "destroying" | "exiting"
    const phaseStartRef = useRef(0);
    const currentColorRef = useRef(null);
    const stateRef = useRef({ words, onSequenceComplete });

    // Keep refs in sync
    stateRef.current = { words, onSequenceComplete };

    const getHoldDuration = (index) => {
        if (index === 0) return 1650;  // Hello (was 810)
        if (index === 1) return 1250;  // Welcome To (was 990)
        if (index === 2) return 1550;  // Derbi Foundations (was 1350)
        if (index === 3) return 920;   // Fueling Dreams (unchanged)
        if (index === 4) return 490;   // Fueling Dreams. (unchanged)
        if (index === 5) return 490;   // Fueling Dreams.. (unchanged)
        if (index === 6) return 700;   // Fueling Dreams... (unchanged)
        return 900;
    };

    const getDestroyDuration = (index, totalWords) => {
        // Fueling Dreams sub-steps don't need destroy animation
        const word = stateRef.current.words[index];
        const nextWord = index + 1 < totalWords ? stateRef.current.words[index + 1] : null;
        if (word && nextWord && word.startsWith("Fueling Dreams") && nextWord.startsWith("Fueling Dreams")) {
            return 0; // No destroy, just morph to next
        }
        if (index >= totalWords - 1) return 0; // Last word, no destroy needed
        return 350; // Quick explosive scatter
    };

    const formWord = (word, canvas) => {
        let localPixelSteps = 3;
        if (canvas.width < 768) localPixelSteps = 4;
        if (canvas.width < 480) localPixelSteps = 5;

        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;
        const offscreenCtx = offscreenCanvas.getContext("2d");

        // Big, bold, readable font - 2x size as requested
        let fontSize = 200;
        if (canvas.width < 768) fontSize = 110;
        if (canvas.width < 480) fontSize = 76;
        // Shrink for longer words
        if (word.length > 14) fontSize *= 0.65;
        else if (word.length > 10) fontSize *= 0.75;

        offscreenCtx.fillStyle = "white";
        offscreenCtx.font = `bold ${fontSize}px Arial`;
        offscreenCtx.textAlign = "center";
        offscreenCtx.textBaseline = "middle";
        offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2);

        const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Determine color: keep same color during Fueling Dreams dot sequence
        const isFueling = word.startsWith("Fueling Dreams");
        const prevWord = wordIndexRef.current > 0 ? stateRef.current.words[wordIndexRef.current - 1] : null;
        const wasFueling = prevWord && prevWord.startsWith("Fueling Dreams");

        let newColor;
        if (isFueling && wasFueling && currentColorRef.current) {
            newColor = currentColorRef.current; // Same color, just add dots
        } else {
            // Fresh random color for each new word
            newColor = {
                r: Math.floor(Math.random() * 200) + 55,
                g: Math.floor(Math.random() * 200) + 55,
                b: Math.floor(Math.random() * 200) + 55,
            };
            currentColorRef.current = newColor;
        }

        const particles = particlesRef.current;
        let particleIndex = 0;

        // Collect all target coordinates
        const coordsIndexes = [];
        for (let i = 0; i < pixels.length; i += localPixelSteps * 4) {
            coordsIndexes.push(i);
        }

        // Shuffle for organic formation
        for (let i = coordsIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]];
        }

        // Trim 8% of coordinates to reduce particle intensity
        const trimCount = Math.floor(coordsIndexes.length * 0.08);
        coordsIndexes.length = coordsIndexes.length - trimCount;

        // Boost particle speed for words after Hello and before Fueling Dreams
        const speedMultiplier = (wordIndexRef.current === 1 || wordIndexRef.current === 2) ? 1.5 : 1;

        for (const coordIndex of coordsIndexes) {
            const alpha = pixels[coordIndex + 3];
            if (alpha > 0) {
                const x = (coordIndex / 4) % canvas.width;
                const y = Math.floor(coordIndex / 4 / canvas.width);

                let particle;
                if (particleIndex < particles.length) {
                    particle = particles[particleIndex];
                    particle.isKilled = false;
                    particle.settled = false;
                    // Reset speed for formation (boosted for indices 1-2)
                    particle.maxSpeed = (Math.random() * 6 + 4) * speedMultiplier;
                    particle.maxForce = particle.maxSpeed * 0.10;
                    particleIndex++;
                } else {
                    particle = new Particle();
                    const rp = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2);
                    particle.pos.x = rp.x;
                    particle.pos.y = rp.y;
                    particle.maxSpeed = (Math.random() * 6 + 4) * speedMultiplier;
                    particle.maxForce = particle.maxSpeed * 0.15;
                    particle.particleSize = Math.random() * 6 + 6;
                    particle.colorBlendRate = Math.random() * 0.0275 + 0.0025;
                    particles.push(particle);
                }

                particle.startColor = {
                    r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
                    g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
                    b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
                };
                particle.targetColor = newColor;
                particle.colorWeight = 0;
                particle.currentColorStr = null;
                particle.target.x = x;
                particle.target.y = y;
            }
        }

        // Kill leftover particles that don't belong to this word
        for (let i = particleIndex; i < particles.length; i++) {
            particles[i].kill(canvas.width, canvas.height);
        }
    };

    const destroyAllParticles = (canvas) => {
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
            particles[i].kill(canvas.width, canvas.height);
        }
    };

    const animate = (timestamp) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const particles = particlesRef.current;
        const { words: currentWords, onSequenceComplete: onComplete } = stateRef.current;

        if (!phaseStartRef.current) phaseStartRef.current = timestamp;
        const phaseElapsed = timestamp - phaseStartRef.current;

        // Clear canvas fully so the video background shows through
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move and draw all particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.move();
            particle.draw(ctx);

            // Remove killed particles that have left the canvas
            if (particle.isKilled) {
                if (
                    particle.pos.x < -50 || particle.pos.x > canvas.width + 50 ||
                    particle.pos.y < -50 || particle.pos.y > canvas.height + 50
                ) {
                    particles[i] = particles[particles.length - 1];
                    particles.pop();
                }
            }
        }

        // Phase state machine
        const currentWordIdx = wordIndexRef.current;

        if (phaseRef.current === "forming") {
            // Check if most particles have settled without GC allocations (.filter)
            let aliveCount = 0;
            let settledCount = 0;
            for (let i = 0; i < particles.length; i++) {
                if (!particles[i].isKilled) {
                    aliveCount++;
                    if (particles[i].settled) settledCount++;
                }
            }
            const settledRatio = aliveCount > 0 ? settledCount / aliveCount : 0;

            // Once 95%+ settled AND minimum 540ms has passed, switch to holding
            if ((settledRatio > 0.95 && phaseElapsed > 540) || phaseElapsed > 1350) {
                phaseRef.current = "holding";
                phaseStartRef.current = timestamp;
            }
        } else if (phaseRef.current === "holding") {
            const holdDuration = getHoldDuration(currentWordIdx);
            if (phaseElapsed >= holdDuration) {
                const isLastWord = currentWordIdx >= currentWords.length - 1;

                if (isLastWord) {
                    // LAST WORD: enter exit phase — scatter particles while app reveals
                    phaseRef.current = "exiting";
                    phaseStartRef.current = timestamp;
                    destroyAllParticles(canvas);
                    // Signal splash screen to start fading NOW while particles scatter
                    if (onComplete) onComplete();
                } else {
                    const destroyDuration = getDestroyDuration(currentWordIdx, currentWords.length);
                    if (destroyDuration === 0) {
                        // No destroy phase, go directly to next word (for Fueling Dreams dots)
                        wordIndexRef.current++;
                        phaseRef.current = "forming";
                        phaseStartRef.current = timestamp;
                        formWord(currentWords[wordIndexRef.current], canvas);
                    } else {
                        // Destroy phase: explode all particles outward
                        phaseRef.current = "destroying";
                        phaseStartRef.current = timestamp;
                        destroyAllParticles(canvas);
                    }
                }
            }
        } else if (phaseRef.current === "destroying") {
            const destroyDuration = getDestroyDuration(currentWordIdx, currentWords.length);
            if (phaseElapsed >= destroyDuration) {
                wordIndexRef.current++;
                if (wordIndexRef.current < currentWords.length) {
                    phaseRef.current = "forming";
                    phaseStartRef.current = timestamp;
                    formWord(currentWords[wordIndexRef.current], canvas);
                } else {
                    // Last word — enter the exit phase
                    phaseRef.current = "exiting";
                    phaseStartRef.current = timestamp;
                    destroyAllParticles(canvas);
                    // Signal the splash screen to start fading NOW while particles scatter
                    if (onComplete) onComplete();
                }
            }
        } else if (phaseRef.current === "exiting") {
            // Keep animating particles flying outward for 1200ms
            // so the user sees them scatter while the app reveals behind
            if (phaseElapsed >= 1200 || particles.length === 0) {
                return; // Stop animation loop completely
            }
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", updateSize);
        updateSize();

        // Reset everything
        wordIndexRef.current = 0;
        particlesRef.current = [];
        phaseRef.current = "forming";
        phaseStartRef.current = 0;
        currentColorRef.current = null;

        formWord(words[0], canvas);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", updateSize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}

ParticleTextEffect.propTypes = {
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSequenceComplete: PropTypes.func
};
