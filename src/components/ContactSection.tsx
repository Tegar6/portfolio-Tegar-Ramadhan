import React, { useState } from 'react';
import { HERO_DATA } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { CheckCircle, Mail, MapPin, MessageSquare, Send, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { logEvent } from '../utils/analytics';

interface ContactSectionProps {
  theme: ThemeMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      logEvent('submit_contact_form', 'lead_generation', {
        sender: formData.name,
        subject: formData.subject,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading matching style: Contact. */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Contact
            <span className="text-[#00E5FF] font-black ml-0.5">.</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Mari berdiskusi mengenai proyek web, tawaran karir, atau kolaborasi seru lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-8 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <h3 className="text-2xl font-bold font-heading">Mari Terhubung!</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Saya selalu terbuka untuk berdiskusi seputar peluang pengembangan frontend, freelance, maupun proyek penuh waktu.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center border border-[#00E5FF]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Email</p>
                    <p className="font-semibold text-cyan-400">mhmmd.tegar88@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center border border-[#00E5FF]/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Lokasi</p>
                    <p className="font-semibold">{HERO_DATA.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Media Sosial & Komunitas:
                </p>
                <div className="flex items-center space-x-3">
                  {[
                    { icon: Github, label: 'GitHub', href: 'https://github.com/Tegar6' },
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-tegar-ramadhan-185461364/' },
                    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                  ].map((soc, idx) => {
                    const Icon = soc.icon;
                    return (
                      <a
                        key={idx}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => logEvent('click_social', 'contact', { platform: soc.label })}
                        className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:text-[#00E5FF] hover:bg-slate-700 flex items-center justify-center transition-colors"
                        title={soc.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading">Pesan Terkirim!</h4>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto">
                    Terima kasih telah menghubungi Dev. Pesan Anda telah terekam dan akan dibalas secepatnya.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-800 focus:border-[#00E5FF] text-white'
                            : 'bg-slate-50 border-slate-200 focus:border-[#00E5FF] text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-800 focus:border-[#00E5FF] text-white'
                            : 'bg-slate-50 border-slate-200 focus:border-[#00E5FF] text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Subjek Pesan
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Penawaran Proyek / Diskusi Web"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 focus:border-[#00E5FF] text-white'
                          : 'bg-slate-50 border-slate-200 focus:border-[#00E5FF] text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Pesan Anda *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan detail pesan Anda di sini..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 focus:border-[#00E5FF] text-white'
                          : 'bg-slate-50 border-slate-200 focus:border-[#00E5FF] text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#00E5FF] text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 hover:bg-[#00cbe4] transition-all cyan-glow cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Mengirim Pesan...</span>
                    ) : (
                      <>
                        <span>Kirim Pesan Sekarang</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
