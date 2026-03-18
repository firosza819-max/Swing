import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Zap } from 'lucide-react';

export default function Dashboard() {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeToNextPrayer, setTimeToNextPrayer] = useState('');
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  // Mock prayer times (in a real app, this would come from an API)
  const prayerTimes = [
    { name: 'الفجر', time: '05:30', arabicTime: 'الفجر', isNext: true },
    { name: 'الشروق', time: '07:00', arabicTime: 'الشروق', isNext: false },
    { name: 'الظهر', time: '12:30', arabicTime: 'الظهر', isNext: false },
    { name: 'العصر', time: '15:45', arabicTime: 'العصر', isNext: false },
    { name: 'المغرب', time: '18:15', arabicTime: 'المغرب', isNext: false },
    { name: 'العشاء', time: '19:45', arabicTime: 'العشاء', isNext: false },
  ];

  useEffect(() => {
    setNextPrayer(prayerTimes[0]);

    const interval = setInterval(() => {
      const now = new Date();
      const nextPrayerTime = new Date();
      const [hours, minutes] = prayerTimes[0].time.split(':');
      nextPrayerTime.setHours(parseInt(hours), parseInt(minutes), 0);

      if (now > nextPrayerTime) {
        nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
      }

      const diff = nextPrayerTime - now;
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeToNextPrayer(`${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-4 pb-24 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Arabic Greeting */}
      <motion.div
        variants={itemVariants}
        className="text-center space-y-3 pt-4"
      >
        <h2 className="text-3xl font-light text-gray-800">
          طبتِ وطاب يومك
        </h2>
        <p className="text-sm text-gray-500">مرحباً بك في رقعة</p>
      </motion.div>

      {/* Next Prayer Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-400 via-rose-300 to-amber-300 p-8 shadow-xl"
      >
        {/* Glassmorphism backdrop */}
        <div className="absolute inset-0 backdrop-blur-3xl opacity-30" />

        <div className="relative z-10 text-center text-white space-y-4">
          <p className="text-sm font-light opacity-90">الصلاة القادمة</p>
          <h3 className="text-5xl font-light">{nextPrayer?.name}</h3>
          <div className="text-6xl font-light tracking-widest font-mono">
            {timeToNextPrayer || '0:00:00'}
          </div>
          <p className="text-sm opacity-80">{nextPrayer?.time}</p>

          {/* Pulse animation */}
          <div className="flex justify-center gap-2 pt-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-white/70"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="w-3 h-3 rounded-full bg-white/50"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="w-3 h-3 rounded-full bg-white/30"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -ml-20 -mb-20" />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4"
      >
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 text-center shadow-sm">
          <Zap className="w-5 h-5 text-amber-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">الصلوات اليوم</p>
          <p className="text-2xl font-semibold text-rose-600">6</p>
        </div>
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 text-center shadow-sm">
          <Bell className="w-5 h-5 text-rose-500 mx-auto mb-2" />
          <p className="text-xs text-gray-600">التنبيهات</p>
          <button
            onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
            className={`mt-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              isNotificationEnabled
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isNotificationEnabled ? 'مفعل' : 'معطل'}
          </button>
        </div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl bg-gradient-to-r from-amber-100 to-rose-100 p-6 border border-amber-200 text-center"
      >
        <p className="text-sm text-gray-700 font-light leading-relaxed">
          "الصلاة عماد الدين، فمن أقامها أقام الدين، ومن تركها فقد هدم الدين"
        </p>
      </motion.div>
    </motion.div>
  );
}
