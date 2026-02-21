
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import ShaderCanvas from './lanterns';

export const ContactSection = () => {
    return (
        <section className="relative w-full py-24 md:py-32 bg-pitch-black overflow-hidden">
            <ShaderCanvas />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        Feel Free to <span className="text-royal-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]">Reach Out!</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

                    {/* Left Column: Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col h-full">

                            {/* Decorative Gold Elements */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-royal-gold/10 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"></div>

                            <div className="relative z-10 flex-grow flex flex-col space-y-10">
                                <p className="text-gray-300 text-lg leading-relaxed font-medium mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    We’re here to help! Whether you have questions, feedback, or just want to say hello, we’d love to hear from you.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group-hover:bg-royal-gold/20 transition-colors duration-300 shadow-lg">
                                            <MapPin className="w-6 h-6 text-royal-gold" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 drop-shadow-md">Visit Us</h4>
                                            <p className="text-gray-400 leading-relaxed text-sm md:text-base pr-4">
                                                DSU Innovation Campus 2nd Floor, Block 1, Survey No.48/1, Kudlu Gate, Hongasandra Village, Hosur Road, Bangalore – 560068
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group-hover:bg-royal-gold/20 transition-colors duration-300 shadow-lg">
                                            <Phone className="w-6 h-6 text-royal-gold" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 drop-shadow-md">Call Us</h4>
                                            <p className="text-gray-400 font-medium">+91 80 4909 2961</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group-hover:bg-royal-gold/20 transition-colors duration-300 shadow-lg">
                                            <Mail className="w-6 h-6 text-royal-gold" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 drop-shadow-md">Email Us</h4>
                                            <a href="mailto:info@derbifoundation.com" className="text-gray-400 font-medium hover:text-royal-gold transition-colors duration-300">
                                                info@derbifoundation.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps Embed inside the card */}
                            <div className="w-full h-[250px] md:h-[300px] mt-8 rounded-[20px] overflow-hidden border border-white/10 shadow-lg relative z-10 flex-shrink-0 group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.329016066187!2d77.640660769554!3d12.88738669921377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156310100001%3A0x31010a2363770687!2sDERBI%20Foundation!5e0!3m2!1sen!2sin!4v1771705702842!5m2!1sen!2sin"
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="relative h-full"
                    >
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">

                            {/* Decorative Gold Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-royal-gold/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-royal-gold/15 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                                    Drop Us a <span className="text-royal-gold">Line</span>
                                </h3>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Name <span className="text-royal-gold">*</span></label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold/50 transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-gray-300 ml-1">Phone <span className="text-royal-gold">*</span></label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                placeholder="081234 56789"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold/50 transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email <span className="text-royal-gold">*</span></label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="john@example.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold/50 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">Company / Startup Name</label>
                                            <input
                                                type="text"
                                                id="company"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold/50 transition-all duration-300"
                                                placeholder="Your Company Name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">Type of Inquiry</label>
                                            <select
                                                id="inquiryType"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold/50 transition-all duration-300 appearance-none"
                                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65em auto' }}
                                            >
                                                <option value="" className="bg-pitch-black text-gray-500">Select an option...</option>
                                                <option value="general" className="bg-pitch-black text-white">General Inquiry</option>
                                                <option value="incubation" className="bg-pitch-black text-white">Incubation Programs</option>
                                                <option value="funding" className="bg-pitch-black text-white">Funding & Investment</option>
                                                <option value="partnership" className="bg-pitch-black text-white">Partnership</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            placeholder="How can we help you?"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold/50 transition-all duration-300 resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-royal-gold hover:bg-royal-gold-dark text-pitch-black font-bold text-lg rounded-2xl px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-1 mt-4"
                                    >
                                        <span>Submit</span>
                                        <Send className="w-5 h-5 stroke-[2.5]" />
                                    </button>

                                </form>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
