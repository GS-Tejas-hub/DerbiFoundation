import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FractalBloomTree } from './fractal-bloom-tree';

const testimonials = [
    {
        id: 1,
        testimonial: "The Emerge program of Derbi was useful. The team showed a genuine interest in helping emerging healthcare startups. The program was well planned, with an array of speakers from the industry. The program provided business connections.",
        author: "Jayakanth Kesan",
        company: "zBliss Technologies",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256"
    },
    {
        id: 2,
        testimonial: "Carbon hubs was mainly started due to the pollution problem of India, and unlike other technology, carbon hubs has a unique way to reduce pollution along with particulate matter, and DERBI pace program has helped me to network with industrial mentors and helped me gain knowledge of the market.",
        author: "Shalom Kingston",
        company: "Carbon Hub",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256"
    },
    {
        id: 3,
        testimonial: "I am Sachin Dubey, the CEO of Module Innovations. I was selected for the DERBI, EMERGE program. EMERGE is one of the most exciting programs attended due to its design and invited speakers. The customized approach was new and not found in many other programs that I have attended.",
        author: "Sachin Dubey",
        company: "Module Innovations",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256"
    }
];

export function TestimonialCard({ handleShuffle, testimonial, position, author, company, avatar }) {
    const dragRef = useRef(0);
    const isFront = position === "front";

    return (
        <motion.div
            style={{
                zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
            }}
            animate={{
                rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
                x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
            }}
            drag={isFront ? "x" : false}
            dragElastic={0.35}
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
            onDragStart={(e) => {
                dragRef.current = e.clientX;
            }}
            onDragEnd={(e) => {
                // User requirement: "after grabbing card they cannot push it to right only left"
                // Dragging the card left means e.clientX is smaller than dragRef.current
                if (dragRef.current - e.clientX > 150) {
                    handleShuffle();
                }
                dragRef.current = 0;
            }}
            transition={{ duration: 0.35 }}
            className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-xl backdrop-blur-md ${isFront ? "cursor-grab active:cursor-grabbing" : ""
                }`}
        >
            <div className="flex-shrink-0 mt-2">
                <img
                    src={avatar}
                    alt={`Avatar of ${author}`}
                    className="pointer-events-none mx-auto h-24 w-24 md:h-28 md:w-28 rounded-full border-2 border-gray-100 bg-gray-50 object-cover"
                />
            </div>

            {/* Starts matching the glowing royal gold requirement */}
            <div className="flex items-center justify-center gap-1.5 flex-shrink-0">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-royal-gold text-royal-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]" />
                ))}
            </div>

            {/* Adjusted typography to prevent flowing out, using line-clamp if needed */}
            <span className="text-center text-[15px] leading-relaxed text-pitch-800 font-medium px-2 italic line-clamp-6">
                &quot;{testimonial}&quot;
            </span>

            <div className="flex flex-col items-center gap-1 pb-2 flex-shrink-0">
                <span className="text-center text-sm font-bold text-pitch-black">{author}</span>
                <span className="text-center text-xs font-medium text-gray-500">
                    Founder <span className="text-royal-gold drop-shadow-[0_0_3px_rgba(212,175,55,0.4)] ml-1">{company}</span>
                </span>
            </div>
        </motion.div>
    );
}

TestimonialCard.propTypes = {
    handleShuffle: PropTypes.func.isRequired,
    testimonial: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

export const OurStartupsSpeak = () => {
    const [positions, setPositions] = useState(["front", "middle", "back"]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const timerRef = useRef(null);

    const handleNext = useCallback(() => {
        setPositions((prevPositions) => {
            const next = [...prevPositions];
            next.unshift(next.pop());
            return next;
        });
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const handlePrev = useCallback(() => {
        setPositions((prevPositions) => {
            const next = [...prevPositions];
            next.push(next.shift());
            return next;
        });
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Function to manually shuffle via user interaction (clicks or drags)
    // This immediately stops auto-play to respect the user's action
    const handleManualShuffleNext = useCallback(() => {
        setIsAutoPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
        handleNext();
    }, [handleNext]);

    const handleManualShufflePrev = useCallback(() => {
        setIsAutoPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
        handlePrev();
    }, [handlePrev]);

    // Autoplay functionality: runs every 2.5 seconds only if user hasn't interacted
    useEffect(() => {
        if (!isAutoPlaying) return;

        const intervalId = setInterval(() => {
            handleNext();
        }, 2500);

        timerRef.current = intervalId;

        return () => {
            clearInterval(intervalId);
        };
    }, [isAutoPlaying, handleNext]);

    return (
        <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header Centered exactly as in screenshot */}
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight">
                        {/* Saved original color: text-royal-gold */}
                        <span className="text-[#fb7232]">Our Startups</span> <span className="text-pitch-black">Speak</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: The Testimonial Deck & Controls */}
                    <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[500px]">

                        {/* We offset the entire deck to the left by ~175px on desktop just like the demo */}
                        <div className="relative -ml-[100px] md:-ml-[175px] h-[450px] w-[350px]">
                            {/* Left chevron directly beside card */}
                            {/* Saved original color: text-royal-gold hover:text-royal-gold-light drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] */}
                            <button
                                onClick={handleManualShufflePrev}
                                className="p-2 text-[#fb7232] hover:text-[#fb7232]/80 transition-colors drop-shadow-[0_0_8px_rgba(251,114,50,0.6)] z-10 hidden sm:block absolute -left-[70px] top-1/2 -translate-y-1/2"
                            >
                                <ChevronLeft className="w-10 h-10 md:w-12 md:h-12 font-light stroke-[1.5]" />
                            </button>

                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    {...testimonial}
                                    handleShuffle={handleManualShuffleNext}
                                    position={positions[index]}
                                    author={testimonial.author}
                                    company={testimonial.company}
                                    avatar={testimonial.avatar}
                                />
                            ))}

                            {/* Right chevron explicitly pushed to the right to clear the third card */}
                            {/* Saved original color: text-royal-gold hover:text-royal-gold-light drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] */}
                            <button
                                onClick={handleManualShuffleNext}
                                className="p-2 text-[#fb7232] hover:text-[#fb7232]/80 transition-colors drop-shadow-[0_0_8px_rgba(251,114,50,0.6)] z-10 hidden sm:block absolute -right-[280px] top-1/2 -translate-y-1/2"
                            >
                                <ChevronRight className="w-10 h-10 md:w-12 md:h-12 font-light stroke-[1.5]" />
                            </button>
                        </div>

                        {/* Mobile Controls & Dots Indicator Below */}
                        <div className="flex items-center justify-center mt-12 w-full max-w-[350px] gap-8 sm:gap-4 -ml-[100px] md:-ml-[175px]">
                            {/* Mobile Left Arrow */}
                            {/* Saved original color: text-royal-gold drop-shadow-[0_0_4px_rgba(212,175,55,0.6)] */}
                            <button onClick={handleManualShufflePrev} className="sm:hidden p-2 text-[#fb7232] drop-shadow-[0_0_4px_rgba(251,114,50,0.6)]">
                                <ChevronLeft className="w-8 h-8 stroke-[2]" />
                            </button>

                            <div className="flex items-center gap-2">
                                {testimonials.map((_, i) => (
                                    <div
                                        key={i}
                                        /* Saved original color: bg-royal-gold shadow-[0_0_8px_rgba(212,175,55,0.8)] */
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-[#fb7232] shadow-[0_0_8px_rgba(251,114,50,0.8)] scale-125' : 'bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Mobile Right Arrow */}
                            {/* Saved original color: text-royal-gold drop-shadow-[0_0_4px_rgba(212,175,55,0.6)] */}
                            <button onClick={handleManualShuffleNext} className="sm:hidden p-2 text-[#fb7232] drop-shadow-[0_0_4px_rgba(251,114,50,0.6)]">
                                <ChevronRight className="w-8 h-8 stroke-[2]" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: The new Fractal Bloom Animation */}
                    <div className="w-full flex justify-center items-center h-[350px] md:h-[400px] lg:h-[450px] lg:pl-[85px]">
                        <FractalBloomTree />
                    </div>

                </div>
            </div>
        </section>
    );
};
