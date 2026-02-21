import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const NavItem = ({ title, path, dropdownItems, mobile, setIsMenuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleClick = () => {
        if (mobile && setIsMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    const isActive = path ? location.pathname === path : dropdownItems?.some(item => location.pathname === item.path);

    if (mobile) {
        return (
            <div className="w-full">
                {path ? (
                    <Link
                        to={path}
                        className={`block font-medium py-3 px-6 border-b border-pitch-800 transition-colors ${isActive ? 'text-royal-gold' : 'text-gray-300 hover:text-royal-gold-light'}`}
                        style={{ minHeight: '48px' }}
                        onClick={handleClick}
                    >
                        {title}
                    </Link>
                ) : (
                    <div>
                        <button
                            onClick={toggleDropdown}
                            className={`w-full flex justify-between items-center font-medium py-3 px-6 border-b border-pitch-800 transition-colors ${isActive || isOpen ? 'text-royal-gold' : 'text-gray-300 hover:text-royal-gold-light'}`}
                            style={{ minHeight: '48px' }}
                        >
                            {title}
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && dropdownItems && (
                            <div className="bg-pitch-black overflow-hidden transition-all duration-300">
                                {dropdownItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className={`block py-3 px-10 text-sm transition-colors border-b border-pitch-900/50 ${location.pathname === item.path ? 'text-royal-gold' : 'text-gray-400 hover:text-royal-gold-light'}`}
                                        style={{ minHeight: '48px' }}
                                        onClick={handleClick}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Desktop view
    return (
        <div
            className="relative group h-full flex items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {path ? (
                <Link
                    to={path}
                    className={`px-3 lg:px-4 py-2 font-medium cursor-pointer transition-colors duration-300 ${isActive ? 'text-royal-gold' : 'text-gray-300 hover:text-royal-gold-light'}`}
                >
                    {title}
                </Link>
            ) : (
                <div
                    className={`px-3 lg:px-4 py-2 font-medium cursor-pointer flex items-center transition-colors duration-300 ${isActive || isOpen ? 'text-royal-gold' : 'text-gray-300 hover:text-royal-gold-light'}`}
                >
                    {title}
                    <ChevronDown className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-transform duration-300 group-hover:rotate-180" />
                </div>
            )}

            {dropdownItems && (
                <div className={`absolute left-0 top-full w-56 bg-pitch-900 border border-royal-gold/20 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.1)] rounded-b-xl z-50 transform origin-top transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
                    <div className="py-2">
                        {dropdownItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`block px-5 py-3 text-sm transition-colors duration-200 ${location.pathname === item.path ? 'text-royal-gold bg-pitch-800/50 block border-l-2 border-royal-gold pl-4' : 'text-gray-300 hover:bg-pitch-800 hover:text-royal-gold border-l-2 border-transparent pl-5'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

NavItem.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    dropdownItems: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    })),
    mobile: PropTypes.bool,
    setIsMenuOpen: PropTypes.func
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: "Home", path: "/" },
        {
            title: "About",
            dropdownItems: [
                { title: 'ABOUT US', path: '/about/about-us' },
                { title: "DIRECTOR'S MESSAGE", path: '/about/directors-message' },
                { title: 'GOVERNING COUNCIL', path: '/about/governing-council' },
                { title: 'TEAM', path: '/about/team' },
                { title: 'MENTORS', path: '/about/mentors' },
            ]
        },
        {
            title: "Programs",
            dropdownItems: [
                { title: 'PACE', path: '/programs/pace' },
                { title: 'GALLOP', path: '/programs/gallop' },
                { title: 'EMERGE', path: '/programs/emerge' },
                { title: 'BIONEST', path: '/programs/bionest' },
            ]
        },
        {
            title: "Funding Schemes",
            dropdownItems: [
                { title: 'NIDHI EiR', path: '/funding/nidhi-eir' },
                { title: 'NIDHI PRAYAS', path: '/funding/nidhi-prayas' },
                { title: 'MeitY Tide 2.0', path: '/funding/meity-tide' },
                { title: 'NIDHI SSS', path: '/funding/nidhi-sss' },
                { title: 'SISFS', path: '/funding/sisfs' },
            ]
        },
        { title: "Portfolio", path: "/portfolio" },
        { title: "Prayas Shala Lab", path: "/prayas-shala-lab" },
        { title: "Partners", path: "/partners" },
        { title: "Current programs", path: "/current-programs" },
    ];

    return (
        <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-pitch-black/95 backdrop-blur-md border-b border-royal-gold/20 shadow-lg' : 'bg-pitch-black border-b border-pitch-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center group">
                            <img
                                src="/images/Logo1-transparent.png"
                                alt="Derbi Foundations Logo"
                                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center h-full">
                        {navLinks.map((link, index) => (
                            <NavItem key={index} {...link} />
                        ))}
                    </div>

                    {/* Mobile Menu Button - 48px touch target */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-royal-gold hover:text-royal-gold-light focus:outline-none flex items-center justify-center transition-transform duration-300 active:scale-90"
                            aria-expanded={isMenuOpen}
                            style={{ minHeight: '48px', minWidth: '48px' }}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div
                className={`lg:hidden absolute top-20 left-0 w-full bg-pitch-950 border-b border-royal-gold/20 shadow-[-5px_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMenuOpen ? 'max-h-[calc(100vh-80px)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="pb-6 pt-2">
                    {navLinks.map((link, index) => (
                        <NavItem key={index} {...link} mobile={true} setIsMenuOpen={setIsMenuOpen} />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
