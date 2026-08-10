"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Search, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const [interns, setInterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const fetchInterns = async () => {
    try {
      const res = await fetch("/api/admin/interns");
      const data = await res.json();
      if (res.ok) {
        setInterns(data.interns);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Kisan@2026") {
      setIsAuthenticated(true);
      fetchInterns();
    } else {
      setLoginError("Invalid admin password");
    }
  };

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      
      if (res.ok) {
        // Safely update local state
        setInterns(prev => prev.map(i => i._id === id ? { ...i, ...data.intern } : i));
        alert("Applicant Approved Successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setApprovingId(null);
    }
  };

  const filteredInterns = interns.filter((intern) => {
    const q = searchQuery.toLowerCase();
    return (
      intern.name.toLowerCase().includes(q) ||
      intern.email.toLowerCase().includes(q) ||
      intern.phone.includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 w-full max-w-md shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access Only</h1>
            <p className="text-slate-500">Enter password to view applications.</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all bg-slate-50/50 mb-4 text-center font-bold"
            />
            {loginError && <p className="text-red-500 text-sm font-medium mb-4 text-center">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-[#008F5A] text-white font-bold py-4 rounded-2xl hover:bg-[#007A4D] transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-10 text-center text-xl font-bold">Loading Admin Dashboard...</div>;

  return (
    <div className="min-h-screen bg-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-[#008F5A] font-heading tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 mt-2 font-medium">Manage Internship Applications</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-3 flex items-center gap-3 w-full md:w-auto">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search name, phone, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none text-sm font-medium w-full md:w-64 bg-transparent" 
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 font-medium mb-8">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-225">
            <thead>
              <tr className="bg-[#008F5A] text-white text-xs uppercase tracking-wider">
                <th className="p-5 font-bold w-12 text-center">S.No</th>
                <th className="p-5 font-bold w-1/5">Applicant Name</th>
                <th className="p-5 font-bold w-1/5">Contact Info</th>
                <th className="p-5 font-bold w-2/5">Details</th>
                <th className="p-5 font-bold w-1/12">Status</th>
                <th className="p-5 font-bold w-1/12">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500 font-medium">No applications found.</td>
                </tr>
              ) : (
                filteredInterns.map((intern, index) => (
                  <tr key={intern._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 align-top font-bold text-slate-400 text-center">{index + 1}</td>
                    <td className="p-5 align-top">
                      <div className="font-bold text-slate-900 text-base">{intern.name}</div>
                      <div className="text-xs text-slate-500 mt-1">Applied: {new Date(intern.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="p-5 align-top">
                      <div className="font-medium text-slate-800">{intern.phone}</div>
                      <div className="text-sm text-slate-500">{intern.email}</div>
                    </td>
                    <td className="p-5 align-top whitespace-normal">
                      <div className="font-medium text-slate-800 capitalize mb-1">{intern.role}</div>
                      <div className="text-sm text-slate-600 font-medium mb-1">{intern.college !== 'N/A' ? intern.college : 'No College Provided'}</div>
                      <div className="text-xs text-slate-500 mb-3">Location: {intern.village}</div>
                      <div className="text-sm text-slate-700 italic bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <span className="font-bold text-xs text-slate-400 uppercase tracking-wider block mb-1">Why Kisan Khata?</span>
                        "{intern.motivation || 'N/A'}"
                      </div>
                    </td>
                    <td className="p-5 align-top">
                      {intern.status === "Approved" ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#008F5A]/10 border border-[#008F5A]/20 text-[#008F5A] px-3 py-1.5 rounded-md text-xs font-bold">
                          <CheckCircle2 size={14} /> Approved
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-xs font-bold">
                          Pending
                        </div>
                      )}
                    </td>
                    <td className="p-5 align-top">
                      {intern.status === "Pending" ? (
                        <button 
                          disabled={approvingId === intern._id}
                          onClick={() => handleApprove(intern._id)}
                          className="bg-[#008F5A] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#007A4D] transition-colors w-full disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {approvingId === intern._id ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Approving...
                            </>
                          ) : "Approve"}
                        </button>
                      ) : (
                        <div className="text-sm font-bold text-[#008F5A] bg-[#008F5A]/10 border border-[#008F5A]/20 p-2 rounded-md text-center">
                          {intern.referralCode}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
