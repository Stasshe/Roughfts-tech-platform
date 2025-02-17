import { useLanguage } from '../lib/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select 
      value={language} 
      onChange={(e) => setLanguage(e.target.value as 'en' | 'ja')}
    >
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  );
}; 