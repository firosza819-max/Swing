import React, { useState, useEffect } from 'react';
import { Heart, Home, Clock, Compass, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import PrayerTimesModule from './components/PrayerTimesModule';
import QiblaCompass from './components/QiblaCompass';
import SettingsPage from './components/SettingsPage';
import './styles/roqa.css';

export default function RoqaApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [hijriDate, setHijriDate] = useState('');

  useEffect(() => {
    // Simple Hijri date calculation (simplified version)
    const today = new Date();
    const hijriOffset = Math.floor((today.getFullYear() - 1970) * 365.25 + (today.getMonth() + 1) * 30.44 + today.getDate() - 719162);
    setHijriDate(`${hijriOffset}`);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'prayer', label: 'الصلاة', icon: Clock },
    { id: 'qibla', label: 'القبلة', icon: Compass },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'prayer':
        return <PrayerTimesModule />;
      case 'qibla':
        return <QiblaCompass />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="roqa-app min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-rose-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              رقعة
            </h1>
          </div>
          <span className="text-xs text-gray-600">اليوم: {new Date().toLocaleDateString('ar-SA')}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-rose-100 shadow-2xl">
        <div className="max-w-md mx-auto px-0">
          <div className="flex justify-around items-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-all duration-300 ${
                    isActive
                      ? 'text-rose-600'
                      : 'text-gray-500 hover:text-rose-400'
                  }`}
                >
                  <div className={`relative ${isActive ? 'scale-110' : 'scale-100'}`}>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 -top-1 w-full h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-b-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? 'fill-rose-500' : ''
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
