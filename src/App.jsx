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
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [targetPlan, setTargetPlan] = useState('pro');
  const [showTeaserModal, setShowTeaserModal] = useState(null);
  const [unlockRequested, setUnlockRequested] = useState({});

  // Listings Off-Market Mock
  const [cars] = useState([
    {
      id: 'OFF-8821',
      title: 'Ferrari F40 Euro-Spec',
      year: 1991,
      mileage: '12 400 km',
      price: '2 850 000 €',
      category: 'Hypercar',
      confidentiality: 'Off-Market Absolu',
      location: 'Monaco / Suisse (Transit)',
      condition: 'Concours - Classiche Certified',
      description: 'Exemplaire d’exception d’origine européenne. Carnet complet chez le concessionnaire officiel, certification Ferrari Classiche accordée. N’a jamais été publiée en ligne.',
      vin: 'ZFFPA34B00008821X',
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
      location: 'Genève, Suisse',
      condition: 'État Neuf',
      description: 'Commission Singer Classic Study. Moteur 4.0L Flatz-Six par Cosworth. Carrosserie Carbone complète, finition intérieur Cuir woven d’exception.',
      vin: 'WP0ZZZ91ZMS119402',
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
      location: 'Dubaï, Émirats Arabe Unis',
      condition: 'Parfait État',
      description: 'Série ultra limitée (1 sur 20 dans le monde). Carbone bleu visible mat, intérieur cuir & alcantara d’origine. Garantie d’usine prolongée.',
      vin: 'VF735398200001104',
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
      location: 'Stuttgart, Allemagne',
      condition: 'Restauration Châssis Nu',
      description: 'Matching colors et matching numbers vérifiés par le Mercedes Classic Center. Freins à disque mis à jour. Hardtop d’origine inclus.',
      vin: '19804210005510',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000'
    }
  ]);

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

  const filteredCars = cars.filter(car => {
    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

            {userPlan === 'free' && (
              <button 
                onClick={() => handleUpgrade('pro')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <Zap className="w-4 h-4" /> Passer Pro (99 €)
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-8 sm:p-12">
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
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">Abonnement Broker</h2>
            <p className="text-slate-400 text-sm">Débloquez l'accès complet au portefeuille Off-Market et diffusez vos mandats d'achat.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`rounded-2xl border p-6 flex flex-col justify-between transition ${userPlan === 'free' ? 'bg-slate-900/90 border-slate-700 ring-2 ring-slate-600' : 'bg-slate-900/40 border-slate-800'}`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Découverte</span>
                <div className="text-3xl font-extrabold text-white mb-2">0 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                <p className="text-slate-400 text-xs mb-6">Consultation limitée des fiches anonymisées.</p>
              </div>
              <button 
                disabled={userPlan === 'free'}
                onClick={() => setUserPlan('free')}
                className="w-full py-2.5 rounded-xl font-medium text-xs border border-slate-700 text-slate-300 disabled:opacity-50"
              >
                {userPlan === 'free' ? 'Plan Actif' : 'Sélectionner'}
              </button>
            </div>

            <div className={`relative rounded-2xl border p-6 flex flex-col justify-between transition ${userPlan === 'pro' ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/50 shadow-xl shadow-amber-500/10' : 'bg-slate-900/80 border-slate-700'}`}>
              <div className="absolute -top-3 right-6 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                Recommandé
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">Pro Broker</span>
                <div className="text-3xl font-extrabold text-white mb-1">99 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                <p className="text-slate-400 text-xs mb-6">Accès illimité pour les brokers indépendants & apporteurs d'affaires.</p>
              </div>
              <button 
                onClick={() => handleUpgrade('pro')}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
              >
                {userPlan === 'pro' ? 'Abonnement Actif' : 'S\'abonner pour 99 € / mois'}
              </button>
            </div>

            <div className={`rounded-2xl border p-6 flex flex-col justify-between transition ${userPlan === 'vip' ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/50' : 'bg-slate-900/40 border-slate-800'}`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">VIP Prestige</span>
                <div className="text-3xl font-extrabold text-white mb-2">249 € <span className="text-xs text-slate-400 font-normal">/ mois</span></div>
                <p className="text-slate-400 text-xs mb-6">Pour les concessions d'exception et Family Offices.</p>
              </div>
              <button 
                onClick={() => handleUpgrade('vip')}
                className="w-full py-2.5 rounded-xl font-bold text-xs border border-slate-700 text-white"
              >
                {userPlan === 'vip' ? 'Abonnement Actif' : 'S\'abonner VIP (249 €)'}
              </button>
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {filteredCars.map((car) => {
            const isUnlocked = unlockRequested[car.id];
            
            return (
              <div key={car.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img 
                      src={car.image} 
                      alt={car.title}
                      className={`w-full h-full object-cover transition duration-500 ${userPlan === 'free' ? 'blur-md scale-105 opacity-60' : ''}`}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-slate-950/80 text-amber-400 text-[10px] font-mono px-2.5 py-1 rounded-md border border-amber-500/20">
                        {car.id}
                      </span>
                    </div>

                    {userPlan === 'free' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-950/70 backdrop-blur-sm">
                        <Lock className="w-8 h-8 text-amber-400 mb-2" />
                        <p className="text-xs font-bold text-white mb-1">Visualisation Protégée</p>
                        <p className="text-[11px] text-slate-400 mb-3 max-w-xs">Abonnez-vous à la formule Pro Broker (99 €/mois) pour débloquer les détails.</p>
                        <button 
                          onClick={() => handleUpgrade('pro')}
                          className="bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg"
                        >
                          Débloquer pour 99 €/mois
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{car.category}</span>
                        <h3 className="text-xl font-bold text-white">{car.title}</h3>
                      </div>
                      <span className="text-lg font-extrabold text-white">{car.price}</span>
                    </div>
                    <p className="text-xs text-slate-400">{car.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-800/60 pt-4">
                  <button 
                    onClick={() => setShowTeaserModal(car)}
                    className="flex-1 bg-slate-800 text-slate-200 text-xs font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> Fiche Teaser Client
                  </button>

                  <button 
                    onClick={() => requestUnlock(car.id)}
                    className={`flex-1 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 ${
                      isUnlocked 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-amber-500 text-slate-950 shadow-md'
                    }`}
                  >
                    {isUnlocked ? 'Accès Débloqué' : 'Demander Accès NDA'}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Souscription Abonnement</h3>
                <p className="text-xs text-slate-400">Paiement sécurisé via Stripe Billing</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Formule sélectionnée :</span>
                <span className="font-bold text-amber-400 uppercase">{targetPlan === 'pro' ? 'Pro Broker' : 'VIP Prestige'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Montant récurrent :</span>
                <span className="font-bold text-white">{targetPlan === 'pro' ? '99,00 € / mois' : '249,00 € / mois'}</span>
              </div>
            </div>

            <button 
              onClick={confirmUpgrade}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2"
            >
              Valider & Payer {targetPlan === 'pro' ? '99 €' : '249 €'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Teaser PDF Modal */}
      {showTeaserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowTeaserModal(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <FileText className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-base font-bold text-white">Fiche Teaser Anonyme</h3>
                <p className="text-xs text-slate-400">Document prêt à être envoyé à votre prospect</p>
              </div>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-xl space-y-4 text-xs shadow-inner">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-black tracking-wider uppercase text-slate-800">CONFIDENTIAL TEASER</span>
                <span className="font-mono text-slate-500">REF: {showTeaserModal.id}</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold">{showTeaserModal.title} ({showTeaserModal.year})</h4>
                <p className="text-slate-600 font-semibold">Prix indicatif: {showTeaserModal.price}</p>
              </div>
              <p className="text-slate-700 italic border-l-2 border-slate-300 pl-3 py-1">
                "{showTeaserModal.description}"
              </p>
            </div>

            <button 
              onClick={() => setShowTeaserModal(null)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Télécharger en PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
