import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Heart, Settings } from 'lucide-react';

const PrayerTimes = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeUntilNext, setTimeUntilNext] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(45);
  const [notifications, setNotifications] = useState({
    fajr: true,
    sunrise: false,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  });

  // Mock prayer times for demonstration (in 24-hour format)
  const prayerTimes = [
    { name: 'الفجر', nameEng: 'Fajr', time: '05:45', icon: '🌙' },
    { name: 'الشروق', nameEng: 'Sunrise', time: '07:15', icon: '🌅' },
    { name: 'الظهر', nameEng: 'Dhuhr', time: '12:30', icon: '☀️' },
    { name: 'العصر', nameEng: 'Asr', time: '15:45', icon: '🌤️' },
    { name: 'المغرب', nameEng: 'Maghrib', time: '18:00', icon: '🌅' },
    { name: 'العشاء', nameEng: 'Isha', time: '19:30', icon: '🌙' },
  ];

  // Calculate time until next prayer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      let nextIndex = 0;
      let nextTime = null;

      for (let i = 0; i < prayerTimes.length; i++) {
        const [hour, minute] = prayerTimes[i].time.split(':').map(Number);
        const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

        if (prayerDate > now) {
          nextTime = prayerDate;
          nextIndex = i;
          break;
        }
      }

      // If no prayer found today, set to first prayer tomorrow
      if (!nextTime) {
        const [hour, minute] = prayerTimes[0].time.split(':').map(Number);
        nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour, minute, 0);
        nextIndex = 0;
      }

      const diff = nextTime - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilNext({ hours, minutes, seconds });
      setNextPrayerIndex(nextIndex);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format date for display
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentTime.toLocaleDateString('ar-SA', options);
  };

  const toggleNotification = (prayer) => {
    setNotifications((prev) => ({
      ...prev,
      [prayer]: !prev[prayer],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 p-4 sm:p-6 md:p-8 font-sans" style={{ direction: 'rtl' }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-serif text-amber-900 font-bold mb-2">طبتِ وطاب يومك</h1>
          <p className="text-sm sm:text-base text-amber-700">{formatDate()}</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 rounded-full hover:bg-rose-100 transition-colors">
            <Settings className="w-5 h-5 text-amber-800" />
          </button>
        </div>
      </div>

      {/* Next Prayer Card - Glassmorphism */}
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-rose-200/40 via-purple-200/30 to-amber-100/40 border border-rose-200/60 shadow-2xl p-8 sm:p-10">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-300/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-3xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <p className="text-amber-700 font-semibold mb-3">الصلاة القادمة</p>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950 mb-6">
              {prayerTimes[nextPrayerIndex].name}
            </h2>

            {/* Countdown Timer */}
            <div className="flex gap-4 sm:gap-6 justify-center mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-rose-200/60 shadow-lg">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-900">
                    {String(timeUntilNext.hours).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-700 mt-2 font-semibold">ساعة</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-purple-200/60 shadow-lg">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-900">
                    {String(timeUntilNext.minutes).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-700 mt-2 font-semibold">دقيقة</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-amber-200/60 shadow-lg">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-900">
                    {String(timeUntilNext.seconds).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-700 mt-2 font-semibold">ثانية</p>
              </div>
            </div>

            <p className="text-center text-amber-800 font-semibold">
              الوقت المتبقي حتى صلاة {prayerTimes[nextPrayerIndex].name}
            </p>
          </div>
        </div>
      </div>

      {/* Prayer Times List */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-950 mb-4">أوقات الصلاة</h3>
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-2xl backdrop-blur-sm transition-all border ${
                index === nextPrayerIndex
                  ? 'bg-gradient-to-r from-rose-100/60 to-purple-100/60 border-rose-300/80 shadow-md'
                  : 'bg-white/50 border-amber-100/40 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-2xl">{prayer.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-amber-950">{prayer.name}</p>
                  <p className="text-xs text-amber-700">{prayer.nameEng}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-bold text-amber-900 text-lg">{prayer.time}</p>
                <button
                  onClick={() => toggleNotification(prayer.nameEng.toLowerCase())}
                  className="p-2 rounded-full hover:bg-amber-100 transition-colors"
                >
                  {notifications[prayer.nameEng.toLowerCase()] ? (
                    <Bell className="w-5 h-5 text-rose-500" fill="currentColor" />
                  ) : (
                    <BellOff className="w-5 h-5 text-amber-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qibla Compass */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-950 mb-4">بوصلة القبلة</h3>
        <div className="flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-white to-amber-50 border-8 border-amber-200 shadow-2xl flex items-center justify-center">
            {/* Compass background pattern */}
            <div className="absolute inset-0 rounded-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />

                {/* Cardinal directions */}
                <text x="50" y="10" textAnchor="middle" fontSize="4" fill="currentColor" className="text-amber-900">
                  ش
                </text>
                <text x="90" y="53" textAnchor="middle" fontSize="4" fill="currentColor" className="text-amber-900">
                  ش
                </text>
                <text x="50" y="95" textAnchor="middle" fontSize="4" fill="currentColor" className="text-amber-900">
                  ج
                </text>
                <text x="10" y="53" textAnchor="middle" fontSize="4" fill="currentColor" className="text-amber-900">
                  غ
                </text>
              </svg>
            </div>

            {/* Qibla pointer - Heart shape */}
            <div
              className="absolute w-16 h-16 transition-transform duration-500 animate-pulse"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50,90 C20,70 5,55 5,40 C5,25 15,15 25,15 C35,15 45,25 50,35 C55,25 65,15 75,15 C85,15 95,25 95,40 C95,55 80,70 50,90 Z"
                  fill="url(#heartGradient)"
                  stroke="#C84456"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Center circle */}
            <div className="absolute w-6 h-6 bg-gradient-to-br from-rose-400 to-red-500 rounded-full shadow-lg border-2 border-white z-10"></div>
          </div>
        </div>
        <p className="text-center text-amber-700 font-semibold mt-4">
          الاتجاه: {qiblaAngle}° من الشمال
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-amber-600">
        <p>جميع الأوقات بتوقيت محلي</p>
      </div>
    </div>
  );
};

export default PrayerTimes;
