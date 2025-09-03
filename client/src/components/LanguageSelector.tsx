import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select 
      value={language} 
      onChange={(e) => setLanguage(e.target.value)}
      className="language-selector"
    >
      <option value="en">🇺🇸 English</option>
      <option value="hi">🇮🇳 हिंदी</option>
      <option value="gu">🇮🇳 ગુજરાતી</option>
      <option value="bn">🇮🇳 বাংলা</option>
      <option value="te">🇮🇳 తెలుగు</option>
      <option value="mr">🇮🇳 मराठी</option>
      <option value="ta">🇮🇳 தமிழ்</option>
      <option value="kn">🇮🇳 ಕನ್ನಡ</option>
      <option value="ml">🇮🇳 മലയാളം</option>
      <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
      <option value="or">🇮🇳 ଓଡ଼ିଆ</option>
      <option value="as">🇮🇳 অসমীয়া</option>
      <option value="ur">🇮🇳 اردو</option>
      <option value="sa">🇮🇳 संस्कृतम्</option>
      <option value="ne">🇳🇵 नेपाली</option>
      <option value="sd">🇮🇳 سنڌي</option>
    </select>
  );
};

export default LanguageSelector;