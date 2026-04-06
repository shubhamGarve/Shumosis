import { useEffect, useState, useRef } from "react";

import Head from "next/head";

import Image from "next/image";

import * as htmlToImage from "html-to-image";
 
export default function TraditionalInvitation() {

  const [timeLeft, setTimeLeft] = useState({

    days: "00",

    hours: "00",

    minutes: "00",

    seconds: "00",

  });
 
  const units: Array<keyof typeof timeLeft> = ["days", "hours", "minutes", "seconds"];

  const unitLabels: Record<string, string> = {

    days: "दिवस",

    hours: "तास",

    minutes: "मिनिटे",

    seconds: "सेकंद",

  };
 
  const [showPopup, setShowPopup] = useState(false);

  const [guestName, setGuestName] = useState("");

  const [finalName, setFinalName] = useState("");

  const [showPersonalInvite, setShowPersonalInvite] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const inviteRef = useRef<HTMLDivElement>(null);
 
  // Page load animation trigger

  useEffect(() => {

    setIsLoaded(true);

  }, []);
 
  // Countdown timer

  useEffect(() => {

    const inaugurationDate = new Date("April 23, 2026 12:30:00").getTime();
 
    const interval = setInterval(() => {

      const now = new Date().getTime();

      const distance = inaugurationDate - now;
 
      if (distance < 0) {

        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });

        clearInterval(interval);

        return;

      }
 
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
      setTimeLeft({

        days: days.toString().padStart(2, "0"),

        hours: hours.toString().padStart(2, "0"),

        minutes: minutes.toString().padStart(2, "0"),

        seconds: seconds.toString().padStart(2, "0"),

      });

    }, 1000);
 
    return () => clearInterval(interval);

  }, []);
 
  const handleDownload = () => {

    if (!inviteRef.current) return;
 
    htmlToImage

      .toPng(inviteRef.current, {

        cacheBust: true,

        backgroundColor: "#ffffff",

        pixelRatio: 2,

        style: {

          fontFamily: "'Noto Serif Devanagari', serif",

        },

        skipFonts: true,

        filter: (node) => {

          const el = node as Element;

          if (el.tagName === "LINK" || el.tagName === "STYLE") {

            return false;

          }

          return true;

        },

      })

      .then((dataUrl) => {

        const link = document.createElement("a");

        link.download = `${guestName || "invitation"}.png`;

        link.href = dataUrl;

        link.click();

      })

      .catch((err) => {

        console.error("❌ Error generating image:", err);

      });

  };
 
  const handlePopupSubmit = () => {

    if (guestName.trim() === "") return;

    setFinalName(guestName);

    setShowPopup(false);

    setShowPersonalInvite(true);

  };
 
  return (
<>
<Head>
<title>गृह प्रवेश निमंत्रण</title>
<link

          rel="stylesheet"

          href="[cdnjs.cloudflare.com](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)"

        />
<link

          href="[fonts.googleapis.com](https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Modak&family=Baloo+Bhai+2:wght@400;700&display=swap)%22"

          rel="stylesheet"

        />
</Head>
 
      {/* Floating Decorative Elements */}
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

        {[...Array(12)].map((_, i) => (
<div

            key={i}

            className="floating-flower absolute text-2xl md:text-3xl opacity-60"

            style={{

              left: `${Math.random() * 100}%`,

              top: `${Math.random() * 100}%`,

              animationDelay: `${i * 0.5}s`,

              animationDuration: `${15 + Math.random() * 10}s`,

            }}
>

            {["🪷", "🌸", "🌺", "✨", "🪔", "🌼"][i % 6]}
</div>

        ))}
</div>
 
      {/* Main Invitation Card */}
<div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">

        {/* Animated Background */}
<div className="absolute inset-0 z-0">
<img

            src="/bgFix.jpg"

            alt="Background"

            className="w-full h-full object-cover opacity-10"

          />
<div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-white/90 to-orange-50/80"></div>
<div className="absolute inset-0 mandala-bg opacity-5"></div>
</div>
 
        {/* Main Card */}
<div

          className={`relative z-10 w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden bg-white transform transition-all duration-1000 ${

            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"

          }`}
>

          {/* Card Background */}
<div className="absolute inset-0 z-0">
<img

              src="/bg55.jpg"

              alt="Background"

              className="w-full h-full object-cover"

            />
</div>
 
          {/* Decorative Corner Elements */}
<div className="absolute top-0 left-0 w-24 h-24 opacity-60 corner-decoration">
<svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
<path

                d="M0,0 Q50,0 50,50 Q50,0 100,0 L100,100 Q50,100 50,50 Q50,100 0,100 Z"

                fill="currentColor"

                opacity="0.2"

              />
</svg>
</div>
<div className="absolute top-0 right-0 w-24 h-24 opacity-60 corner-decoration rotate-90">
<svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
<path

                d="M0,0 Q50,0 50,50 Q50,0 100,0 L100,100 Q50,100 50,50 Q50,100 0,100 Z"

                fill="currentColor"

                opacity="0.2"

              />
</svg>
</div>
 
          <div className="relative z-10">

{/* Ganesh Section with Rich Animations */}
<div

  className={`flex flex-col items-center transition-all duration-1000 delay-300 ${

    isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"

  }`}
>

  {/* Floating petals */}
<div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

    {[...Array(18)].map((_, i) => (
<div

        key={`petal-${i}`}

        className="absolute rounded-full opacity-0"

        style={{

          width: `${8 + Math.random() * 8}px`,

          height: `${8 + Math.random() * 8}px`,

          background: ["#f97316","#fb923c","#fbbf24","#f472b6","#e879f9","#a78bfa"][i % 6],

          left: `${Math.random() * 100}%`,

          top: `-20px`,

          borderRadius: i % 2 === 0 ? "50% 0 50% 0" : "0 50% 0 50%",

          animation: `petalFall ${6 + (i * 0.4)}s linear ${i * 0.5}s infinite`,

        }}

      />

    ))}
</div>
 
  {/* Aura + Image container */}
<div className="relative ganesh-container" style={{ width: 180, height: 180 }}>
 
    {/* Radial glow background */}
<div className="absolute inset-0 rounded-full animate-glow-bg"

      style={{ background: "radial-gradient(circle, rgba(255,200,50,0.4) 0%, rgba(255,150,0,0.15) 60%, transparent 100%)" }}

    />
 
    {/* Three expanding aura rings */}
<div className="absolute rounded-full animate-aura-1"

      style={{ width: 150, height: 150, top: 15, left: 15, border: "2px solid rgba(255,180,0,0.5)" }} />
<div className="absolute rounded-full animate-aura-2"

      style={{ width: 165, height: 165, top: 7.5, left: 7.5, border: "2px solid rgba(255,140,0,0.35)" }} />
<div className="absolute rounded-full animate-aura-3"

      style={{ width: 180, height: 180, top: 0, left: 0, border: "2px solid rgba(255,100,0,0.2)" }} />
 
    {/* Spinning mandala SVG ring */}
<svg

      className="absolute animate-spin-slow"

      style={{ width: 148, height: 148, top: 16, left: 16 }}

      viewBox="0 0 148 148"

      fill="none"
>
<circle cx="74" cy="74" r="70" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 4" opacity="0.6"/>
<circle cx="74" cy="74" r="62" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4"/>

      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
<ellipse

          key={deg}

          cx="74" cy="8" rx="5" ry="9"

          fill={i % 2 === 0 ? "#f59e0b" : "#fbbf24"}

          opacity="0.5"

          transform={`rotate(${deg} 74 74)`}

        />

      ))}
