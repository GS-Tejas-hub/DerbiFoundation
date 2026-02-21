import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Building2,
    Award,
    Sprout,
    Leaf,
    Medal,
    Target,
    UserCheck,
    Star,
    Factory,
    Globe,
} from 'lucide-react';

const timelineData = [
    {
        year: '2015',
        title: 'Incorporation of DERBI Foundation',
        icon: Building2,
        position: 'bottom',
    },
    {
        year: '2016',
        title: 'Recognition by DST, Govt. of India',
        icon: Award,
        position: 'top',
    },
    {
        year: '2017',
        title: 'Startup Ecosystem Development',
        icon: Sprout,
        position: 'bottom',
    },
    {
        year: '2018',
        title: 'PACE, GALLOP Program Launch',
        icon: Leaf,
        position: 'top',
    },
    {
        year: '2019',
        title: 'Recognition by DST NIDHI SSS & MeitY Tide, EMERGE Program Launch',
        icon: Medal,
        position: 'bottom',
    },
    {
        year: '2020',
        title: 'DST NIDHI PRAYAS Centre, DST NIDHI EIR Centre',
        icon: Target,
        position: 'top',
    },
    {
        year: '2021',
        title: 'Recognition by Invest India - SISFS',
        icon: UserCheck,
        position: 'bottom',
    },
    {
        year: '2022',
        title: 'Elevate Women Acceleration, GoK',
        icon: Star,
        position: 'top',
    },
    {
        year: '2023',
        title: 'IIT Bhilai, Niramaya Project',
        icon: Factory,
        position: 'bottom',
    },
    {
        year: '2024',
        title: 'BioNEST BIRAC Centre & KDEM KAN Centre',
        icon: Globe,
        position: 'top',
    },
];

const TimelineNode = ({ item, index, isInView }) => {
    const Icon = item.icon;
    const isTop = item.position === 'top';

    return (
        <div className="relative flex flex-col items-center group cursor-pointer" style={{ flex: '1 1 0%', minWidth: 0 }}>
            {/* TOP content area */}
            <div className={`flex flex-col items-center justify-end h-[110px] px-1 ${isTop ? '' : 'invisible'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                    className="text-center transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                >
                    <p className="text-royal-gold font-black text-sm md:text-base transition-colors duration-300 group-hover:text-[#FFD700] group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                        {isTop ? item.year : ''}
                    </p>
                    <p className="text-white/70 text-[10px] md:text-xs leading-tight mt-1 max-w-[120px] mx-auto transition-colors duration-300 group-hover:text-white">
                        {isTop ? item.title : ''}
                    </p>
                </motion.div>
            </div>

            {/* CIRCLE */}
            <motion.div
                className="relative z-10 my-3"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="
                    w-12 h-12 md:w-14 md:h-14 rounded-full
                    bg-pitch-black border-2 border-royal-gold/50
                    flex items-center justify-center
                    shadow-[0_0_15px_rgba(212,175,55,0.15)]
                    transition-all duration-300 ease-out
                    group-hover:bg-royal-gold group-hover:border-royal-gold group-hover:scale-125
                    group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
                ">
                    <Icon
                        className="w-5 h-5 md:w-6 md:h-6 text-royal-gold transition-colors duration-300 group-hover:text-pitch-black"
                        strokeWidth={1.8}
                    />
                </div>
            </motion.div>

            {/* BOTTOM content area */}
            <div className={`flex flex-col items-center justify-start h-[110px] px-1 ${!isTop ? '' : 'invisible'}`}>
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                    className="text-center transition-all duration-300 ease-out group-hover:scale-110 group-hover:translate-y-2"
                >
                    <p className="text-royal-gold font-black text-sm md:text-base transition-colors duration-300 group-hover:text-[#FFD700] group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                        {!isTop ? item.year : ''}
                    </p>
                    <p className="text-white/70 text-[10px] md:text-xs leading-tight mt-1 max-w-[120px] mx-auto transition-colors duration-300 group-hover:text-white">
                        {!isTop ? item.title : ''}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export const DerbiTimeline = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-28 bg-pitch-black overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-royal-gold/5 blur-[150px] rounded-full pointer-events-none" />

            {/* Title */}
            <motion.div
                className="text-center mb-16 md:mb-20 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                    <span className="bg-gradient-to-r from-royal-gold via-soft-gold to-royal-gold-light bg-clip-text text-transparent">Our</span>
                    <span className="text-white ml-2">Journey</span>
                </h2>
                <p className="text-white/40 mt-3 text-sm md:text-base max-w-lg mx-auto">
                    From a seed of thought to a thriving innovation ecosystem
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
                <div className="relative min-w-[900px]">
                    {/* Track line (gray background) */}
                    <div className="absolute left-0 right-0 h-[2px] bg-white/10" style={{ top: 'calc(110px + 0.75rem + 28px)' }} />

                    {/* Animated gold fill line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-royal-gold via-soft-gold to-royal-gold rounded-full origin-left"
                        style={{ top: 'calc(110px + 0.75rem + 28px)' }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Golden glow trail */}
                    <motion.div
                        className="absolute left-0 right-0 h-[8px] bg-royal-gold/30 blur-md rounded-full origin-left"
                        style={{ top: 'calc(110px + 0.75rem + 25px)' }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Nodes */}
                    <div className="relative flex justify-between">
                        {timelineData.map((item, i) => (
                            <TimelineNode key={item.year} item={item} index={i} isInView={isInView} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
