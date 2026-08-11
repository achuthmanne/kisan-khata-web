"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Globe, Send, User, Menu, X } from "lucide-react";

export default function CertificatePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const checkStatus = async (email: string) => {
      try {
        const res = await fetch(`/api/internship/status?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        }
      } catch (err) {
        console.error("Error fetching status:", err);
      }
    };

    const storedEmail = localStorage.getItem("kisan_khata_email");
    if (storedEmail) {
      checkStatus(storedEmail);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navigation - Exact match to Internship Page */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-2 max-w-[1600px] mx-auto w-full">
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
            <Link href="/internship" className="transition-colors hover:text-primary">
              Internship
            </Link>
            <span className="transition-colors text-primary font-bold">
              Certificates
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Auto-selected to EN - static dropdown visual */}
            <div className="hidden md:block relative">
              <div className="flex items-center gap-2 px-4 py-2.5 text-base font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-lg opacity-70 cursor-not-allowed">
                <Globe size={18} className="text-primary" />
                <span className="leading-none">English</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Profile or Login logic */}
            <AnimatePresence mode="wait">
              {userData ? (
                <motion.div 
                  key="account"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white text-slate-800 border border-slate-200 px-5 py-2.5 h-11 rounded-lg font-bold text-base flex items-center gap-2.5"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline">
                    {userData.name.split(' ')[0]}
                  </span>
                </motion.div>
              ) : (
                <motion.div 
                  key="guest"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-slate-100 text-slate-600 border border-slate-200 px-5 py-2.5 h-11 rounded-lg font-bold text-base flex items-center gap-2.5"
                >
                  <User size={18} />
                  <span className="hidden sm:inline">
                    Guest
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 gap-4">
                <Link href="/" className="px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                  Home
                </Link>
                <Link href="/#features" className="px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                  Features
                </Link>
                <Link href="/internship" className="px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                  Internship
                </Link>
                <span className="px-4 py-2 rounded-lg transition-colors bg-green-50 text-primary font-bold">
                  Certificates
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area - Single Continuous Card */}
      <main 
        className="w-full pt-16 md:pt-20 px-4 md:px-8 pb-20 bg-slate-50 relative z-10"
        style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.025) 10px, rgba(0,0,0,0.025) 11px)' 
        }}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col bg-white rounded-4xl overflow-hidden border border-slate-200">
          
          {/* Top Banner Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center bg-emerald-900 relative" 
          >
            <img 
              src="/certificate banner.png" 
              alt="Kisan Khata Official Certificate Banner" 
              className="w-full h-auto object-cover" 
            />
          </motion.div>

          {/* Seamless Content Area Below Banner */}
          <div className="w-full bg-white p-10 md:p-16 flex flex-col relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl font-extrabold text-slate-900 font-heading mb-4">Your Verified Credentials</h1>
              {userData && userData.status === "Approved" ? (
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Hello <span className="font-bold text-slate-800">{userData.name.split(' ')[0]}</span>, your internship is currently <span className="font-bold text-emerald-600">In Progress</span>! Keep up the great work in the field. Your official, verifiable certificate will be generated and available for download here upon successful completion of your tenure.
                </p>
              ) : userData ? (
                <p className="text-lg text-slate-600 font-medium">
                  Hello {userData.name.split(' ')[0]}, your application is currently {userData.status}. Complete your internship tenure to unlock your official certificate.
                </p>
              ) : (
                <p className="text-lg text-slate-600 font-medium">
                  Please apply and complete the Kisan Khata Field Operations Internship to earn your official verifiable certificate.
                </p>
              )}
            </motion.div>
          </div>
          

        </div>
      </main>
    </div>
  );
}