</svg>
 
    {/* Twinkling stars */}

    {[

      { top: "8px", left: "28px", delay: "0s", dur: "1.2s" },

      { top: "14px", right: "30px", delay: "0.4s", dur: "1.8s" },

      { bottom: "18px", left: "22px", delay: "0.8s", dur: "1.5s" },

      { bottom: "10px", right: "20px", delay: "1.2s", dur: "1.3s" },

      { top: "50%", left: "4px", delay: "0.2s", dur: "2s" },

      { top: "50%", right: "4px", delay: "0.6s", dur: "1.6s" },

    ].map((pos, i) => (
<div

        key={`star-${i}`}

        className="absolute animate-twinkle"

        style={{

          ...pos,

          width: 6, height: 6,

          background: "#fbbf24",

          clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",

          animationDuration: pos.dur,

          animationDelay: pos.delay,

        }}

      />

    ))}
 
    {/* Ganesh Image */}
<Image

      src="/ganesha4.jpg"

      alt="Shree Ganesh"

      width={120}

      height={120}

      className="absolute rounded-full shadow-xl z-10 border-4 border-amber-400 ganesh-image animate-img-float"

      style={{ top: 30, left: 30 }}

    />
</div>
 
  {/* Mantra Text */}
<p className="text-amber-700 text-lg mt-3 font-devanagari tracking-wide animate-mantra-glow">

    ॥ श्री गणेशाय नमः ॥
