import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

// ─── THEME DEFINITIONS ────────────────────────────────────────────────────────
const THEMES = {
  light: {
    name: "Minimal Light",
    bg: "#FAFAF8",
    card: "#FFFFFF",
    cardBorder: "rgba(0,0,0,0.06)",
    surface: "#F3F1EB",
    text: "#1A1814",
    textSec: "#6B6860",
    textHint: "#A8A49E",
    accent: "#1A1814",
    accentText: "#FFFFFF",
    accentSoft: "#F0EDE6",
    navBg: "#FFFFFF",
    navBorder: "rgba(0,0,0,0.08)",
    inputBg: "#F3F1EB",
    inputBorder: "#E0DDD6",
    shadow: "0 2px 20px rgba(0,0,0,0.08)",
    cardShadow: "0 1px 12px rgba(0,0,0,0.06)",
    heroBg: "linear-gradient(135deg, #F0EDE6 0%, #E8E4DC 100%)",
    pill: "#E8E4DC",
    pillText: "#6B6860",
    green: "#16A34A",
    greenSoft: "#F0FDF4",
  },
  dark: {
    name: "Dark Mode",
    bg: "#0D0D0F",
    card: "rgba(255,255,255,0.05)",
    cardBorder: "rgba(255,255,255,0.08)",
    surface: "rgba(255,255,255,0.04)",
    text: "#F0EEE8",
    textSec: "#8A8880",
    textHint: "#504E4A",
    accent: "#C8F0A0",
    accentText: "#0D0D0F",
    accentSoft: "rgba(200,240,160,0.12)",
    navBg: "rgba(13,13,15,0.92)",
    navBorder: "rgba(255,255,255,0.06)",
    inputBg: "rgba(255,255,255,0.06)",
    inputBorder: "rgba(255,255,255,0.1)",
    shadow: "0 2px 20px rgba(0,0,0,0.4)",
    cardShadow: "0 1px 12px rgba(0,0,0,0.3)",
    heroBg: "linear-gradient(135deg, #1A1C16 0%, #141612 100%)",
    pill: "rgba(200,240,160,0.12)",
    pillText: "#C8F0A0",
    green: "#C8F0A0",
    greenSoft: "rgba(200,240,160,0.1)",
  },
  pastel: {
    name: "Pastel Friendly",
    bg: "#FDF8F5",
    card: "#FFFFFF",
    cardBorder: "rgba(220,180,160,0.2)",
    surface: "#FFF0EA",
    text: "#2C1810",
    textSec: "#8B6B5A",
    textHint: "#C4A090",
    accent: "#E8735A",
    accentText: "#FFFFFF",
    accentSoft: "#FFF0EA",
    navBg: "#FFFFFF",
    navBorder: "rgba(220,180,160,0.3)",
    inputBg: "#FFF5F0",
    inputBorder: "#F0C8B8",
    shadow: "0 2px 20px rgba(200,100,60,0.08)",
    cardShadow: "0 1px 12px rgba(200,100,60,0.06)",
    heroBg: "linear-gradient(135deg, #FFF0EA 0%, #FFE4D8 100%)",
    pill: "#FFE4D8",
    pillText: "#B8503A",
    green: "#5B9E6B",
    greenSoft: "#EDF7F0",
  },
};

// ─── ROOM ILLUSTRATIONS ───────────────────────────────────────────────────────
const RoomIllustration = ({ theme: t }) => (
  <svg viewBox="0 0 280 200" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="280" height="200" rx="16" fill={t.surface} />
    {/* floor */}
    <rect x="20" y="100" width="240" height="90" rx="4" fill={t.card} stroke={t.cardBorder} strokeWidth="1" />
    {/* back wall */}
    <rect x="20" y="40" width="240" height="60" rx="2" fill={t.surface} opacity="0.6" />
    {/* window */}
    <rect x="100" y="48" width="80" height="46" rx="4" fill={t.card} stroke={t.cardBorder} strokeWidth="1.5" />
    <line x1="140" y1="48" x2="140" y2="94" stroke={t.cardBorder} strokeWidth="1" />
    <line x1="100" y1="71" x2="180" y2="71" stroke={t.cardBorder} strokeWidth="1" />
    <rect x="106" y="54" width="30" height="32" rx="1" fill={t.accent} opacity="0.08" />
    <rect x="144" y="54" width="30" height="32" rx="1" fill={t.accent} opacity="0.04" />
    {/* sofa */}
    <rect x="40" y="115" width="100" height="50" rx="8" fill={t.accent} opacity="0.15" />
    <rect x="44" y="119" width="92" height="26" rx="6" fill={t.accent} opacity="0.2" />
    <rect x="40" y="119" width="16" height="40" rx="6" fill={t.accent} opacity="0.18" />
    <rect x="124" y="119" width="16" height="40" rx="6" fill={t.accent} opacity="0.18" />
    {/* table */}
    <rect x="160" y="124" width="64" height="36" rx="6" fill={t.textHint} opacity="0.18" />
    <circle cx="177" cy="139" r="3" fill={t.textSec} opacity="0.3" />
    <circle cx="192" cy="134" r="2" fill={t.textSec} opacity="0.2" />
    {/* plant */}
    <rect x="224" y="130" width="16" height="28" rx="3" fill={t.accent} opacity="0.15" />
    <ellipse cx="232" cy="126" rx="12" ry="14" fill={t.green} opacity="0.25" />
    <ellipse cx="226" cy="118" rx="8" ry="10" fill={t.green} opacity="0.2" />
    {/* rug */}
    <ellipse cx="120" cy="160" rx="60" ry="18" fill={t.accent} opacity="0.08" />
    {/* perspective lines */}
    <line x1="20" y1="40" x2="20" y2="190" stroke={t.cardBorder} strokeWidth="1" />
    <line x1="260" y1="40" x2="260" y2="190" stroke={t.cardBorder} strokeWidth="1" />
    <line x1="20" y1="40" x2="260" y2="40" stroke={t.cardBorder} strokeWidth="1" />
    <line x1="20" y1="190" x2="260" y2="190" stroke={t.cardBorder} strokeWidth="1" />
  </svg>
);

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", ...props }) => {
  const s = { width: size, height: size, display: "block", flexShrink: 0, ...props.style };
  const icons = {
    home: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M3 12L12 3l9 9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    grid: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/><rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/><rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/><rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.8"/></svg>,
    heart: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
    user: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    plus: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    back: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M19 12H5M12 5l-7 7 7 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    search: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.8"/><path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    sofa: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="2" y="10" width="20" height="9" rx="2" stroke={color} strokeWidth="1.5"/><rect x="5" y="7" width="14" height="5" rx="1.5" stroke={color} strokeWidth="1.5"/><path d="M2 14h2M20 14h2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    bed: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M2 4v16M22 4v16M2 8h20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><rect x="6" y="8" width="12" height="8" rx="1" stroke={color} strokeWidth="1.5"/></svg>,
    table: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="2" y="7" width="20" height="4" rx="1.5" stroke={color} strokeWidth="1.5"/><path d="M5 11v6M19 11v6M8 11v6M16 11v6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    wardrobe: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="3" y="2" width="18" height="20" rx="2" stroke={color} strokeWidth="1.5"/><line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="1.5"/><circle cx="9" cy="12" r="1" fill={color}/><circle cx="15" cy="12" r="1" fill={color}/></svg>,
    lamp: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 2v4M8 6l8 0M9 6l-2 8h10l-2-8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="14" x2="12" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    palette: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/><circle cx="8.5" cy="10.5" r="1.5" fill={color}/><circle cx="15.5" cy="10.5" r="1.5" fill={color}/><circle cx="12" cy="7" r="1.5" fill={color}/><path d="M7 16s1.5 2 5 2 5-2 5-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    logout: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><polyline points="16,17 21,12 16,7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    settings: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="1.5"/></svg>,
    star: <svg viewBox="0 0 24 24" fill="none" style={s}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    google: <svg viewBox="0 0 24 24" style={s}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
  };
  return icons[name] || null;
};

