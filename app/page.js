'use client'

import React, { useState, useEffect } from 'react';
import { Star, MapPin, Menu, X, ArrowRight, Hammer, HardHat, Ruler, CheckCircle2, Zap, Gift, Users, Cpu, Play, DollarSign, Briefcase, ClipboardList, HardHat as HardHatIcon, Users as UsersIcon, ChevronRight } from 'lucide-react';

// --- THE MASTER DATABASE (24 CONFIRMED PROJECTS) ---
const PROJECTS_DATA = [
  // FEATURED
  { id: 1, name: 'Legacy on Lynnfield', type: 'MULTI-FAMILY RENOVATION', address: '5900 Cedar Forest Dr, Memphis, TN 38119', review: 3.8, summary: 'Complete revitalization of the Lynnfield property. Scope included structural repairs, modern interior finishing, and landscaping overhaul.', mapLink: 'https://www.google.com/maps/search/?api=1&query=5900+Cedar+Forest+Dr+Memphis+TN', image: '/images/linfield.jpg', features: ['Full Interior Gut & Remodel', 'Structural Foundation Repair', '4-Month Turnaround'] },
  { id: 2, name: 'Arbors of Century Center', type: 'COMMERCIAL DEVELOPMENT', address: '7069 E Shelby Dr, Memphis, TN 38125', review: 2.9, summary: 'Large scale exterior and interior updates focused on modernizing amenities and improving tenant accessibility.', mapLink: 'https://www.google.com/maps/search/?api=1&query=7069+E+Shelby+Dr+Memphis+TN', image: '/images/arbors.jpg', features: ['Modern Lobby Redesign', 'Exterior Facade Update', 'HVAC System Overhaul'] },
  // LIST
  { id: 3, name: 'Trinity Lakes Apt', type: 'REHABILITATION', address: '7935 Club Dr, Cordova, TN 38016', mapLink: 'https://www.google.com/maps/search/?api=1&query=7935+Club+Dr+Cordova+TN' },
  { id: 4, name: 'Battery Heights Apt', type: 'STRUCTURAL REPAIR', address: '3401 Campbell St, Chattanooga, TN 37406', mapLink: 'https://www.google.com/maps/search/?api=1&query=3401+Campbell+St+Chattanooga+TN' },
  { id: 5, name: 'Birmingham Tower Apt', type: 'FACADE UPDATE', address: '2712 31st Ave N, Birmingham, AL 35207', mapLink: 'https://www.google.com/maps/search/?api=1&query=2712+31st+Ave+N+Birmingham+AL' },
  { id: 6, name: 'Breezy Point Apt TN', type: 'INTERIOR REHAB', address: '2801 Raja Dr, Memphis, TN 38127', mapLink: 'https://www.google.com/maps/search/?api=1&query=2801+Raja+Dr+Memphis+TN' },
  { id: 7, name: 'Chickasaw Place Apt', type: 'EXTERIOR UPGRADES', address: '203 Red Oak Dr E, Memphis, TN 38112', mapLink: 'https://www.google.com/maps/search/?api=1&query=203+Red+Oak+Dr+E+Memphis+TN' },
  { id: 8, name: 'Eastern Hts & Creekwood', type: 'UTILITY MODERNIZATION', address: '281 Johnson Cir W, Memphis, TN 38112', mapLink: 'https://www.google.com/maps/search/?api=1&query=281+Johnson+Cir+W+Memphis+TN' },
  { id: 9, name: 'Graceland Garden Apt', type: 'FULL INTERIOR GUT', address: '1430 Graceland Pines Ln, Memphis, TN 38116', mapLink: 'https://www.google.com/maps/search/?api=1&query=1430+Graceland+Pines+Ln+Memphis+TN' },
  { id: 10, name: 'Greenbriar Apt', type: 'ENERGY EFFICIENCY', address: '3131 Madewell St, Memphis, TN 38127', mapLink: 'https://www.google.com/maps/search/?api=1&query=3131+Madewell+St+Memphis+TN' },
  { id: 11, name: 'Highland Meadows Apt', type: 'COMMON AREA REMODEL', address: '5001 Airways Blvd, Memphis, TN 38116', mapLink: 'https://www.google.com/maps/search/?api=1&query=5001+Airways+Blvd+Memphis+TN' },
  { id: 12, name: 'IRISH Apt Mcewen TN', type: 'FULL SITE REPAIR', address: '43 Irish Dr, McEwen, TN 37101', mapLink: 'https://www.google.com/maps/search/?api=1&query=43+Irish+Dr+McEwen+TN' },
  { id: 13, name: 'Marianna, AR (South Pointe)', type: 'MULTI-UNIT REHAB', address: '365 California St, Marianna, AR 72360', mapLink: 'https://www.google.com/maps/search/?api=1&query=365+California+St+Marianna+AR' },
  { id: 14, name: 'Parkridge Apt Graham, NC', type: 'EXTERIOR FACELIFT', address: '1013 Town Branch Rd, Graham, NC 27253', mapLink: 'https://www.google.com/maps/search/?api=1&query=1013+Town+Branch+Rd+Graham+NC' },
  { id: 15, name: 'Pershing Park Apt TN', type: 'STRUCTURAL FOUNDATION', address: '3707 Pershing Park Dr, Memphis, TN 38127', mapLink: 'https://www.google.com/maps/search/?api=1&query=3707+Pershing+Park+Dr+Memphis+TN' },
  { id: 16, name: 'Presidential West Apt', type: 'UNIT MODERNIZATION', address: '5459 Hudgins Rd, Memphis, TN 38116', mapLink: 'https://www.google.com/maps/search/?api=1&query=5459+Hudgins+Rd+Memphis+TN' },
  { id: 17, name: 'Riverset Apt', type: 'WATERFRONT MAINTENANCE', address: '100 Riverset Ln, Memphis, TN 38103', mapLink: 'https://www.google.com/maps/search/?api=1&query=100+Riverset+Ln+Memphis+TN' },
  { id: 18, name: 'Royal Arms Apt', type: 'UNIT TURNOVER', address: '1580 N Royal St, Jackson, TN 38301', mapLink: 'https://www.google.com/maps/search/?api=1&query=1580+N+Royal+St+Jackson+TN' },
  { id: 19, name: 'South Park Gardens, MS', type: 'EXTERIOR REPAIRS', address: '8156 S Park Cir, Southaven, MS 38671', mapLink: 'https://www.google.com/maps/search/?api=1&query=8156+S+Park+Cir+Southaven+MS' },
  { id: 20, name: 'Spring Valley Apt', type: 'LANDSCAPING & UPGRADES', address: '4477 Spring Valley Dr, Memphis, TN 38128', mapLink: 'https://www.google.com/maps/search/?api=1&query=4477+Spring+Valley+Dr+Memphis+TN' },
  { id: 21, name: 'Summit Park', type: 'FULL-SITE MAINTENANCE', address: '1770 Piping Rock Dr, Memphis, TN 38116', mapLink: 'https://www.google.com/maps/search/?api=1&query=1770+Piping+Rock+Dr+Memphis+TN' },
  { id: 22, name: 'The Willows', type: 'INTERIOR REMODEL', address: '3985 New Willow Ave, Memphis, TN 38111', mapLink: 'https://www.google.com/maps/search/?api=1&query=3985+New+Willow+Ave+Memphis+TN' },
  { id: 23, name: 'Goodlett Farms Apt', type: 'EXTERIOR MAINTENANCE', address: '7435 Goodlett Farms Pkwy, Cordova, TN 38016', mapLink: 'https://www.google.com/maps/search/?api=1&query=7435+Goodlett+Farms+Pkwy+Cordova+TN' },
  { id: 24, name: 'Courts at Waterford Apt', type: 'MULTI-UNIT INTERIOR', address: '6220 Shallowford Rd, Chattanooga, TN 37421', mapLink: 'https://www.google.com/maps/search/?api=1&query=6220+Shallowford+Rd+Chattanooga+TN' },
];

