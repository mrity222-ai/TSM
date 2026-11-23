'use client';

import { useState } from 'react';
import { Mail, Clock, ShieldAlert, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Editorial / News Tip');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xs">
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950">
            Contact The Stock Times
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Reach out to our editorial desk for story corrections, press releases, advertising inquiries, or technical feedback regarding our financial calculators.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left Contact Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-slate-800">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Editorial &amp; General Desk</span>
              </div>
              <a
                href="mailto:editorial@thestocktimes.online"
                className="text-sm font-bold text-blue-600 hover:underline block"
              >
                editorial@thestocktimes.online
              </a>
              <p className="text-xs text-slate-500">
                For press releases, corrections, and reader feedback.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-slate-800">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Response Time</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team reviews incoming messages Monday through Saturday and typically responds within <strong>24 to 48 business hours</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Advisory Notice</span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Please do not send personal demat credentials, bank details, or requests for personalised stock buy/sell tips. We do not provide individual investment advisory.
              </p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h2 className="text-lg font-bold text-slate-900">Message Received</h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Thank you, <strong>{name}</strong>. Your message has been logged for our editorial team. We will reply to <strong>{email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0B1C2D] text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option>Editorial / News Tip</option>
                    <option>Article Correction / Feedback</option>
                    <option>Advertising &amp; Sponsorship</option>
                    <option>Finance Tools / Technical Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B1C2D] hover:bg-blue-700 text-white text-xs font-extrabold uppercase tracking-wider transition"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
