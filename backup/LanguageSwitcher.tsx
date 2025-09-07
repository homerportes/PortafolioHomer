import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toggleLanguage('en')}
        className={cn(
          'px-2 py-1 text-sm transition-colors duration-300',
          currentLanguage === 'en'
            ? 'text-purple-300 font-bold'
            : 'text-gray-300 hover:text-purple-300'
        )}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => toggleLanguage('es')}
        className={cn(
          'px-2 py-1 text-sm transition-colors duration-300',
          currentLanguage === 'es'
            ? 'text-purple-300 font-bold'
            : 'text-gray-300 hover:text-purple-300'
        )}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
