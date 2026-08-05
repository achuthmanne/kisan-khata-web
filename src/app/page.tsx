"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronRight, Image as ImageIcon, Globe, ChevronDown, MessageCircle, ShieldCheck, CheckCircle, X, ExternalLink, Quote } from "lucide-react";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isUdyamModalOpen, setIsUdyamModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "internship", "certificate"];
      let current = "home";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the element's top is near or past the top of viewport (considering navbar height)
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation - Sticky, Flat, Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-8 md:px-12 py-2 max-w-[1600px] mx-auto w-full">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
          >
            {/* Small DOM container so navbar stays slim, but huge visual scale for the logo */}
            <div className="w-16 h-10 flex items-center justify-center shrink-0 relative overflow-visible">
              <img src="/logo.png" alt="Kisan Khata Logo" className="w-full h-full object-contain scale-[2.5] origin-center" />
            </div>
            <span className="text-[13px] md:text-[15px] font-heading font-extrabold text-green-900 tracking-tight leading-none z-10 -mt-0.5">
              Kisan Khata
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-10 lg:gap-14 text-lg font-medium text-gray-500">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`transition-colors ${activeSection === 'home' ? 'text-primary font-bold' : 'hover:text-primary'}`}>
              {language === 'en' ? 'Home' : 'హోమ్'}
            </a>
            <a href="#features" className={`transition-colors ${activeSection === 'features' ? 'text-primary font-bold' : 'hover:text-primary'}`}>
              {language === 'en' ? 'Features' : 'ఫీచర్స్'}
            </a>
            <a href="/internship" className={`transition-colors ${activeSection === 'internship' ? 'text-primary font-bold' : 'hover:text-primary'}`}>
              {language === 'en' ? 'Internship' : 'ఇంటర్న్ షిప్'}
            </a>
            <a href="#certificate" className={`transition-colors ${activeSection === 'certificate' ? 'text-primary font-bold' : 'hover:text-primary'}`}>
              {language === 'en' ? 'Certificates' : 'సర్టిఫికెట్స్'}
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Minimal Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-4 py-2.5 text-base font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe size={18} className="text-primary" />
                <span className={`leading-none ${language === 'te' ? 'pt-1.5' : ''}`}>
                  {language === 'en' ? 'English' : 'తెలుగు'}
                </span>
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden py-1 z-50">
                  <button 
                    onClick={() => { setLanguage("en"); setIsLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-green-50 ${language === 'en' ? 'text-primary font-bold bg-green-50/50' : 'text-gray-700'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => { setLanguage("te"); setIsLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-green-50 ${language === 'te' ? 'text-primary font-bold bg-green-50/50' : 'text-gray-700'}`}
                  >
                    తెలుగు
                  </button>
                </div>
              )}
            </div>

            <a href="#download" className="bg-primary text-white px-8 py-2.5 h-11 rounded-lg font-medium text-base hover:bg-primary-dark transition-all flex items-center gap-2">
              <Download size={18} />
              <span className={`hidden sm:inline ${language === 'te' ? 'pt-1' : ''}`}>
                {language === 'en' ? 'Get App' : 'యాప్ డౌన్లోడ్'}
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Width Image Banner Seamless Blend */}
      <main className="w-full pt-14 md:pt-16 pb-0">
        <div className="w-full max-w-[1800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <img 
              src={language === 'en' ? "/website home banner en.png" : "/kisan khata hime banner te.png"} 
              alt="Kisan Khata Hero Banner" 
              className="w-full h-auto object-cover" 
            />
          </motion.div>
        </div>
      </main>

      {/* Our Goal / Mission Section (White Background) */}
      <section id="about" className="w-full bg-white pt-12 pb-6 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-green-900 mb-8 tracking-tight">
              {language === 'en' ? 'Our Mission' : 'మా లక్ష్యం'}
            </h2>
            
            <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium italic">
                {language === 'en' 
                  ? 'Our mission is to replace traditional paper notebooks with a simple digital platform. We enable farmers to easily track labor attendance, machinery usage, daily expenses, and crop sales. By providing a clear, real-time summary of income, expenses, and overall profit or loss, we aim to give farmers complete financial clarity.'
                  : 'రైతులు ఇకపై పుస్తకాలలో లెక్కలు రాసుకోవాల్సిన అవసరం లేకుండా, వారి ఖర్చులు, ఆదాయం, కూలీల హాజరు, ట్రాక్టర్లు మరియు యంత్రాల లెక్కలను సులభంగా తమ ఫోన్‌లోనే నమోదు చేసుకునేలా చేయడమే మా లక్ష్యం. ఎక్కడ ఎంత ఖర్చు అవుతోంది, ఎంత లాభం లేదా నష్టం వస్తోంది అనే పూర్తి వివరాలను వారి కళ్ళముందు ఉంచి, ఆర్థిక స్పష్టత కల్పించడమే ఈ కిసాన్ ఖాతా ప్రధాన ఉద్దేశ్యం.'}
              </p>
            </div>
            
            <div className="mt-12 flex flex-col items-center justify-center">
              <span className="font-heading font-bold text-gray-900 text-xl">
                {language === 'en' ? 'Achuth Manne' : 'అచ్యుత్ మన్నె'}
              </span>
              <span className="text-xs md:text-sm text-primary font-bold tracking-widest uppercase mt-1.5 bg-green-50 px-4 py-1.5 rounded-full">
                Founder & CEO, Kisan Khata
              </span>
            </div>
            
          </motion.div>
        </div>
      </section>
      
      {/* Curved wave separator (Transitions from White bg to Gray 50) */}
      {/* The viewBox is cropped (0 96 1440 224) to remove the massive empty transparent space above the wave in the SVG */}
      <div id="features" className="w-full bg-white relative z-0 scroll-mt-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 1440 224" className="w-full h-auto block -mb-1">
          <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,117.3C96,139,192,181,288,186.7C384,192,480,160,576,138.7C672,117,768,107,864,122.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Features Section - Heading Only for now */}
      <section className="w-full bg-gray-50 pb-12">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 -mt-8 md:-mt-12 relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4 tracking-tight">
              {language === 'en' ? '15 Powerful Services.' : '15 పవర్ ఫుల్ సర్వీసెస్.'} <br/> 
              <span className="text-primary">{language === 'en' ? 'One Super App.' : 'ఒకే సూపర్ యాప్ లో.'}</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
              {language === 'en' 
                ? 'Everything a modern farmer and machine owner needs to manage their business digitally.' 
                : 'ఒక రైతుకి, మెషిన్ ఓనర్ కి అవసరమైన అన్ని లెక్కలు డిజిటల్ గా మేనేజ్ చేసుకోవడానికి.'}
            </p>
          </div>
          
          {/* Features Dynamic List */}
          <div className="flex flex-col gap-28 md:gap-40 mt-16 md:mt-24">
            {[
              {
                id: "01", theme: "green", imgEn: "fe en.png", imgTe: "fe te.png",
                tagEn: "Smart Fields", tagTe: "స్మార్ట్ పొలాలు",
                titleEn: "Fields & Land Management", titleTe: "పొలాలు & భూమి నిర్వహణ",
                descEn: "Easily track your total acreage, differentiating between owned and leased land. Monitor active crop cycles, soil types, and field boundaries all in one secure place.",
                descTe: "మీరు సొంతంగా సాగు చేస్తున్న భూమి ఎంత, కౌలుకి తీసుకున్నది ఎంత అని విడిగా లెక్కలు చూసుకోవచ్చు. ఏ పొలంలో ఏ పంట వేశారో చాలా సులభంగా రికార్డ్ చేసుకోవచ్చు.",
                points: [
                  { en: "Track Owned vs Leased Land", te: "సొంత భూమి & కౌలు భూమి లెక్కలు" },
                  { en: "Monitor Active Crop Cycles", te: "పంటల సీజన్, దిగుబడి ట్రాకింగ్" },
                  { en: "Analyze Soil Stats & Usage", te: "మట్టి రకాల ఆధారంగా సాగు వివరాలు" }
                ]
              },
              {
                id: "02", theme: "orange", imgEn: "att en.png", imgTe: "att te.png",
                tagEn: "Labor Attendance", tagTe: "కూలీల హాజరు",
                titleEn: "Smart Attendance & Mestri Tracking", titleTe: "స్మార్ట్ అటెండెన్స్ & మేస్త్రీ లెక్కలు",
                descEn: "Ditch the paper notebooks. Manage your daily labor contractors (Mestris) effortlessly. Import past workers with one tap and find them instantly using our built-in Voice Search.",
                descTe: "ఇకపై కూలీల లెక్కలకి పుస్తకాలు అవసరం లేదు. మేస్త్రీల రోజువారీ హాజరుని సులభంగా రికార్డ్ చేయండి. పాత మేస్త్రీల డేటాని ఒక్క క్లిక్ తో ఇంపోర్ట్ చేసుకోవచ్చు.",
                points: [
                  { en: "Voice Search Support", te: "వాయిస్ సెర్చ్ తో కూలీల పేర్లు వెతకండి" },
                  { en: "One-Tap Past Worker Import", te: "పాత కూలీలను ఒకే క్లిక్ తో ఇంపోర్ట్ చేయండి" },
                  { en: "100% Offline Daily Records", te: "ఇంటర్నెట్ లేకపోయినా హాజరు నమోదు చేయొచ్చు" }
                ]
              },
              {
                id: "03", theme: "blue", imgEn: "paymnet en.png", imgTe: "pay te.png",
                tagEn: "Labor Payments", tagTe: "కూలీల చెల్లింపులు",
                titleEn: "Smart Payment Settlements", titleTe: "స్మార్ట్ పేమెంట్స్ & బకాయిలు",
                descEn: "No more confusion over pending dues. Unpaid work is automatically grouped by crop and work-type. Select pending attendance records and clear payments with a single tap.",
                descTe: "ఏ కూలీకి ఎంత బాకీ ఉన్నామో అనే కన్ఫ్యూజన్ ఇక వద్దు. పెండింగ్ ఉన్న పనులన్నీ పంట మరియు పని ఆధారంగా గ్రూప్ అవుతాయి. వాటిని సెలెక్ట్ చేసి ఒకే క్లిక్ తో పేమెంట్ క్లియర్ చేయండి.",
                points: [
                  { en: "Crop & Work-wise Grouping", te: "పంట మరియు పని ఆధారంగా బకాయిల గ్రూపింగ్" },
                  { en: "Select & Clear Pending Dues", te: "పెండింగ్ అటెండెన్స్ సెలెక్ట్ చేసి చెల్లింపు" },
                  { en: "Zero Pending Dues Tracking", te: "అన్ని చెల్లింపులు పూర్తయ్యాయా లేదా అని ట్రాకింగ్" }
                ]
              },
              {
                id: "04", theme: "yellow", imgEn: "m en.png", imgTe: "m te.png",
                tagEn: "Tractors & Machinery", tagTe: "ట్రాక్టర్లు & యంత్రాలు",
                titleEn: "Smart Machinery Logs", titleTe: "ట్రాక్టర్ బాడుగలు & పనుల రికార్డ్",
                descEn: "Easily track machine hiring costs. Log work done by acres, hours, or furrows (Saallu). Automatically calculate total amounts, record advances, and track pending dues to machine owners.",
                descTe: "ఇతర యజమానుల నుండి తెచ్చిన ట్రాక్టర్ మరియు యంత్రాల బాడుగ లెక్కలు ఈజీగా రికార్డ్ చేసుకోండి. ఎకరాలు, గంటలు, లేదా సాళ్ళ ఆధారంగా పనులను నమోదు చేసి, అడ్వాన్సులు మరియు బకాయిలను సెట్ చేయండి.",
                points: [
                  { en: "Track by Acres, Hours, or Saallu", te: "ఎకరాలు, గంటలు లేదా సాళ్ళ ఆధారంగా లెక్కలు" },
                  { en: "Automatic Payment Calculation", te: "ఆటోమేటిక్ గా బాడుగ డబ్బుల లెక్కింపు" },
                  { en: "Advances & Pending Dues Tracking", te: "యజమానులకు ఇచ్చిన అడ్వాన్సులు మరియు పెండింగ్ బకాయిలు" }
                ]
              },
              {
                id: "05", theme: "red", imgEn: "ex en.png", imgTe: "ex te.png",
                tagEn: "Farm Expenses", tagTe: "పంట ఖర్చులు",
                titleEn: "Daily Expenses Tracker", titleTe: "రోజువారీ ఖర్చుల రికార్డ్",
                descEn: "Keep a meticulous record of every rupee spent. Log expenses across 15+ real-world categories like seeds, fertilizers, and labor. Allocate costs to specific crops to see exactly where your investment goes.",
                descTe: "వ్యవసాయంలో పెట్టే ప్రతి రూపాయి ఖర్చుని పక్కాగా రికార్డ్ చేయండి. విత్తనాలు, ఎరువులు, కూలీలు లాంటి 15 కి పైగా కేటగిరీలలో ఖర్చులను రాసుకోవచ్చు. ఏ పంటకు ఎంత ఖర్చు అయ్యిందో స్పష్టంగా తెలుసుకోండి.",
                points: [
                  { en: "15+ Farming Categories", te: "ఎరువులు, కూలీలు లాంటి 15+ కేటగిరీలు" },
                  { en: "Crop-wise Expense Splitting", te: "ఏ పంటకు ఎంత ఖర్చు అయ్యిందో తెలుసుకోవచ్చు" },
                  { en: "Real-time Expense Totals", te: "మొత్తం ఖర్చుల రిపోర్ట్ ఆటోమేటిక్ గా వస్తుంది" }
                ]
              },
              {
                id: "06", theme: "cyan", imgEn: "sales en.png", imgTe: "sales te.png",
                tagEn: "Crop Sales", tagTe: "పంట అమ్మకాలు",
                titleEn: "Smart Sales & Revenue Logs", titleTe: "దిగుబడి అమ్మకాలు & ఆదాయం",
                descEn: "Log every crop sale you make. Enter the quantity (in Kg, Quintal, or Ton) and rate, and let the app automatically calculate your total revenue. Add grades or special notes using voice input.",
                descTe: "మీరు అమ్మిన ప్రతి పంట లావాదేవీని రికార్డ్ చేయండి. ఎన్ని కిలోలు లేదా క్వింటాళ్లు, ఎంత ధర అని ఎంటర్ చేస్తే ఆటోమేటిక్ గా మీ మొత్తం ఆదాయం వస్తుంది. వాయిస్ సపోర్ట్ తో పంట గ్రేడ్ (ఉదా: తాలు) వివరాలు రాయొచ్చు.",
                points: [
                  { en: "Quantity & Rate Tracking", te: "దిగుబడి (క్వింటాల్/టన్ను) మరియు ధరల రికార్డ్" },
                  { en: "Automatic Revenue Calculation", te: "మొత్తం ఆదాయం ఆటోమేటిక్ గా లెక్కించబడుతుంది" },
                  { en: "Voice-enabled Grade Notes", te: "వాయిస్ సపోర్ట్ తో పంట గ్రేడ్ ఎంట్రీ సదుపాయం" }
                ]
              },
              {
                id: "07", theme: "orange", imgEn: "sum en.png", imgTe: "sum te.png",
                tagEn: "Financial Summary", tagTe: "ఆర్థిక రిపోర్ట్",
                titleEn: "Smart P&L & Farmer Ranking", titleTe: "లాభ నష్టాలు & మీ ర్యాంకింగ్",
                descEn: "Get a complete picture of your farm's health. Instantly calculate your net ROI. Unlock your 5-tier 'Farmer Rank' based on your state's performance and share your beautiful Pro Report Card.",
                descTe: "మీ వ్యవసాయం ఎంత ఆరోగ్యంగా ఉందో తెలుసుకోండి. మీరు పెట్టిన పెట్టుబడికి వచ్చిన లాభాన్ని (ROI) యాప్ ఆటోమేటిక్ గా లెక్కిస్తుంది. మీ పనితీరు ఆధారంగా మీకు 'ఆదర్శ రైతు' లాంటి ర్యాంక్ ఇచ్చి, రిపోర్ట్ కార్డ్ జనరేట్ చేస్తుంది.",
                points: [
                  { en: "Instant ROI & P&L Calculation", te: "లాభ నష్టాల (ROI) ఆటోమేటిక్ లెక్కింపు" },
                  { en: "5-Tier Farmer Ranking (State-wide)", te: "మీ రాష్ట్రం మరియు పనితీరు ఆధారంగా ర్యాంకింగ్" },
                  { en: "Shareable Pro Report Cards", te: "మీ ప్రో-రిపోర్ట్ కార్డ్ ని ఇమేజ్ లా షేర్ చేయొచ్చు" }
                ]
              },
              {
                id: "08", theme: "indigo", imgEn: "driver en.png", imgTe: "dri te.png",
                tagEn: "Complete Vehicle Management", tagTe: "వాహనాల పూర్తి నిర్వహణ",
                titleEn: "Farmer & Driver Accounts Logging", titleTe: "రైతు మరియు డ్రైవర్ల పూర్తి లెక్కలు",
                descEn: "A complete dual-sided system for machine owners. On one side, track the work done for farmers (billing by hours/acres). On the other side, manage your drivers (both daily wage and monthly salaried). Track attendance, breaks, diesel expenses, advances, and auto-settle salaries without any confusion.",
                descTe: "ట్రాక్టర్ మరియు ఇతర యంత్రాల ఓనర్లకు ఇది పర్ఫెక్ట్ సొల్యూషన్. ఒకవైపు మీ యంత్రం ఏ రైతుకు ఎంత పని చేసింది (ఎకరాలు/గంటలు) అని ట్రాక్ చేయొచ్చు, మరోవైపు దాన్ని నడిపిన డ్రైవర్ లెక్కలు కూడా చూసుకోవచ్చు. రోజువారీ డ్రైవర్లు, నెలవారీ డ్రైవర్ల హాజరు, అడ్వాన్సులు, జీతాల లెక్కలు అన్నీ ఒకే దగ్గర రికార్డ్ అవుతాయి.",
                points: [
                  { en: "Farmer-side Work Billing (Acres/Hours)", te: "రైతు వైపు లెక్కలు (ఎకరాలు/గంటల వారీగా బిల్లింగ్)" },
                  { en: "Driver-side Accounts & Management", te: "డ్రైవర్ వైపు లెక్కలు మరియు నిర్వహణ" },
                  { en: "Daily & Monthly Driver Work Types", te: "రోజువారీ (Daily) మరియు నెలవారీ (Monthly) డ్రైవర్ల సపోర్ట్" },
                  { en: "Attendance, Break Time & Diesel Logs", te: "డ్రైవర్ల హాజరు, బ్రేక్ సమయం మరియు డీజిల్ లెక్కలు" },
                  { en: "Advances, Cuttings & Final Salary Settlement", te: "డ్రైవర్ల అడ్వాన్సులు, కటింగ్స్ మరియు ఫైనల్ జీతం సెటిల్మెంట్" }
                ]
              },
              {
                id: "09", theme: "cyan", imgEn: "w en.png", imgTe: "w te.png",
                tagEn: "Agri Weather", tagTe: "వాతావరణం",
                titleEn: "Hyper-local Forecasts & Agri Advice", titleTe: "తాజా వాతావరణం & వ్యవసాయ సూచనలు",
                descEn: "Make informed decisions with weather updates tailored exactly to your farm's location. Get hourly and 5-day forecasts including rain chance, humidity, wind, and smart Agri Advice alerts.",
                descTe: "మీ పొలం ఉన్న ప్రాంతంలో వాతావరణం ఎలా ఉందో ఎప్పటికప్పుడు తెలుసుకోండి. గంటల వారీగా మరియు రాబోయే 5 రోజుల వర్షం, గాలి వేగం సమాచారంతో పాటు, వాతావరణాన్ని బట్టి యాప్ ఇచ్చే 'వ్యవసాయ సలహాలు' మీ పనులకు ఎంతగానో ఉపయోగపడతాయి.",
                points: [
                  { en: "Hourly & 5-Day Detailed Forecasts", te: "గంటల వారీగా మరియు 5 రోజుల వాతావరణం" },
                  { en: "Smart Agri Advice Alerts", te: "వాతావరణాన్ని బట్టి 'వ్యవసాయ సలహా' మరియు అలెర్ట్స్" },
                  { en: "Rain Chance, Wind & Humidity", te: "వర్షం పడే అవకాశం, తేమ మరియు గాలి వేగం" }
                ]
              },
              {
                id: "10", theme: "violet", imgEn: "mar en.png", imgTe: "mar te.png",
                tagEn: "Market Prices", tagTe: "మార్కెట్ ధరలు",
                titleEn: "Live AP & TS Mandi Prices", titleTe: "ఏపీ & తెలంగాణ తాజా ధరలు",
                descEn: "Check live crop prices across all AP and Telangana mandis. Search for your crop in your local language and instantly compare min/max prices to decide where to sell.",
                descTe: "తెలంగాణ మరియు ఏపీలోని మార్కెట్ యార్డుల్లో ఉన్న తాజా పంట ధరలను తెలుగులో చెక్ చేయండి. మీ పంట పేరుతో వెతికి, ఏ మార్కెట్ లో గరిష్ట (Max) ధర ఉందో చూసి ఎక్కువ లాభం పొందండి.",
                points: [
                  { en: "Live Prices for AP & Telangana", te: "ఏపీ & తెలంగాణ మార్కెట్ యార్డ్ లైవ్ ధరలు" },
                  { en: "Search in Local Language", te: "పంట పేరుతో తెలుగులో సెర్చ్ చేసే సదుపాయం" },
                  { en: "Compare Min/Max Rates", te: "కనిష్ట (Min) మరియు గరిష్ట (Max) ధరల వివరాలు" }
                ]
              },
              {
                id: "11", theme: "sky", imgEn: "locker en.png", imgTe: "locker te.png",
                tagEn: "Agri Locker", tagTe: "వ్యవసాయ లాకర్",
                titleEn: "Store Seeds & Inputs Data", titleTe: "విత్తనాలు, మందుల వివరాల భద్రత",
                descEn: "Never lose track of what you sprayed. Securely save photos of seed packets, fertilizer bills, and pesticide bottles along with their prices and crop details in your digital Agri Locker.",
                descTe: "ఏ మందు కొట్టామో, ఏ విత్తనం వాడామో మర్చిపోకుండా వాటి ఫోటోలు, ధర మరియు పంట వివరాలను మీ డిజిటల్ లాకర్ లో భద్రపరుచుకోండి. అవసరమైన డాక్యుమెంట్లు కూడా దాచుకోవచ్చు.",
                points: [
                  { en: "Save Seed & Pesticide Photos", te: "విత్తనాలు, మందుల ఫోటోల భద్రత" },
                  { en: "Track Input Prices & Crops", te: "వాటి ధరలు మరియు వాడిన పంట వివరాలు" },
                  { en: "Organized by Categories", te: "ఎరువులు, మందులు అని విడివిడిగా ఫోల్డర్స్" }
                ]
              },
              {
                id: "12", theme: "red", imgEn: "re en.png", imgTe: "re te.png",
                tagEn: "Smart Reminders", tagTe: "స్మార్ట్ రిమైండర్స్",
                titleEn: "Activity Alerts & Scheduling", titleTe: "ముఖ్యమైన పనుల రిమైండర్స్",
                descEn: "Farming is all about timing. Set custom reminders for applying fertilizers, crop watering schedules, pesticide sprays, or paying your labor.",
                descTe: "వ్యవసాయంలో సరైన సమయానికి పనులు జరగాలి. ఎరువులు వేయడానికి, మందులు కొట్టడానికి లేదా కూలీలకు డబ్బులు ఇవ్వడానికి స్మార్ట్ రిమైండర్స్ పెట్టుకోండి.",
                points: [
                  { en: "Custom Fertilizer Alerts", te: "ఎరువులు వేయడానికి అలర్ట్స్" },
                  { en: "Watering Schedules", te: "నీరు పెట్టే సమయాల రిమైండర్" },
                  { en: "Payment Due Dates", te: "బకాయిలు మరియు పేమెంట్ అలర్ట్స్" }
                ]
              },
              {
                id: "13", theme: "teal", imgEn: "cal en.png", imgTe: "cal te.png",
                tagEn: "Agri Calculators", tagTe: "అగ్రి క్యాలిక్యులేటర్స్",
                titleEn: "Smart Interest & EMI Calculators", titleTe: "వడ్డీ మరియు EMI లెక్కలు",
                descEn: "No more confusion with loan calculations. Dedicated calculators for Village Interest (Mitti Vaddi), Bank Loan Interest, and Tractor EMI calculations to manage your finances perfectly.",
                descTe: "అప్పులు, వడ్డీ లెక్కల్లో ఇకపై ఎలాంటి కన్ఫ్యూజన్ వద్దు. గ్రామాల్లో తిప్పే వడ్డీ (మిత్తి), బ్యాంక్ వడ్డీ రేట్లు, మరియు ట్రాక్టర్ లాంటి వాహనాల EMI లను చిటికెలో లెక్కించే స్మార్ట్ క్యాలిక్యులేటర్స్.",
                points: [
                  { en: "Village Interest (Mitti Vaddi)", te: "గ్రామ వడ్డీ / మిత్తి లెక్కలు" },
                  { en: "Bank Loan Interest", te: "బ్యాంక్ లోన్ వడ్డీ క్యాలిక్యులేటర్" },
                  { en: "Tractor & Equipment EMIs", te: "ట్రాక్టర్ మరియు యంత్రాల EMI లెక్కలు" }
                ]
              },
              {
                id: "14", theme: "fuchsia", imgEn: "sc en.png", imgTe: "sche te.png",
                tagEn: "Govt Schemes", tagTe: "ప్రభుత్వ పథకాలు",
                titleEn: "Subsidy & Scheme Updates", titleTe: "ప్రభుత్వ పథకాలు & సబ్సిడీలు",
                descEn: "Stay informed about agricultural benefits. Check eligibility and get latest updates on PM Kisan, Rythu Bandhu, crop insurance, and equipment subsidies.",
                descTe: "ప్రభుత్వం రైతులకు అందించే పథకాలు, సబ్సిడీలు ఎప్పటికప్పుడు తెలుసుకోండి. పీఎం కిసాన్, రైతు భరోసా, పంట బీమా లాంటి పథకాల తాజా సమాచారం మీ ఫోన్లోనే.",
                points: [
                  { en: "Latest Govt Circulars", te: "తాజా ప్రభుత్వ పథకాల సమాచారం" },
                  { en: "Eligibility Checklists", te: "అర్హతలు మరియు డాక్యుమెంట్ల వివరాలు" },
                  { en: "Subsidy Equipment Details", te: "సబ్సిడీపై వచ్చే యంత్రాల వివరాలు" }
                ]
              },
              {
                id: "15", theme: "blue", imgEn: "b en.png", imgTe: "b te.png",
                tagEn: "Equipment Booking", tagTe: "యంత్రాల బుకింగ్",
                titleEn: "Rent or Hire Machinery", titleTe: "ట్రాక్టర్లు & యంత్రాల బాడుగలు",
                descEn: "Connect with local machine owners. Easily book a rotavator, harvester, or drone sprayer for your field, or rent out your own machinery to nearby farmers.",
                descTe: "మీ పొలానికి కావలసిన ట్రాక్టర్ లేదా హార్వెస్టర్ ని సులభంగా బాడుగకు మాట్లాడుకోండి. మీకు సొంత యంత్రాలు ఉంటే, వేరే వాళ్ళకి బాడుగకు ఇచ్చి అదనపు ఆదాయం పొందండి.",
                points: [
                  { en: "Discover Local Machinery", te: "చుట్టుపక్కల ఉన్న యంత్రాల సమాచారం" },
                  { en: "Direct Owner Contact", te: "ట్రాక్టర్ ఓనర్ తో నేరుగా సంప్రదింపులు" },
                  { en: "Rent Out Your Equipment", te: "మీ సొంత యంత్రాలను బాడుగకు ఇవ్వండి" }
                ]
              }
            ].map((feature, index) => {
              const isEven = index % 2 === 0; // Even index -> Image Left, Text Right. Odd -> Image Right, Text Left.
              
              // Map dynamic tailwind classes based on theme
              const themeColors: any = {
                green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-600", iconBg: "bg-green-100", iconText: "text-green-600" },
                orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", iconBg: "bg-orange-100", iconText: "text-orange-600" },
                blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", iconBg: "bg-blue-100", iconText: "text-blue-600" },
                purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", iconBg: "bg-purple-100", iconText: "text-purple-600" },
                red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-600", iconBg: "bg-red-100", iconText: "text-red-600" },
                yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-600", iconBg: "bg-yellow-100", iconText: "text-yellow-600" },
                emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", iconBg: "bg-emerald-100", iconText: "text-emerald-600" },
                indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600", iconBg: "bg-indigo-100", iconText: "text-indigo-600" },
                cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600", iconBg: "bg-cyan-100", iconText: "text-cyan-600" },
                rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-600", iconBg: "bg-rose-100", iconText: "text-rose-600" },
                violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-600", iconBg: "bg-violet-100", iconText: "text-violet-600" },
                sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-600", iconBg: "bg-sky-100", iconText: "text-sky-600" },
                gray: { bg: "bg-gray-100", border: "border-gray-200", text: "text-gray-700", iconBg: "bg-gray-200", iconText: "text-gray-700" },
                amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", iconBg: "bg-amber-100", iconText: "text-amber-600" },
                teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600", iconBg: "bg-teal-100", iconText: "text-teal-600" },
                fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-600", iconBg: "bg-fuchsia-100", iconText: "text-fuchsia-600" },
                pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", iconBg: "bg-pink-100", iconText: "text-pink-600" },
              };
              
              const c = themeColors[feature.theme] || themeColors.green;
              
              return (
                <div key={feature.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                  
                  {/* Image Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex items-center justify-center"
                  >
                      <img 
                        src={`/${language === 'en' ? feature.imgEn : feature.imgTe}`} 
                        alt={feature.titleEn} 
                        className="w-full max-w-125 h-auto object-contain hover:scale-[1.02] transition-transform duration-500 mix-blend-multiply"
                      />
                  </motion.div>
                  
                  {/* Text Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    className="w-full md:w-1/2 flex flex-col gap-6"
                  >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm w-fit tracking-wide uppercase ${c.bg} ${c.border} ${c.text}`}>
                      {feature.id}. {language === 'en' ? feature.tagEn : feature.tagTe}
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 leading-[1.2] tracking-tight">
                      {language === 'en' ? feature.titleEn : feature.titleTe}
                    </h3>
                    
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                      {language === 'en' ? feature.descEn : feature.descTe}
                    </p>
                    
                    <ul className="flex flex-col gap-5 mt-4">
                      {feature.points.map((point, i) => (
                        <li key={i} className="flex items-center gap-4 text-gray-700 font-semibold text-base md:text-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${c.iconBg}`}>
                            <svg className={`w-5 h-5 ${c.iconText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {language === 'en' ? point.en : point.te}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                </div>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* Top Divider for CTA Section */}
      <div id="download" className="w-full relative z-10 -mb-1 bg-gray-50 scroll-mt-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto block">
          <path fill="#064e3b" fillOpacity="1" d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>

      {/* Download App CTA Section */}
      <section className="w-full bg-[#064e3b] relative overflow-hidden py-16 md:py-24">
        <div className="max-w-325 mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.1] tracking-tight">
              {language === 'en' ? 'Take Control of Your Farm Today.' : 'మీ వ్యవసాయాన్ని మీ చేతుల్లోకి తీసుకోండి.'}
            </h2>
            <p className="text-xl text-green-50 font-medium max-w-lg opacity-90 leading-relaxed">
              {language === 'en' 
                ? 'Join thousands of smart farmers and machine owners across Telugu states. Download Kisan Khata now.'
                : 'తెలుగు రాష్ట్రాల్లోని వేలాది మంది స్మార్ట్ రైతులు, మెషిన్ ఓనర్లతో కలవండి. ఇప్పుడే కిసాన్ ఖాతా యాప్ ని డౌన్లోడ్ చేసుకోండి.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 mt-6">
              
              <a href="https://play.google.com/store/apps/details?id=com.achuth.agrisnap" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 active:scale-95">
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-20 md:h-24 w-auto object-contain -ml-2 drop-shadow-md"
                />
              </a>

            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 60, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
            className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative mt-12 lg:mt-0"
          >
            {/* Download App Mockup / Card */}
            <div className="bg-white p-8 md:p-10 rounded-4xl shadow-2xl flex flex-col items-center gap-6 max-w-sm relative hover:-translate-y-2 transition-transform duration-500">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.6, delay: 0.7 }}
                className="absolute -top-5 -right-5 bg-yellow-400 text-yellow-900 font-bold px-5 py-2 rounded-full shadow-md text-sm tracking-wide uppercase rotate-6"
              >
                {language === 'en' ? 'Free App!' : 'ఉచితం!'}
              </motion.div>
              
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 flex items-center justify-center">
                <img 
                  src="/kisan khata qr.png" 
                  alt="Download Kisan Khata QR Code" 
                  className="w-44 h-44 object-contain"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1 font-heading tracking-tight">
                  {language === 'en' ? 'Scan to Download' : 'స్కాన్ చేయండి'}
                </h3>
                <p className="text-gray-500 font-medium text-base">
                  {language === 'en' ? 'Scan this code to install the app.' : 'స్కాన్ చేసి కిసాన్ ఖాతా యాప్ ఇన్‌స్టాల్ చేసుకోండి.'}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer Top Divider (Transition from #064e3b to #f9fafb) */}
      <div className="w-full relative z-10 -mt-1 bg-[#064e3b]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto block -mb-1">
          <path fill="#f9fafb" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* Corporate Footer */}
      <footer className="w-full bg-gray-50 text-gray-900 pt-12 pb-8 px-6 md:px-12 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            
            {/* Brand Column */}
            <div className="flex flex-col gap-6 lg:col-span-2 lg:pr-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-1 shrink-0 shadow-sm overflow-hidden border border-gray-100">
                  <img src="/logo.png" alt="Kisan Khata Logo" className="w-full h-full object-contain scale-[1.2]" />
                </div>
                <span className="text-3xl font-heading font-extrabold tracking-tight text-gray-900">Kisan Khata</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm mt-2">
                {language === 'en' 
                  ? 'Empowering farmers with a modern digital ledger, seamless machine rentals, and comprehensive agricultural tracking.' 
                  : 'ఆధునిక డిజిటల్ లెడ్జర్, సులభమైన యంత్రాల అద్దె మరియు వ్యవసాయ ట్రాకింగ్ ద్వారా రైతులను బలోపేతం చేయడం.'}
              </p>
              
              {/* Socials */}
              <div className="mt-4">
                <a 
                  href="https://instagram.com/kisankhata.official" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 p-1.5 pr-5 bg-white rounded-full border border-gray-200 hover:border-pink-200 transition-all group"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none mb-1">Follow Us</span>
                    <span className="text-sm font-extrabold text-gray-900 leading-none">@kisankhata.official</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-5 lg:pt-3">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm">{language === 'en' ? 'Quick Links' : 'క్విక్ లింక్స్'}</h4>
              <nav className="flex flex-col gap-3 text-gray-600">
                <a href="#features" className="hover:text-primary hover:translate-x-1 transition-all w-fit">Features</a>
                <a href="#certificate" className="hover:text-primary hover:translate-x-1 transition-all w-fit">Get Certificate</a>
                <a href="https://sites.google.com/view/kisankhata-terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:translate-x-1 transition-all w-fit">Privacy Policy</a>
              </nav>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col gap-5 lg:pt-3">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm" id="contact">{language === 'en' ? 'Contact Us' : 'సంప్రదించండి'}</h4>
              <nav className="flex flex-col gap-3 text-gray-600 text-sm">
                <a href="https://wa.me/919493959557" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="opacity-70">WhatsApp:</span> <span className="font-semibold text-gray-900">+91 9493959557</span>
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kisankhata.support@gmail.com&su=Kisan%20Khata%20Support%20Request&body=Hi%20Kisan%20Khata%20Team," target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex flex-col">
                  <span className="opacity-70 text-xs">General Support</span>
                  <span className="font-medium">kisankhata.support@gmail.com</span>
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kisankhata.official@gmail.com&su=Kisan%20Khata%20Business%20Inquiry" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex flex-col">
                  <span className="opacity-70 text-xs">Internship & Official</span>
                  <span className="font-medium">kisankhata.official@gmail.com</span>
                </a>
              </nav>
            </div>

            {/* Official Registration */}
            <div className="flex flex-col gap-5 lg:pt-3">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm">{language === 'en' ? 'Official' : 'అఫీషియల్'}</h4>
              <button 
                onClick={() => setIsUdyamModalOpen(true)}
                className="text-left group w-full"
              >
                <div className="bg-white p-4 rounded-xl border border-gray-200 group-hover:border-primary transition-colors h-full flex flex-col justify-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold flex items-center justify-between">
                    MSME Udyam Registration
                    <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold">VERIFIED</span>
                  </p>
                  <p className="text-sm font-mono font-bold text-gray-900 group-hover:text-primary transition-colors">UDYAM-AP-20-0107784</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium flex items-center gap-1 group-hover:text-primary transition-colors">
                    View Verification QR <ArrowRight size={10} />
                  </p>
                </div>
              </button>
              <div className="mt-1">
                <p className="text-sm text-gray-500">Made with ❤️ in India.</p>
              </div>
            </div>

          </div>

          <div className="w-full h-px bg-gray-200 mb-8"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <p>&copy; {new Date().getFullYear()} Kisan Khata. All rights reserved.</p>
            </div>
            <p>Founder & CEO: Achuth Manne</p>
          </div>

        </div>
      </footer>

      {/* Udyam Verification Modal (Corporate / Minimal) */}
      {isUdyamModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsUdyamModalOpen(false)}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-2xl w-full max-w-sm relative z-10 overflow-hidden flex flex-col border border-gray-100 shadow-xl"
          >
            {/* Header (Exact Match to Official Udyam Site) */}
            <div className="bg-[#1b2b45] text-white text-xs py-1.5 px-5 flex justify-between items-center">
              <span className="font-medium tracking-wide">Government of India</span>
              <button 
                onClick={() => setIsUdyamModalOpen(false)}
                className="text-white/80 hover:text-white p-0.5 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5 border-b border-gray-200 flex items-center gap-4 bg-white">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Government of India" className="h-16 object-contain" />
              <div className="flex flex-col text-left justify-center">
                <span className="font-serif text-[14px] text-gray-900 font-bold">
                  सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय
                </span>
                <span className="font-sans text-xs text-gray-800 mt-1 leading-none">
                  MINISTRY OF
                </span>
                <span className="font-sans text-[13px] text-gray-900 font-extrabold leading-tight mt-0.5">
                  MICRO, SMALL & MEDIUM ENTERPRISES
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col items-center bg-gray-50">
              
              <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm mb-4">
                <img src="/udyam verify qr.png" alt="Udyam QR Code" className="w-40 h-40 object-contain" />
              </div>

              <h4 className="font-mono font-bold text-lg text-gray-900 mb-1">UDYAM-AP-20-0107784</h4>
              <p className="text-gray-500 text-xs mb-6 text-center">Scan with any standard QR reader <br/>to verify official Udyam Registration.</p>

              <a 
                href="https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=u+jcjMSiZl9j0C3seSQTPcX7kyyt/8KcdlSfUtqUeYE=" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white hover:bg-gray-50 text-gray-800 text-sm font-bold rounded-lg border border-gray-200 transition-colors flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>Verify Online Portal</span>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
