/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowDown, ChevronRight, Sparkles, Layout, Cpu, Smartphone, Zap,
  Utensils, Scissors, HeartPulse, Dumbbell, Home, Briefcase, LayoutTemplate, RefreshCw,
  ArrowUpRight, ExternalLink, ArrowRight, Monitor, PlayCircle, Search, PenTool, Code, Rocket, Shield, Handshake, Quote, Star, Plus, Minus,
  Mail, MapPin, Clock, CheckCircle2, AlertCircle, Loader2, Send, ChevronDown, Linkedin, Github, Instagram, ArrowUp
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    details: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.business.trim()) errors.business = 'Business name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.projectType) errors.projectType = 'Please select a project type';
    if (!formData.budget) errors.budget = 'Please select an estimated budget';
    if (!formData.details.trim()) errors.details = 'Project details are required';
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    const sections = ['expertise', 'work', 'agency', 'insights'];
    sections.forEach(section => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="bg-brand-bg selection:bg-brand-violet selection:text-white text-brand-text overflow-x-hidden w-full relative">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-brand-bg/80 backdrop-blur-md border-b border-white/5 shadow-2xl' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 z-50 cursor-pointer"
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Sparkles className="w-5 h-5 text-brand-cyan" />
            <span className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-brand-text">
              Vaibhav <span className="text-brand-cyan italic font-light">Studio</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex items-center gap-10"
          >
            {['Expertise', 'Work', 'Agency', 'Insights'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                  activeSection === item.toLowerCase() ? 'text-brand-cyan' : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300 ${
                  activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 text-sm tracking-wider uppercase border border-brand-muted/30 hover:border-brand-cyan hover:bg-brand-cyan/10 text-brand-text transition-all duration-300 rounded-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg "
            >
              Let's Talk
            </button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-label="Toggle menu" aria-expanded={mobileMenuOpen} className="md:hidden z-50 text-brand-text p-3 -mr-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </nav>
      <main>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Abstract dark luxury background */}
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Abstract AI Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          {/* Gradients for depth and legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 via-brand-bg/40 to-brand-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/90 via-transparent to-brand-bg/90" />
          
          {/* Subtle cyan radial glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
        </motion.div>
      </div>


      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-brand-bg/95 backdrop-blur-xl flex flex-col items-center justify-center px-6"
          >
            <div className="flex flex-col items-center gap-10 text-center w-full max-w-sm">
              {['Expertise', 'Work', 'Agency', 'Insights'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  href={`#${item.toLowerCase()}`}
                  className={`font-serif text-4xl transition-colors duration-300 w-full py-2 ${
                    activeSection === item.toLowerCase() ? 'text-brand-cyan' : 'text-brand-text hover:text-brand-cyan'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-8 w-full min-h-[48px] px-8 py-4 bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-sm tracking-widest uppercase font-medium rounded-sm"
              >
                Let's Talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-5xl mx-auto pt-20 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-brand-card/50 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-brand-text/80">Defining the Future of AI</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.15] mb-8"
        >
          <span className="block text-brand-text/90 px-2">Intelligent Design.</span>
          <span className="block italic text-brand-cyan mt-2 md:mt-4 px-2">Elevated Experiences.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-brand-muted font-light max-w-2xl mx-auto mb-12 leading-relaxed px-4"
        >
          We are a premium AI digital agency crafting bespoke, high-performance web solutions that merge cutting-edge artificial intelligence with timeless aesthetic luxury.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full px-2 sm:w-auto"
        >
          <button className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-violet to-brand-cyan text-white uppercase tracking-widest text-sm font-medium overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg hover:shadow-[0_8px_24px_rgba(139,92,246,0.25)]">
            <span className="relative z-10">Book a Free Consultation</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </button>
          
          <button className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-brand-card backdrop-blur-md border border-brand-muted/20 text-brand-text uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(34,211,238,0.15)] hover:bg-brand-card/80 hover:border-brand-cyan/50 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg ">
            View Our Work
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden lg:flex absolute bottom-2 left-1/2 -translate-x-1/2 flex-col items-center z-10"
      >
        <div className="w-6 h-10 border border-brand-muted/30 rounded-full flex justify-center p-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 to-brand-violet/5 group-hover:opacity-100 transition-opacity" />
          <motion.div 
            animate={{ y: [0, 16, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-brand-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
          />
        </div>
      </motion.div>
      </section>

      {/* About Section */}
      <section id="agency" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10">
        {/* Subtle AI-inspired gradients */}
        <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none opacity-30 mix-blend-screen flex items-center justify-center">
          <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-violet/20 rounded-full blur-[100px] md:blur-[120px] -translate-x-1/3" />
          <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-cyan/20 rounded-full blur-[100px] md:blur-[120px] translate-x-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Column: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
            >
              <div className="absolute inset-0 bg-brand-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
                alt="Premium AI Workspace"
                loading="lazy" 
                className="w-full object-cover aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
              />
            </motion.div>

            {/* Right Column: Content */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">
                  About Vaibhav Studio
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6">
                  Building Premium AI Experiences for Modern Businesses
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 text-brand-muted text-base md:text-lg font-light leading-relaxed mb-12"
              >
                <p>
                  Vaibhav Studio creates premium AI-powered websites that combine elegant design, exceptional user experience, and modern technology to help businesses grow online.
                </p>
                <p>
                  From luxury restaurants and salons to clinics, gyms, real estate agencies, and personal brands, every project is crafted with attention to detail, responsiveness, performance, and conversion.
                </p>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Layout, title: "Premium UI/UX" },
                  { icon: Cpu, title: "AI Powered Development" },
                  { icon: Smartphone, title: "Mobile First" },
                  { icon: Zap, title: "Fast Performance" }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.5 + (i * 0.1) }}
                    className="group flex items-center gap-4 p-4 md:p-5 rounded-xl bg-brand-card border border-white/5 backdrop-blur-sm hover:border-brand-violet/30 hover:bg-brand-card hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] active:scale-[0.98] active:translate-y-0"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-brand-bg flex items-center justify-center border border-white/5 group-hover:border-brand-cyan/40 transition-colors duration-300 text-brand-muted group-hover:text-brand-cyan">
                      <feature.icon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)]" />
                    </div>
                    <span className="font-medium text-brand-text text-xs md:text-sm tracking-wide">{feature.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="expertise" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
            >
              Our Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
            >
              Premium AI Solutions for Modern Businesses
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base md:text-lg font-light leading-relaxed"
            >
              We build high-performance AI-powered websites that help businesses attract more customers, build trust, and grow faster.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                icon: Utensils, 
                title: "Luxury Restaurant Websites", 
                desc: "Elegant digital dining experiences with seamless reservations." 
              },
              { 
                icon: Scissors, 
                title: "Salon Websites", 
                desc: "Beautiful portfolios and booking systems for premium salons." 
              },
              { 
                icon: HeartPulse, 
                title: "Clinic Websites", 
                desc: "Trust-building professional medical and wellness clinic sites." 
              },
              { 
                icon: Dumbbell, 
                title: "Gym Websites", 
                desc: "High-energy platforms to convert fitness enthusiasts to members." 
              },
              { 
                icon: Home, 
                title: "Real Estate Websites", 
                desc: "Stunning property showcases with advanced filtering." 
              },
              { 
                icon: Briefcase, 
                title: "Portfolio Websites", 
                desc: "Striking personal brand and creative agency portfolios." 
              },
              { 
                icon: LayoutTemplate, 
                title: "Business Landing Pages", 
                desc: "High-conversion, focused landing pages for campaigns." 
              },
              { 
                icon: RefreshCw, 
                title: "Website Redesign", 
                desc: "Modernizing legacy sites with AI capabilities and premium UI." 
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1 + (i * 0.1) }}
                className="group relative flex flex-col p-6 sm:p-8 rounded-2xl bg-brand-card border border-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-brand-card hover:border-brand-violet/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] active:scale-[0.98] active:translate-y-0 overflow-hidden h-full"
              >
                {/* Hover Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-cyan/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-14 h-14 rounded-xl bg-brand-bg border border-white/10 flex items-center justify-center mb-6 text-brand-muted group-hover:text-brand-cyan group-hover:border-brand-cyan/40 transition-all duration-300 relative z-10">
                  <service.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)]" />
                </div>
                
                <h3 className="font-serif text-xl text-brand-text mb-3 relative z-10">{service.title}</h3>
                
                <p className="text-brand-muted text-sm font-light leading-relaxed flex-grow relative z-10">
                  {service.desc}
                </p>

                <div className="mt-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-muted/70 group-hover:text-brand-cyan transition-colors duration-300 relative z-10 w-fit cursor-pointer">
                  Learn More
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="work" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-violet/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-cyan/20 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
            >
              Featured Projects
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
            >
              Selected Work That Delivers Real Business Results
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base md:text-lg font-light leading-relaxed"
            >
              Every project is carefully crafted with premium UI/UX, AI-powered workflows, modern technology, and conversion-focused design.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Project 01 (Featured) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="group lg:col-span-2 relative flex flex-col lg:flex-row overflow-hidden rounded-2xl bg-brand-card border border-white/5 hover:border-brand-violet/50 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0"
            >
              <div className="lg:w-3/5 overflow-hidden relative">
                 <div className="absolute inset-0 bg-brand-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                 <img 
                   src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop" 
                   alt="Royal Spice Restaurant Website"
                    loading="lazy" 
                   className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto lg:h-full group-hover:scale-105 transition-transform duration-1000 ease-out" 
                 />
                 {/* Border glow */}
                 <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-brand-cyan/20 rounded-2xl transition-all duration-700 pointer-events-none z-20 mix-blend-screen" />
              </div>

              <div className="lg:w-2/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative z-20">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest text-brand-cyan border border-brand-cyan/30 rounded-full bg-brand-cyan/5">
                    Luxury Restaurant Website
                  </span>
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest text-brand-violet border border-brand-violet/30 rounded-full bg-brand-violet/5">
                    Published
                  </span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl text-brand-text mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-text group-hover:to-brand-cyan transition-all duration-500">
                  Royal Spice
                </h3>

                <p className="text-brand-muted text-sm md:text-base font-light leading-relaxed mb-8">
                  A premium luxury restaurant website designed with a modern AI-powered workflow, elegant animations, responsive layouts, premium typography, online reservation system and immersive user experience.
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {['React', 'Tailwind', 'AI Workflow', 'Responsive'].map(tag => (
                    <span key={tag} className="text-xs text-brand-muted/70 bg-white/5 px-2 py-1 rounded-sm border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mt-auto">
                  <button className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-4 sm:py-3 bg-gradient-to-r from-brand-violet to-brand-cyan text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:shadow-[0_4px_16px_rgba(139,92,246,0.25)] transition-all duration-300 group/btn active:scale-[0.98] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg ">
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
                    View Live
                  </button>
                  <button className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-4 sm:py-3 bg-white/5 text-brand-text text-xs uppercase tracking-widest font-medium rounded-sm border border-brand-muted/20 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(34,211,238,0.15)] hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 group/btn2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan active:scale-95">
                    View Case Study
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn2:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Project 02 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-brand-card border border-white/5 hover:border-brand-violet/50 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0"
            >
              <div className="aspect-video overflow-hidden relative bg-brand-bg flex items-center justify-center">
                 <div className="absolute inset-0 bg-brand-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                 <div className="w-full h-full bg-brand-bg relative overflow-hidden group-hover:scale-105 transition-transform duration-1000 ease-out">
                   {/* Elegant abstract salon-inspired background */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#1a1120] to-brand-bg opacity-90" />
                   {/* Soft violet and cyan ambient glow */}
                   <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-violet/30 rounded-full blur-[40px]" />
                   <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-brand-cyan/20 rounded-full blur-[40px]" />
                   
                   {/* Abstract beauty-themed visual overlay */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen" />
                   
                   {/* Center Content */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                     {/* Minimal luxury illustration */}
                     <div className="w-12 h-12 mb-4 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                       <Sparkles className="w-5 h-5 text-brand-muted/70 group-hover:text-brand-cyan/80 transition-colors duration-500" />
                     </div>
                     
                     <span className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-brand-text border border-white/10 rounded-full bg-black/40 backdrop-blur-md mb-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                       Coming Soon
                     </span>
                     <span className="text-xs font-serif italic text-brand-muted/80">
                       Project Preview
                     </span>
                   </div>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent z-10" />
                 {/* Border glow */}
                 <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-brand-cyan/20 rounded-2xl transition-all duration-700 pointer-events-none z-20 mix-blend-screen" />
              </div>

              <div className="p-6 sm:p-8 relative z-20 flex-grow flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest text-brand-cyan border border-brand-cyan/30 rounded-full bg-brand-cyan/5">
                    Luxury Salon Website
                  </span>
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest text-brand-muted lining-nums border border-brand-muted/30 rounded-full bg-brand-muted/5">
                    Coming Soon
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-brand-text mb-3 group-hover:text-brand-cyan transition-colors duration-300">
                  LuxeGlow Studio
                </h3>

                <p className="text-brand-muted text-sm font-light leading-relaxed mb-6 flex-grow">
                  A premium digital portfolio and booking experience tailored for a high-end beauty and wellness studio.
                </p>

                <div className="flex items-center text-xs font-semibold tracking-widest uppercase text-brand-muted/50 mt-auto cursor-not-allowed">
                  Case Study Pending
                </div>
              </div>
            </motion.div>

            {/* Project 03 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-brand-card border border-white/5 hover:border-brand-violet/50 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0"
            >
              <div className="aspect-video overflow-hidden relative bg-brand-bg flex items-center justify-center">
                 <div className="absolute inset-0 bg-brand-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                 <img 
                   src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop" 
                   alt="EliteFit Gym Website"
                    loading="lazy" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-60 mix-blend-luminosity" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent z-10" />
                 {/* Border glow */}
                 <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-brand-cyan/20 rounded-2xl transition-all duration-700 pointer-events-none z-20 mix-blend-screen" />
              </div>

              <div className="p-6 sm:p-8 relative z-20 flex-grow flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest text-brand-cyan border border-brand-cyan/30 rounded-full bg-brand-cyan/5">
                    Premium Gym Website
                  </span>
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest text-brand-muted lining-nums border border-brand-muted/30 rounded-full bg-brand-muted/5">
                    Coming Soon
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-brand-text mb-3 group-hover:text-brand-cyan transition-colors duration-300">
                  EliteFit Gym
                </h3>

                <p className="text-brand-muted text-sm font-light leading-relaxed mb-6 flex-grow">
                  A high-energy, conversion-focused platform designed to attract fitness enthusiasts and streamline member onboarding.
                </p>

                <div className="flex items-center text-xs font-semibold tracking-widest uppercase text-brand-muted/50 mt-auto cursor-not-allowed">
                  Case Study Pending
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-violet/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
            >
              Our Process
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
            >
              From Idea to Launch — A Seamless Experience
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base md:text-lg font-light leading-relaxed"
            >
              Every project follows a refined workflow that ensures quality, transparency and exceptional results.
            </motion.p>
          </div>

          <div className="relative">
            {/* Desktop Connection Line */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-white/5 z-0" />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-brand-violet to-brand-cyan z-0 origin-left"
            >
              <div className="absolute inset-0 bg-white/20 blur-[1px]" />
            </motion.div>

            {/* Mobile Connection Line */}
            <div className="block lg:hidden absolute top-[40px] bottom-[150px] left-1/2 -translate-x-1/2 w-[1px] bg-white/5 z-0" />
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="block lg:hidden absolute top-[40px] bottom-[150px] left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-brand-violet to-brand-cyan z-0 origin-top"
            >
              <div className="absolute inset-0 bg-white/20 blur-[1px]" />
            </motion.div>

            <div className="grid grid-cols-1 lg:flex lg:flex-row justify-between gap-12 lg:gap-4 relative z-10">
              {[
                {
                  step: "01",
                  icon: Search,
                  title: "Discover",
                  desc: "Understanding your business, audience, competitors and project goals."
                },
                {
                  step: "02",
                  icon: PenTool,
                  title: "Design",
                  desc: "Creating premium UI/UX concepts with modern layouts and brand identity."
                },
                {
                  step: "03",
                  icon: Code,
                  title: "Develop",
                  desc: "Building responsive AI-powered websites using modern technologies."
                },
                {
                  step: "04",
                  icon: Zap,
                  title: "Optimize",
                  desc: "Improving speed, SEO, accessibility, responsiveness and user experience."
                },
                {
                  step: "05",
                  icon: Rocket,
                  title: "Launch",
                  desc: "Deploying the project, testing every device and providing long-term support."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + (i * 0.15) }}
                  className="group relative flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 lg:flex-1"
                >
                  {/* Number Circle with Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-brand-cyan/20 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-20 h-20 rounded-full bg-brand-card border-2 border-white/10 group-hover:border-brand-cyan/50 flex flex-col items-center justify-center relative z-10 transition-colors duration-500 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                      <span className="text-[10px] uppercase tracking-widest text-brand-muted lining-nums group-hover:text-brand-cyan transition-colors duration-300 font-semibold absolute top-3">
                        {item.step}
                      </span>
                      <item.icon className="w-6 h-6 text-brand-text group-hover:text-brand-cyan transition-colors duration-300 mt-2" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 text-center p-6 lg:p-8 rounded-2xl bg-brand-card border border-white/5 backdrop-blur-sm group-hover:border-brand-violet/30 group-hover:bg-brand-card transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] relative overflow-hidden w-full">
                     <div className="absolute inset-0 bg-gradient-to-b from-brand-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="font-serif text-xl text-brand-text mb-3 relative z-10 group-hover:text-brand-cyan transition-colors duration-300">{item.title}</h3>
                    <p className="text-brand-muted text-sm font-light leading-relaxed relative z-10">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vaibhav Studio Section */}
      <section id="why-us" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10 border-t border-white/5">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
            >
              Why Choose Vaibhav Studio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
            >
              Built for Businesses That Want More Than Just a Website
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base md:text-lg font-light leading-relaxed"
            >
              We combine AI-powered workflows, premium design, modern technology and business strategy to create websites that inspire trust and drive real results.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Cpu,
                title: "AI-Powered Workflow",
                desc: "Modern AI-assisted development for faster delivery without compromising quality."
              },
              {
                icon: Layout,
                title: "Premium UI/UX",
                desc: "Luxury interfaces crafted for exceptional user experiences and strong brand perception."
              },
              {
                icon: Smartphone,
                title: "Fully Responsive",
                desc: "Pixel-perfect experiences across desktop, tablet and every mobile device."
              },
              {
                icon: Rocket,
                title: "Performance & SEO",
                desc: "Fast-loading websites optimized for speed, accessibility and search engines."
              },
              {
                icon: Shield,
                title: "Long-Term Support",
                desc: "Reliable maintenance, updates and continuous improvements after project delivery."
              },
              {
                icon: Handshake,
                title: "Transparent Collaboration",
                desc: "Clear communication, milestone-based workflow and complete project transparency."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 + (i * 0.1) }}
                className="group relative flex flex-col p-6 sm:p-8 rounded-2xl bg-brand-card border border-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-brand-card hover:border-brand-violet/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] active:scale-[0.98] active:translate-y-0 overflow-hidden h-full"
              >
                {/* Hover Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-cyan/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="w-14 h-14 rounded-xl bg-brand-bg border border-white/10 flex items-center justify-center mb-6 text-brand-muted group-hover:text-brand-cyan group-hover:border-brand-cyan/40 transition-all duration-300 relative z-10">
                  <feature.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)]" />
                </div>
                
                <h3 className="font-serif text-xl text-brand-text mb-3 relative z-10">{feature.title}</h3>
                
                <p className="text-brand-muted text-sm font-light leading-relaxed flex-grow relative z-10">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 text-center max-w-2xl mx-auto"
          >
            <p className="text-brand-text font-serif text-lg md:text-xl italic">
              "Every project is crafted with precision, transparency and a relentless focus on business growth."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10 border-t border-white/5">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-violet/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
            >
              Client Feedback
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
            >
              Building Long-Term Partnerships Through Exceptional Experiences
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base md:text-lg font-light leading-relaxed"
            >
              Every successful project is built on trust, collaboration and measurable business impact.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                quote: "Working with Vaibhav Studio was smooth, professional and highly collaborative. Every milestone was delivered with attention to detail.",
                label: "Early Client Feedback"
              },
              {
                quote: "The design quality exceeded expectations. Communication remained transparent throughout the entire project.",
                label: "Project Collaboration"
              },
              {
                quote: "Every interaction felt organized, responsive and focused on solving real business problems.",
                label: "Client Experience"
              },
              {
                quote: "The overall experience reflected premium craftsmanship, modern technology and genuine commitment to quality.",
                label: "Business Growth"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 + (i * 0.1) }}
                className="group relative flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl bg-brand-card border border-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-brand-card hover:border-brand-violet/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] active:scale-[0.98] active:translate-y-0 overflow-hidden h-full"
              >
                {/* Hover Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-cyan/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-brand-cyan text-brand-cyan" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/5 group-hover:text-brand-violet/20 transition-colors duration-500" />
                </div>
                
                <p className="font-serif text-lg md:text-xl text-brand-text mb-8 leading-relaxed flex-grow relative z-10 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="mt-auto relative z-10">
                  <div className="h-[1px] w-12 bg-brand-violet/30 mb-4 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-brand-violet group-hover:to-brand-cyan transition-all duration-700 ease-in-out" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-brand-cyan">
                    {testimonial.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 text-center max-w-2xl mx-auto"
          >
            <p className="text-brand-text font-serif text-lg md:text-xl italic">
              "Your success becomes our next success story."
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10 border-t border-white/5">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
            >
              Frequently Asked Questions
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
            >
              Everything You Need to Know Before We Start
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
            >
              Clear answers about our process, timelines, pricing, revisions, support and project delivery.
            </motion.p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What types of websites does Vaibhav Studio build?",
                answer: "We create premium websites for restaurants, salons, clinics, gyms, real estate businesses, personal brands, startups and other service-based businesses."
              },
              {
                question: "How long does a website project usually take?",
                answer: "The timeline depends on project scope and complexity. A focused business website can typically be completed within 7–21 days after requirements and content are finalized."
              },
              {
                question: "Will my website work properly on all devices?",
                answer: "Yes. Every project is tested and optimized for desktop, laptop, tablet, mobile portrait and mobile landscape before launch."
              },
              {
                question: "Can you redesign my existing website?",
                answer: "Yes. We can improve an existing website’s design, responsiveness, performance, structure and overall user experience."
              },
              {
                question: "Do you provide SEO and performance optimization?",
                answer: "Yes. We implement essential on-page SEO, semantic structure, image optimization, responsive design and performance-focused improvements."
              },
              {
                question: "How many revisions are included?",
                answer: "Revision rounds depend on the selected project package. The agreed revision scope and milestones are clearly defined before development begins."
              },
              {
                question: "Do you provide support after the website is launched?",
                answer: "Yes. Ongoing maintenance, updates and support can be provided based on the project and selected support plan."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-2xl bg-brand-card border border-white/5 backdrop-blur-sm transition-all duration-300 ${
                  openFaq === i ? 'border-brand-violet/50 shadow-[0_10px_40px_rgba(139,92,246,0.1)]' : 'hover:border-white/10 hover:bg-brand-card/80'
                }`}
              >
                {/* Active Accent Line */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-violet to-brand-cyan transition-opacity duration-300 ${
                    openFaq === i ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
                
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-inset group"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <h3 className={`font-serif text-lg sm:text-xl pr-8 transition-colors duration-300 ${
                    openFaq === i ? 'text-brand-cyan' : 'text-brand-text group-hover:text-brand-cyan/80'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    openFaq === i 
                      ? 'border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan' 
                      : 'border-white/10 bg-white/5 text-brand-muted group-hover:border-brand-cyan/30 group-hover:text-brand-cyan'
                  }`}>
                    {openFaq === i ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-0">
                        <p className="text-brand-muted text-base font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10 border-t border-white/5">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
            >
              Insights
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
            >
              Ideas, Strategy and Practical Guidance for Modern Businesses
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base md:text-lg font-light leading-relaxed"
            >
              Explore useful insights on AI-powered websites, UI/UX, SEO, performance and digital growth.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                category: 'AI & Web Design',
                title: 'How AI-Powered Websites Help Businesses Launch Faster',
                description: 'Learn how AI-assisted workflows can reduce development time while maintaining premium quality, responsiveness and business-focused design.',
                time: '5 min read',
                gradient: 'from-brand-violet/20 to-brand-cyan/20'
              },
              {
                category: 'UI/UX Strategy',
                title: 'What Makes a Business Website Feel Premium?',
                description: 'Discover how typography, spacing, responsiveness, trust signals and consistent interactions shape a high-quality digital experience.',
                time: '6 min read',
                gradient: 'from-brand-cyan/20 to-brand-teal/20'
              },
              {
                category: 'Website Growth',
                title: '7 Website Improvements That Can Increase Customer Enquiries',
                description: 'Explore practical changes involving calls to action, mobile usability, page speed, credibility and conversion-focused content.',
                time: '7 min read',
                gradient: 'from-brand-violet/20 to-pink-500/20'
              }
            ].map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="group relative flex flex-col rounded-2xl bg-brand-card/50 border border-white/5 overflow-hidden backdrop-blur-sm hover:border-white/10 transition-colors h-full"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-video w-full overflow-hidden bg-brand-bg border-b border-white/5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white/20 group-hover:text-white/40 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)] transition-all duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-sm bg-brand-cyan/10 border border-brand-cyan/20 text-[10px] uppercase tracking-widest text-brand-cyan font-semibold">
                      {insight.category}
                    </span>
                    <span className="text-brand-muted/50 text-xs font-medium flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {insight.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl text-brand-text mb-3 leading-snug group-hover:text-brand-cyan transition-colors lining-nums">
                    {insight.title}
                  </h3>

                  <p className="text-brand-muted text-sm font-light leading-relaxed mb-6 flex-grow">
                    {insight.description}
                  </p>

                  <button 
                    onClick={(e) => { e.preventDefault(); showToast('Full article coming soon.'); }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-text hover:text-brand-cyan transition-colors self-start mt-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                  >
                    Read Insight
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-20 md:py-32 bg-brand-bg overflow-hidden z-10 border-t border-white/5">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-violet/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Content */}
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="text-brand-cyan tracking-[0.2em] text-xs font-semibold uppercase mb-4 block"
              >
                Let’s Build Something Exceptional
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl md:text-5xl text-brand-text leading-tight mb-6"
              >
                Ready to Turn Your Vision Into a Premium Digital Experience?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-muted text-base md:text-lg font-light leading-relaxed mb-12"
              >
                Tell us about your business, goals and project requirements. We’ll help you plan a modern website designed to build trust, attract customers and support long-term growth.
              </motion.p>

              {/* Trust Points */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 mb-16"
              >
                {[
                  "Free Initial Consultation",
                  "Clear Project Roadmap",
                  "Transparent Communication"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan" />
                    <span className="text-brand-text font-medium">{point}</span>
                  </div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8 p-8 rounded-2xl bg-brand-card/50 border border-white/5 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/5 to-brand-cyan/5 pointer-events-none" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-brand-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-muted">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-brand-muted font-semibold mb-1">Email</h4>
                    <p className="text-brand-text font-medium text-lg">hello@vaibhavstudio.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-brand-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-muted">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-brand-muted font-semibold mb-1">Location</h4>
                    <p className="text-brand-text font-medium text-lg">Jaipur, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-brand-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-muted">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-brand-muted font-semibold mb-1">Availability</h4>
                    <p className="text-brand-text font-medium text-lg">Open for selected website projects</p>
                    <p className="text-brand-muted/70 text-sm mt-1">We usually reply within 24–48 hours.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-cyan/5 rounded-3xl blur-[40px] pointer-events-none" />
              
              <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-brand-card border border-white/5 backdrop-blur-xl shadow-2xl">
                
                {isSubmitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center text-center py-20 h-full"
                  >
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-20 h-20 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-brand-cyan" />
                    </motion.div>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-text mb-4">Inquiry Received</h3>
                    <p className="text-brand-muted text-base leading-relaxed">
                      Thank you. Your project inquiry has been received. We will review your details and get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitSuccess(false)}
                      className="mt-8 px-6 py-3 border border-white/10 text-brand-muted hover:text-brand-text hover:bg-white/5 rounded-sm uppercase tracking-widest text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs uppercase tracking-widest font-semibold text-brand-muted ml-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          className={`w-full min-h-[50px] px-4 rounded-xl bg-brand-bg border transition-all duration-300 focus:outline-none focus:ring-1 text-brand-text placeholder:text-brand-muted/40 ${
                            formErrors.name 
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-brand-cyan/50 focus:ring-brand-cyan/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                          }`}
                          placeholder="Jane Doe"
                        />
                        <AnimatePresence>
                        {formErrors.name && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -5 }} 
                            className="text-xs text-red-400 flex items-center gap-1 ml-1 mt-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {formErrors.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      </div>

                      {/* Business */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="business" className="text-xs uppercase tracking-widest font-semibold text-brand-muted ml-1">
                          Business Name
                        </label>
                        <input
                          type="text"
                          id="business"
                          name="business"
                          value={formData.business}
                          onChange={handleFormChange}
                          className={`w-full min-h-[50px] px-4 rounded-xl bg-brand-bg border transition-all duration-300 focus:outline-none focus:ring-1 text-brand-text placeholder:text-brand-muted/40 ${
                            formErrors.business 
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-brand-cyan/50 focus:ring-brand-cyan/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                          }`}
                          placeholder="Jane's Cafe"
                        />
                        <AnimatePresence>
                        {formErrors.business && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -5 }} 
                            className="text-xs text-red-400 flex items-center gap-1 ml-1 mt-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {formErrors.business}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs uppercase tracking-widest font-semibold text-brand-muted ml-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className={`w-full min-h-[50px] px-4 rounded-xl bg-brand-bg border transition-all duration-300 focus:outline-none focus:ring-1 text-brand-text placeholder:text-brand-muted/40 ${
                            formErrors.email 
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-brand-cyan/50 focus:ring-brand-cyan/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                          }`}
                          placeholder="jane@example.com"
                        />
                        <AnimatePresence>
                        {formErrors.email && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -5 }} 
                            className="text-xs text-red-400 flex items-center gap-1 ml-1 mt-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {formErrors.email}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs uppercase tracking-widest font-semibold text-brand-muted ml-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className={`w-full min-h-[50px] px-4 rounded-xl bg-brand-bg border transition-all duration-300 focus:outline-none focus:ring-1 text-brand-text placeholder:text-brand-muted/40 ${
                            formErrors.phone 
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-brand-cyan/50 focus:ring-brand-cyan/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                          }`}
                          placeholder="+1 (555) 000-0000"
                        />
                        <AnimatePresence>
                        {formErrors.phone && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -5 }} 
                            className="text-xs text-red-400 flex items-center gap-1 ml-1 mt-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Project Type */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="projectType" className="text-xs uppercase tracking-widest font-semibold text-brand-muted ml-1">
                          Project Type
                        </label>
                        <div className="relative">
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleFormChange}
                            className={`w-full min-h-[50px] px-4 appearance-none rounded-xl bg-brand-bg border transition-all duration-300 focus:outline-none focus:ring-1 text-brand-text ${
                              formErrors.projectType 
                                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                                : 'border-white/10 focus:border-brand-cyan/50 focus:ring-brand-cyan/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                            }`}
                          >
                            <option value="" disabled className="text-brand-muted/40">Select Type...</option>
                            <option value="Restaurant Website">Restaurant Website</option>
                            <option value="Salon Website">Salon Website</option>
                            <option value="Clinic Website">Clinic Website</option>
                            <option value="Gym Website">Gym Website</option>
                            <option value="Real Estate Website">Real Estate Website</option>
                            <option value="Portfolio Website">Portfolio Website</option>
                            <option value="Business Landing Page">Business Landing Page</option>
                            <option value="Website Redesign">Website Redesign</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-brand-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <AnimatePresence>
                        {formErrors.projectType && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -5 }} 
                            className="text-xs text-red-400 flex items-center gap-1 ml-1 mt-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {formErrors.projectType}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      </div>

                      {/* Estimated Budget */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="budget" className="text-xs uppercase tracking-widest font-semibold text-brand-muted ml-1">
                          Estimated Budget
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleFormChange}
                            className={`w-full min-h-[50px] px-4 appearance-none rounded-xl bg-brand-bg border transition-all duration-300 focus:outline-none focus:ring-1 text-brand-text ${
                              formErrors.budget 
                                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                                : 'border-white/10 focus:border-brand-cyan/50 focus:ring-brand-cyan/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                            }`}
                          >
                            <option value="" disabled className="text-brand-muted/40">Select Budget...</option>
                            <option value="Under ₹10,000">Under ₹10,000</option>
                            <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                            <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                            <option value="₹50,000+">₹50,000+</option>
                            <option value="Not decided yet">Not decided yet</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-brand-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <AnimatePresence>
                        {formErrors.budget && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -5 }} 
                            className="text-xs text-red-400 flex items-center gap-1 ml-1 mt-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {formErrors.budget}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2 mt-2">
                      <label htmlFor="details" className="text-xs uppercase tracking-widest font-semibold text-brand-muted ml-1">
                        Project Details
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleFormChange}
                        rows={5}
                        className={`w-full p-4 rounded-xl bg-brand-bg border transition-all duration-300 focus:outline-none focus:ring-1 text-brand-text placeholder:text-brand-muted/40 resize-none ${
                          formErrors.details 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                            : 'border-white/10 focus:border-brand-cyan/50 focus:ring-brand-cyan/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                        }`}
                        placeholder="Tell us about your project goals, target audience, and any specific requirements..."
                      />
                      <AnimatePresence>
                        {formErrors.details && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -5 }} 
                            className="text-xs text-red-400 flex items-center gap-1 ml-1 mt-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {formErrors.details}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-4 w-full min-h-[56px] group relative flex items-center justify-center gap-3 px-8 bg-gradient-to-r from-brand-violet to-brand-cyan text-white uppercase tracking-widest text-sm font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(139,92,246,0.25)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Book a Free Consultation
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                      {!isSubmitting && (
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-brand-muted/50 mt-2">
                      This form is for demonstration purposes.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      </main>
      {/* Footer Section */}
      <footer className="relative bg-[#050505] pt-20 pb-8 border-t border-white/5 overflow-hidden z-10">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen flex justify-center">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[150px] -translate-y-1/2" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-violet/10 rounded-full blur-[150px] -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 mb-12 md:mb-16">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-violet to-brand-cyan rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-serif text-xl font-bold tracking-tight text-white">Vaibhav Studio</span>
              </div>
              <p className="text-brand-muted text-sm font-light leading-relaxed mb-6 max-w-xs">
                AI-powered websites crafted with premium design, modern technology and a clear focus on business growth.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-semibold">Available for selected projects</span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="flex flex-col">
              <h4 className="text-white font-serif text-lg mb-6">Navigation</h4>
              <ul className="flex flex-col gap-3">
                {['Home', 'About', 'Services', 'Work', 'Process', 'FAQ', 'Contact'].map((item) => {
                  const targetId = item === 'Home' ? 'hero' : 
                                   item === 'About' ? 'agency' : 
                                   item === 'Services' ? 'expertise' : 
                                   item.toLowerCase();
                  return (
                    <li key={item}>
                      <a 
                        href={`#${targetId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-brand-muted hover:text-brand-cyan transition-colors duration-300 text-sm font-light inline-block relative group"
                      >
                        {item}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="flex flex-col">
              <h4 className="text-white font-serif text-lg mb-6">Services</h4>
              <ul className="flex flex-col gap-3">
                {[
                  'Business Websites',
                  'Website Redesign',
                  'Landing Pages',
                  'Portfolio Websites',
                  'Responsive Optimization',
                  'Website Maintenance'
                ].map((item) => (
                  <li key={item}>
                    <span className="text-brand-muted hover:text-brand-violet transition-colors duration-300 text-sm font-light cursor-default">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Social */}
            <div className="flex flex-col">
              <h4 className="text-white font-serif text-lg mb-6">Contact</h4>
              <div className="flex flex-col gap-4 mb-8">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-brand-muted lining-nums font-semibold mb-1">Email</span>
                  <a href="mailto:hello@vaibhavstudio.com" className="text-sm text-brand-text hover:text-brand-cyan transition-colors duration-300">
                    hello@vaibhavstudio.com
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-brand-muted lining-nums font-semibold mb-1">Location</span>
                  <span className="text-sm text-brand-text">Jaipur, India</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-brand-muted lining-nums font-semibold mb-1">Response Time</span>
                  <span className="text-sm text-brand-text">Usually within 24–48 hours</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => { e.preventDefault(); showToast('LinkedIn profile coming soon.'); }}
                  aria-label="LinkedIn profile coming soon" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300 group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                >
                  <Linkedin className="w-4 h-4 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)] transition-transform" />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); showToast('GitHub profile coming soon.'); }}
                  aria-label="GitHub profile coming soon" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                >
                  <Github className="w-4 h-4 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)] transition-transform" />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); showToast('Instagram profile coming soon.'); }}
                  aria-label="Instagram profile coming soon" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10 transition-all duration-300 group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)] transition-transform" />
                </button>
                <a href="mailto:hello@vaibhavstudio.com" aria-label="Email" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-brand-violet hover:border-brand-violet/50 hover:bg-brand-violet/10 transition-all duration-300 group active:scale-95">
                  <Mail className="w-4 h-4 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)] transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
              <span className="text-xs text-brand-muted font-light">
                © 2026 Vaibhav Studio. All rights reserved.
              </span>
              <div className="flex items-center gap-4">
                <button onClick={(e) => { e.preventDefault(); showToast('Privacy Policy coming soon.'); }} className="text-xs text-brand-muted hover:text-white transition-colors duration-300">Privacy Policy</button>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <button onClick={(e) => { e.preventDefault(); showToast('Terms of Service coming soon.'); }} className="text-xs text-brand-muted hover:text-white transition-colors duration-300">Terms of Service</button>
              </div>
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/30 hover:bg-brand-cyan/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50"
              aria-label="Back to top"
            >
              <span className="text-xs font-medium uppercase tracking-widest">Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 px-6 py-3 rounded-full bg-brand-card border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-sm font-medium text-brand-text whitespace-nowrap">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