</p>
 
  {/* Decorative dot divider */}
<div className="flex items-center gap-2 mt-2 opacity-70">
<div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400 animate-line-pulse" />

    {[0, 0.3, 0.6].map((d, i) => (
<div key={i} className="w-2 h-2 rounded-full bg-amber-400 animate-dot-bounce"

        style={{ animationDelay: `${d}s` }} />

    ))}
<div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400 animate-line-pulse" />
</div>
 
  {/* Main Title */}
<h1
  className="text-5xl md:text-5xl font-extrabold mt-6 font-devanagari animate-title-shimmer drop-shadow-lg"
  style={{
 
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text",
    color: "#9d174d" ,
    // WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  }}
>
  गृह प्रवेश निमंत्रण
</h1>
</div>
 
 
            {/* Date with Icon Animation */}
<div

              className={`flex items-center justify-center gap-2 mt-4 transition-all duration-1000 delay-500 ${

                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"

              }`}
>
<span className="text-amber-600 animate-bounce-slow">📅</span>
<p className="text-xl md:text-2xl text-amber-700 drop-shadow-md font-devanagari">

                गुरुवार, २३ एप्रिल २०२६
</p>
</div>
 
            {/* House Image with Animated Border */}
<div

              className={`relative mt-6 max-w-md mx-auto transition-all duration-1000 delay-700 ${

                isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"

              }`}
>
<div className="house-frame p-1 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 shadow-2xl animate-border-glow">
<div className="p-1 rounded-xl bg-gradient-to-r from-pink-800 via-pink-600 to-pink-800">
<div className="relative h-60 md:h-72 w-full rounded-lg overflow-hidden">
<Image

                      src="/home.jpg"

                      alt="Our New Home"

                      layout="fill"

                      objectFit="cover"

                      className="rounded-lg hover:scale-105 transition-transform duration-700"

                      priority

                    />
<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
</div>
</div>
</div>

              {/* Home Icon Badge */}
<div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce-slow">

                🏠 नवीन वास्तू
</div>
</div>
 
            {/* Countdown Section */}
<div

              className={`my-8 transition-all duration-1000 delay-900 ${

                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"

              }`}
>
<h2 className="text-xl mb-4 text-pink-800 font-devanagari flex items-center justify-center gap-2">
<span className="animate-pulse">⏳</span>

                शुभ मुहूर्तापर्यंत
<span className="animate-pulse">⏳</span>
</h2>
<div className="flex justify-center gap-3 md:gap-5">

                {units.map((unit, index) => (
<div

                    key={unit}

                    className="countdown-box relative group"

                    style={{ animationDelay: `${index * 0.1}s` }}
>
<div className="bg-gradient-to-br from-pink-700 via-pink-600 to-pink-800 text-white rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[75px] shadow-lg transform group-hover:scale-110 transition-all duration-300">
<div className="text-2xl md:text-3xl font-bold countdown-number">

                        {timeLeft[unit]}
</div>
<div className="text-xs md:text-sm mt-1 opacity-90 font-devanagari">

                        {unitLabels[unit]}
</div>
</div>
<div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-50 blur transition-all duration-300 -z-10"></div>
</div>

                ))}
</div>
</div>
 
            {/* Message Section with Staggered Animation */}
<div

              className={`mt-6 px-4 space-y-4 transition-all duration-1000 delay-1000 ${

                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"

              }`}
>
<div className="message-card bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-xl p-4 shadow-inner border border-amber-200">
<p className="font-devanagari text-pink-900 text-base md:text-lg leading-relaxed">

                  🪔 स्वप्न एका नव्या वास्तूचे, साकार झाले आपल्या आशीर्वादाने।
<br />

                  कार्य नूतन गृहाचे वास्तुशांतीचे, योजिले श्री कुलदेवताच्या कृपेने।
</p>
</div>
<div

                className="message-card bg-gradient-to-r from-orange-50/80 to-amber-50/80 rounded-xl p-4 shadow-inner border border-amber-200"

                style={{ animationDelay: "0.2s" }}
>
<p className="font-devanagari text-pink-900 text-base md:text-lg leading-relaxed">

                  🌺 तोरण या वास्तूवर चढावे, आपण सर्वांच्या साक्षीने...
<br />

                  रंगत या कार्याची वाढावी तुमच्या आनंददायी सहवासाने…
</p>
</div>
</div>
 
            {/* Venue & Host with Icons */}
<div

              className={`mt-6 space-y-3 transition-all duration-1000 delay-1100 ${

                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"

              }`}
>
<div className="info-card flex items-center justify-center gap-2 bg-pink-50/80 rounded-lg p-3 mx-4 border border-pink-200 hover:shadow-lg transition-shadow">
<i className="fas fa-map-marker-alt text-pink-600 text-xl animate-bounce-slow"></i>
<p className="font-bold text-base md:text-lg text-pink-900 font-devanagari">

                  स्थळ : पाटील गल्ली, गणपती मंदिर जवळ, माळभाग, शिरढोण
</p>
</div>
<div className="info-card flex items-center justify-center gap-2 bg-amber-50/80 rounded-lg p-3 mx-4 border border-amber-200 hover:shadow-lg transition-shadow">
<i className="fas fa-user-circle text-amber-600 text-xl"></i>
<p className="font-bold text-base md:text-lg text-pink-900 font-devanagari">

                  निमंत्रक : सासणे, गारवे
</p>
</div>
</div>
</div>
</div>
 
        {/* Download Button */}
<div

          className={`text-center mt-8 transition-all duration-1000 delay-1200 ${

            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"

          }`}
>
<button

            onClick={() => setShowPopup(true)}

            className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 via-red-500 to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
>
<span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
<span className="relative flex items-center gap-2 font-devanagari">
<i className="fas fa-download animate-bounce-slow"></i>

              तुमचे वैयक्तिक निमंत्रण पहा आणि डाउनलोड करा
</span>
</button>
</div>
</div>
 
      {/* Popup Modal */}

      {showPopup && (
<div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
<div className="bg-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-sm transform animate-scale-up border-2 border-amber-300">
<div className="text-center mb-6">
<span className="text-5xl animate-bounce-slow inline-block">🪷</span>
<h2 className="text-2xl font-bold mt-3 text-pink-800 font-devanagari">

                तुमचे नाव भरा
</h2>
<p className="text-sm text-gray-500 mt-1 font-devanagari">

                वैयक्तिक निमंत्रण तयार करण्यासाठी
</p>
</div>
<input

              type="text"

              value={guestName}

              onChange={(e) => setGuestName(e.target.value)}

              className="w-full border-2 border-amber-300 p-3 rounded-xl mb-6 text-center text-lg font-devanagari focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"

              placeholder="तुमचे नाव लिहा..."

              autoFocus

            />
<div className="flex gap-3">
<button

                onClick={() => setShowPopup(false)}

                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all font-devanagari"
>

                रद्द करा
</button>
<button

                onClick={handlePopupSubmit}

                className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-600 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-devanagari"
>

                पुढे जा ➡️
</button>
</div>
</div>
</div>

      )}
 
      {/* Personalized Invitation */}

      {showPersonalInvite && (
<div className="my-10 flex flex-col items-center px-4 animate-fade-in">
<h2 className="text-2xl font-bold text-pink-800 mb-6 font-devanagari flex items-center gap-2">
<span>✨</span>

            तुमचे वैयक्तिक निमंत्रण
<span>✨</span>
</h2>
 
          <div

            ref={inviteRef}

            className="relative w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 bg-white overflow-hidden"
>
<div className="absolute inset-0 z-0">
<img

                              
              src="/bg55.jpg"


                alt="Background"

                className="w-full h-full object-cover"

              />
</div>
 
            <div className="relative z-10 text-center">

              {/* Ganesh */}
<img

                src="/ganesha4.jpg"

                alt="Shree Ganesh"

                className="mx-auto mb-2 w-[110px] h-[110px] rounded-full shadow-xl border-4 border-amber-400"

              />
<p className="text-amber-700 text-base font-devanagari">

                ॥ श्री गणेशाय नमः ॥
</p>
 
              {/* Title */}
<h1
  className="text-5xl md:text-5xl font-extrabold mt-6 font-devanagari animate-title-shimmer drop-shadow-lg"
  style={{
 
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text",
    color: "#9d174d" ,
    // WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  }}
>
  गृह प्रवेश निमंत्रण
</h1>
              {/* Date */}
<p className="text-lg md:text-xl mt-2 text-amber-700 font-devanagari">

                📅 गुरुवार, १२ मार्च २०२६
</p>
 
              {/* Personalized Message */}
<div className="bg-gradient-to-r from-amber-50/90 to-orange-50/90 rounded-xl p-4 mt-4 border border-amber-200">
<p className="text-base md:text-lg text-pink-900 font-devanagari leading-relaxed">

                  आदरणीय{" "}
<span className="font-bold text-pink-700 text-lg">{finalName}</span>{" "}

                  सप्रेम नमस्कार 🙏
</p>
<p className="text-sm md:text-base text-pink-800 font-devanagari mt-2 leading-relaxed">

                  वि. वि. आपणास कळविण्यात आनंद होत आहे कि, आमच्या नवीन वास्तूची

                  शांती व सत्यनारायण महापूजा आयोजित केली आहे! तरी आपण सहकुटुंब,

                  सहपरिवार व मित्रमंडळी उपस्थित राहून तीर्थप्रसादाचा लाभ घ्यावा ही

                  विनंती... 🌸
</p>
</div>
 
              {/* House Image */}
<div className="relative mt-5 max-w-md mx-auto p-1 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 shadow-xl">
<div className="p-1 rounded-xl bg-gradient-to-r from-pink-800 via-pink-600 to-pink-800">
<div className="relative h-56 md:h-64 w-full rounded-lg overflow-hidden">
<Image

                      src="/home.jpg"

                      alt="Our New Home"

                      layout="fill"

                      objectFit="cover"

                      className="rounded-lg"

                      priority

                    />
</div>
</div>
</div>
 
              {/* Messages */}
<div

              className={`mt-6 px-4 space-y-4 transition-all duration-1000 delay-1000 ${

                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"

              }`}
>
<div className="message-card bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-xl p-4 shadow-inner border border-amber-200">
<p className="font-devanagari text-pink-900 text-base md:text-lg leading-relaxed">

                  🪔 स्वप्न एका नव्या वास्तूचे, साकार झाले आपल्या आशीर्वादाने।
<br />

                  कार्य नूतन गृहाचे वास्तुशांतीचे, योजिले श्री कुलदेवताच्या कृपेने।
</p>
</div>
<div

                className="message-card bg-gradient-to-r from-orange-50/80 to-amber-50/80 rounded-xl p-4 shadow-inner border border-amber-200"

                style={{ animationDelay: "0.2s" }}
>
<p className="font-devanagari text-pink-900 text-base md:text-lg leading-relaxed">

                  🌺 तोरण या वास्तूवर चढावे, आपण सर्वांच्या साक्षीने...
<br />

                  रंगत या कार्याची वाढावी तुमच्या आनंददायी सहवासाने…
</p>
</div>
</div>
 
            {/* Venue & Host with Icons */}
<div

              className={`mt-6 space-y-3 transition-all duration-1000 delay-1100 ${

                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"

              }`}
>
<div className="info-card flex items-center justify-center gap-2 bg-pink-50/80 rounded-lg p-3 mx-4 border border-pink-200 hover:shadow-lg transition-shadow">
<i className="fas fa-map-marker-alt text-pink-600 text-xl animate-bounce-slow"></i>
<p className="font-bold text-base md:text-lg text-pink-900 font-devanagari">

                  स्थळ : पाटील गल्ली, गणपती मंदिर जवळ, माळभाग, शिरढोण
</p>
</div>
<div className="info-card flex items-center justify-center gap-2 bg-amber-50/80 rounded-lg p-3 mx-4 border border-amber-200 hover:shadow-lg transition-shadow">
<i className="fas fa-user-circle text-amber-600 text-xl"></i>
<p className="font-bold text-base md:text-lg text-pink-900 font-devanagari">

                  निमंत्रक : सासणे, गारवे
</p>
</div>
</div>
</div>
</div>
          <button

            onClick={handleDownload}

            className="mt-8 group relative px-8 py-4 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
>
<span className="flex items-center gap-2 font-devanagari">
<i className="fas fa-download"></i>

              निमंत्रण डाउनलोड करा
</span>
</button>
</div>

      )}
 
      <style jsx>{`

        .font-devanagari {

          font-family: "Noto Serif Devanagari", serif;

        }
 
        /* Floating flowers animation */

        .floating-flower {

          animation: float-around 20s ease-in-out infinite;

        }
 
        @keyframes float-around {

          0%,

          100% {

            transform: translate(0, 0) rotate(0deg);

          }

          25% {

            transform: translate(30px, -30px) rotate(90deg);

          }

          50% {

            transform: translate(-20px, 20px) rotate(180deg);

          }

          75% {

            transform: translate(20px, 30px) rotate(270deg);

          }

        }
 
        /* Ganesh glow animation */

        .animate-pulse-glow {

          background: radial-gradient(

            circle,

            rgba(255, 215, 0, 0.4) 0%,

            transparent 70%

          );

          animation: pulse-glow 2s ease-in-out infinite;

        }
 
        @keyframes pulse-glow {

          0%,

          100% {

            transform: scale(1);

            opacity: 0.5;

          }

          50% {

            transform: scale(1.2);

            opacity: 0.8;

          }

        }
 
        /* Slow spin for decorative ring */

        .animate-spin-slow {

          animation: spin 8s linear infinite;

        }
 
        @keyframes spin {

          from {

            transform: rotate(0deg);

          }

          to {

            transform: rotate(360deg);

          }

        }
 
        /* Ganesh image hover effect */

        .ganesh-image {

          transition: transform 0.5s ease;

        }
 
        .ganesh-container:hover .ganesh-image {

          transform: scale(1.05);

        }
 
        /* Title animation */

        .animate-title {

          animation: title-glow 3s ease-in-out infinite;

        }
 
        @keyframes title-glow {

          0%,

          100% {

            filter: drop-shadow(0 0 5px rgba(217, 119, 6, 0.5));

          }

          50% {

            filter: drop-shadow(0 0 20px rgba(217, 119, 6, 0.8));

          }

        }
 
        /* Bounce slow animation */

        .animate-bounce-slow {

          animation: bounce-slow 2s ease-in-out infinite;

        }
 
        @keyframes bounce-slow {

          0%,

          100% {

            transform: translateY(0);

          }

          50% {

            transform: translateY(-5px);

          }

        }
 
        /* Border glow for house frame */

        .animate-border-glow {

          animation: border-glow 3s ease-in-out infinite;

        }
 
        @keyframes border-glow {

          0%,

          100% {

            box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);

          }

          50% {

            box-shadow: 0 0 30px rgba(245, 158, 11, 0.8);

          }

        }
 
        /* Countdown number animation */

        .countdown-number {

          animation: countdown-pulse 1s ease-in-out infinite;

        }
 
        @keyframes countdown-pulse {

          0%,

          100% {

            transform: scale(1);

          }

          50% {

            transform: scale(1.05);

          }

        }
 
        /* Countdown box entrance */

        .countdown-box {

          animation: slide-up 0.5s ease-out forwards;

          opacity: 0;

        }
 
        @keyframes slide-up {

          from {

            opacity: 0;

            transform: translateY(20px);

          }

          to {

            opacity: 1;

            transform: translateY(0);

          }

        }
 
        /* Message cards animation */

        .message-card {

          animation: fade-slide 0.6s ease-out forwards;

        }
 
        @keyframes fade-slide {

          from {

            opacity: 0;

            transform: translateX(-20px);

          }

          to {

            opacity: 1;

            transform: translateX(0);

          }

        }
 
        /* Info cards hover */

        .info-card {

          transition: all 0.3s ease;

        }
 
        .info-card:hover {

          transform: translateY(-2px);

        }
 
        /* Fade in animation */

        .animate-fade-in {

          animation: fade-in 0.4s ease-out;

        }
 
        @keyframes fade-in {

          from {

            opacity: 0;

          }

          to {

            opacity: 1;

          }

        }
 
        /* Scale up animation for popup */

        .animate-scale-up {

          animation: scale-up 0.3s ease-out;

        }
 
        @keyframes scale-up {

          from {

            opacity: 0;

            transform: scale(0.9);

          }

          to {

            opacity: 1;

            transform: scale(1);

          }

        }
 
        /* Corner decoration animation */

        .corner-decoration {

          animation: corner-pulse 4s ease-in-out infinite;

        }
 
        @keyframes corner-pulse {

          0%,

          100% {

            opacity: 0.4;

          }

          50% {

            opacity: 0.7;

          }

        }
 
        /* Mandala background pattern */

        .mandala-bg {

          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='[w3.org](http://www.w3.org/2000/svg)'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

          animation: mandala-rotate 60s linear infinite;

        }
 
        @keyframes mandala-rotate {

          from {

            background-position: 0 0;

          }

          to {

            background-position: 1000px 1000px;

          }

        }

      `}</style>
</>

  );

}

 