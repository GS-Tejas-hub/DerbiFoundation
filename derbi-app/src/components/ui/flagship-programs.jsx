import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const basePrograms = [
    {
        id: "pace",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800&h=1000",
        subtitle: "Pre-Incubation Program",
        title: "PACE",
        description: "PACE is a 3-4 months pre incubation program providing the right platform to nascent entrepreneurs. The program assists startups to develop ideas into a viable business model using the Stanford Bio Design methodology. PACE assists you to build a strong basement in your entrepreneurial thoughts and guide you in customer discovery.",
    },
    {
        id: "gallop",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=800&h=1000",
        subtitle: "Incubation Program",
        title: "GALLOP",
        description: "GALLOP is a 2-year incubation program designed to validate startup solutions, support product development, regulatory assistance & IP, provide go-to-market strategies, and offer one-on-one mentoring along with potential Seed Funds.",
    },
    {
        id: "emerge",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800&h=1000",
        subtitle: "Acceleration Program",
        title: "EMERGE",
        description: "EMERGE is one of DERBI's Flagship acceleration programs for late-stage healthcare startups. DERBI is launching its second cohort focused on DIGITAL HEALTH. EMERGE helps startups to validate/fine tune the product, scale-up strategies, generate revenue, and contrive customized clinics.",
    }
];

// Duplicate the array many times to create a massive draggable track, simulating infinite scroll
const flagshipPrograms = Array(15).fill(basePrograms).flat().map((p, i) => ({ ...p, uniqueId: `${p.id}-${i}` }));

