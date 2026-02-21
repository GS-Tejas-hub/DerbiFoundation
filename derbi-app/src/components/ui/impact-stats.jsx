import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView } from 'framer-motion';

const stats = [
    { value: 6800, label: 'Startup Repository' },
    { value: 1400, label: 'Startups Reached' },
    { value: 185, label: 'Startups Supported' },
    { value: 32, label: 'Investments' },
    { value: 84, label: 'Fellowship/Grants' },
];

const statsRow2 = [
    { value: 14175, label: 'Mentoring Hours' },
    { value: 200, label: 'Sector Experts' },
    { value: 1080, label: 'Jobs Created' },
    { value: 87, label: 'Partners' },
];

const AnimatedNumber = ({ target, inView }) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef(null);

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const startTime = performance.now();

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(target * eased));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick);
            }
        };

        frameRef.current = requestAnimationFrame(tick);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [inView, target]);

    return <span>{count.toLocaleString()}</span>;
};

AnimatedNumber.propTypes = {
    target: PropTypes.number.isRequired,
    inView: PropTypes.bool.isRequired
};

const StatItem = ({ stat, isInView, delay, isLast }) => (
    <motion.div
        className={`flex-1 text-center py-4 px-3 ${!isLast ? 'border-r border-white/10' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-b from-[#FFD700] via-royal-gold to-soft-gold bg-clip-text text-transparent mb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
            <AnimatedNumber target={stat.value} inView={isInView} />
        </p>
        <p className="text-[10px] md:text-xs font-semibold text-white/80 uppercase tracking-[0.12em]">
            {stat.label}
        </p>
    </motion.div>
);

StatItem.propTypes = {
    stat: PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired,
    isInView: PropTypes.bool.isRequired,
    delay: PropTypes.number.isRequired,
    isLast: PropTypes.bool.isRequired
};

export const ImpactStats = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    return (
        <section ref={sectionRef} className="relative w-full py-12 md:py-16 overflow-hidden">
            {/* Section Title */}
            <motion.div
                className="text-center mb-10 md:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                    <span className="bg-gradient-to-r from-royal-gold via-soft-gold to-royal-gold-light bg-clip-text text-transparent">DERBI</span>
                    <span className="text-white ml-2">Impact</span>
                </h2>
            </motion.div>

            {/* Row 1: 5 Stats */}
            <div className="w-full px-4 md:px-8 lg:px-12 mb-4">
                <div className="flex items-stretch border border-white/5 rounded-lg bg-white/[0.02] backdrop-blur-sm">
                    {stats.map((stat, i) => (
                        <StatItem
                            key={stat.label}
                            stat={stat}
                            isInView={isInView}
                            delay={i * 0.08}
                            isLast={i === stats.length - 1}
                        />
                    ))}
                </div>
            </div>

            {/* Row 2: 4 Stats */}
            <div className="w-full px-4 md:px-8 lg:px-12">
                <div className="flex items-stretch border border-white/5 rounded-lg bg-white/[0.02] backdrop-blur-sm">
                    {statsRow2.map((stat, i) => (
                        <StatItem
                            key={stat.label}
                            stat={stat}
                            isInView={isInView}
                            delay={0.4 + i * 0.08}
                            isLast={i === statsRow2.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
