import React, { useState } from 'react';
import { 
  Car, Lock, ShieldCheck, Search, Filter, KeyRound, 
  FileCheck, Users, PlusCircle, CheckCircle, Sparkles, 
  CreditCard, ExternalLink, SlidersHorizontal, ArrowRight,
  ShieldAlert, UserCheck, EyeOff, FileText, Download, Building,
  Check, X, Zap, ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [userPlan, setUserPlan] = useState('free'); // 'free', 'pro', 'vip'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [targetPlan, setTargetPlan] = useState('pro');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showTeaserModal, setShowTeaserModal] = useState(null);
  const [unlockRequested, setUnlockRequested] = useState({});

  // Listings Off-Market Mock
  const [cars, setCars] = useState([
    {
      id: 'OFF-8821',
      title: 'Ferrari F40 Euro-Spec',
      year: 1991,
      mileage: '12 400 km',
      price: '2 850 000 €',
      category: 'Hypercar',
      confidentiality: 'Off-Market Absolu',
      confidentialityLevel: 3,
      location: 'Monaco / Suisse (Transit)',
      condition: 'Concours - Classiche Certified',
      matchingNumbers: true,
      description: 'Exemplaire d’exception d’origine européenne. Carnet complet chez le concessionnaire officiel, certification Ferrari Classiche accordée. N’a jamais été publiée en ligne.',
      vin: 'ZFFPA34B00008821X',
      owner: 'Collection Privée (Family Office)',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'OFF-9402',
      title: 'Porsche 911 Singer Reimagined',
      year: 2021,
      mileage: '1 200 km',
      price: '1 450 000 €',
      category: 'Restomod',
      confidentiality: 'Confidentiel Strict',
      confidentialityLevel: 2,
      location: 'Genève, Suisse',
      condition: 'État Neuf',
      matchingNumbers: false,
      description: 'Commission Singer "Classic Study". Moteur 4.0L Flatz-Six par Cosworth. Carrosserie Carbone complète, finition intérieur Cuir woven d’exception.',
      vin: 'WP0ZZZ91ZMS119402',
      owner: 'Broker Partenaire UK',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'OFF-1104',
      title: 'Bugatti Chiron Sport 110 Ans',
      year: 2020,
      mileage: '3 800 km',
      price: '3 900 000 €',
      category: 'Hypercar',
      confidentiality: 'Off-Market Absolu',
      confidentialityLevel: 3,
      location: 'Dubaï, Émirats Arabe Unis',
      condition: 'Parfait État',
      matchingNumbers: true,
      description: 'Série ultra limitée (1 sur 20 dans le monde). Carbone bleu visible mat, intérieur cuir & alcatara d’origine. Garantie d’usine prolongée.',
      vin: 'VF735398200001104',
      owner: 'VIP Single Owner',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'OFF-5510',
      title: 'Mercedes-Benz 300 SL Roadster',
      year: 1958,
      mileage: '68 000 km',
      price: '1 680 000 €',
      category: 'Vintage',
      confidentiality: 'Semi-Confidentiel',
      confidentialityLevel: 1,
      location: 'Stuttgart, Allemagne',
      condition: 'Restauration Châssis Nu',
      matchingNumbers: true,
      description: 'Matching colors et matching numbers vérifiés par le Mercedes Classic Center. Freins à disque mis à jour. Hardtop d’origine inclus.',
      vin: '19804210005510',
      owner: 'Collectionneur Privé',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000'
    }
  ]);

  // Handle plan upgrade simulation
  const handleUpgrade = (planKey) => {
    setTargetPlan(planKey);
    setShowCheckoutModal(true);
  };

  const confirmUpgrade = () => {
    setUserPlan(targetPlan);
    setShowCheckoutModal(false);
  };

  const requestUnlock = (carId) => {
    if (userPlan === 'free') {
      handleUpgrade('pro');
      return;
    }
    setUnlockRequested(prev => ({ ...prev, [carId]: true }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500/30">
      {/* Top Bar Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Car className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
                APEX <span className="text-amber-400 font-light text-sm tracking-widest uppercase">Private Garage</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Réseau Off-Market pour Brokers</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Plan Badge / Quick Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs">
              <span className="px-3 py-1 font-semibold text-slate-400">Statut:</span>
              <button 
                onClick={() => setUserPlan('free')}
                className={`px-3 py-1 rounded-full transition ${userPlan === 'free' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
              >
                Gratuit
              </button>
              <button 
                onClick={() => setUserPlan('pro')}
                className={`px-3 py-1 rounded-full flex items-center gap-1 transition ${userPlan === 'pro' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-amber-400'}`}
              >
                PRO (99€/m)
              </button>
              <button 
                onClick={() => setUserPlan('vip')}
                className={`px-3 py-1 rounded-full flex items-center gap-1 transition ${userPlan === 'vip' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm' : 'text-slate-400 hover:text-amber-300'}`}
              >
                VIP Prestige
              </button>
            </div>

            {userPlan === 'free' ? (
              <button 
                onClick={() => handleUpgrade('pro')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <Zap className="w-4 h-4" /> Passer Pro (99 €)
              </button>
            ) : (
              <button 
                onClick={() => setShowAddCarModal(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" /> Référencer un Véhicule
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Réseau Sécurisé sous NDA Automatisé
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Plateforme B2B des Véhicules <span className="text-amber-400">Off-Market</span> & Hypercars.
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Consultez et proposez des allocations, véhicules de collection et hypercars en toute confidentialité sans altérer la cote marché ni exposer l'identité des propriétaires.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-amber-400" /> Masquage VIN & Photos
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-amber-400" /> Preuve de Fonds (POF) requise
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">Choisissez votre formule d'Abonnement</h2>
            <p className="text-slate-400 text-sm">Débloquez l'accès complet au portefeuille Off-Market et diffusez vos mandats d'achat.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className={`rounded-2xl border p-6 flex flex-col justify-between transition ${userPlan === 'free' ? 'bg-slate-900/90 border-slate-700 ring-2 ring-slate-600' : 'bg-slate-900/40 border-slate-800'}`}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Découverte</span>
                  {userPlan === 'free' && <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">Votre Plan Actuel</span>}
                </div>
                <div className="text-3xl font-extrabold text-white mb-2">0 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                <p className="text-slate-400 text-xs mb-6">Pour observer le marché et accéder à 3 fiches anonymisées par mois.</p>
                <ul className="space-y-3 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-500" /> Consultation limitée des annonces</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-500" /> Masquage total des détails vendeurs</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through"><X className="w-4 h-4" /> Publication de véhicules</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through"><X className="w-4 h-4" /> Export Teasers PDF</li>
                </ul>
              </div>
              <button 
                disabled={userPlan === 'free'}
                onClick={() => setUserPlan('free')}
                className="w-full py-2.5 rounded-xl font-medium text-xs border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
              >
                {userPlan === 'free' ? 'Plan Actif' : 'Sélectionner'}
              </button>
            </div>

            {/* Pro Broker Plan - 99€ */}
            <div className={`relative rounded-2xl border p-6 flex flex-col justify-between transition ${userPlan === 'pro' ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/50 shadow-xl shadow-amber-500/10' : 'bg-slate-900/80 border-slate-700 hover:border-slate-600'}`}>
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Recommandé Broker
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Pro Broker</span>
                  {userPlan === 'pro' && <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">Votre Plan Actuel</span>}
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">99 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                <p className="text-amber-400/80 text-[11px] mb-4">ou 890 € / an (2 mois offerts)</p>
                <p className="text-slate-400 text-xs mb-6">Accès illimité pour les brokers indépendants & apporteurs d'affaires.</p>
                <ul className="space-y-3 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> **Accès illimité** à toutes les fiches Off-Market</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Jusqu’à **10 véhicules** en portefeuille</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Demande de déblocage direct & NDA 1-click</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Publication des Mandats d’Achat</li>
                </ul>
              </div>
              <button 
                onClick={() => handleUpgrade('pro')}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${userPlan === 'pro' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md'}`}
              >
                {userPlan === 'pro' ? 'Abonnement Actif' : 'Rejoindre pour 99 € / mois'}
              </button>
            </div>

            {/* VIP Plan - 249€ */}
            <div className={`rounded-2xl border p-6 flex flex-col justify-between transition ${userPlan === 'vip' ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/50' : 'bg-slate-900/40 border-slate-800'}`}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">VIP Prestige</span>
                  {userPlan === 'vip' && <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/30">Votre Plan Actuel</span>}
                </div>
                <div className="text-3xl font-extrabold text-white mb-2">249 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                <p className="text-slate-400 text-xs mb-6">Pour les concessions d'exception, Family Offices et réseaux d'alliances.</p>
                <ul className="space-y-3 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> **Portefeuille véhicules illimité**</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Badge **"Broker Vérifié Apex"**</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Générateur de **Fiches Teasers PDF** à votre marque</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Account Manager Dédié 7j/7</li>
                </ul>
              </div>
              <button 
                onClick={() => handleUpgrade('vip')}
                className={`w-full py-2.5 rounded-xl font-bold text-xs border transition ${userPlan === 'vip' ? 'bg-amber-400/20 text-amber-200 border-amber-400/40' : 'border-slate-700 text-white hover:bg-slate-800'}`}
              >
                {userPlan === 'vip' ? 'Abonnement Actif' : 'S\'abonner VIP (249 €)'}
              </button>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Rechercher par modèle, marque, provenance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['all', 'Hypercar', 'Restomod', 'Vintage'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-amber-500 text-slate-950 font-semibold' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'Tous les véhicules' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {cars.map((car) => {
            const isUnlocked = unlockRequested[car.id];
            
            return (
              <div 
                key={car.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  {/* Image Header with Privacy Overlay */}
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img 
                      src={car.image} 
                      alt={car.title}