// --- NAVIGATION COMPONENT ---
const Navigation = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', id: 'HOME' },
    { name: 'OUR STORY', id: 'STORY' },
    { name: 'THE SQUAD', id: 'SQUAD' },
    { name: 'MIRACLES', id: 'MIRACLES' },
    { name: 'THE WIRE', id: 'WIRE' },
  ];

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-2' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo - WHITE CIRCLE */}
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('HOME')}
          >
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center p-2 shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-transform group-hover:scale-110">
               <img src="/images/logo.png" alt="Arch Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-white group-hover:text-[#D4AF37] transition-colors">
              ARCH <span className="text-[#D4AF37]">CONTRACTORS</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-bold tracking-widest transition-colors ${activeTab === item.id ? 'text-[#D4AF37]' : 'text-[#A0A0A0] hover:text-[#D4AF37]'}`}
              >
                {item.name}
              </button>
            ))}
            <button onClick={() => setActiveTab('WIRE')} className="bg-[#D4AF37] text-black px-5 py-2 rounded font-black hover:bg-white hover:scale-105 transition-all shadow-lg text-xs md:text-sm tracking-wide">
              GET A QUOTE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-[#D4AF37]">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#D4AF37]/20 absolute w-full h-screen flex flex-col justify-center items-center -mt-20 z-40">
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((item) => (
              <button 
                key={item.id} 
                onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                }}
                className={`text-2xl font-black tracking-widest uppercase ${activeTab === item.id ? 'text-[#D4AF37]' : 'text-[#EAEAEA]'}`}
              >
                {item.name}
              </button>
            ))}
            <button onClick={() => { setActiveTab('WIRE'); setIsMobileMenuOpen(false); }} className="bg-[#D4AF37] text-black px-8 py-4 rounded font-black hover:bg-white transition-all uppercase tracking-widest text-lg">
                Get A Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- FOOTER COMPONENT ---
const Footer = ({ setActiveTab }) => (
  <footer className="bg-black border-t border-[#D4AF37]/20 py-12 text-center relative z-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center p-2 cursor-pointer" onClick={() => setActiveTab('HOME')}>
            <img src="/images/logo.png" alt="Arch Contractors Logo" className="w-full h-full object-contain" />
        </div>
      </div>
      <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">ARCH CONTRACTORS</h2>
      <p className="text-[#A0A0A0] max-w-md mx-auto mb-8 font-medium">We built this from the ground up. Don't play with us.</p>
      <div className="flex justify-center gap-8 mb-8">
        {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
          <a key={social} href="#" className="text-[#A0A0A0] hover:text-[#D4AF37] text-sm tracking-widest uppercase font-bold transition-colors">{social}</a>
        ))}
      </div>
      <p className="text-[#555] text-xs uppercase tracking-widest">© {new Date().getFullYear()} Arch Contractors LLC. All Rights Reserved.</p>
    </div>
  </footer>
);

// --- MAIN HOME COMPONENT ---
export default function Home() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [newsletterChecked, setNewsletterChecked] = useState(true);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="bg-[#0a0a0a] text-[#EAEAEA] font-sans min-h-screen flex flex-col selection:bg-[#D4AF37] selection:text-black">
      
      {/* PASSING THE REMOTE CONTROL TO NAVIGATION */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow pt-24">
        
        {/* === HOME PAGE === */}
        {activeTab === 'HOME' && (
          <div className="animate-in fade-in duration-500">
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="/images/hero.jpg" alt="Construction Site" className="w-full h-full object-cover opacity-40 grayscale-[20%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
              </div>
              <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-[-50px]">
                <div className="mb-6 inline-block border border-[#D4AF37] text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm">
                  Excellence in Construction
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter uppercase drop-shadow-2xl">
                  Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFE588]">Future</span><br/> of Memphis.
                </h1>
                <p className="text-lg md:text-xl text-[#A0A0A0] mb-10 font-light max-w-2xl mx-auto leading-relaxed">
                  Specializing in multi-family renovations and large-scale commercial developments. Quality craftsmanship, delivered on time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button onClick={() => setActiveTab('MIRACLES')} className="w-full sm:w-auto border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-sm font-bold hover:bg-[#D4AF37] hover:text-black transition-all text-sm tracking-[0.15em]">
                    VIEW OUR WORK
                  </button>
                  <button onClick={() => setActiveTab('WIRE')} className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-sm font-bold hover:bg-neutral-200 transition-all text-sm tracking-[0.15em] flex items-center gap-2 justify-center">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-current" /> GET A QUOTE
                  </button>
                </div>
              </div>
            </section>
            {/* Mini Featured Section */}
            <section className="py-20 bg-neutral-900 border-t border-[#262626]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase">Featured Miracles</h2>
                            <div className="w-20 h-1 bg-[#D4AF37] mt-2"></div>
                        </div>
                        <button onClick={() => setActiveTab('MIRACLES')} className="text-[#D4AF37] font-bold text-sm flex items-center gap-2 hover:underline">View All <ChevronRight size={16}/></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {PROJECTS_DATA.slice(0, 2).map(project => (
                            <div key={project.id} className="group relative h-96 rounded-xl overflow-hidden cursor-pointer" onClick={() => setActiveTab('MIRACLES')}>
                                <img src={project.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-2xl font-black text-white uppercase mb-2">{project.name}</h3>
                                    <p className="text-[#D4AF37] text-xs font-bold tracking-widest">{project.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
          </div>
        )}

        {/* === OUR STORY PAGE === */}
        {activeTab === 'STORY' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                  <h2 className="text-5xl font-black text-white uppercase mb-4 tracking-tight">Our Story</h2>
                  <div className="w-24 h-1.5 bg-[#D4AF37] mb-8"></div>
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-6 uppercase tracking-wide">We didn't inherit this. We built it.</h3>
                  <p className="text-[#A0A0A0] mb-6 leading-relaxed text-lg">Arch Contractors wasn't founded in a boardroom. It started in the mud, on the job site, doing the work that others wouldn't touch. We saw a construction industry full of cut corners and missed deadlines, and we decided to declare war on mediocrity.</p>
                  <p className="text-[#A0A0A0] mb-8 leading-relaxed text-lg">Today, we stand as Memphis's premier firm for complex renovations and large-scale developments. We run this city because we care more than the next guy.</p>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="border border-[#262626] p-6 rounded bg-[#0a0a0a]">
                          <h4 className="text-[#D4AF37] font-black text-4xl">150+</h4>
                          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mt-2">Projects Completed</p>
                      </div>
                      <div className="border border-[#262626] p-6 rounded bg-[#0a0a0a]">
                          <h4 className="text-[#D4AF37] font-black text-4xl">0</h4>
                          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mt-2">Deadlines Missed</p>
                      </div>
                  </div>
              </div>
              <div className="md:w-1/2 relative">
                  <div className="absolute -inset-4 border-2 border-[#D4AF37] translate-x-4 translate-y-4 rounded-sm z-0"></div>
                  <img src="/images/linfield.jpg" alt="Construction Planning" className="relative z-10 w-full h-auto rounded-sm grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"/>
              </div>
            </div>
          </div>
        )}

        {/* === THE SQUAD PAGE (FULL ROSTER) === */}
        {activeTab === 'SQUAD' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-white uppercase mb-4">The Squad</h2>
                <p className="text-neutral-500 font-bold tracking-widest uppercase">The hardest working team in Memphis</p>
                <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto mt-6"></div>
              </div>

              {/* 1. THE BRASS (LEADERSHIP) */}
              <h3 className="text-[#D4AF37] text-xl font-black uppercase mb-8 border-b border-[#262626] pb-4">Leadership</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                  {/* RANDY */}
                  <div className="bg-neutral-900 border border-[#262626] rounded-lg overflow-hidden group hover:border-[#D4AF37] transition-all">
                      <div className="h-72 overflow-hidden relative">
                          <img src="/images/team-randy.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="p-6 relative">
                          <div className="absolute -top-6 right-6 bg-[#D4AF37] p-3 rounded-full border-4 border-neutral-900"><Hammer className="text-black w-5 h-5" /></div>
                          <h3 className="text-xl font-bold text-white uppercase">Randy</h3>
                          <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Founder & CEO</p>
                          <p className="text-[#A0A0A0] text-sm mt-2">"The Hammer"</p>
                      </div>
                  </div>
                  {/* VANESSA */}
                  <div className="bg-neutral-900 border border-[#262626] rounded-lg overflow-hidden group hover:border-[#D4AF37] transition-all">
                      <div className="h-72 overflow-hidden relative">
                          <img src="/images/team-vanessa.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="p-6 relative">
                          <div className="absolute -top-6 right-6 bg-[#D4AF37] p-3 rounded-full border-4 border-neutral-900"><Briefcase className="text-black w-5 h-5" /></div>
                          <h3 className="text-xl font-bold text-white uppercase">Vanessa</h3>
                          <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Vice President</p>
                      </div>
                  </div>
                  {/* ERIKA */}
                  <div className="bg-neutral-900 border border-[#262626] rounded-lg overflow-hidden group hover:border-[#D4AF37] transition-all">
                      <div className="h-72 overflow-hidden relative">
                          <img src="/images/team-erika.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="p-6 relative">
                          <div className="absolute -top-6 right-6 bg-[#D4AF37] p-3 rounded-full border-4 border-neutral-900"><DollarSign className="text-black w-5 h-5" /></div>
                          <h3 className="text-xl font-bold text-white uppercase">Erika</h3>
                          <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">CFO / Money Woman</p>
                      </div>
                  </div>
                  {/* ERIC */}
                  <div className="bg-neutral-900 border border-[#262626] rounded-lg overflow-hidden group hover:border-[#D4AF37] transition-all">
                      <div className="h-72 overflow-hidden relative">
                          <img src="/images/team-eric.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="p-6 relative">
                          <div className="absolute -top-6 right-6 bg-[#D4AF37] p-3 rounded-full border-4 border-neutral-900"><ClipboardList className="text-black w-5 h-5" /></div>
                          <h3 className="text-xl font-bold text-white uppercase">Eric</h3>
                          <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">General Contractor</p>
                      </div>
                  </div>
              </div>
sans
              {/* 2. FIELD COMMANDERS */}
              <h3 className="text-[#D4AF37] text-xl font-black uppercase mb-8 border-b border-[#262626] pb-4">Field Commanders</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  {/* Odilit */}
                  <div className="bg-neutral-900 border border-[#262626] rounded-lg overflow-hidden group hover:border-[#D4AF37] transition-all flex flex-col md:flex-row">
                      <div className="md:w-1/2 h-64 relative">
                          <img src="/images/team-Odilit.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col justify-center relative">
                          <div className="absolute top-4 right-4 bg-[#D4AF37] p-2 rounded-full"><Ruler className="text-black w-4 h-4" /></div>
                          <h3 className="text-2xl font-bold text-white uppercase">Sarah</h3>
                          <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase">Architect</p>
                      </div>
                  </div>
                  {/* ESTEBAN */}
                  <div className="bg-neutral-900 border border-[#262626] rounded-lg overflow-hidden group hover:border-[#D4AF37] transition-all flex flex-col md:flex-row">
                      <div className="md:w-1/2 h-64 relative">
                          <img src="/images/team-esteban.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col justify-center relative">
                          <div className="absolute top-4 right-4 bg-[#D4AF37] p-2 rounded-full"><HardHatIcon className="text-black w-4 h-4" /></div>
                          <h3 className="text-2xl font-bold text-white uppercase">Esteban</h3>
                          <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase">Lead Foreman</p>
                          <p className="text-[#A0A0A0] text-sm mt-4">Runs the site with military precision.</p>
                      </div>
                  </div>
              </div>

              {/* 3. THE CREWS (LISTS) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  {/* OFFICE CREW */}
                  <div className="bg-[#0a0a0a] border border-[#262626] p-10 rounded-xl relative overflow-hidden group hover:border-[#D4AF37] transition-all">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><UsersIcon size={120} className="text-[#D4AF37]" /></div>
                      <h3 className="text-3xl font-black text-white uppercase mb-2">Office Crew</h3>
                      <div className="w-16 h-1.5 bg-[#D4AF37] mb-8"></div>
                      <ul className="space-y-4 text-xl text-[#A0A0A0] font-medium">
                          <li className="flex items-center gap-3"><CheckCircle2 className="text-[#D4AF37] w-5 h-5" /> Christopher</li>
                          <li className="flex items-center gap-3"><CheckCircle2 className="text-[#D4AF37] w-5 h-5" /> Jose</li>
                          <li className="flex items-center gap-3"><CheckCircle2 className="text-[#D4AF37] w-5 h-5" /> Axel</li>
                          <li className="flex items-center gap-3"><CheckCircle2 className="text-[#D4AF37] w-5 h-5" /> Francisco</li>
                      </ul>
                  </div>
                  {/* MAKE IT HAPPEN CREW */}
                  <div className="bg-[#0a0a0a] border border-[#262626] p-10 rounded-xl relative overflow-hidden group hover:border-[#D4AF37] transition-all">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Zap size={120} className="text-[#D4AF37]" /></div>
                      <h3 className="text-3xl font-black text-white uppercase mb-2">Make It Happen Crew</h3>
                      <div className="w-16 h-1.5 bg-[#D4AF37] mb-8"></div>
                      <ul className="space-y-4 text-xl text-[#A0A0A0] font-medium">
                          <li className="flex items-center gap-3"><Hammer className="text-[#D4AF37] w-5 h-5" /> Victor</li>
                          <li className="flex items-center gap-3"><Hammer className="text-[#D4AF37] w-5 h-5" /> Rigoberto</li>
                          <li className="flex items-center gap-3"><Hammer className="text-[#D4AF37] w-5 h-5" /> Cholo</li>
                      </ul>
                  </div>
              </div>

              {/* GROUP PHOTO */}
              <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-[#262626] group hover:border-[#D4AF37] transition-all shadow-2xl">
                  <img src="/images/team-group.jpg" alt="Arch Contractors Team" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-700"></div>
                  <div className="absolute bottom-8 left-8">
                      <h3 className="text-4xl md:text-6xl font-black text-white uppercase drop-shadow-lg tracking-tighter">One Team.<br/>One Mission.</h3>
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* === MIRACLES PAGE (PROJECTS) === */}
        {activeTab === 'MIRACLES' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-black text-white uppercase mb-4">Miracles</h2>
                <p className="text-neutral-500 font-bold tracking-widest uppercase mb-8">We don't just build. We transform.</p>
                <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto rounded-full"></div>
              </div>

              {/* TOP 2 FEATURED */}
              <div className="grid grid-cols-1 gap-24 mb-24">
                  {PROJECTS_DATA.slice(0, 2).map((project, index) => (
                      <div key={project.id} className={`group bg-[#0a0a0a] border border-[#262626] rounded-xl overflow-hidden flex flex-col hover:border-[#D4AF37]/50 transition-colors duration-300 shadow-2xl ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                          <div className="md:w-1/2 relative h-80 md:h-auto overflow-hidden">
                              <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute top-0 left-0 w-full h-full bg-black/20 group-hover:bg-transparent transition-all"></div>
                              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 text-white text-xs font-bold rounded border-l-2 border-[#D4AF37] flex items-center gap-2">
                                  <MapPin size={14} className="text-[#D4AF37]" /> {project.address}
                              </div>
                          </div>
                          <div className="md:w-1/2 p-12 flex flex-col justify-center">
                              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{project.name}</h3>
                              <p className="text-[#D4AF37] text-xs font-bold mb-6 tracking-widest uppercase">{project.type}</p>
                              <p className="text-[#A0A0A0] mb-8 leading-relaxed">{project.summary}</p>
                              <ul className="mb-8 space-y-2">
                                  {project.features.map((feat, i) => (
                                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-300"><CheckCircle2 size={16} className="text-[#D4AF37]" /> {feat}</li>
                                  ))}
                              </ul>
                              <div className="flex flex-wrap gap-6">
                                  <a href={project.mapLink} target="_blank" className="text-white border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors text-sm font-bold tracking-wider flex items-center gap-2"><MapPin size={16} /> VIEW ON MAP</a>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              {/* GRID */}
              <div className="text-center mb-12"><h3 className="text-2xl font-black text-white uppercase mb-2">Confirmed Portfolio</h3></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROJECTS_DATA.slice(2).map((project) => (
                      <div key={project.id} className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-6 group hover:border-[#D4AF37] transition-all duration-300">
                          <div className="flex items-start justify-between mb-4">
                              <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">{project.name}</h3>
                              <span className="text-[10px] font-bold text-black bg-[#D4AF37] px-2 py-1 rounded-full uppercase">{project.type}</span>
                          </div>
                          <p className="text-neutral-400 text-xs mb-4 flex items-start gap-2"><MapPin size={14} className="min-w-[14px] mt-0.5" /> {project.address}</p>
                          <a href={project.mapLink} target="_blank" className="w-full block text-center border border-[#262626] text-neutral-400 py-2 rounded hover:bg-[#D4AF37] hover:text-black transition-all text-xs font-bold uppercase tracking-wider">Locate Jobsite</a>
                      </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* === THE WIRE PAGE (NEWS/CONTACT) === */}
        {activeTab === 'WIRE' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                 <h2 className="text-5xl font-black text-white uppercase mb-2 tracking-tighter">The Wire</h2>
                 <p className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-8">Arch Contractors Insider Hub</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Updates */}
                <div className="space-y-12">
                  <div className="bg-neutral-900/40 border border-[#D4AF37]/30 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="p-1 bg-[#D4AF37] bg-opacity-20">
                        <div className="bg-black p-6 rounded-t-xl border-b border-neutral-800 flex justify-between items-center">
                           <div className="flex items-center gap-2"><Cpu className="text-[#D4AF37]" size={24} /><h3 className="text-white font-bold tracking-widest uppercase">ArchOS System</h3></div>
                           <span className="bg-[#D4AF37] text-black text-xs font-black px-2 py-1 rounded">NEW UPGRADE</span>
                        </div>
                    </div>
                    <div className="p-8">
                      <p className="text-neutral-400 mb-6 text-sm">Our dev team built a highly interconnected jobsite management system powered by <span className="text-white font-bold">Microsoft Azure</span>.</p>
                      <button className="w-full border border-neutral-700 hover:border-[#D4AF37] text-white py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-[#D4AF37]/10 transition-all">View Tech Specs</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-4"><Gift className="text-[#D4AF37]" /><h4 className="text-white font-bold uppercase">Celebrations</h4></div>
                        <p className="text-sm text-neutral-400 mb-4">Big shoutout to <span className="text-white font-bold">Christopher</span> for his upcoming Birthday on the 6th!</p>
                     </div>
                     <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-4"><Users className="text-[#D4AF37]" /><h4 className="text-white font-bold uppercase">We're Hiring</h4></div>
                        <p className="text-sm text-neutral-400 mb-4">Looking for local drywall finishers in the Memphis area.</p>
                        <button className="text-[#D4AF37] text-xs font-bold underline decoration-dotted">Apply Now</button>
                     </div>
                  </div>
                </div>
                {/* Contact Form */}
                <div className="bg-neutral-900 p-10 rounded-2xl border border-[#D4AF37] shadow-2xl h-fit">
                  <h3 className="text-3xl font-black text-white mb-2 uppercase">Get A Quote</h3>
                  <p className="text-neutral-500 mb-8 text-sm">Tell us about your project.</p>
                  <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                     <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE" />
                     <input type="text" name="name" className="w-full bg-black border border-neutral-800 text-white p-4 rounded focus:outline-none focus:border-[#D4AF37]" placeholder="Full Name" required/>
                     <input type="email" name="email" className="w-full bg-black border border-neutral-800 text-white p-4 rounded focus:outline-none focus:border-[#D4AF37]" placeholder="email@address.com" required/>
                     <textarea name="message" rows="4" className="w-full bg-black border border-neutral-800 text-white p-4 rounded focus:outline-none focus:border-[#D4AF37]" placeholder="Project Details" required></textarea>
                     <div className={`p-4 rounded-lg border transition-all duration-300 ${newsletterChecked ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-neutral-950 border-neutral-800'}`}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${newsletterChecked ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800 text-neutral-500'}`}><Zap size={20} fill={newsletterChecked ? "black" : "none"} /></div>
                              <div><p className={`font-bold text-sm ${newsletterChecked ? 'text-[#D4AF37]' : 'text-neutral-400'}`}>JOIN THE WIRE</p></div>
                           </div>
                           <label className="relative inline-flex items-center cursor-pointer">
                             <input type="checkbox" checked={newsletterChecked} onChange={() => setNewsletterChecked(!newsletterChecked)} className="sr-only peer" />
                             <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                           </label>
                        </div>
                     </div>
                     <button type="submit" className="w-full bg-[#D4AF37] text-black font-black text-base py-5 rounded hover:bg-white hover:scale-[1.01] transition-all uppercase tracking-[0.2em] shadow-lg">SUBMIT REQUEST</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* PASSING REMOTE CONTROL TO FOOTER */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}