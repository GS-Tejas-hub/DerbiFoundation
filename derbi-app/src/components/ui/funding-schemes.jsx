import { motion } from 'framer-motion';

const schemes = [
    {
        title: "NIDHI EiR",
        description: "An entrepreneur-in-residence program offering a fellowship to budding entrepreneurs, enabling them to pursue their startup ideas without financial pressure.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
        title: "NIDHI PRAYAS",
        description: "Innovators and entrepreneurs of very early stage budding startups need a structured yet flexible program, mentorship, and necessary support to give their ideas a wing.",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
        title: "MeitY Tide 2.0",
        description: "Technology Incubation and Development of Entrepreneurs (TIDE 2.0) scheme to promote tech entrepreneurship through financial and technical support to incubators.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
        title: "Startup India Seed Fund",
        description: "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
        title: "NIDHI SSS",
        description: "Seed Support System providing early-stage financial assistance to potential startups with promising ideas, innovations, and technologies.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
        title: "MeitY Scale-up Investment",
        description: "Funding support and acceleration for mature startups to scale their operations, expand market reach, and establish themselves globally.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800&h=600",
    },
];

export const FundingSchemes = () => {
    return (
        <section className="relative w-full py-16 md:py-24 bg-[#f5f5f5] overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12 md:mb-16 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-pitch-black mb-6">
                        {/* Saved original color: text-royal-gold */}
                        <span className="text-[#fb7232]">Funding</span> Schemes
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 font-medium text-sm md:text-base">
                        Explore our comprehensive financial support systems designed to fuel innovation at every stage of your entrepreneurial journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {schemes.map((scheme, idx) => (
                        <motion.div
                            key={idx}
                            /* The box grows larger here on hover */
                            className="group relative h-[320px] md:h-[380px] rounded-[24px] md:rounded-[32px] overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.03] bg-pitch-black will-change-transform"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="w-full h-full relative pointer-events-none">
                                {/* The image shrinks (zooms out) from zoomed state on hover */}
                                <img
                                    src={scheme.image}
                                    alt={scheme.title}
                                    className="absolute inset-0 w-full h-full object-cover scale-[1.25] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 opacity-80 group-hover:opacity-40 will-change-transform origin-center"
                                />

                                {/* Gradient Mask for Typography, darkens heavily on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-pitch-black/90 via-pitch-black/30 to-pitch-black/10 transition-colors duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:from-pitch-black/95 group-hover:via-pitch-black/80 group-hover:to-pitch-black/50" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8">

                                    {/* The Title moves up out of the way */}
                                    <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-20 lg:group-hover:-translate-y-24 will-change-transform">
                                        <h3 className="text-white text-2xl md:text-3xl font-black tracking-wide text-center drop-shadow-[0_4px_16px_rgba(0,0,0,1)] px-4 transition-colors duration-[800ms] group-hover:text-royal-gold">
                                            {scheme.title}
                                        </h3>
                                    </div>

                                    {/* The description reveals, scales up, and slides up higher */}
                                    <div className="absolute inset-x-6 md:inset-x-8 xl:inset-x-10 top-[55%] md:top-1/2 mt-2 md:mt-0 opacity-0 transform translate-y-16 scale-95 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:-translate-y-6 group-hover:scale-100 z-10 will-change-transform">
                                        <div className="border border-royal-gold/80 bg-white/5 backdrop-blur-md px-5 py-4 md:px-6 md:py-5 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.2)]">
                                            <p className="text-white/95 text-xs md:text-sm leading-relaxed md:leading-loose font-medium block">
                                                {scheme.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