export const FlagshipPrograms = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const [clickedId, setClickedId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    // activeId is uniquely tied to uniqueId
    const activeId = hoveredId !== null ? hoveredId : clickedId;

    // Motion values for smooth scrolling and dragging combined
    const x = useMotionValue(0);
    const smoothX = useSpring(x, { damping: 50, stiffness: 400 });

    useEffect(() => {
        const handleWheel = (e) => {
            // Hijack vertical scrolling and translate it horizontally across the gallery
            if (!trackRef.current || !containerRef.current) return;

            // Only hijacking if they hover the section gives better UX, 
            // but the user wants global scroll mapping "just like before"

            let delta = e.deltaY;
            // if we are scrolling completely horizontally via trackpad
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                delta = e.deltaX;
            }

            // Adjust multiplier for scroll speed
            let newX = x.get() - delta * 1.5;

            // Bounds logic to prevent scrolling out of the duplicated track
            const containerWidth = containerRef.current.offsetWidth;
            const trackWidth = trackRef.current.scrollWidth;
            const maxScroll = -(trackWidth - containerWidth + 200);

            if (newX > 0) newX = 0;
            if (newX < maxScroll) newX = maxScroll;

            x.set(newX);
        };

        const currentSection = sectionRef.current;
        if (currentSection) {
            // Apply wheel listener selectively to the section to mimic the WebGL canvas hijacking
            // If they want global, attach to window. Section is safer for UX.
            currentSection.addEventListener("wheel", handleWheel, { passive: false });
        }

        return () => {
            if (currentSection) currentSection.removeEventListener("wheel", handleWheel);
        };
    }, [x]);


    return (
        <section ref={sectionRef} className="relative w-full py-16 md:py-24 bg-[#f5f5f5] overflow-hidden select-none">

            {/* Section Header */}
            <motion.div
                className="text-center mb-16 md:mb-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-pitch-black">
                    {/* Saved original color: text-royal-gold */}
                    <span className="text-[#fb7232]">Flagship</span> Programs
                </h2>
            </motion.div>

            {/* Viewport for the track */}
            <motion.div
                ref={containerRef}
                className="relative w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing overflow-visible px-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <motion.div
                    ref={trackRef}
                    drag="x"
                    dragConstraints={containerRef}
                    style={{ x: smoothX }} // Apply our smooth spring X offset
                    onDrag={(e, info) => {
                        // Keep our explicit motion value synced with the Framer drag position
                        x.set(x.get() + info.delta.x);
                    }}
                    className="flex h-full gap-4 md:gap-6 w-max absolute top-0 left-0"
                >
                    {flagshipPrograms.map((prog) => {
                        const isExpanded = activeId === prog.uniqueId;
                        const anyExpanded = activeId !== null;

                        return (
                            <motion.div
                                key={prog.uniqueId}
                                layout
                                className="relative h-full flex-shrink-0 [perspective:1500px] origin-center"
                                initial={false}
                                animate={{
                                    // Base width is 300px on mobile, 350px on desktop
                                    // Expanded width is 360px on mobile, 800px on desktop
                                    width: isExpanded ? 'var(--expanded-width)' : 'var(--base-width)',
                                    opacity: anyExpanded && !isExpanded ? 0.3 : 1
                                }}
                                style={{
                                    '--base-width': 'clamp(280px, 30vw, 350px)',
                                    '--expanded-width': 'clamp(320px, 40vw, 440px)'
                                }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setHoveredId(prog.uniqueId)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => setClickedId(clickedId === prog.uniqueId ? null : prog.uniqueId)}
                            >
                                <motion.div
                                    className="w-full h-full relative [transform-style:preserve-3d]"
                                    initial={false}
                                    animate={{ rotateY: isExpanded ? -180 : 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* FRONT FACE */}
                                    <div className="absolute inset-0 rounded-2xl md:rounded-[32px] overflow-hidden [backface-visibility:hidden] bg-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-black/5 group">
                                        <img
                                            src={prog.image}
                                            alt={prog.title}
                                            className="object-cover w-full h-full opacity-90 transition-transform duration-[2000ms] group-hover:scale-110 pointer-events-none"
                                            draggable={false}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-pitch-black/90 via-pitch-black/20 to-transparent pointer-events-none" />

                                        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 pr-6 z-10 transition-transform duration-500 group-hover:-translate-y-2 pointer-events-none">
                                            <p className="text-white/80 font-medium text-xs md:text-sm tracking-widest uppercase mb-1">
                                                {prog.subtitle}
                                            </p>
                                            <h3 className="text-white text-3xl md:text-5xl font-black drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                                                {prog.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* BACK FACE */}
                                    <div
                                        className="absolute inset-0 rounded-2xl md:rounded-[32px] overflow-hidden bg-pitch-black [backface-visibility:hidden] shadow-[0_0_40px_rgba(255,255,255,0.06)] border border-white/10"
                                        style={{ transform: 'rotateY(-180deg)' }}
                                    >
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute -top-32 -right-32 w-[300px] h-[300px] bg-white/10 blur-[100px] rounded-full" />
                                            <div className="absolute -bottom-32 -left-32 w-[200px] h-[200px] bg-white/5 blur-[100px] rounded-full" />
                                            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                        </div>

                                        <div className="flex flex-col justify-center h-full p-6 md:p-14 relative z-10">
                                            <div className="mb-4 md:mb-6">
                                                {/* GLOWING GOLD TITLE as requested */}
                                                <h3 className="text-royal-gold text-3xl md:text-5xl font-black mb-1 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                                                    {prog.title}
                                                </h3>
                                                <h4 className="text-white/60 font-semibold text-xs md:text-sm uppercase tracking-wider">
                                                    {prog.subtitle}
                                                </h4>
                                            </div>

                                            {/* Text scales slightly for mobile to fit */}
                                            <p className="text-white/80 text-xs md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10 max-w-3xl">
                                                {prog.description}
                                            </p>

                                            <button className="flex items-center gap-2 text-white font-bold tracking-wide group/btn w-max border-b border-transparent hover:border-royal-gold hover:text-royal-gold transition-colors duration-300 pb-1 uppercase text-xs md:text-sm">
                                                Read More
                                                <span className="transition-transform duration-300 group-hover/btn:translate-x-2">→</span>
                                            </button>
                                        </div>
                                    </div>

                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

        </section>
    );
};
