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
      location: 'Monaco / Suisse',
      condition: 'Concours - Classiche Certified',
      description: 'Exemplaire d’exception d’origine européenne. Carnet complet chez le concessionnaire officiel, certification Ferrari Classiche accordée.',
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
      description: 'Commission Singer Classic Study. Moteur 4.0L Flatz-Six par Cosworth. Carrosserie Carbone complète.',
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
      location: 'Dubaï, Émirats',
      condition: 'Parfait État',
      description: 'Série ultra limitée (1 sur 20 dans le monde). Carbone bleu visible mat, intérieur cuir & alcantara.',
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
      description: 'Matching colors et matching numbers vérifiés par le Mercedes Classic Center. Hardtop d’origine inclus.',
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Top Bar Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white flex items-center gap-2">
                APEX <span className="text-amber-400 font-light text-sm uppercase">Private Garage</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs">
              <button 
                onClick={() => setUserPlan('free')}
                className={`px-3 py-1 rounded-full ${userPlan === 'free' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'}`}
              >
                Gratuit
              </button>
              <button 
                onClick={() => setUserPlan('pro')}
                className={`px-3 py-1 rounded-full ${userPlan === 'pro' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                PRO (99€/m)
              </button>
              <button 
                onClick={() => setUserPlan('vip')}
                className={`px-3 py-1 rounded-full ${userPlan === 'vip' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                VIP Prestige
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <section className="rounded-3xl bg-slate-900 border border-slate-800 p-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Plateforme B2B des Véhicules <span className="text-amber-400">Off-Market</span>
          </h1>
          <p className="text-slate-400 text-sm">Réseau privé d'offres confidentielles pour brokers et collectionneurs.</p>
        </section>

        {/* Listings Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {filteredCars.map((car) => {
            const isUnlocked = unlockRequested[car.id];
            
            return (
              <div key={car.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="relative h-56 bg-slate-950">
                  <img 
                    src={car.image} 
                    alt={car.title}
                    className={`w-full h-full object-cover ${userPlan === 'free' ? 'blur-md opacity-60' : ''}`}
                  />
                  {userPlan === 'free' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 p-4 text-center">
                      <Lock className="w-8 h-8 text-amber-400 mb-2" />
                      <p className="text-xs text-white mb-2">Accès restreint aux abonnés Pro</p>
                      <button 
                        onClick={() => handleUpgrade('pro')}
                        className="bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg"
                      >
                        Débloquer à 99 €/mois
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-amber-400 font-semibold">{car.category}</span>
                      <h3 className="text-lg font-bold text-white">{car.title}</h3>
                    </div>
                    <span className="text-lg font-extrabold text-white">{car.price}</span>
                  </div>
                  <p className="text-xs text-slate-400">{car.description}</p>
                  
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <button 
                      onClick={() => setShowTeaserModal(car)}
                      className="flex-1 bg-slate-800 text-slate-200 text-xs py-2 rounded-xl"
                    >
                      Teaser Client
                    </button>
                    <button 
                      onClick={() => requestUnlock(car.id)}
                      className={`flex-1 text-xs font-bold py-2 rounded-xl ${isUnlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500 text-slate-950'}`}
                    >
                      {isUnlocked ? 'Accès Débloqué' : 'Demander Accès'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">S'abonner au plan {targetPlan.toUpperCase()}</h3>
            <p className="text-xs text-slate-400">Tarif : {targetPlan === 'pro' ? '99 € / mois' : '249 € / mois'}</p>
            <button 
              onClick={confirmUpgrade}
              className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-sm"
            >
              Valider l'abonnement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
