"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Smartphone, Database, MapPin, Target, Award } from "lucide-react";

export default function InternshipDashboard() {
  const [referralCode, setReferralCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);

  const fetchStats = async (code: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/tracking/stats?referralCode=${code}`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setIsLoggedIn(true);
      } else {
        setError(json.message || "Invalid referral code");
      }
    } catch (err) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralCode.trim()) return;
    fetchStats(referralCode.trim());
  };

  if (!isLoggedIn || !data) {
    return (
      <div className="min-h-screen bg-white flex">
        {/* Left Side: Branding / Motivation (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 bg-[#008F5A] p-12 flex-col justify-between relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="absolute w-[800px] h-[800px] -top-[200px] -left-[200px]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 Q50,100 100,0 Z" fill="white" />
            </svg>
            <svg className="absolute w-[600px] h-[600px] -bottom-[100px] -right-[100px]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="50" cy="50" r="40" fill="white" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-white text-3xl font-black tracking-tight mb-2">Kisan Khata</h2>
            <p className="text-emerald-100 font-medium">Agri-Tech Field Operations Internship</p>
          </div>

          <div className="relative z-10 max-w-md">
            <h1 className="text-5xl font-black text-white leading-tight mb-6">
              Empowering<br/>Rural India,<br/>One Farmer<br/>at a Time.
            </h1>
            <p className="text-emerald-100 text-lg font-medium leading-relaxed">
              Track your impact. Elevate your career. Digitize agriculture. 
              Join the mission to bring a million farmers online.
            </p>
          </div>

        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-white">
          <div className="w-full max-w-md">
            {/* Mobile Branding (Only visible on small screens) */}
            <div className="lg:hidden text-center mb-10">
              <h2 className="text-3xl font-black text-[#008F5A] mb-1">Kisan Khata</h2>
              <p className="text-slate-500 font-medium">Intern Portal</p>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-slate-900 mb-3">Welcome Back</h1>
              <p className="text-slate-500 font-medium">Enter your referral code to access your personalized performance dashboard.</p>
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="e.g., KK-XXX-1234"
                className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#008F5A]/10 focus:border-[#008F5A] transition-all bg-slate-50/50 mb-4 text-center font-bold"
              />
              {error && <p className="text-red-500 text-sm font-medium mb-4 text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#008F5A] text-white font-bold py-4 rounded-2xl hover:bg-[#007A4D] transition-colors disabled:opacity-70"
              >
                {loading ? "Checking..." : "View Progress"}
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }

  const { intern, stats } = data;
  const farmers = stats.farmersOnboarded || 0;
  const agriConnectPercent = farmers > 0 ? Math.min(100, Math.round((stats.agriConnectUsages / farmers) * 100)) : 0;
  
  // Calculate Time Remaining
  const now = new Date();
  const endDate = new Date(intern.endDate || new Date());
  const startDate = new Date(intern.startDate || new Date());
  
  const totalDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));
  const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24)));
  const timePercent = Math.min(100, Math.max(0, ((totalDays - daysLeft) / totalDays) * 100));

  // Main Target Logic (0-49: Orange, 50-99: Silver, 100+: Gold)
  const maxTarget = 100;
  const progressPercent = Math.min((farmers / maxTarget) * 100, 100);
  
  let tierColor = "#f97316"; // Orange (Default < 50)
  let tierLabel = "Pending Validation (Min 50)";
  let tierBg = "bg-orange-50";
  let tierText = "text-orange-700";

  if (farmers >= 100) {
    tierColor = "#eab308"; // Gold
    tierLabel = "Tier 1: Elite Certificate Qualified";
    tierBg = "bg-yellow-50";
    tierText = "text-yellow-700";
  } else if (farmers >= 50) {
    tierColor = "#94a3b8"; // Silver/Slate
    tierLabel = "Tier 2: Verified Certificate Qualified";
    tierBg = "bg-slate-100";
    tierText = "text-slate-700";
  }

  // SVG Circle calculations (radius 70, circumference ~439.8)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans pb-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {intern.name}!</h1>
            <p className="text-slate-500 font-medium">Referral Code: <span className="text-[#008F5A] font-bold">{referralCode}</span></p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200"
          >
            Logout
          </button>
        </header>

        {/* Top Tier Notice */}
        <div className={`w-full p-4 rounded-xl border border-dashed font-bold flex items-center gap-3 mb-8 ${tierBg} ${tierText}`}>
          <Award size={20} />
          {tierLabel}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Progression Circle (Left side, takes 5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 bg-[#008F5A]/10 text-[#008F5A] rounded-full flex items-center justify-center mb-4">
              <Target size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Farmers Onboarded</h2>
            <p className="text-slate-500 text-sm mb-10 font-medium">Reach 100 for Elite Tier</p>
            
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                <motion.circle 
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: dashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="80" cy="80" r={radius} fill="transparent" 
                  stroke={tierColor} strokeWidth="16" 
                  strokeDasharray={circumference}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-slate-900">{farmers}</span>
                <span className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">Total</span>
              </div>
            </div>
            
            <div className="w-full text-left space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>0</span>
                <span>Tier 2 (50)</span>
                <span>Elite (100)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 z-10"></div>
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-2 rounded-full relative z-20"
                  style={{ backgroundColor: tierColor }}
                ></motion.div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Analytics Grid (Right side, takes 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            {/* Time Remaining */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Time Remaining</h3>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black text-slate-900">{daysLeft}</span>
                <span className="text-slate-500 font-medium mb-1">days left</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-auto">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${timePercent}%` }}></div>
              </div>
            </motion.div>

            {/* Villages Reached */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Villages Covered</h3>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-slate-900">{stats.uniqueVillages}</span>
                <span className="text-slate-500 font-medium mb-1">unique locations</span>
              </div>
              
              {/* Render the actual list of villages */}
              {stats.villagesList && stats.villagesList.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  {stats.villagesList.map((village: string, idx: number) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold capitalize">
                      {village}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* AgriConnect Usage */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                  <Smartphone size={20} />
                </div>
                <h3 className="font-bold text-slate-900">AgriConnect Usage</h3>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black text-slate-900">{agriConnectPercent}%</span>
                <span className="text-slate-500 font-medium mb-1">conversion</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-auto">{stats.agriConnectUsages} out of {farmers} onboarded farmers used AgriConnect.</p>
            </motion.div>

            {/* Data Entry Usage */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <Database size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Data Entry Tracked</h3>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-black text-slate-900">{stats.dataEntryUsages}</span>
                <span className="text-slate-500 font-medium mb-1">logs created</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Tracking Info Box */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <span className="text-amber-600 text-xl">💡</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">How Tracking Works</h3>
            <p className="text-sm text-slate-600">
              When a farmer downloads the app, they must enter your Referral Code <strong>{referralCode}</strong> during signup. Our advanced tracking system binds their physical device to your code to prevent fraud. Data is updated in real-time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
