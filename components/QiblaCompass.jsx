import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function QiblaCompass() {
  const [qiblaDirection, setQiblaDirection] = useState(45); // Mock direction
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [locationInfo, setLocationInfo] = useState('الرياض, السعودية');

  useEffect(() => {
    // Simulate device orientation if available
    const handleOrientation = (event) => {
      setDeviceHeading(event.alpha || 0);
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    return () =>
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
  }, []);

  // Calculate the relative angle between device heading and Qibla
  const relativeAngle = (qiblaDirection - deviceHeading) % 360;

  return (
    <motion.div
      className="p-4 pb-24 flex flex-col items-center justify-start min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="w-full text-center space-y-2 pt-4 pb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-light text-gray-800">بوصلة القبلة</h2>
        <p className="text-sm text-gray-600">{locationInfo}</p>
      </motion.div>

      {/* Main Compass Container */}
      <motion.div
        className="w-64 h-64 mx-auto mb-8 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Outer Circle - Watch Frame */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-rose-200 shadow-2xl">
          {/* Inner Circle */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm shadow-inner">
            {/* Compass Background Pattern */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Cardinal Directions */}
              <g opacity="0.2">
                {[...Array(360)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="5"
                    x2="50"
                    y2={i % 10 === 0 ? '8' : '7'}
                    stroke="currentColor"
                    strokeWidth="0.3"
                    transform={`rotate(${i} 50 50)`}
                  />
                ))}
              </g>

              {/* Cardinal Points */}
              <text
                x="50"
                y="15"
                textAnchor="middle"
                fontSize="6"
                fontWeight="bold"
                fill="currentColor"
              >
                ش
              </text>
              <text
                x="85"
                y="53"
                textAnchor="middle"
                fontSize="6"
                fontWeight="bold"
                fill="currentColor"
              >
                ق
              </text>
              <text
                x="50"
                y="95"
                textAnchor="middle"
                fontSize="6"
                fontWeight="bold"
                fill="currentColor"
              >
                ج
              </text>
              <text
                x="15"
                y="53"
                textAnchor="middle"
                fontSize="6"
                fontWeight="bold"
                fill="currentColor"
              >
                غ
              </text>
            </svg>

            {/* Rotating Compass Rose */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: deviceHeading * -1 }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              {/* Compass Directions */}
              <div className="relative w-full h-full rounded-full">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600">
                  ش
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">
                  ق
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600">
                  ج
                </div>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">
                  غ
                </div>
              </div>
            </motion.div>

            {/* Center Circle */}
            <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-rose-100 to-amber-100 shadow-inner flex items-center justify-center">
              <div className="relative">
                {/* Center Dot */}
                <div className="w-2 h-2 bg-rose-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Heart-Shaped Qibla Pointer */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3"
          animate={{ rotate: relativeAngle }}
          transition={{ type: 'spring', stiffness: 30, damping: 15 }}
        >
          {/* Pulsing Heart */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              {/* Heart Shape */}
              <path
                d="M20 35C20 35 5 25 5 16C5 10.5 8.5 7 12 7C14 7 16 8 18 10C18.5 10.5 19 11 20 12C21 11 21.5 10.5 22 10C24 8 26 7 28 7C31.5 7 35 10.5 35 16C35 25 20 35 20 35Z"
                fill="url(#heartGradient)"
                stroke="white"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              {/* Inner glow */}
              <circle cx="20" cy="18" r="6" fill="white" opacity="0.6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Information Cards */}
      <motion.div
        className="w-full space-y-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Qibla Direction Info */}
        <div className="rounded-2xl bg-gradient-to-r from-rose-100 to-amber-100 border border-rose-200 p-4 text-center">
          <p className="text-xs text-gray-600 mb-1">اتجاه القبلة</p>
          <p className="text-3xl font-light text-rose-600">
            {qiblaDirection.toFixed(0)}°
          </p>
          <p className="text-xs text-gray-600 mt-1">من الشمال باتجاه عقارب الساعة</p>
        </div>

        {/* Device Heading Info */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4 text-center">
          <p className="text-xs text-gray-600 mb-1">اتجاه الجهاز</p>
          <p className="text-3xl font-light text-gray-700">
            {deviceHeading.toFixed(0)}°
          </p>
          <p className="text-xs text-gray-600 mt-1">اتجاهك الحالي</p>
        </div>

        {/* Tips */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 p-4">
          <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-rose-500" />
            نصائح الاستخدام
          </h4>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>أبقي جهازك في وضع أفقي لتحديد أفضل</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>أدري الجهاز حتى يشير القلب للقبلة</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>ابعدي جهازك عن المعادن والحقول المغناطيسية</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
