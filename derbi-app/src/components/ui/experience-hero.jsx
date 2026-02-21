import React, { useEffect, useRef } from 'react';

export const ExperienceHero = () => {
    const viewerContainerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        // Upgrading to latest to fix Spline console warning regarding older runtime versions
        script.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js';
        document.head.appendChild(script);

        script.onload = () => {
            const viewer = viewerContainerRef.current?.querySelector('spline-viewer');

            // 1. Existing logic: Strip the spline logo repeatedly during initialization
            const hideLogoInterval = setInterval(() => {
                if (viewer?.shadowRoot) {
                    const shadow = viewer.shadowRoot;
                    let found = false;

                    const selectors = ['#logo', 'a[href*="spline"]', '[class*="logo"]', '[id*="logo"]'];
                    selectors.forEach(sel => {
                        shadow.querySelectorAll(sel).forEach(el => {
                            el.remove();
                            found = true;
                        });
                    });

                    if (!shadow.querySelector('#hide-spline-badge')) {
                        const style = document.createElement('style');
                        style.id = 'hide-spline-badge';
                        style.textContent = `
                            #logo, a[href*="spline"], [class*="logo"], [id*="logo"] {
                                display: none !important; margin: 0 !important; padding: 0 !important;
                                visibility: hidden !important; opacity: 0 !important;
                                width: 0 !important; height: 0 !important; max-width: 0 !important;
                            }
                        `;
                        shadow.appendChild(style);
                        found = true;
                    }

                    if (found) clearInterval(hideLogoInterval);
                }
            }, 300);

            setTimeout(() => clearInterval(hideLogoInterval), 15000);

            // 2. High-Quality Interactivity Demo: Programmatically pan the 3D physics engine via synthetic pointer events
            // We use polling to ensure the WebGL canvas is physically ready to receive events, as the load event can be unreliable.
            const startAutomationLoop = async () => {
                const viewer = viewerContainerRef.current?.querySelector('spline-viewer');
                if (!viewer) return;

                // Wait until the canvas is actually inserted into the shadow DOM
                let canvas = null;
                while (!canvas) {
                    canvas = viewer.shadowRoot?.querySelector('canvas');
                    if (!canvas) await new Promise(r => setTimeout(r, 200));
                }

                // Robust Timestamp-Based Polling System
                // WebGL engines dynamically halt event propagation randomly.
                // A timestamp-based system strictly guarantees a 5-second grace period effortlessly.
                let lastInteractionTime = 0;
                let isAutomationRunning = false;
                let automationTimeout = null;
                let isPointerInsideSpline = false; // Strictly track if human cursor is within the Spline boundary

                const isHumanOverriding = () => {
                    // Two conditions: Either they are actively inside it, or they just left less than 5s ago
                    return isPointerInsideSpline || (Date.now() - lastInteractionTime) < 5000;
                };

                // A precise mathematical easing function to synthesize a human-like HOVER motion
                const simulateSmoothHover = (startX, startY, endX, endY, duration = 1200) => {
                    return new Promise(resolve => {
                        if (isHumanOverriding()) {
                            resolve(); // Abort immediately if user takes over
                            return;
                        }

                        const rect = canvas.getBoundingClientRect();
                        const sx = rect.left + rect.width * startX;
                        const sy = rect.top + rect.height * startY;
                        const ex = rect.left + rect.width * endX;
                        const ey = rect.top + rect.height * endY;

                        // Essential Fix: Spline raycasting for hover states relies on pure movement.
                        // However, WebGL raycasters go to "sleep" when a hardware cursor leaves the screen (pointerleave).
                        // To wake it up, we MUST simulate a full pointer lifecycle.
                        const dispatch = (type, x, y) => {
                            const eventConfig = {
                                clientX: x, clientY: y,
                                bubbles: type !== 'pointerenter' && type !== 'pointerleave', // Enter/Leave strictly don't bubble
                                cancelable: true,
                                pointerId: 999, // Unique ID so it doesn't conflict with any cached hardware IDs
                                isPrimary: true, pointerType: 'mouse'
                            };

                            const pointerEvent = new PointerEvent(type, eventConfig);
                            canvas.dispatchEvent(pointerEvent);

                            // Send mouse equivalents just in case
                            if (type === 'pointermove') {
                                canvas.dispatchEvent(new MouseEvent('mousemove', eventConfig));
                                window.dispatchEvent(pointerEvent);
                                window.dispatchEvent(new MouseEvent('mousemove', eventConfig));
                            }
                        };

                        let startTime = null;
                        const step = (timestamp) => {
                            if (isHumanOverriding()) {
                                resolve(); // Abort instantly upon human touching the DOM
                                return;
                            }

                            if (!startTime) {
                                startTime = timestamp;
                                // WAKE UP the raycaster on the very first frame!
                                dispatch('pointerover', sx, sy);
                                dispatch('pointerenter', sx, sy);
                            }

                            const progress = Math.min((timestamp - startTime) / duration, 1);

                            // easeInOutCubic for a highly realistic, smooth glide
                            const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                            const curX = sx + (ex - sx) * ease;
                            const curY = sy + (ey - sy) * ease;

                            dispatch('pointermove', curX, curY);

                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                // Put the raycaster back to sleep at the end of the motion
                                dispatch('pointerout', ex, ey);
                                dispatch('pointerleave', ex, ey);
                                resolve();
                            }
                        };
                        requestAnimationFrame(step);
                    });
                };

                const scheduleNextAutomation = () => {
                    clearTimeout(automationTimeout);
                    automationTimeout = setTimeout(() => {
                        runAutomationSequence();
                    }, 1000); // Check every second instead of waiting blindly
                };

                const runAutomationSequence = async () => {
                    if (isAutomationRunning) return;

                    if (isHumanOverriding()) {
                        scheduleNextAutomation();
                        return;
                    }

                    isAutomationRunning = true;

                    // 1. Simulate a pure HOVER swept from Left to Right (Horizontal Sweep)
                    await simulateSmoothHover(0.2, 0.5, 0.8, 0.5, 1800);

                    if (!isHumanOverriding()) {
                        // Small natural human pause
                        await new Promise(r => setTimeout(r, 600));

                        if (!isHumanOverriding()) {
                            // 2. Simulate a pure HOVER swept from Bottom to Top (Vertical Sweep)
                            await simulateSmoothHover(0.5, 0.8, 0.5, 0.2, 1800);
                        }
                    }

                    isAutomationRunning = false;
                    scheduleNextAutomation();
                };

                // Strict boundary enforcement: We only care if the user touches the ACTUAL Spline canvas
                const logHumanData = (e) => {
                    if (!e.isTrusted) return; // Ignore our automated synthetic scripts!

                    // The nanosecond a human causes an event inside the 3D element, record the time
                    lastInteractionTime = Date.now();
                };

                // Track if the human is physically hovering over the 3D model boundary area
                viewer.addEventListener('pointerenter', (e) => {
                    if (!e.isTrusted) return;
                    isPointerInsideSpline = true;
                    logHumanData(e);
                }, { capture: true });

                viewer.addEventListener('pointerleave', (e) => {
                    if (!e.isTrusted) return;
                    isPointerInsideSpline = false;
                    logHumanData(e); // Log their departure time so the 5s grace period starts precisely now
                }, { capture: true });

                // Bind strictly to the viewer (not the global window) to outwit Spline's internal event suppressors, 
                // while ensuring a user reading text on the left screen isn't interrupted.
                viewer.addEventListener('pointermove', logHumanData, { capture: true });
                viewer.addEventListener('pointerdown', logHumanData, { capture: true });
                viewer.addEventListener('wheel', logHumanData, { capture: true, passive: true });
                viewer.addEventListener('touchstart', (e) => {
                    if (!e.isTrusted) return;
                    isPointerInsideSpline = true; // Touch implicitly means they are inside
                    logHumanData(e);
                }, { capture: true, passive: true });

                viewer.addEventListener('touchend', (e) => {
                    if (!e.isTrusted) return;
                    isPointerInsideSpline = false;
                    logHumanData(e);
                }, { capture: true, passive: true });

                // --- VITAL: Wait for the Splash Screen to finish before starting ---
                // The App.jsx strictly controls document.body.style.overflow = 'hidden' during the sequence
                const waitForAppEntry = () => {
                    return new Promise(resolve => {
                        const check = () => {
                            // First, ensure the body actually has no overflow restrictions
                            if (document.body.style.overflow !== 'hidden' && document.body.style.overflow !== 'clip') {
                                resolve();
                            } else {
                                setTimeout(check, 500); // Poll every 500ms
                            }
                        };
                        check();
                    });
                };

                // 1. Wait for user to actually enter the app completely
                await waitForAppEntry();

                // 2. Give the UI 1.5 seconds to breathe before pulling their attention to the 3D model
                await new Promise(r => setTimeout(r, 1500));

                // 3. Kickoff the first animation!
                if (!isHumanOverriding()) {
                    runAutomationSequence();
                }
            };

            // Start the initialization sequence
            startAutomationLoop();
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <section className="relative w-full flex flex-col overflow-hidden z-10">
            <div className="relative z-10 w-full flex flex-col md:flex-row p-8 md:p-14 lg:p-20 min-h-[calc(100vh-80px)] items-center md:items-stretch gap-10">
                {/* Left Side: Typography */}
                <div className="flex-1 min-w-0 flex flex-col justify-center pb-12 md:pb-8 w-full relative z-50 pointer-events-none">
                    <div className="max-w-4xl lg:-translate-y-8 pr-12 relative">
                        <div className="absolute top-1/2 left-1/4 w-[300px] h-[150px] bg-royal-gold/20 blur-[60px] rounded-[100%] mix-blend-screen translate-y-12"></div>

                        <h1 className="relative z-50 text-[clamp(2.1rem,5.7vw,6.9rem)] font-black leading-[1.25] tracking-tighter text-white uppercase italic-none">
                            Transforming <br /> Ideas Into <br />
                            <span className="text-transparent text-transparent [-webkit-text-stroke:2px_black] lg:[-webkit-text-stroke:3px_black] bg-clip-text bg-gradient-to-tr from-soft-gold via-royal-gold to-soft-gold [-webkit-text-stroke:2px_rgba(212,175,55,0.8)] lg:[-webkit-text-stroke:3px_rgba(212,175,55,0.8)] filter drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                                Scalable Venture
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Right Side: Spline 3D Animation */}
                <div
                    ref={viewerContainerRef}
                    className="w-full md:w-[45%] lg:w-1/2 flex-shrink-0 absolute md:relative right-0 top-0 h-full min-h-[400px] md:min-h-[500px] z-0 opacity-40 md:opacity-100"
                >
                    <spline-viewer
                        url="https://prod.spline.design/kaUUxdnwcoDAd8y4/scene.splinecode"
                        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                    />
                </div>
            </div>
        </section>
    );
};
