import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* HEADER */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1000px] mx-auto px-6 py-2 flex items-center justify-between overflow-hidden">
          <Link href="/" className="flex flex-row md:flex-col items-center justify-center gap-1.5 md:gap-0 cursor-pointer transition-transform hover:scale-105">
            <div className="w-8 h-8 md:w-16 md:h-10 flex items-center justify-center shrink-0 relative overflow-visible">
              <img src="/logo.png" alt="Kisan Khata Logo" className="w-full h-full object-contain scale-[1.8] md:scale-[2.5] origin-center" />
            </div>
            <span className="text-[16px] md:text-[15px] font-heading font-extrabold text-primary tracking-tight leading-none z-10 pt-0.5 md:pt-0 md:-mt-0.5">
              Kisan Khata
            </span>
          </Link>
          <Link href="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </div>
      </header>

      {/* DOCUMENT CONTENT (A4 Paper Style) */}
      <div className="w-full px-3 sm:px-6 py-6 md:py-12 flex justify-center">
        <main className="w-full max-w-[850px] bg-white shadow-xl shadow-gray-200/50 border border-gray-200 px-5 py-8 sm:px-10 sm:py-12 md:px-16 md:py-20 overflow-hidden break-words">
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-12">Effective Date: August 13, 2026</p>

        <div className="space-y-10 text-base text-gray-700 leading-relaxed">
          
          <section>
            <p className="mb-4">
              Welcome to <strong>Kisan Khata</strong>. We deeply respect your privacy and are committed to protecting your personal and agricultural data. This comprehensive Privacy Policy governs the collection, processing, storage, and sharing of information when you use our mobile application ("App") and website ("Site"), collectively referred to as the "Service."
            </p>
            <p className="mb-4">
              By installing, accessing, or using Kisan Khata, you explicitly agree to the terms outlined in this Privacy Policy. If you do not agree with our data practices, please discontinue the use of our Service immediately. This policy is fully compliant with the Google Play Store's User Data policies and applicable Indian privacy regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We operate under the principle of data minimization, collecting only the information strictly necessary to provide and improve the Kisan Khata digital ledger functionality. 
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1.1. Personal and Financial Data</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Mobile Number:</strong> We collect your mobile number exclusively for account creation, secure OTP (One-Time Password) authentication via Google Firebase, and account recovery. Your mobile number acts as your unique identifier.</li>
              <li><strong>User Profile:</strong> You may provide a Name, Profile Picture, and Regional preferences (State/Language) to personalize your experience.</li>
              <li><strong>Ledger Entries (User-Generated Content):</strong> Any data you manually input regarding crop sales, labor attendance, machinery usage, and financial expenses is securely stored in our cloud databases to ensure your ledger is synchronized across devices.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1.2. Sensitive Device Permissions</h3>
            <p className="mb-4">To enable core agricultural features, the App requests specific, explicit permissions from your operating system:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Contacts Permission (READ_CONTACTS):</strong> We request read-only access to your local contacts strictly to allow you to quickly auto-fill names and phone numbers when adding daily wage laborers, drivers, or vendors to your ledger. <em>Crucially, we do not upload, sync, or store your entire phonebook on our servers.</em> Only the specific contact you explicitly select is processed and saved in your personal ledger.</li>
              <li><strong>Microphone Permission (RECORD_AUDIO):</strong> We request microphone access solely to power our regional language Voice Search functionality. When you use Voice Search, your voice data is instantly transcribed into text to search your ledger entries. <em>We do not record, store, or monitor your audio on our servers.</em></li>
              <li><strong>Location Data (ACCESS_COARSE_LOCATION / ACCESS_FINE_LOCATION):</strong> We request location access solely to provide accurate, localized weather forecasts and nearby agricultural market yard prices (Mandi Prices). Location data is fetched temporarily on-demand and is <em>not continuously tracked or logged in the background</em>.</li>
              <li><strong>Camera & Storage (READ_EXTERNAL_STORAGE / CAMERA):</strong> We request these permissions to allow you to upload profile pictures or attach receipts to your ledger entries.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1.3. Automated Data Collection</h3>
            <p className="mb-4">
              When you use the Service, we may automatically collect diagnostic data such as your device model, operating system version, unique device identifiers (FCM tokens for push notifications), and crash logs. This data is entirely anonymized and used exclusively to fix bugs and improve app performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">The collected information is utilized strictly to deliver the promised agricultural ledger services:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Service Delivery:</strong> To operate, maintain, and provide the core functionalities of the Kisan Khata app, including secure cloud synchronization of your financial records.</li>
              <li><strong>Communication:</strong> To send you essential push notifications regarding your account, daily attendance reminders, and alerts regarding new government agricultural schemes.</li>
              <li><strong>Customer Support:</strong> To assist you when you contact our support channels (e.g., via our official WhatsApp integration).</li>
              <li><strong>Improvement & Analytics:</strong> To understand how farmers use the app, allowing us to optimize the user interface and develop new, relevant features.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Data Sharing and Third-Party Services</h2>
            <p className="mb-4">
              <strong>We do not sell, rent, or trade your personal or financial data to any third-party marketing, advertising, or data brokerage companies.</strong> Your data belongs to you.
            </p>
            <p className="mb-4">
              However, to operate the Service at scale, we utilize highly secure, industry-leading third-party service providers who are bound by strict data processing agreements:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Google Firebase:</strong> We use Firebase Authentication (for OTP login), Cloud Firestore (for database storage), and Cloud Storage (for images). Firebase complies with global security standards (ISO 27001, SOC 2).</li>
              <li><strong>External APIs:</strong> We may send your anonymous location coordinates to third-party weather or market price APIs exclusively to fetch localized agricultural data. No personally identifiable information is sent to these providers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Security & Encryption</h2>
            <p className="mb-4">
              We implement robust security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. 
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>In Transit:</strong> All communications between your Kisan Khata app and our cloud servers are encrypted using modern Transport Layer Security (TLS/HTTPS).</li>
              <li><strong>At Rest:</strong> All your ledger entries, financial data, and personal information are securely encrypted at rest within our Google Firebase databases.</li>
            </ul>
            <p className="mb-4">
              While we strive to use commercially acceptable means to protect your data, please remember that no method of electronic transmission over the Internet or method of electronic storage is 100% secure. You are responsible for keeping your physical device and login credentials secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Retention and Deletion Rights</h2>
            <p className="mb-4">
              We retain your personal data only for as long as your account is active or as needed to provide you the Service.
            </p>
            <p className="mb-4">
              <strong>Your Right to Deletion:</strong> You have the absolute right to request the deletion of your account and all associated personal and financial data. You can exercise this right by contacting our support team via email or WhatsApp. Upon receiving a verified deletion request, we will permanently erase your data from our active production systems within 30 days, subject to any legal obligations requiring us to retain certain records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Children's Privacy</h2>
            <p className="mb-4">
              Our Service is intended for adults and agricultural professionals. We do not knowingly collect personally identifiable information from children under the age of 13. If we discover that a child under 13 has provided us with personal data, we will immediately delete such information from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Changes to this Privacy Policy</h2>
            <p className="mb-4">
              We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the revised policy on this page. We encourage you to review this Privacy Policy periodically. Your continued use of the Service after any modifications indicates your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please contact our Grievance Officer:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email:</strong> kisankhata.support@gmail.com</li>
              <li><strong>WhatsApp Support:</strong> +91 9493959557</li>
              <li><strong>Address:</strong> Andhra Pradesh, India</li>
            </ul>
          </section>

        </div>
      </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kisan Khata. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="text-primary font-medium">Privacy Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
