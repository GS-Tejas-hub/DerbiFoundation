import * as React from "react";
import { motion } from "framer-motion";

export const HoverTextGlow = ({
    text = "DERBI",
    duration = 0.25,
}) => {
    const svgRef = React.useRef(null);
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const [hover, setHover] = React.useState(false);
    const [mask, setMask] = React.useState({ cx: "50%", cy: "50%" });

    // Track cursor position relative to SVG
    React.useEffect(() => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const cx = ((coords.x - rect.left) / rect.width) * 100;
        const cy = ((coords.y - rect.top) / rect.height) * 100;
        setMask({ cx: `${cx}%`, cy: `${cy}%` });
    }, [coords]);

    return (
        <div className="relative flex w-full h-full items-center justify-center overflow-hidden p-6 z-20">
            <svg
                ref={svgRef}
                className="select-none w-full h-full"
                width="100%"
                height="100%"
                viewBox="0 0 300 100"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
            >
                <defs>
                    {/* gradient for stroke reveal: Using Royal Gold & Pitch Black theme */}
                    <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
                        {hover ? (
                            <>
                                <stop offset="0%" stopColor="#D4AF37" />
                                <stop offset="25%" stopColor="#FDE68A" />
                                <stop offset="50%" stopColor="#FFF" />
                                <stop offset="75%" stopColor="#D4AF37" />
                                <stop offset="100%" stopColor="#F5D061" />
                            </>
                        ) : (
                            <stop offset="0%" stopColor="#D4AF37" />
                        )}
                    </linearGradient>

                    {/* mask gradient that moves with cursor */}
                    <motion.radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="30%"
                        animate={mask}
                        transition={{ duration, ease: "easeOut" }}
                    >
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="transparent" />
                    </motion.radialGradient>

                    <mask id="textMask">
                        <rect width="100%" height="100%" fill="url(#revealMask)" />
                    </mask>
                </defs>

                {/* base text outline (idle state) */}
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.8"
                    className="font-black font-serif fill-transparent text-[3.5rem] tracking-widest stroke-royal-gold/30"
                    initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                    animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                >
                    {text}
                </motion.text>

                {/* hover reveal gradient text */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke="url(#textGradient)"
                    strokeWidth="1.2"
                    mask="url(#textMask)"
                    className="font-black font-serif fill-transparent text-[3.5rem] tracking-widest filter drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                    style={{ opacity: hover ? 1 : 0, transition: "opacity 0.4s ease" }}
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};
