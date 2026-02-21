import { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

const offerings = [
    { title: "Mentorship/Coaching", lottie: "/lottie/mentorship.json" },
    { title: "Workshops/Training Programs", lottie: "/lottie/training.json" },
    { title: "Anchor/One on one Mentoring", lottie: "/lottie/mentorship-2.json" },
    { title: "Connects to GTM, Hospitals, VCs", lottie: "/lottie/social-media.json" },
    { title: "Lab, R&D Support", lottie: "/lottie/management.json" },
    { title: "Design & Prototyping", lottie: "/lottie/project.json" },
    { title: "Funding", lottie: "/lottie/financial-freedom.json" },
    { title: "Clinical Trials", lottie: "/lottie/research.json" },
    { title: "Showcasing/Networking Opportunities", lottie: "/lottie/business-network.json" },
    { title: "Legal and Financial Advisory Support", lottie: "/lottie/management.json" },
];

const OfferingCard = ({ item, index, isInView }) => {
    const lottieRef = useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } }}
            onHoverStart={() => {
                if (lottieRef.current) {
                    lottieRef.current.play();
                }
            }}
            onHoverEnd={() => {
                if (lottieRef.current) {
                    lottieRef.current.stop();
                    // Optionally reset to 0, but since the first frame is buggy for the patched JSONs,
                    // we just stop it wherever the hover left off to ensure it stays visible.
                }
            }}
            className="group relative flex flex-col items-center justify-start p-6 md:p-8 rounded-2xl md:rounded-[24px] border border-black/5 bg-white hover:bg-pitch-black transition-colors duration-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(255,183,3,0.3)] hover:border-[#ffb703]/50"
        >
            {/* Top-down hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#ffb703]/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

            {/* Icon Container with continuous floating animation */}
            <motion.div
                className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-5 md:mb-6 rounded-full bg-neutral-100 group-hover:bg-[#ffb703]/20 transition-colors duration-200 border border-black/5 group-hover:border-[#ffb703]/60 z-10"
                animate={{
                    y: [0, -6, 0],
                }}
                transition={{
                    duration: 3 + (index * 0.2 % 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1
                }}
            >
                <div className="relative z-10 w-[75%] h-[75%] flex items-center justify-center">
                    <Player
                        ref={lottieRef}
                        loop
                        src={item.lottie}
                        onEvent={(event) => {
                            if (event === 'load') {
                                // The User's Fix: Explicitly simulate an initial hover to force
                                // the WebGL/Canvas to physically draw the SVG paths.
                                if (lottieRef.current) {
                                    lottieRef.current.play();
                                    setTimeout(() => {
                                        if (lottieRef.current) lottieRef.current.stop();
                                    }, 800); // Let it play just long enough to draw
                                }
                            }
                        }}
                        className="w-full h-full object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                        style={{ pointerEvents: 'none' }}
                    />
                </div>

                {/* Core inner glow that triggers on hover */}
                <div className="absolute inset-0 rounded-full bg-[#ffb703]/60 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
            </motion.div>

            {/* Title */}
            <h4 className="text-center font-bold text-pitch-black group-hover:text-white transition-colors duration-200 text-xs md:text-sm leading-relaxed tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10 relative">
                {item.title}
            </h4>

            {/* Bottom highlight bar */}
            <div className="absolute bottom-0 inset-x-0 h-[4px] bg-gradient-to-r from-transparent via-[#ffb703] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none" />
        </motion.div>
    );
};

OfferingCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        lottie: PropTypes.object.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    isInView: PropTypes.bool.isRequired,
};

export const OurOfferings = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-28 bg-white overflow-hidden select-none">
            {/* Minimalist ambient glow in the background to separate sections */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-royal-gold/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">

                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight">
                        {/* Saved original color: text-royal-gold */}
                        <span className="text-[#fb7232]">Our</span> <span className="text-pitch-black">Offerings</span>
                    </h2>
                    <p className="text-pitch-800/70 mt-4 text-sm md:text-base max-w-2xl mx-auto font-medium">
                        A comprehensive ecosystem designed to accelerate your startup&apos;s growth with crystal clear precision.
                    </p>
                </motion.div>

                {/* Offerings Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                    {offerings.map((item, index) => (
                        <OfferingCard key={item.title} item={item} index={index} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
};
