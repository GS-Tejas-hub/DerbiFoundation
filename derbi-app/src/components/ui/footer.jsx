
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { LightningBackground } from './lightning-background';

export const Footer = () => {
    return (
        <footer className="w-full bg-pitch-black pt-16 pb-8 relative overflow-hidden">

            {/* Injected Lightning Background (Extracted from hero-odyssey requests) */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                {/* Hue 20 aligns with the vibrant Orange #fb7232 highlights */}
                <LightningBackground hue={20} intensity={0.5} speed={1.2} />
            </div>

            {/* Subtle glow effects matching header aesthetics */}
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-royal-gold/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Column 1: Logo & About */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-start">
                        <Link to="/" className="mb-6 group">
                            <img
                                src="/images/Logo1-transparent.png"
                                alt="Derbi Foundations Logo"
                                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 pr-4">
                            Every great company starts as an idea. At Derbi, we turn that idea into unstoppable momentum.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/company/derbifoundation/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-pitch-900 border border-royal-gold/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-royal-gold hover:bg-royal-gold/10 transition-all duration-300 z-10">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://x.com/derbifoundati0n" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-pitch-900 border border-royal-gold/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-royal-gold hover:bg-royal-gold/10 transition-all duration-300 z-10">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/derbi_foundation/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-pitch-900 border border-royal-gold/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-royal-gold hover:bg-royal-gold/10 transition-all duration-300 z-10">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.facebook.com/derbifoundation" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-pitch-900 border border-royal-gold/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-royal-gold hover:bg-royal-gold/10 transition-all duration-300 z-10">
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                            Programs <span className="ml-2 w-8 h-px bg-royal-gold/50"></span>
                        </h4>
                        <ul className="space-y-4">
                            <li><Link to="/programs/pace" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />PACE</Link></li>
                            <li><Link to="/programs/gallop" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />GALLOP</Link></li>
                            <li><Link to="/programs/emerge" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />EMERGE</Link></li>
                            <li><Link to="/programs/bionest" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />BIONEST</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Funding */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                            Funding <span className="ml-2 w-8 h-px bg-royal-gold/50"></span>
                        </h4>
                        <ul className="space-y-4">
                            <li><Link to="/funding/nidhi-eir" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />NIDHI EiR</Link></li>
                            <li><Link to="/funding/nidhi-prayas" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />NIDHI PRAYAS</Link></li>
                            <li><Link to="/funding/meity-tide" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />MeitY Tide 2.0</Link></li>
                            <li><Link to="/funding/nidhi-sss" className="text-gray-400 hover:text-royal-gold transition-colors duration-300 text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-3 mr-1 transition-all" />NIDHI SSS</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact minimal */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                            Reach Us <span className="ml-2 w-8 h-px bg-royal-gold/50"></span>
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start">
                                <span className="mt-1 mr-2 text-royal-gold">•</span>
                                <div>
                                    <span className="block text-white mb-1">DSU Innovation Campus</span>
                                    Hongasandra Village, Hosur Road,<br />Bangalore – 560068
                                </div>
                            </li>
                            <li className="flex items-start pt-2">
                                <span className="mt-1 mr-2 text-royal-gold">•</span>
                                <a href="mailto:info@derbifoundation.com" className="hover:text-royal-gold transition-colors">info@derbifoundation.com</a>
                            </li>
                            <li className="flex items-start pt-2">
                                <span className="mt-1 mr-2 text-royal-gold">•</span>
                                <span className="hover:text-royal-gold transition-colors cursor-pointer">+91 80 4909 2961</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Footer Bottom Line & Five AM Labs */}
                <div className="pt-8 border-t border-pitch-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Derbi Foundation. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 justify-center md:justify-end">
                        <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>

                {/* Five AM Labs Signature */}
                <div className="mt-8 flex justify-center w-full">
                    <a
                        href="https://5am-labs.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-500"
                    >
                        <span className="text-[10px] tracking-widest uppercase text-gray-500 mb-1 group-hover:text-royal-gold/70 transition-colors">Architected By</span>
                        <div className="flex items-center gap-2">
                            {/* Futuristic glowing text styling for 5AM Labs */}
                            <span className="text-white font-black tracking-tighter text-lg leading-none" style={{ fontFamily: 'monospace' }}>
                                FIVE AM <span className="text-royal-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">LABS</span>
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]"></div>
                        </div>
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