// ─── GOOGLE BUTTON ─────────────────────────────────────────────────────────────
const GoogleBtn = ({ onClick, disabled, label = "Continue with Google" }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
    gap: 10, background: "#FFFFFF", border: "1px solid #E0DDD6",
    borderRadius: 14, padding: "14px 20px", cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: "0 1px 8px rgba(0,0,0,0.08)", transition: "all .2s",
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1814",
    opacity: disabled ? 0.7 : 1,
  }}
    onMouseEnter={e => { if (!disabled) e.currentTarget.style.boxShadow = "0 3px 16px rgba(0,0,0,0.14)"; }}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.08)"}
  >
    <Icon name="google" size={20} />
    {label}
  </button>
);

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNav, t }) => {
  const tabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "projects", label: "Projects", icon: "grid" },
    { id: "inspiration", label: "Inspiration", icon: "heart" },
    { id: "profile", label: "Profile", icon: "user" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
      display: "flex", padding: "8px 0 20px", backdropFilter: "blur(20px)",
      zIndex: 10,
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => onNav(tab.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            gap: 3, background: "none", border: "none", cursor: "pointer",
            padding: "6px 0", transition: "all .2s",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, display: "flex",
              alignItems: "center", justifyContent: "center",
              background: isActive ? t.accentSoft : "transparent",
              transition: "all .2s",
            }}>
              <Icon name={tab.icon} size={20} color={isActive ? t.accent : t.textHint} />
            </div>
            <span style={{
              fontSize: 10, fontWeight: isActive ? 600 : 400,
              color: isActive ? t.accent : t.textHint,
              fontFamily: "'DM Sans', sans-serif",
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ─── SCREEN 1: ONBOARDING ────────────────────────────────────────────────────
const OnboardingScreen = ({ onTelegramAuth, onGuest, t }) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState("login"); // "login" | "otp"
  const [tgUser, setTgUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const widgetRef = useRef(null);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  // Inject official Telegram widget (fixes "origin required" — proper embed approach)
  useEffect(() => {
    if (!widgetRef.current) return;
    widgetRef.current.innerHTML = "";

    window.onTelegramWidgetAuth = async (user) => {
      setTgUser(user);
      setLoading(true);
      setError("");

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);

      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      if (!token || token.includes("your-token")) {
        // No bot token — skip OTP, go straight through
        onTelegramAuth(user);
        return;
      }

      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: user.id,
            text: `🏠 *EasyRemont* — your verification code:\n\n*${code}*\n\nExpires in 5 minutes.`,
            parse_mode: "Markdown",
          }),
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.description);
        setStep("otp");
        setResendTimer(60);
      } catch (e) {
        setError(`Could not send code: ${e.message}`);
      }
      setLoading(false);
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "easyremontbot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "window.onTelegramWidgetAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    widgetRef.current.appendChild(script);

    return () => { window.onTelegramWidgetAuth = null; };
  }, []);

  const verifyOtp = () => {
    if (otp.trim() === generatedOtp) {
      onTelegramAuth(tgUser);
    } else {
      setError("Wrong code. Try again.");
      setOtp("");
    }
  };

  const heroSection = (
    <div style={{ flex: 1, background: t.heroBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: t.accent, opacity: 0.06 }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: t.accent, opacity: 0.04 }} />
      <div style={{ width: "100%", maxWidth: 280, aspectRatio: "4/3", borderRadius: 20, overflow: "hidden", boxShadow: t.shadow, marginBottom: 28, transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)", opacity: visible ? 1 : 0, transition: "all .6s cubic-bezier(.34,1.56,.64,1)" }}>
        <RoomIllustration theme={t} />
      </div>
      <div style={{ textAlign: "center", transform: visible ? "translateY(0)" : "translateY(16px)", opacity: visible ? 1 : 0, transition: "all .5s ease .15s" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: t.accent, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Room Planner</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2, color: t.text, margin: "0 0 12px", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em" }}>Create your perfect<br />interior in minutes</h1>
        <p style={{ fontSize: 14, color: t.textSec, lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans', sans-serif", maxWidth: 240, marginInline: "auto" }}>Plan your room, place furniture and try different styles right on your phone</p>
      </div>
    </div>
  );

  if (step === "otp") {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg }}>
        {heroSection}
        <div style={{ padding: "24px 24px 36px", background: t.bg, transform: visible ? "translateY(0)" : "translateY(20px)", opacity: visible ? 1 : 0, transition: "all .5s ease .25s" }}>
          <button onClick={() => { setStep("login"); setOtp(""); setError(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: t.textSec, fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginBottom: 16, padding: 0 }}>← Back</button>
          <p style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>Check Telegram</p>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>
            Code sent to <strong>{tgUser?.first_name || "you"}</strong> via @easyremontbot
          </p>
          <input
            type="number" placeholder="000000" value={otp}
            onChange={e => { setOtp(e.target.value.slice(0, 6)); setError(""); }}
            onKeyDown={e => e.key === "Enter" && verifyOtp()}
            style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 14, padding: "14px 16px", fontSize: 28, fontWeight: 700, color: t.text, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box", textAlign: "center", letterSpacing: "0.3em", marginBottom: 12 }}
          />
          {error && <p style={{ margin: "0 0 10px", fontSize: 12, color: "#EF4444", fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>{error}</p>}
          <button onClick={verifyOtp} disabled={otp.length < 6} style={{ width: "100%", background: otp.length >= 6 ? "#2AABEE" : t.inputBorder, color: otp.length >= 6 ? "#fff" : t.textHint, border: "none", borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 700, cursor: otp.length >= 6 ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>
            Verify & Continue →
          </button>
          <button onClick={() => tgUser && sendOtp(tgUser)} disabled={resendTimer > 0} style={{ width: "100%", background: "none", border: "none", cursor: resendTimer > 0 ? "default" : "pointer", fontSize: 13, color: resendTimer > 0 ? t.textHint : "#2AABEE", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg, overflow: "hidden" }}>
      {heroSection}
      <div style={{ padding: "24px 24px 36px", background: t.bg, transform: visible ? "translateY(0)" : "translateY(20px)", opacity: visible ? 1 : 0, transition: "all .5s ease .25s" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
          {["2D Planning", "Fit Check", "AI Advice"].map(f => (
            <span key={f} style={{ background: t.pill, color: t.pillText, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
          ))}
        </div>

        {/* Official Telegram widget — fixes "origin required" */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, minHeight: 48 }}>
          {loading
            ? <div style={{ fontSize: 13, color: t.textSec, fontFamily: "'DM Sans', sans-serif", padding: "12px 0" }}>Sending code…</div>
            : <div ref={widgetRef} />
          }
        </div>

        {error && <p style={{ margin: "0 0 10px", fontSize: 12, color: "#EF4444", fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>{error}</p>}

        <button onClick={onGuest} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", marginTop: 8, fontSize: 13, color: t.textSec, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
          Continue as guest
        </button>
      </div>
    </div>
  );
};

// ─── SCREEN 2: HOME ──────────────────────────────────────────────────────────
const HomeScreen = ({ onNav, onCreateRoom, t, userName }) => {
  const projects = [
    { id: 1, name: "Master Bedroom", date: "2h ago", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", color: "#E8D5C4" },
    { id: 2, name: "Kitchen Nook", date: "Yesterday", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", color: "#C4D5E8" },
    { id: 3, name: "Living Room", date: "3 days ago", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", color: "#D5C4E8" },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: "20px 20px 16px", background: t.heroBg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: t.textSec, fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>Good morning</p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>
                Welcome, {userName || "User"} 👋
              </h2>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", overflow: "hidden",
              border: `2px solid ${t.accent}`, flexShrink: 0,
            }}>
              <div style={{ width: "100%", height: "100%", background: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16, color: t.accentText, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{(userName || "U")[0].toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 20px 0" }}>
          {/* Create room CTA */}
          <div onClick={onCreateRoom} style={{
            background: t.accent, borderRadius: 20, padding: "20px 20px 16px",
            marginBottom: 24, cursor: "pointer", position: "relative", overflow: "hidden",
            boxShadow: t.shadow, transition: "transform .15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.01)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ position: "absolute", bottom: -30, right: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="plus" size={18} color={t.accentText} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: t.accentText, fontFamily: "'DM Sans', sans-serif" }}>Create New Room</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: t.accentText, opacity: 0.7, fontFamily: "'DM Sans', sans-serif" }}>Plan your space in under 2 minutes</p>
          </div>

          {/* Recent projects */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>Recent Projects</h3>
            <button onClick={() => onNav("projects")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: t.accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>See all</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{
                background: t.card, borderRadius: 16, overflow: "hidden",
                border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow,
                cursor: "pointer", transition: "transform .15s",
                gridColumn: i === 0 ? "1 / -1" : "auto",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ height: i === 0 ? 140 : 100, overflow: "hidden", position: "relative" }}>
                  <img src={proj.img} alt={proj.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = proj.color; }} />
                  <div style={{
                    position: "absolute", bottom: 8, right: 8,
                    background: "rgba(0,0,0,0.4)", borderRadius: 8, padding: "3px 8px",
                    backdropFilter: "blur(8px)",
                  }}>
                    <span style={{ fontSize: 10, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{proj.date}</span>
                  </div>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>{proj.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {[["3", "Projects"], ["2", "Styles"], ["5", "Rooms"]].map(([val, label]) => (
              <div key={label} style={{
                flex: 1, background: t.card, borderRadius: 14, padding: "14px 12px",
                border: `1px solid ${t.cardBorder}`, textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: t.accent, fontFamily: "'DM Serif Display', serif" }}>{val}</div>
                <div style={{ fontSize: 11, color: t.textSec, fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="home" onNav={onNav} t={t} />
    </div>
  );
};

// ─── SCREEN 3: CREATE ROOM ────────────────────────────────────────────────────
const CreateRoomScreen = ({ onBack, onGenerate, t }) => {
  const [step, setStep] = useState(1);
  const [roomType, setRoomType] = useState(null);
  const [dims, setDims] = useState({ length: "", width: "", height: "" });

  const roomTypes = [
    { id: "bedroom", label: "Bedroom", emoji: "🛏️", color: "#E8D5C4" },
    { id: "kitchen", label: "Kitchen", emoji: "🍳", color: "#C4E8D5" },
    { id: "living", label: "Living Room", emoji: "🛋️", color: "#D5C4E8" },
    { id: "office", label: "Office", emoji: "💼", color: "#C4D5E8" },
  ];

  const canProceed = step === 1 ? !!roomType : dims.length && dims.width;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 12, background: t.heroBg }}>
        <button onClick={onBack} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <Icon name="back" size={16} color={t.text} />
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>New Room</h2>
          <p style={{ margin: 0, fontSize: 12, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>Step {step} of 2</p>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ padding: "16px 20px 0", display: "flex", gap: 6 }}>
        {[1, 2].map(s => (
          <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? t.accent : t.inputBorder, transition: "background .3s" }} />
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 24px" }}>
        {step === 1 ? (
          <>
            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>Select room type</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>What are you planning?</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {roomTypes.map(rt => (
                <div key={rt.id} onClick={() => setRoomType(rt.id)} style={{
                  background: roomType === rt.id ? t.accentSoft : t.card,
                  border: `${roomType === rt.id ? "2px" : "1px"} solid ${roomType === rt.id ? t.accent : t.cardBorder}`,
                  borderRadius: 16, padding: "20px 16px", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  transition: "all .2s", boxShadow: roomType === rt.id ? `0 0 0 4px ${t.accent}18` : t.cardShadow,
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: rt.color + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{rt.emoji}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>{rt.label}</span>
                  {roomType === rt.id && (
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="check" size={12} color={t.accentText} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>Room dimensions</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>Enter measurements in centimetres</p>

            {/* SVG diagram */}
            <div style={{ background: t.surface, borderRadius: 14, padding: 16, marginBottom: 20 }}>
              <svg viewBox="0 0 240 120" fill="none" style={{ width: "100%", height: 80 }}>
                <rect x="30" y="10" width="180" height="100" rx="4" fill={t.card} stroke={t.accent} strokeWidth="1.5" strokeDasharray="6,3" />
                <text x="120" y="105" textAnchor="middle" fontSize="11" fill={t.textSec} fontFamily="DM Sans">↔ {dims.length || "Length"} cm</text>
                <text x="18" y="65" textAnchor="middle" fontSize="11" fill={t.textSec} fontFamily="DM Sans" transform="rotate(-90,18,65)">↕ {dims.width || "Width"} cm</text>
              </svg>
            </div>

            {[
              { key: "length", label: "Length (cm)", placeholder: "e.g. 420" },
              { key: "width", label: "Width (cm)", placeholder: "e.g. 320" },
              { key: "height", label: "Height (cm)", placeholder: "e.g. 260 (optional)" },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.textSec, marginBottom: 6, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{field.label}</label>
                <input
                  type="number"
                  placeholder={field.placeholder}
                  value={dims[field.key]}
                  onChange={e => setDims(d => ({ ...d, [field.key]: e.target.value }))}
                  style={{
                    width: "100%", background: t.inputBg, border: `1px solid ${dims[field.key] ? t.accent : t.inputBorder}`,
                    borderRadius: 12, padding: "12px 14px", fontSize: 15, fontWeight: 500, color: t.text,
                    outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box",
                    transition: "border-color .2s",
                  }}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <div style={{ padding: "12px 20px 24px", borderTop: `1px solid ${t.inputBorder}`, background: t.bg }}>
        {step === 1 ? (
          <button onClick={() => canProceed && setStep(2)} style={{
            width: "100%", background: canProceed ? t.accent : t.inputBorder,
            color: canProceed ? t.accentText : t.textHint, border: "none", borderRadius: 14,
            padding: "14px", fontSize: 15, fontWeight: 700, cursor: canProceed ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
          }}>Continue →</button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, background: t.surface, border: `1px solid ${t.inputBorder}`, color: t.text, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Back</button>
            <button onClick={() => canProceed && onGenerate({ roomType, dims })} style={{
              flex: 2, background: canProceed ? t.accent : t.inputBorder,
              color: canProceed ? t.accentText : t.textHint, border: "none", borderRadius: 14,
              padding: "14px", fontSize: 15, fontWeight: 700, cursor: canProceed ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
            }}>Generate Room ✨</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── AI ADVISOR PANEL ────────────────────────────────────────────────────────
const AIAdvisorPanel = ({ roomData, furniture, appliedStyle, t, onClose }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I'm your AI design advisor 🏠 You're planning a ${roomData?.roomType || "room"}${roomData?.dims?.length ? ` (${roomData.dims.length}×${roomData.dims.width} cm)` : ""}. Ask me about colors, furniture placement, or style tips!` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userText }]);
    setInput("");
    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || apiKey.startsWith("sk-your")) {
      setMessages(prev => [...prev, { role: "assistant", content: "Please add VITE_OPENAI_API_KEY to your .env.local file to enable AI advice." }]);
      setLoading(false);
      return;
    }

    const systemPrompt = `You are a concise interior design advisor. Context: ${roomData?.roomType || "bedroom"}, ${roomData?.dims?.length ? `${roomData.dims.length}×${roomData.dims.width} cm` : "unknown size"}. Furniture placed: ${furniture.map(f => f.label).join(", ") || "none yet"}. Style: ${appliedStyle || "not selected"}. Give practical advice in 2-3 sentences max.`;

    try {
      const history = messages.slice(1).concat({ role: "user", content: userText });
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: "gpt-4o", messages: [{ role: "system", content: systemPrompt }, ...history], max_tokens: 200 }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setMessages(prev => [...prev, { role: "assistant", content: data.choices[0].message.content }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${e.message}` }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "68%", background: t.card, borderRadius: "20px 20px 0 0", border: `1px solid ${t.cardBorder}`, boxShadow: t.shadow, display: "flex", flexDirection: "column", zIndex: 50 }}>
      <div style={{ padding: "14px 16px 12px", borderBottom: `1px solid ${t.inputBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: t.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>AI Design Advisor</p>
            <p style={{ margin: 0, fontSize: 10, color: t.green, fontFamily: "'DM Sans', sans-serif" }}>● GPT-4o</p>
          </div>
        </div>
        <button onClick={onClose} style={{ background: t.surface, border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 18, color: t.textSec, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "82%", padding: "10px 13px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.role === "user" ? t.accent : t.surface, color: msg.role === "user" ? t.accentText : t.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: t.surface, padding: "10px 16px", borderRadius: "14px 14px 14px 4px", fontSize: 20, letterSpacing: 3 }}>···</div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "10px 14px 18px", borderTop: `1px solid ${t.inputBorder}`, display: "flex", gap: 8, flexShrink: 0 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about colors, furniture…"
          style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: "10px 12px", fontSize: 13, color: t.text, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{ width: 40, height: 40, borderRadius: 12, background: input.trim() && !loading ? t.accent : t.inputBorder, border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, color: input.trim() && !loading ? t.accentText : t.textHint }}>↑</button>
      </div>
    </div>
  );
};

// ─── VISUALIZATION MODAL ──────────────────────────────────────────────────────
const VisualizationModal = ({ roomData, appliedStyle, furniture, t, onClose }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { generate(); }, []);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || apiKey.startsWith("sk-your")) {
      setError("Add VITE_OPENAI_API_KEY to .env.local to enable visualization.");
      setLoading(false);
      return;
    }

    try {
      const roomType = roomData?.roomType || "bedroom";
      const style = appliedStyle || "modern minimalist";
      const dims = roomData?.dims?.length ? `${roomData.dims.length}×${roomData.dims.width} cm` : "";
      const items = furniture.length > 0 ? furniture.map(f => f.label).join(", ") : "minimal furniture";
      const prompt = `A beautiful ${style} interior design photo of a ${roomType}${dims ? `, room size ${dims}` : ""}, featuring ${items}. Natural lighting, professional interior photography, photorealistic, high quality.`;

      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: "dall-e-3", prompt, n: 1, size: "1024x1024", quality: "standard" }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setImageUrl(data.data[0].url);
    } catch (e) {
      setError(e.message || "Failed to generate image.");
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: t.card, borderRadius: 20, width: "100%", maxWidth: 400, overflow: "hidden", boxShadow: t.shadow }}>
        <div style={{ padding: "14px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${t.inputBorder}` }}>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>AI Room Visualization</p>
            <p style={{ margin: 0, fontSize: 11, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>{appliedStyle || "Modern"} style · DALL-E 3</p>
          </div>
          <button onClick={onClose} style={{ background: t.surface, border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 20, color: t.textSec, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        <div style={{ position: "relative", aspectRatio: "1", background: t.surface, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
          {loading && (
            <div style={{ textAlign: "center", padding: 24 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🎨</div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>Generating your room…</p>
              <p style={{ margin: "5px 0 0", fontSize: 11, color: t.textHint, fontFamily: "'DM Sans', sans-serif" }}>Takes ~15 seconds</p>
            </div>
          )}
          {imageUrl && <img src={imageUrl} alt="Room visualization" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
          {error && (
            <div style={{ textAlign: "center", padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>⚠️</div>
              <p style={{ margin: 0, fontSize: 12, color: "#EF4444", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{error}</p>
            </div>
          )}
        </div>
        <div style={{ padding: "12px 16px 16px", display: "flex", gap: 8 }}>
          {!loading && (
            <button onClick={generate} style={{ flex: 1, background: t.surface, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: "10px", fontSize: 13, fontWeight: 600, color: t.text, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Regenerate ↻
            </button>
          )}
          {imageUrl && (
            <button onClick={() => { const a = document.createElement("a"); a.href = imageUrl; a.target = "_blank"; a.click(); }} style={{ flex: 1, background: t.accent, border: "none", borderRadius: 12, padding: "10px", fontSize: 13, fontWeight: 700, color: t.accentText, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Open Full ↗
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 4: ROOM PLANNER ───────────────────────────────────────────────────
const PlannerScreen = ({ roomData, onBack, t }) => {
  const [furniture, setFurniture] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [appliedStyle, setAppliedStyle] = useState(null);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);

  const furnitureItems = [
    { id: "sofa", label: "Sofa", icon: "sofa", w: 88, h: 40, color: "#8B7355" },
    { id: "bed", label: "Bed", icon: "bed", w: 60, h: 80, color: "#6B8CAE" },
    { id: "table", label: "Table", icon: "table", w: 60, h: 40, color: "#7A8B6F" },
    { id: "wardrobe", label: "Wardrobe", icon: "wardrobe", w: 40, h: 80, color: "#8B6B8A" },
    { id: "lamp", label: "Lamp", icon: "lamp", w: 24, h: 24, color: "#C9A84C" },
  ];

  const styles = ["Minimal", "Scandinavian", "Modern", "Japandi"];

  const addFurniture = (item) => {
    const existing = furniture.filter(f => f.type === item.id);
    const offset = existing.length * 10;
    setFurniture(prev => [...prev, {
      id: Date.now(), type: item.id, label: item.label,
      x: 20 + offset, y: 20 + offset, w: item.w, h: item.h, color: item.color,
    }]);
  };

  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, id) => {
    e.stopPropagation();
    const rect = e.currentTarget.parentNode.getBoundingClientRect();
    const item = furniture.find(f => f.id === id);
    setDragging(id);
    setDragOffset({ x: e.clientX - rect.left - item.x, y: e.clientY - rect.top - item.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const item = furniture.find(f => f.id === dragging);
    const newX = Math.max(0, Math.min(rect.width - item.w, e.clientX - rect.left - dragOffset.x));
    const newY = Math.max(0, Math.min(rect.height - item.h, e.clientY - rect.top - dragOffset.y));
    setFurniture(prev => prev.map(f => f.id === dragging ? { ...f, x: newX, y: newY } : f));
  };

  const handleMouseUp = () => setDragging(null);

  const stylePalettes = {
    Minimal: { bg: "#F5F5F2", accent: "#2C2C2C", text: "Neutral tones, clean lines" },
    Scandinavian: { bg: "#EFF0F0", accent: "#4A7C6B", text: "Natural wood, whites" },
    Modern: { bg: "#1A1A2E", accent: "#E94560", text: "Bold contrasts, sleek" },
    Japandi: { bg: "#F2EDE4", accent: "#7C6B54", text: "Wabi-sabi, organic" },
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg }}>
      {/* Header */}
      <div style={{ padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: t.heroBg, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="back" size={15} color={t.text} />
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>Room Planner</h2>
            <p style={{ margin: 0, fontSize: 11, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>
              {roomData?.roomType || "Bedroom"} · {roomData?.dims?.length || "420"}×{roomData?.dims?.width || "320"}cm
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <button onClick={() => { setShowVisualization(true); setShowStylePanel(false); setShowAI(false); }} style={{
            background: t.surface, border: `1px solid ${t.cardBorder}`,
            borderRadius: 10, padding: "7px 11px", display: "flex", alignItems: "center", gap: 5,
            cursor: "pointer", transition: "all .2s",
          }}>
            <span style={{ fontSize: 14 }}>🎨</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>Visualize</span>
          </button>
          <button onClick={() => setShowStylePanel(!showStylePanel)} style={{
            background: showStylePanel ? t.accent : t.surface, border: `1px solid ${showStylePanel ? t.accent : t.cardBorder}`,
            borderRadius: 10, padding: "7px 11px", display: "flex", alignItems: "center", gap: 5,
            cursor: "pointer", transition: "all .2s",
          }}>
            <Icon name="palette" size={14} color={showStylePanel ? t.accentText : t.text} />
            <span style={{ fontSize: 12, fontWeight: 600, color: showStylePanel ? t.accentText : t.text, fontFamily: "'DM Sans', sans-serif" }}>Styles</span>
          </button>
        </div>
      </div>

      {/* Applied style badge */}
      {appliedStyle && (
        <div style={{ padding: "8px 16px", background: t.accentSoft, display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <Icon name="check" size={14} color={t.accent} />
          <span style={{ fontSize: 12, fontWeight: 500, color: t.accent, fontFamily: "'DM Sans', sans-serif" }}>{appliedStyle} style applied</span>
        </div>
      )}

      {/* Canvas */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative", margin: "12px 16px" }}>
        <div
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            width: "100%", height: "100%",
            background: appliedStyle ? stylePalettes[appliedStyle].bg : t.surface,
            borderRadius: 16, position: "relative", overflow: "hidden",
            border: `1px solid ${t.cardBorder}`,
            backgroundImage: `linear-gradient(${t.cardBorder} 1px, transparent 1px), linear-gradient(90deg, ${t.cardBorder} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            cursor: dragging ? "grabbing" : "default",
            transition: "background-color .3s",
          }}
        >
          {/* Room outline */}
          <div style={{
            position: "absolute", inset: 12, border: `2px dashed ${t.accent}40`,
            borderRadius: 8, pointerEvents: "none",
          }} />

          {furniture.length === 0 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, pointerEvents: "none" }}>
              <span style={{ fontSize: 32 }}>🏠</span>
              <p style={{ margin: 0, fontSize: 12, color: t.textHint, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>Tap furniture below to add it here</p>
            </div>
          )}

          {furniture.map(item => (
            <div
              key={item.id}
              onMouseDown={(e) => handleMouseDown(e, item.id)}
              style={{
                position: "absolute", left: item.x, top: item.y,
                width: item.w, height: item.h,
                background: item.color + "CC", border: `1.5px solid ${item.color}`,
                borderRadius: 8, cursor: "grab", userSelect: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: dragging === item.id ? "0 4px 16px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.1)",
                transform: dragging === item.id ? "scale(1.05)" : "scale(1)",
                transition: dragging === item.id ? "none" : "transform .1s",
                zIndex: dragging === item.id ? 100 : 1,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 600, color: "#fff", textAlign: "center", textShadow: "0 1px 2px rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif", padding: "0 4px", lineHeight: 1.2 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Style panel overlay */}
        {showStylePanel && (
          <div style={{
            position: "absolute", top: 0, right: 0, width: "56%", height: "100%",
            background: t.card, border: `1px solid ${t.cardBorder}`,
            borderRadius: "0 16px 16px 0", padding: 14,
            boxShadow: "-4px 0 20px rgba(0,0,0,0.12)", zIndex: 10,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>Select Style</p>
            {styles.map(style => (
              <div key={style} onClick={() => setSelectedStyle(style)} style={{
                padding: "10px 10px",
                background: selectedStyle === style ? t.accentSoft : t.surface,
                borderRadius: 10, cursor: "pointer",
                border: `1px solid ${selectedStyle === style ? t.accent : "transparent"}`,
                transition: "all .15s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>{style}</span>
                  {selectedStyle === style && <Icon name="check" size={12} color={t.accent} />}
                </div>
                <div style={{ display: "flex", gap: 3, marginTop: 5 }}>
                  {[stylePalettes[style].bg, stylePalettes[style].accent, "#888"].map((c, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: c, border: "0.5px solid rgba(0,0,0,0.1)" }} />
                  ))}
                </div>
                <p style={{ margin: "3px 0 0", fontSize: 9, color: t.textHint, fontFamily: "'DM Sans', sans-serif" }}>{stylePalettes[style].text}</p>
              </div>
            ))}
            <button onClick={() => { if (selectedStyle) { setAppliedStyle(selectedStyle); setShowStylePanel(false); } }} style={{
              background: selectedStyle ? t.accent : t.inputBorder,
              color: selectedStyle ? t.accentText : t.textHint,
              border: "none", borderRadius: 10, padding: "10px",
              fontSize: 12, fontWeight: 700, cursor: selectedStyle ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif", marginTop: "auto",
            }}>Apply Style</button>
          </div>
        )}
      </div>

      {/* Furniture toolbar */}
      <div style={{
        padding: "10px 12px 16px", background: t.navBg,
        borderTop: `1px solid ${t.navBorder}`, flexShrink: 0,
      }}>
        <p style={{ margin: "0 0 8px 4px", fontSize: 10, fontWeight: 600, color: t.textHint, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>Furniture</p>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {furnitureItems.map(item => (
            <button key={item.id} onClick={() => addFurniture(item)} style={{
              flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
              gap: 5, background: t.surface, border: `1px solid ${t.cardBorder}`,
              borderRadius: 14, padding: "10px 12px", cursor: "pointer",
              transition: "all .15s", minWidth: 56,
            }}
              onMouseEnter={e => e.currentTarget.style.background = t.accentSoft}
              onMouseLeave={e => e.currentTarget.style.background = t.surface}
            >
              <Icon name={item.icon} size={22} color={t.text} />
              <span style={{ fontSize: 10, fontWeight: 500, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating AI Advisor button */}
      {!showAI && !showStylePanel && (
        <button onClick={() => setShowAI(true)} style={{
          position: "absolute", bottom: 90, right: 16, zIndex: 20,
          background: t.accent, color: t.accentText, border: "none",
          borderRadius: 24, padding: "10px 16px", display: "flex", alignItems: "center", gap: 7,
          fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: t.shadow,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <span style={{ fontSize: 16 }}>🤖</span> AI Advisor
        </button>
      )}

      {/* AI Advisor Panel */}
      {showAI && (
        <AIAdvisorPanel roomData={roomData} furniture={furniture} appliedStyle={appliedStyle} t={t} onClose={() => setShowAI(false)} />
      )}

      {/* Visualization Modal */}
      {showVisualization && (
        <VisualizationModal roomData={roomData} appliedStyle={appliedStyle} furniture={furniture} t={t} onClose={() => setShowVisualization(false)} />
      )}
    </div>
  );
};

// ─── SCREEN 5: INSPIRATION ────────────────────────────────────────────────────
const InspirationScreen = ({ onNav, t }) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Bedroom", "Kitchen", "Living", "Office"];

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", label: "Modern Living", cat: "Living" },
    { id: 2, src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", label: "Cozy Bedroom", cat: "Bedroom" },
    { id: 3, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", label: "Clean Kitchen", cat: "Kitchen" },
    { id: 4, src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80", label: "Minimal Office", cat: "Office" },
    { id: 5, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80", label: "Nordic Style", cat: "Living" },
    { id: 6, src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80", label: "Japandi Room", cat: "Bedroom" },
    { id: 7, src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80", label: "Bright Kitchen", cat: "Kitchen" },
    { id: 8, src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80", label: "Work Corner", cat: "Office" },
  ];

  const filtered = images.filter(img =>
    (activeFilter === "All" || img.cat === activeFilter) &&
    (!search || img.label.toLowerCase().includes(search.toLowerCase()))
  );

  const [liked, setLiked] = useState(new Set());

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 16px", background: t.heroBg, flexShrink: 0 }}>
        <h2 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>Inspiration</h2>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
            <Icon name="search" size={16} color={t.textHint} />
          </div>
          <input
            type="text" placeholder="Search styles, rooms..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", background: t.card, border: `1px solid ${t.inputBorder}`,
              borderRadius: 12, padding: "10px 12px 10px 36px", fontSize: 13, color: t.text,
              outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "12px 20px", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            flexShrink: 0, background: activeFilter === f ? t.accent : t.surface,
            color: activeFilter === f ? t.accentText : t.textSec,
            border: `1px solid ${activeFilter === f ? t.accent : t.cardBorder}`,
            borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
          }}>{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {filtered.map((img, i) => (
            <div key={img.id} style={{
              borderRadius: 14, overflow: "hidden", position: "relative",
              boxShadow: t.cardShadow, cursor: "pointer",
              gridRow: i === 0 ? "span 1" : "auto",
            }}>
              <img src={img.src} alt={img.label} style={{ width: "100%", height: i % 3 === 0 ? 160 : 120, objectFit: "cover", display: "block" }}
                onError={e => { e.target.style.background = "#E0DDD6"; e.target.style.height = "120px"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              <button
                onClick={() => setLiked(prev => { const n = new Set(prev); n.has(img.id) ? n.delete(img.id) : n.add(img.id); return n; })}
                style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={liked.has(img.id) ? "#E8735A" : "none"} stroke={liked.has(img.id) ? "#E8735A" : "#666"} strokeWidth="2" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
              <div style={{ position: "absolute", bottom: 8, left: 10 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{img.label}</p>
                <p style={{ margin: 0, fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>{img.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="inspiration" onNav={onNav} t={t} />
    </div>
  );
};

// ─── SCREEN 6: PROFILE ────────────────────────────────────────────────────────
const ProfileScreen = ({ onNav, onLogout, themeKey, setThemeKey, t, userName, userEmail }) => {
  const themeOptions = [
    { key: "light", label: "Minimal Light", icon: "☀️" },
    { key: "dark", label: "Dark Mode", icon: "🌙" },
    { key: "pastel", label: "Pastel Friendly", icon: "🌸" },
  ];

  const stats = [["3", "Projects"], ["5", "Rooms"], ["8", "Saved"]];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: "20px 20px 24px", background: t.heroBg, textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: t.accent, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${t.card}`, boxShadow: t.shadow }}>
            <span style={{ fontSize: 28, color: t.accentText, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>{(userName || "U")[0].toUpperCase()}</span>
          </div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>{userName || "User"}</h2>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>{userEmail || `${(userName || "user").toLowerCase().replace(" ", ".")}@gmail.com`}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {stats.map(([val, label]) => (
              <div key={label} style={{ background: t.card, borderRadius: 12, padding: "10px 16px", border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.accent, fontFamily: "'DM Serif Display', serif" }}>{val}</div>
                <div style={{ fontSize: 10, color: t.textSec, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          {/* Theme switcher */}
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`, padding: 16, marginBottom: 16, boxShadow: t.cardShadow }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Icon name="palette" size={16} color={t.accent} />
              <span style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>App Theme</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {themeOptions.map(opt => (
                <div key={opt.key} onClick={() => setThemeKey(opt.key)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px", borderRadius: 12, cursor: "pointer",
                  background: themeKey === opt.key ? t.accentSoft : t.surface,
                  border: `1px solid ${themeKey === opt.key ? t.accent : "transparent"}`,
                  transition: "all .2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{opt.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>{opt.label}</span>
                  </div>
                  {themeKey === opt.key && (
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="check" size={11} color={t.accentText} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Settings items */}
          {[["Settings", "settings"], ["Saved Items", "star"]].map(([label, icon]) => (
            <div key={label} style={{
              background: t.card, borderRadius: 14, border: `1px solid ${t.cardBorder}`,
              padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center",
              justifyContent: "space-between", cursor: "pointer", boxShadow: t.cardShadow,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: t.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={icon} size={16} color={t.accent} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
              </div>
              <span style={{ color: t.textHint, fontSize: 16 }}>›</span>
            </div>
          ))}

          {/* Logout */}
          <button onClick={onLogout} style={{
            width: "100%", background: "none", border: `1px solid #EF4444`,
            borderRadius: 14, padding: "14px", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, cursor: "pointer", marginTop: 8,
            color: "#EF4444", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          }}>
            <Icon name="logout" size={16} color="#EF4444" />
            Log Out
          </button>
        </div>
      </div>
      <BottomNav active="profile" onNav={onNav} t={t} />
    </div>
  );
};

// ─── PROJECTS SCREEN ──────────────────────────────────────────────────────────
const ProjectsScreen = ({ onNav, onCreateRoom, t }) => {
  const projects = [
    { id: 1, name: "Master Bedroom", type: "Bedroom", date: "2h ago", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" },
    { id: 2, name: "Kitchen Nook", type: "Kitchen", date: "Yesterday", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
    { id: 3, name: "Living Room", type: "Living Room", date: "3 days ago", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.bg }}>
      <div style={{ padding: "20px 20px 16px", background: t.heroBg, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: t.text, fontFamily: "'DM Serif Display', serif" }}>My Projects</h2>
        <button onClick={onCreateRoom} style={{
          background: t.accent, color: t.accentText, border: "none", borderRadius: 10,
          padding: "8px 14px", display: "flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        }}>
          <Icon name="plus" size={14} color={t.accentText} />
          New
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", paddingBottom: 90 }}>
        {projects.map(proj => (
          <div key={proj.id} style={{
            background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`,
            marginBottom: 14, overflow: "hidden", boxShadow: t.cardShadow,
            display: "flex", cursor: "pointer", transition: "transform .15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateX(3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
          >
            <div style={{ width: 90, flexShrink: 0 }}>
              <img src={proj.img} alt={proj.name} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 80 }}
                onError={e => { e.target.style.background = "#E0DDD6"; }} />
            </div>
            <div style={{ padding: "14px 14px", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>{proj.name}</span>
                <span style={{ fontSize: 11, color: t.textHint, fontFamily: "'DM Sans', sans-serif" }}>{proj.date}</span>
              </div>
              <span style={{ fontSize: 11, background: t.pill, color: t.pillText, borderRadius: 20, padding: "3px 8px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{proj.type}</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="projects" onNav={onNav} t={t} />
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [themeKey, setThemeKey] = useState("light");
  const [roomData, setRoomData] = useState(null);
  const [prevScreen, setPrevScreen] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Restore Telegram session from localStorage
    try {
      const stored = localStorage.getItem("tg_user");
      if (stored) {
        const u = JSON.parse(stored);
        setUserName(u.name || "User");
        setUserEmail(u.phone || "");
        setScreen("home");
      }
    } catch {}
  }, []);

  const handleTelegramAuth = (data) => {
    // New API: { id_token, user: { name, preferred_username, picture, phone_number } }
    // Old widget: { id, first_name, last_name, username, photo_url }
    const u = data.user || data;
    const name = u.name || [u.first_name, u.last_name].filter(Boolean).join(" ").trim() || u.preferred_username || "User";
    const phone = u.phone_number || "";
    const avatar = u.picture || u.photo_url || "";
    localStorage.setItem("tg_user", JSON.stringify({ name, phone, avatar, tg_id: u.sub || u.id }));
    setUserName(name);
    setUserEmail(phone);
    go("home");
  };

  const t = THEMES[themeKey];

  const go = (to) => {
    setPrevScreen(screen);
    setScreen(to);
  };

  const nav = (tabId) => {
    const map = { home: "home", projects: "projects", inspiration: "inspiration", profile: "profile" };
    go(map[tabId]);
  };

  const screens = {
    onboarding: <OnboardingScreen onTelegramAuth={handleTelegramAuth} onGuest={() => { setUserName("Guest"); go("home"); }} t={t} />,
    home: <HomeScreen onNav={nav} onCreateRoom={() => go("createRoom")} t={t} userName={userName} />,
    createRoom: <CreateRoomScreen onBack={() => go("home")} onGenerate={(data) => { setRoomData(data); go("planner"); }} t={t} />,
    planner: <PlannerScreen roomData={roomData} onBack={() => go("createRoom")} t={t} />,
    inspiration: <InspirationScreen onNav={nav} t={t} />,
    profile: <ProfileScreen onNav={nav} onLogout={() => { localStorage.removeItem("tg_user"); setUserName(""); setUserEmail(""); go("onboarding"); }} themeKey={themeKey} setThemeKey={setThemeKey} t={t} userName={userName} userEmail={userEmail} />,
    projects: <ProjectsScreen onNav={nav} onCreateRoom={() => go("createRoom")} t={t} />,
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>

      {/* App screen — full viewport */}
      <div style={{ width: "100%", height: "100%", position: "relative", background: t.bg }}>
        {screens[screen] || screens.home}
      </div>

      {/* Theme switcher */}
      <div style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
        borderRadius: 20, padding: "10px 16px", display: "flex", gap: 8,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.5)",
        zIndex: 9999,
      }}>
        <span style={{ fontSize: 12, color: "#666", fontWeight: 500, alignSelf: "center", marginRight: 4, fontFamily: "'DM Sans', sans-serif" }}>Theme:</span>
        {Object.keys(THEMES).map(key => (
          <button key={key} onClick={() => setThemeKey(key)} style={{
            background: themeKey === key ? "#1A1814" : "transparent",
            color: themeKey === key ? "#fff" : "#666",
            border: `1px solid ${themeKey === key ? "#1A1814" : "#ddd"}`,
            borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all .2s",
          }}>
            {THEMES[key].name.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
