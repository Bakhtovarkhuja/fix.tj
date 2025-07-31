'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function LangSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div>
      <p>Current language: {lang}</p>
      <button onClick={() => setLang('en')}>EN</button>
      <button onClick={() => setLang('ru')}>RU</button>
      <button onClick={() => setLang('tj')}>TJ</button>
    </div>
  );
}
