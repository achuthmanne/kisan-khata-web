"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Globe, ChevronDown, ExternalLink, ShieldCheck, CheckCircle2, Share2, ArrowLeft, PencilLine, User, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function InternshipPage() {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", role: "", college: "", village: "", motivation: ""
  });
  const [formStep, setFormStep] = useState<"checking" | "edit" | "preview" | "submitting" | "success" | "approved">("checking");
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [loginMode, setLoginMode] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("kisan_khata_email");
    if (savedEmail) {
      checkStatus(savedEmail);
    } else {
      setFormStep("edit");
    }
  }, []);

  const checkStatus = async (email: string) => {
    setFormStep("checking");
    try {
      const res = await fetch(`/api/internship/status?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (res.ok) {
        setUserData(data);
        if (data.status === "Approved") {
          setFormStep("approved");
        } else {
          setFormStep("success"); // We use "success" to denote pending review UI
        }
        setFormData(prev => ({ ...prev, name: data.name }));
      } else {
        localStorage.removeItem("kisan_khata_email");
        setFormStep("edit");
      }
    } catch (err) {
      console.error(err);
      setFormStep("edit");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (loginEmail && loginEmail.includes("@")) {
      localStorage.setItem("kisan_khata_email", loginEmail.trim().toLowerCase());
      checkStatus(loginEmail.trim().toLowerCase());
    } else {
      setErrorMsg("Please enter a valid email address.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kisan_khata_email");
    setUserData(null);
    setFormData({ name: "", phone: "", email: "", role: "", college: "", village: "", motivation: "" });
    setLoginEmail("");
    setLoginMode(false);
    setFormStep("edit");
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    const { name, phone, email, role, village, motivation } = formData;

    // 1. Mandatory Fields Check
    if (!name.trim() || !phone.trim() || !email.trim() || !role || !village.trim() || !motivation.trim()) {
      setErrorMsg("Please fill in all mandatory fields.");
      return;
    }

    // 2. Name Validation (At least 3 chars, letters and spaces only)
    const nameRegex = /^[A-Za-z\s.]{3,50}$/;
    if (!nameRegex.test(name.trim())) {
      setErrorMsg("Please enter a valid full name (min 3 characters, letters only).");
      return;
    }

    // 3. Phone Number Validation (Exactly 10 digits, starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, ''); // strip non-digits
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    // 4. Email Validation (Strict formatting)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      setErrorMsg("Please enter a valid email address (e.g., name@gmail.com).");
      return;
    }

    // 5. Village Validation
    if (village.trim().length < 3) {
      setErrorMsg("Please enter a valid village or town name.");
      return;
    }

    // Update form data to sanitized versions before preview
    setFormData({
      ...formData,
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim().toLowerCase(),
      village: village.trim(),
      college: formData.college.trim(),
      motivation: motivation.trim()
    });

    setFormStep("preview");
  };

  const handleConfirmSubmit = async () => {
    setFormStep("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/internship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.status === 409) {
        setLoginEmail(formData.email);
        setLoginMode(true);
        setErrorMsg(data.error || "This email or phone number is already registered. Please check your status.");
        setFormStep("edit");
        return;
      }
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }
      
      localStorage.setItem("kisan_khata_email", formData.email);
      setUserData({ name: formData.name });
      setFormStep("success");
    } catch (err: any) {
      setErrorMsg(err.message);
      setFormStep("preview");
    }
  };

  // As requested, language is always English on this page.
  const language = "en";

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Kisan Khata Internship",
          text: "Calling all passionate students! Join the Govt-recognized Kisan Khata internship to make a real impact in your village and earn a verified certificate.",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation - Exact match to Home Page but with Apply Now button */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-8 md:px-12 py-2 max-w-[1600px] mx-auto w-full">
          <Link 
            href="/" 
            className="flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
          >
            <div className="w-16 h-10 flex items-center justify-center shrink-0 relative overflow-visible">
              <img src="/logo.png" alt="Kisan Khata Logo" className="w-full h-full object-contain scale-[2.5] origin-center" />
            </div>
            <span className="text-[13px] md:text-[15px] font-heading font-extrabold text-green-900 tracking-tight leading-none z-10 -mt-0.5">
              Kisan Khata
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 lg:gap-14 text-lg font-medium text-gray-500">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/#features" className="transition-colors hover:text-primary">
              Features
            </Link>
            <span className="transition-colors text-primary font-bold">
              Internship
            </span>
            <Link href="/#certificate" className="transition-colors hover:text-primary">
              Certificates
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Auto-selected to EN - static dropdown visual */}
            <div className="relative">
              <div className="flex items-center gap-2 px-4 py-2.5 text-base font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-lg opacity-70 cursor-not-allowed">
                <Globe size={18} className="text-primary" />
                <span className="leading-none">English</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Changed to Apply Now with Send icon and Emerald theme */}
            <AnimatePresence mode="wait">
              {formStep === "success" || formStep === "approved" ? (
                <motion.div 
                  key="account"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white text-slate-800 border border-slate-200 px-5 py-2.5 h-11 rounded-lg font-bold text-base flex items-center gap-2.5 shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline">
                    {formData.name.split(' ')[0]}
                  </span>
                </motion.div>
              ) : (
                <motion.a 
                  key="apply"
                  href="#apply-internship" 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-emerald-700 text-white px-8 py-2.5 h-11 rounded-lg font-medium text-base hover:bg-emerald-800 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send size={18} />
                  <span className="hidden sm:inline">
                    Apply Now
                  </span>
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Hero Banner - Blends directly into white background */}
      <main className="w-full pt-16 md:pt-20 px-4 md:px-8 bg-white relative z-10">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center rounded-3xl overflow-hidden"
          >
            <img 
              src="/int banner.png" 
              alt="Kisan Khata Internship Banner" 
              className="w-full h-auto object-cover rounded-3xl" 
            />
          </motion.div>
        </div>
      </main>
      
      {/* About the Internship Section - Moderate Gap */}
      <section className="w-full bg-white pb-16 pt-10 md:pt-12 px-6 md:px-12 border-b border-gray-100 overflow-hidden relative z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-emerald-950 tracking-tight">
              About the Internship
            </h2>
            <div className="w-24 h-1.5 bg-emerald-700 mx-auto mt-6 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            
            {/* Point 1: Program Name */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-3 font-heading">Program Name</h3>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                Agri-Tech Field Operations Internship
              </p>
            </motion.div>

            {/* Point 2: Conducted By */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-3 font-heading">Conducted By</h3>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                Kisan Khata
              </p>
            </motion.div>

            {/* Point 3: The Work */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-3 font-heading">The Goal</h3>
              <p className="text-base text-gray-600 font-medium leading-relaxed">
                Onboarding agricultural assets and bringing farmers into our digital ecosystem.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Motivation Section - Deep Emerald Green with Waves */}
      <section className="relative w-full bg-emerald-900 pt-32 pb-36 px-6 md:px-12 text-white overflow-hidden">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
          <svg className="relative block w-[200%] md:w-full h-15 md:h-25" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight mb-6">
              Shape the Future <br className="hidden md:block" />
              <span className="text-emerald-300">of Agri-Tech</span>
            </h2>
            <p className="text-lg md:text-xl text-emerald-50/90 leading-relaxed font-medium mb-8">
              At Kisan Khata, we aren't just building software; we are digitizing the backbone of our country. As an intern, you won't be fetching coffee—you will be at the forefront of rural innovation.
            </p>
            <p className="text-lg md:text-xl text-emerald-50/90 leading-relaxed font-medium">
              You will work directly with farmers, deploy technology in real fields, and gain hands-on operational experience that no classroom can ever teach.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col gap-10"
          >
            <div className="flex items-start gap-6 group">
              <span className="text-3xl font-heading font-extrabold text-yellow-500/90 tracking-tighter mt-1 group-hover:text-yellow-400 transition-colors">01.</span>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 font-heading tracking-wide">Real Impact</h4>
                <p className="text-emerald-100/90 leading-relaxed font-medium text-lg">See how your daily work directly improves the financial lives and efficiency of local farmers.</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <span className="text-3xl font-heading font-extrabold text-yellow-500/90 tracking-tighter mt-1 group-hover:text-yellow-400 transition-colors">02.</span>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 font-heading tracking-wide">Field Experience</h4>
                <p className="text-emerald-100/90 leading-relaxed font-medium text-lg">Step out of the lab and into the real world of Agri-Tech operations and rural engagement.</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <span className="text-3xl font-heading font-extrabold text-yellow-500/90 tracking-tighter mt-1 group-hover:text-yellow-400 transition-colors">03.</span>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 font-heading tracking-wide">Career Growth</h4>
                <p className="text-emerald-100/90 leading-relaxed font-medium text-lg">Get certified by a pioneering startup and build a resume that stands out in the tech industry.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 rotate-180">
          <svg className="relative block w-[200%] md:w-full h-15 md:h-25" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-blue-50"></path>
          </svg>
        </div>
      </section>

      {/* Verification Section - MSME Theme */}
      <section className="w-full bg-blue-50 pt-20 md:pt-28 pb-20 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              100% Authentic. <span className="text-emerald-800">100% Verified.</span>
            </h2>
            <div className="w-24 h-1.5 bg-emerald-800 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* MSME & Scanner Block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-blue-100 flex flex-col items-center text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-800"></div>
              
              <div className="flex items-center gap-1 mb-6">
                <img src="/logo.png" alt="Kisan Khata Logo" className="h-20 md:h-28 w-auto object-contain -ml-4" />
                <div className="flex flex-col items-start -ml-2">
                  <div className="flex items-center">
                    <span className="text-xl md:text-2xl font-bold text-slate-900 leading-none font-heading">Kisan Khata</span>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-slate-500 tracking-wider mt-1">UDYAM REG. VERIFIED</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-4">Govt. Recognized Startup</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                Officially registered under the Ministry of MSME, Govt. of India. Scan the Udyam QR below to instantly verify our corporate authenticity.
              </p>
              
              <div className="relative p-2 bg-white rounded-2xl border-2 border-dashed border-emerald-800/30 group-hover:border-emerald-800 transition-colors">
                <img 
                  src="/udyam verify qr.png" 
                  alt="MSME Udyam Verification QR Scanner" 
                  className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-xl relative z-10 bg-white"
                />
              </div>
              <p className="mt-4 text-sm font-bold text-emerald-800 uppercase tracking-widest">Scan to Verify</p>
            </motion.div>

            {/* LinkedIn Block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-blue-100 flex flex-col text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#0A66C2]"></div>

              <div className="w-14 h-14 bg-[#0A66C2]/10 text-[#0A66C2] rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-4">LinkedIn Ready Certification</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                Yes, your hard work counts! Every graduate of this internship receives an official Certificate of Completion with a unique verifiable ID.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A66C2]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-semibold mb-0.5">Verified Credential</p>
                  <p className="text-slate-900 font-bold">Add to LinkedIn Profile</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle Background Pattern or Shape */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
              The Path to <span className="text-emerald-800">Certification</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Your mission in the field is clear. Connect the agricultural ecosystem and track your exact progress to graduation.
            </p>
            <div className="w-24 h-1.5 bg-emerald-800 mx-auto mt-8 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 relative group hover:border-emerald-500 transition-colors"
            >
              <div className="absolute -top-6 left-8 w-14 h-14 bg-emerald-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold font-heading">1</div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900 font-heading mb-4 group-hover:text-emerald-800 transition-colors">Onboard</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Connect with the community. Install the Kisan Khata app directly onto the smartphones of farmers, vehicle owners, or labor gangs.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 relative group hover:border-emerald-500 transition-colors"
            >
              <div className="absolute -top-6 left-8 w-14 h-14 bg-emerald-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold font-heading">2</div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900 font-heading mb-4 group-hover:text-emerald-800 transition-colors">Register</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Use <strong>AgriConnect</strong>. Register any farm machine, vehicle, or kuli mestri. Or, help a farmer complete their profile and use a feature.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 relative group hover:border-emerald-500 transition-colors"
            >
              <div className="absolute -top-6 left-8 w-14 h-14 bg-emerald-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold font-heading">3</div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900 font-heading mb-4 group-hover:text-emerald-800 transition-colors">Fill the Circle</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Use your Referral Code! Track your target progress live on our portal. Keep adding value until your <strong>Progress Circle</strong> hits 100% to earn your certificate.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Who & Where - Deep Emerald Theme */}
      <section className="w-full relative bg-emerald-900 flex flex-col">
        
        {/* Layered Exciting Top Wave from White */}
        <div className="w-full overflow-hidden leading-0 -mt-px">
          <svg className="relative block w-[200%] md:w-full h-15 md:h-25" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-6 md:mt-10 flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              100% Free Internship. <br className="md:hidden" /><span className="text-yellow-400">Open For Everyone.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Who Block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 md:p-12 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-emerald-800 font-heading mb-6">
                Who Can Do This?
              </h3>
              <p className="text-slate-700 font-medium leading-relaxed text-lg">
                <strong>Anyone can apply!</strong> Whether you are a student, a graduate, or simply someone who wants to support agriculture, this free internship is for you. Complete the simple tasks and we will award you a prestigious Govt-Verified Certificate. <strong>Apply right now!</strong>
              </p>
            </motion.div>

            {/* Where Block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 md:p-12 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-emerald-800 font-heading mb-6">
                Where To Do It?
              </h3>
              <p className="text-slate-700 font-medium leading-relaxed text-lg">
                <strong>Do it from your own village!</strong> There is absolutely no need to travel to a corporate office or a distant city. You can complete this internship exclusively in your <span className="text-emerald-800 font-bold">own village</span> or <span className="text-emerald-800 font-bold">neighboring villages</span>. Transform your own community today!
              </p>
            </motion.div>
          </div>
        </div>

        {/* NEW Support & Share Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-6 mt-20 pb-12 w-full text-center border-t border-emerald-800/60 pt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Still have doubts? Or want to invite friends?</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/919493959557?text=Hi%20Kisan%20Khata,%20I%20am%20interested%20in%20the%20Internship!" target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-emerald-900 px-8 py-3.5 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              WhatsApp Us
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kisankhata.official@gmail.com" target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center justify-center gap-3 bg-slate-800 text-white border border-slate-700 px-8 py-3.5 rounded-full font-bold hover:bg-slate-700 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email Support
            </a>
            <button onClick={handleShare} className="w-full md:w-auto flex items-center justify-center gap-3 bg-yellow-500 text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
              Share with Friends
            </button>
          </div>
        </motion.div>

        {/* Layered Exciting Bottom Wave into White Form */}
        <div className="w-full overflow-hidden leading-0 -mb-px rotate-180 mt-auto">
          <svg className="relative block w-[200%] md:w-full h-15 md:h-25" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Application Form Section */}
      <div id="apply-internship" className="w-full min-h-screen bg-white py-16 px-4 md:px-8 flex items-center justify-center">
        
        {/* Main Split Container - With Light Border */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-7xl flex flex-col md:flex-row md:min-h-[1000px] border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white"
        >
          
          {/* Left Side - The Image */}
          <div className="w-full md:w-5/12 lg:w-5/12 relative bg-slate-50 min-h-[300px] md:min-h-full">
            <img 
              src="/form image.png" 
              alt="Internship Form Banner" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Application Form */}
          <div className="w-full md:w-7/12 lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white md:min-h-[1000px]">
            <div className="w-full">
              
              {/* Header */}
              <div className="mb-10">
                <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-emerald-800 tracking-tight mb-2">
                  Kisan Khata
                </h3>
                <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
                  Agri-Tech Field Operations Internship
                </h4>
                <p className="text-slate-500 font-medium text-base">
                  Please fill in your details below to apply for the program.
                </p>
              </div>

              {/* Application Status / Form */}
              {formStep === "checking" ? (
                <div className="flex flex-col items-center justify-center py-32">
                  <svg className="animate-spin h-10 w-10 text-emerald-700 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-slate-500 font-medium">Checking application status...</p>
                </div>
              ) : formStep === "approved" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 flex flex-col items-center text-center mt-4"
                >
                  <div className="w-24 h-24 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={48} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-3xl font-extrabold text-emerald-900 mb-2 font-heading tracking-tight">Congratulations!</h4>
                  <p className="text-emerald-700 font-bold text-xl mb-3">You are Selected.</p>
                  <p className="text-slate-600 font-medium text-base mb-8 max-w-sm">
                    {userData?.name.split(' ')[0]}, your application has been approved! Welcome to the Kisan Khata Field Operations Team.
                  </p>
                  
                  <div className="w-full bg-white border border-emerald-200 rounded-2xl p-6 mb-8 text-left shadow-sm">
                    <h5 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-3">Your Referral Code</h5>
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-2xl font-extrabold text-emerald-800 font-mono tracking-widest">{userData?.referralCode || "PENDING"}</span>
                      <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm">Copy</button>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-3">Use this code to track your field work and referrals. More tracking features coming soon!</p>
                  </div>
                  
                  <button 
                    onClick={handleShare}
                    className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm mb-4"
                  >
                    <Share2 size={20} />
                    Invite Your Friends
                  </button>
                  <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-700 underline decoration-slate-300 underline-offset-4">
                    Not {userData?.name.split(' ')[0]}? Apply for a new internship
                  </button>
                </motion.div>
              ) : formStep === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-10 flex flex-col items-center text-center mt-4"
                >
                  <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
                    <User size={48} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-3xl font-extrabold text-slate-900 mb-2 font-heading tracking-tight">Under Review</h4>
                  <p className="text-slate-600 font-medium text-lg mb-6 max-w-sm">
                    Thank you, {userData?.name?.split(' ')[0] || formData.name.split(' ')[0]}. Your application is currently being reviewed by our team. You will be notified once a decision is made.
                  </p>
                  
                  <div className="inline-flex items-center justify-center gap-3 bg-slate-200/50 text-slate-700 px-6 py-3 rounded-full font-medium mb-8 text-sm border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <span>Check your email for the official confirmation.</span>
                  </div>
                  
                  <div className="w-full h-px bg-slate-200 mb-8"></div>
                  
                  <h5 className="text-slate-800 font-bold mb-4">Help us grow the community!</h5>
                  <button 
                    onClick={handleShare}
                    className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm mb-4"
                  >
                    <Share2 size={20} />
                    Invite Your Friends
                  </button>
                  <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-700 underline decoration-slate-300 underline-offset-4">
                    Not {userData?.name?.split(' ')[0] || formData.name.split(' ')[0]}? Apply for a new internship
                  </button>
                </motion.div>
              ) : formStep === "preview" || formStep === "submitting" ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mt-4"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-slate-800 font-heading">Review Details</h4>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</span>
                      <span className="text-slate-800 font-medium">{formData.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</span>
                      <span className="text-slate-800 font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</span>
                      <span className="text-slate-800 font-medium">{formData.email}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Role</span>
                        <span className="text-slate-800 font-medium capitalize">{formData.role}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Village</span>
                        <span className="text-slate-800 font-medium">{formData.village}</span>
                      </div>
                    </div>
                    {formData.college && (
                      <div className="flex flex-col mt-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">College/Org</span>
                        <span className="text-slate-800 font-medium">{formData.college}</span>
                      </div>
                    )}
                    <div className="flex flex-col mt-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Motivation</span>
                      <span className="text-slate-800 font-medium italic">"{formData.motivation}"</span>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full">
                    <button 
                      onClick={() => setFormStep("edit")} 
                      className={`bg-white text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center overflow-hidden shrink-0 ${
                        formStep === "submitting" ? "w-0 opacity-0 border-0 py-4" : "w-1/3 opacity-100 border border-slate-300 py-4"
                      }`}
                    >
                      <ArrowLeft size={20} className="shrink-0" />
                    </button>
                    <button 
                      onClick={handleConfirmSubmit}
                      disabled={formStep === "submitting"} 
                      className={`bg-emerald-800 text-white text-lg font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap ${
                        formStep === "submitting" ? "w-full" : "w-2/3"
                      }`}
                    >
                      {formStep === "submitting" ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Confirm & Submit</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : loginMode ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 mt-4 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User size={36} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 mb-2 font-heading">Check Your Status</h4>
                  <p className="text-slate-500 font-medium text-sm mb-8 max-w-sm mx-auto">
                    Please enter the email address you used during your internship registration to securely access your portal.
                  </p>
                  
                  <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-sm mx-auto">
                    {errorMsg && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium text-sm text-left">
                        {errorMsg}
                      </div>
                    )}
                    <input 
                      type="email" 
                      required 
                      value={loginEmail} 
                      onChange={(e) => setLoginEmail(e.target.value)} 
                      placeholder="Enter your email address" 
                      className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-white placeholder:text-slate-400 text-center" 
                    />
                    <button type="submit" className="w-full bg-emerald-800 text-white text-lg font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-sm flex items-center justify-center gap-2">
                      Check Status <ArrowLeft className="rotate-180" size={18} />
                    </button>
                  </form>
                  
                  <button onClick={() => { setLoginMode(false); setErrorMsg(""); setLoginEmail(""); }} className="mt-8 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors flex items-center justify-center gap-2 mx-auto">
                    <ArrowLeft size={16} /> Back to Application
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handlePreview}>
                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium text-sm">
                      {errorMsg}
                    </div>
                  )}
                  
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-base font-bold text-slate-700 mb-2">Full Name <span className="text-red-500 ml-0.5">*</span></label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter your full name" className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 placeholder:text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                      This exact name will be printed on your Internship Certificate.
                    </p>
                  </div>

                  {/* Field 2: Phone Number */}
                  <div>
                    <label className="block text-base font-bold text-slate-700 mb-2">Phone Number <span className="text-red-500 ml-0.5">*</span></label>
                    <input type="tel" maxLength={10} required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})} placeholder="WhatsApp Number (e.g. 9876543210)" className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 placeholder:text-slate-400" />
                  </div>

                  {/* Field 3: Email Address */}
                  <div>
                    <label className="block text-base font-bold text-slate-700 mb-2">Email Address <span className="text-red-500 ml-0.5">*</span></label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Your active email ID" className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 placeholder:text-slate-400" />
                  </div>

                  {/* Field 4: Current Role */}
                  <div>
                    <label className="block text-base font-bold text-slate-700 mb-2">Current Status / Role <span className="text-red-500 ml-0.5">*</span></label>
                    <div className="relative">
                      <select required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 text-slate-700 appearance-none">
                        <option value="" disabled>Select your current status</option>
                        <option value="student">College Student</option>
                        <option value="graduate">Recent Graduate</option>
                        <option value="working">Working Professional</option>
                        <option value="volunteer">Volunteer / Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Field 4: College/Organization (Optional) */}
                  <div>
                    <label className="block text-base font-bold text-slate-700 mb-2">
                      College / Organization Name <span className="text-slate-400 font-normal text-sm ml-1">(Optional)</span>
                    </label>
                    <input type="text" value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} placeholder="Where do you study or work?" className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 placeholder:text-slate-400" />
                  </div>

                  {/* Field 5: Village/Town */}
                  <div>
                    <label className="block text-base font-bold text-slate-700 mb-2">Village / Town Name <span className="text-red-500 ml-0.5">*</span></label>
                    <input type="text" required value={formData.village} onChange={(e) => setFormData({...formData, village: e.target.value})} placeholder="Enter your native village or town" className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 placeholder:text-slate-400" />
                  </div>

                  {/* Field 6: Motivation */}
                  <div>
                    <label className="block text-base font-bold text-slate-700 mb-2">Why do you want to join Kisan Khata? <span className="text-red-500 ml-0.5">*</span></label>
                    <textarea required value={formData.motivation} onChange={(e) => setFormData({...formData, motivation: e.target.value})} placeholder="Tell us how this internship will help you and why you want to work with farmers..." rows={4} className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 placeholder:text-slate-400 resize-none"></textarea>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm font-medium text-red-500 mb-3">
                      <span className="font-bold">*</span> Indicates mandatory fields
                    </p>
                    <button type="submit" className="w-full bg-emerald-800 text-white text-lg font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-sm flex items-center justify-center gap-2">
                      Preview Application <ArrowLeft className="rotate-180" size={18} />
                    </button>
                    <div className="mt-6 text-center">
                      <p className="text-slate-500 font-medium text-sm">
                        Already applied? <button onClick={() => { setLoginMode(true); setErrorMsg(""); }} type="button" className="text-emerald-700 font-bold hover:underline">Check your status here.</button>
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          
        </motion.div>
      </div>

      {/* Unique Minimal Footer for Internship Page */}
      <footer className="w-full relative bg-slate-50 pt-24 pb-12 px-6 overflow-hidden">
        {/* Top Wave Transition from White (Form) to Slate-50 (Footer) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
          <svg className="relative block w-[200%] md:w-full h-10 md:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-center md:text-left relative z-10">
          
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-20 h-12 flex items-center md:justify-start justify-center shrink-0 overflow-visible z-20">
              <img src="/logo.png" alt="Kisan Khata Logo" className="w-full h-full object-contain scale-[2.2] md:origin-left origin-center" />
            </div>
            <h4 className="text-2xl font-heading font-extrabold text-slate-800 mt-2">Kisan Khata</h4>
            <p className="text-slate-500 font-medium mt-1">The digital ledger for modern agriculture</p>
          </div>
          
          {/* Column 2: Contact Us */}
          <div className="flex flex-col items-center md:items-start">
            <h5 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Contact Us</h5>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kisankhata.official@gmail.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-red-600 transition-colors text-base font-medium flex items-center gap-2 mb-3 bg-white px-5 py-2.5 rounded-full border border-slate-200 hover:border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EA4335]"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email Support
            </a>
            <a href="https://wa.me/919493959557?text=Hi%20Kisan%20Khata,%20I%20have%20a%20query!" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-emerald-700 transition-colors text-base font-medium flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-200 hover:border-emerald-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#25D366]"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              WhatsApp Us
            </a>
          </div>
          
          {/* Column 3: Follow Us */}
          <div className="flex flex-col items-center md:items-start">
            <h5 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Follow Us On</h5>
            <div className="flex items-center gap-4">
              {/* Original Instagram Gradient */}
              <a href="https://instagram.com/kisankhata.official" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform hover:-translate-y-1" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }} title="Kisan Khata on Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* Original LinkedIn Blue */}
              <a href="https://www.linkedin.com/in/manne-achuth-629394332/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#0A66C2] transition-transform hover:-translate-y-1" title="Connect with Founder">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-3 text-center md:text-left">Connect with our<br/>Founder on LinkedIn</p>
          </div>
          
        </div>
        
        {/* Copyright */}
        <div className="max-w-5xl mx-auto w-full mt-12 pt-8 border-t border-slate-200 flex flex-col items-center">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Kisan Khata. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
