import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff, MapPin } from 'lucide-react';

export default function PrayerTimesModule() {
  const [notifications, setNotifications] = useState({
    fajr: true,
    sunrise: false,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  });

  // Mock prayer times data
  const prayers = [
    {
      id: 'fajr',
      name: 'الفجر',
      englishName: 'Fajr',
      time: '05:30',
      description: 'قبل شروق الشمس',
      color: 'from-indigo-400 to-blue-400',
    },
    {
      id: 'sunrise',
      name: 'الشروق',
      englishName: 'Sunrise',
      time: '07:00',
      description: 'شروق الشمس',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 'dhuhr',
      name: 'الظهر',
      englishName: 'Dhuhr',
      time: '12:30',
      description: 'منتصف النهار',
      color: 'from-amber-300 to-yellow-300',
    },
    {
      id: 'asr',
      name: 'العصر',
      englishName: 'Asr',
      time: '15:45',
      description: 'بعد الظهر',
      color: 'from-orange-400 to-red-400',
    },
    {
      id: 'maghrib',
      name: 'المغرب',
      englishName: 'Maghrib',
      time: '18:15',
      description: 'غروب الشمس',
      color: 'from-red-400 to-purple-400',
    },
    {
      id: 'isha',
      name: 'العشاء',
      englishName: 'Isha',
      time: '19:45',
      description: 'الليل',
      color: 'from-purple-500 to-indigo-600',
    },
  ];

  const toggleNotification = (prayerId) => {
    setNotifications((prev) => ({
      ...prev,
      [prayerId]: !prev[prayerId],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="p-4 pb-24 space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="pt-4 space-y-2">
        <h2 className="text-3xl font-light text-gray-800">أوقات الصلاة</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>الرياض، المملكة العربية السعودية</span>
        </div>
      </motion.div>

      {/* Prayer Times List */}
      <motion.div
        variants={containerVariants}
        className="space-y-3"
      >
        {prayers.map((prayer) => (
          <motion.div
            key={prayer.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${prayer.color} p-4 shadow-lg cursor-pointer transition-all`}
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 backdrop-blur-sm opacity-20" />

            <div className="relative z-10 flex items-center justify-between">
              {/* Left Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {prayer.name}
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  {prayer.description}
                </p>
              </div>

              {/* Time */}
              <div className="flex flex-col items-end gap-3">
                <div className="text-center">
                  <p className="text-3xl font-light text-white font-mono">
                    {prayer.time}
                  </p>
                </div>

                {/* Notification Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleNotification(prayer.id)}
                  className={`p-2 rounded-full transition-all ${
                    notifications[prayer.id]
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {notifications[prayer.id] ? (
                    <Bell className="w-4 h-4" />
                  ) : (
                    <BellOff className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8" />
          </motion.div>
        ))}
      </motion.div>

      {/* Info Box */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 space-y-3 mt-6"
      >
        <h4 className="font-semibold text-gray-800 text-sm">معلومات مهمة</h4>
        <ul className="space-y-2 text-xs text-gray-700">
          <li className="flex gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span>تستطيعين تفعيل التنبيهات لكل صلاة بنقرة زر</span>
          </li>
          <li className="flex gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span>الأوقات المعروضة بناءً على موقعك الجغرافي</span>
          </li>
          <li className="flex gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span>يتم تحديث الأوقات تلقائياً يومياً</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
