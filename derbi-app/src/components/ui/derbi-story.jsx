import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ElectricCard from './electric-card';

export const DerbiStory = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} className="relative w-full py-20 px-4 md:px-12 lg:px-24 bg-pitch-black overflow-hidden z-10">
            {/* Background ambient glow behind the section */}
            <div className="absolute top-1/2 left-0 w-1/3 h-[300px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
                {/* Left Side: Electric Card (Placeholder for future animation) */}
                <motion.div
                    className="w-full lg:w-1/2 aspect-square max-w-[500px]"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <ElectricCard
                        variant="swirl"
                        color="#D4AF37" // Royal Gold
                        badge="Our Journey"
                        title="The Spark"
                        description="Where innovation meets execution. Animation coming soon."
                    >
                        {/* Empty inner container ready for the future animation */}
                        <div className="w-full h-full flex items-center justify-center p-8 text-soft-gold/30 italic text-sm text-center border-2 border-dashed border-royal-gold/10 rounded-xl">
                            Animation Placeholder
                        </div>
                    </ElectricCard>
                </motion.div>

                {/* Right Side: Typography / Story */}
                <motion.div
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-8">
                        <span className="bg-gradient-to-r from-royal-gold via-soft-gold to-royal-gold-light bg-clip-text text-transparent">DERBI</span>
                        <span className="text-white ml-3">Story</span>
                    </h2>

                    <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed font-light">
                        <p>
                            It all started with a seed of thought, subsequent small steps and a simple decision of establishing Innovation and Entrepreneurship Development Centre (IEDC) for Dayananda Sagar Institutions (DSI) to nurture and promote entrepreneurship among the students and faculty of DSI back in 2009.
                        </p>
                        <p>
                            The tremendous response by the students, plethora of activities and extensive interaction with communities led to creating an ecosystem conducive to supporting the Startups and Innovators beyond DSI.
                        </p>
                        <p>
                            Additionally, with the financial and other support by NSTEDB, the Department of Science &amp; Technology, Government of India led to the creation of the DERBI Foundation in 2015 with an aim to Fuel Dreams of Innovators, Entrepreneurs and Startups to gather <strong className="text-soft-gold font-bold">PACE</strong>, <strong className="text-soft-gold font-bold">GALLOP</strong> and <strong className="text-soft-gold font-bold">EMERGE</strong> successfully through our pre-incubation, incubation, and acceleration programs.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
