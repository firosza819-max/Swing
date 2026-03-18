# 🌹 رقعة - Roqa

**Roqa** is a premium, feminine-focused prayer assistant and wellness app designed for Muslim women. It combines elegant design with powerful functionality to help you stay connected to your daily prayers.

## ✨ Features

### 📱 Modern Dashboard
- Personalized Arabic greetings ("طبتِ وطاب يومك")
- Live prayer countdown timer with glassmorphism effects
- Quick stats and motivational Quranic quotes
- Beautiful gradient cards with soft shadows

### 🕌 Prayer Times Module
- Real-time prayer time fetching based on location
- All 6 prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
- Individual notification toggles for each prayer
- Elegant gradient cards with prayer descriptions
- Location-based information

### 🧭 Interactive Qibla Compass
- Luxury watch-face style compass design
- Heart-shaped pointer that rotates to indicate Qibla direction
- Real-time device orientation tracking
- Detailed directional information
- Helpful usage tips

### ⚙️ Settings & Customization
- Sound and notification preferences
- Multiple Adhan (call to prayer) types
- Dark mode support (future enhancement)
- Location management
- Account and privacy settings

### 🎨 Beautiful Navigation
- Bottom tab navigation with smooth animations
- Icon-based menu (Home, Prayer, Qibla, Settings)
- Smooth page transitions with Framer Motion
- Active state indicators and hover effects

## 🛠️ Tech Stack

- **Frontend Framework**: React.js (Functional Components & Hooks)
- **Styling**: Tailwind CSS (Mobile-first, Responsive)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite (or your preferred bundler)
- **Language**: Fully localized in Arabic

## 🎨 Design Specifications

### Color Palette
- **Primary Rose**: `#EC4899` (Soft, feminine pink)
- **Champagne Gold**: `#D4AF37` (Luxury accent)
- **Off-White**: `#FFFBF7` (Warm background)
- **Gradient**: Rose to Gold for premium feel

### Typography
- **Primary Font**: Cairo (Arabic)
- **Secondary Font**: Tajawal (Arabic)
- **Direction**: RTL (Right-to-Left)
- **Weights**: 300 (Light), 400 (Regular), 600 (Bold)

### Components
- **Radius**: `rounded-3xl` for soft, luxurious feel
- **Effects**: Glassmorphism, soft shadows, subtle gradients
- **Animations**: Smooth transitions with Framer Motion
- **Layout**: Mobile-first responsive design

## 📁 Project Structure

```
roqa-app/
├── components/
│   ├── Dashboard.jsx           # Home screen with countdown
│   ├── PrayerTimesModule.jsx   # Prayer times list & toggles
│   ├── QiblaCompass.jsx        # Compass with heart pointer
│   └── SettingsPage.jsx        # Settings & preferences
├── styles/
│   └── roqa.css               # Custom animations & styles
├── RoqaApp.jsx                # Main app with navigation
├── App.js                     # App entry point
├── index.css                  # Global Tailwind styles
├── globals.css                # Design tokens
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd roqa-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages** (if not already included)
   ```bash
   npm install react framer-motion lucide-react
   npm install -D tailwindcss postcss autoprefixer
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Mobile** (320px - 480px)
- **Tablet** (481px - 768px)
- **Desktop** (769px+)

All components use Tailwind CSS responsive prefixes (`md:`, `lg:`, etc.) for seamless scaling.

## 🌐 RTL (Right-to-Left) Support

The entire application is built with RTL in mind:
- HTML `direction: rtl` attribute
- Text alignment set to right
- Component layouts mirror-adjusted
- Arabic fonts optimized for readability

## 🔔 Prayer Notifications

The app includes integration points for:
- Browser notifications
- Sound alerts (Adhan playback)
- Custom notification times (15 min before, at prayer time, etc.)
- Persistent notification preferences

## 🗺️ Location Services

The app can:
- Auto-detect location via GPS
- Calculate prayer times based on coordinates
- Allow manual location entry
- Store preferred location

## 🎯 Key Components Deep Dive

### Dashboard
- Countdown timer that updates every second
- Pulsing animation indicators
- Motivational quotes from Quran
- Prayer completion tracking

### Prayer Times
- Color-coded cards for each prayer
- Bell icon toggles for notifications
- Sunrise/Sunset information
- Info box with helpful tips

### Qibla Compass
- SVG-based compass dial with cardinal points
- Heart-shaped animated pointer
- Real-time device orientation tracking
- Pulsing effect for visual feedback

### Settings
- Toggle switches with animation
- Adhan type selection (Default, Nice, Calm)
- Location management
- Account information

## 🔐 Privacy & Security

- No data collection unless explicitly enabled
- Local storage for preferences only
- Secure API endpoints for prayer times
- HTTPS required for production

## 🌙 Future Enhancements

- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Prayer track history
- [ ] Quranic verse of the day
- [ ] Community features
- [ ] Wearable app support

## 📝 Localization

Currently supports:
- **Arabic** (العربية) - Full RTL support

Adding new languages:
1. Create translation object in `i18n/` folder
2. Import in components
3. Use translation keys in JSX

Example:
```javascript
const translations = {
  ar: {
    greeting: "طبتِ وطاب يومك",
    nextPrayer: "الصلاة القادمة",
  }
};
```

## 🐛 Troubleshooting

### Prayer times not showing?
- Check location permissions
- Verify API endpoint is accessible
- Check browser console for errors

### Notifications not working?
- Enable browser notifications in settings
- Check device notification permissions
- Verify sound file paths

### Compass not rotating?
- Enable device motion permissions
- Hold device in portrait orientation
- Move away from magnetic interference

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Contact support@roqa.app
- Check FAQ section

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🙏 Acknowledgments

- Design inspired by luxury wellness apps
- Prayer time calculations via Islamic Society algorithms
- Quranic quotes from verified Islamic sources
- Built with love for the Muslim community

---

**Made with ❤️ for Muslim women worldwide**

*"الصلاة عماد الدين، فمن أقامها أقام الدين"*
