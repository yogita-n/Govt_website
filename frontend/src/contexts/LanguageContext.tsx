// src/contexts/LanguageContext.tsx

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Lang = 'en' | 'kn';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ─── Hide Google Translate bar completely ─────────────────────────────────────
function injectHideStyles() {
  if (document.getElementById('gt-hide-style')) return;
  const style = document.createElement('style');
  style.id = 'gt-hide-style';
  style.innerHTML = `
    body > .skiptranslate {
      display: none !important;
    }
    .goog-te-banner-frame,
    .goog-te-banner-frame.skiptranslate,
    .goog-te-ftab-float,
    #goog-gt-tt,
    .goog-te-balloon-frame,
    .goog-tooltip,
    .goog-tooltip:hover,
    .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
    .VIpgJd-ZVi9od-aZ2wEe-OiiCO {
      display: none !important;
      visibility: hidden !important;
    }
    body {
      top: 0 !important;
    }
    #google_translate_element {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

// ─── Load Google Translate widget script ──────────────────────────────────────
function loadScript() {
  if (document.getElementById('gt-script')) return;

  (window as any).googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'en,kn', autoDisplay: false },
      'google_translate_element'
    );
  };

  const s = document.createElement('script');
  s.id = 'gt-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.body.appendChild(s);
}

// ─── Clear googtrans cookie properly ──────────────────────────────────────────
function clearTranslateCookie() {
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
}

// ─── Trigger translation silently ─────────────────────────────────────────────
function applyTranslation(targetLang: 'en' | 'kn') {
  // BUG FIX #2 & #3: English must clear cookie + reload — select trick doesn't revert cleanly
  if (targetLang === 'en') {
    clearTranslateCookie();
    window.location.reload();
    return;
  }

  // Kannada — try immediately, retry if widget not ready yet
  const doIt = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (!select) return false;
    select.value = 'kn';
    select.dispatchEvent(new Event('change'));
    [100, 400, 800, 1500].forEach(ms => setTimeout(injectHideStyles, ms));
    return true;
  };

  if (doIt()) return;

  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    if (doIt()) {
      clearInterval(timer);
      return;
    }
    // Fallback after 30 tries (~6 seconds): force via cookie + reload
    if (tries >= 30) {
      clearInterval(timer);
      document.cookie = `googtrans=/en/kn; path=/`;
      document.cookie = `googtrans=/en/kn; domain=${window.location.hostname}; path=/`;
      window.location.reload();
    }
  }, 200);
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {

    //clearTranslateCookie();

    injectHideStyles();
    loadScript();

    // Ensure hidden div exists for Google Translate SDK
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      document.body.appendChild(div);
    }

    const observer = new MutationObserver(() => {
  // Reset body styles Google keeps injecting
  if (document.body.style.position === 'relative' ||
      document.body.style.top !== '' ||
      document.body.style.minHeight === '100%') {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.minHeight = '';
     }
        // BUG FIX #4: Sync React state if user clicked Google's native X/cancel
        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (combo && combo.value === 'en') {
          setLang('en');
        }
  });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'kn' : 'en';
    setLang(next);
    applyTranslation(next);
  };

  // t() is a no-op — Google Translate handles all text; kept so existing t() calls don't crash
  const t = (_key: string) => '';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
