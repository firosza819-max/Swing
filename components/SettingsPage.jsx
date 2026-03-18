import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Moon, MapPin, Bell, Zap, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    darkMode: false,
    notificationsEnabled: true,
    locationAutomatic: true,
    adhanType: 'default',
    theme: 'light',
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingOptions = [
    {
      id: 'soundEnabled',
      label: 'تفعيل الصوت',
      description: 'تشغيل الأذان عند وقت الصلاة',
      icon: Volume2,
      type: 'toggle',
    },
    {
      id: 'notificationsEnabled',
      label: 'التنبيهات',
      description: 'إرسال إشعارات لأوقات الصلاة',
      icon: Bell,
      type: 'toggle',
    },
    {
      id: 'locationAutomatic',
      label: 'الموقع التلقائي',
      description: 'تحديد الموقع تلقائياً باستخدام GPS',
      icon: MapPin,
      type: 'toggle',
    },
    {
      id: 'darkMode',
      label: 'الوضع الليلي',
      description: 'تقليل إجهاد العيون في الليل',
      icon: Moon,
      type: 'toggle',
    },
  ];

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
      className="p-4 pb-24 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="pt-4">
        <h2 className="text-3xl font-light text-gray-800">الإعدادات</h2>
      </motion.div>

      {/* General Settings Section */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          الإعدادات العامة
        </h3>
        <div className="space-y-3">
          {settingOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-rose-100 to-amber-100">
                    <Icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSetting(option.id)}
                  className={`relative w-12 h-7 rounded-full transition-all ${
                    settings[option.id]
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: settings[option.id] ? 24 : 2,
                    }}
                    className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                  />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Adhan Type Section */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          نوع الأذان
        </h3>
        <div className="space-y-2">
          {['default', 'nice', 'calm'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setSettings((prev) => ({ ...prev, adhanType: type }))
              }
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                settings.adhanType === type
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-gray-200 bg-white/80'
              }`}
            >
              <p className="font-medium text-gray-800 text-sm capitalize">
                {type === 'default'
                  ? 'الأذان التقليدي'
                  : type === 'nice'
                    ? 'الأذان الجميل'
                    : 'الأذان الهادئ'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {type === 'default' && 'الأذان الأصلي الجميل'}
                {type === 'nice' && 'أذان بصوت عالي وجميل'}
                {type === 'calm' && 'أذان هادئ وسلس'}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Location Section */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          الموقع
        </h3>
        <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-rose-600" />
            <p className="font-medium text-gray-800">موقعك الحالي</p>
          </div>
          <p className="text-sm text-gray-700 bg-white/60 rounded-lg p-3 font-light">
            الرياض، المملكة العربية السعودية
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-3 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 text-sm font-medium hover:shadow-lg transition-shadow"
          >
            تغيير الموقع
          </motion.button>
        </div>
      </motion.div>

      {/* Account Section */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          الحساب
        </h3>
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 text-left hover:bg-white transition-colors"
          >
            <p className="font-medium text-gray-800 text-sm">حسابي</p>
            <p className="text-xs text-gray-600 mt-1">عرض معلومات حسابي</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 text-left hover:bg-white transition-colors"
          >
            <p className="font-medium text-gray-800 text-sm">الخصوصية والأمان</p>
            <p className="text-xs text-gray-600 mt-1">تحكم بخصوصيتك</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 text-left hover:bg-white transition-colors"
          >
            <p className="font-medium text-gray-800 text-sm">حول التطبيق</p>
            <p className="text-xs text-gray-600 mt-1">الإصدار 1.0.0</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Logout Section */}
      <motion.div variants={itemVariants}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl bg-gradient-to-r from-red-400 to-red-500 text-white p-4 font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
        >
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </motion.button>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        variants={itemVariants}
        className="text-center text-xs text-gray-600 pt-4"
      >
        <p>© 2024 رقعة - Roqa</p>
        <p>تطبيق متخصص لتذكر أوقات الصلاة والدعاء</p>
      </motion.div>
    </motion.div>
  );
}
