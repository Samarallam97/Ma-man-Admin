import { useTranslation } from 'react-i18next';
import { FiHeart, FiMessageCircle, FiUserPlus } from 'react-icons/fi';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-800 dark:bg-primary-950 shadow-md transition-all">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between h-16">
            <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-sm text-primary-300 dark:text-primary-400 ">
                © {currentYear} Ma'man | مأمن.
              </span>
            </div>
          </div>
        <div className="flex gap-4 max-sm:mt-4">
          <a
            href="/support-us"
            aria-label={t('footer.support_us')}
            className="text-primary-300 dark:text-primary-400 flex items-center gap-2 transition-colors duration-200 hover:text-blue-300"
          >
            <FiHeart size={20} />
            <span>{t('footer.support_us')}</span>
          </a>
          <a
            href="/contact-us"
            aria-label={t('footer.contact_us')}
            className="text-primary-300 dark:text-primary-400 flex items-center gap-2 transition-colors duration-200 hover:text-blue-300"
          >
            <FiMessageCircle size={20} />
            <span>{t('footer.contact_us')}</span>
          </a>
          <a
            href="/join-us"
            aria-label={t('footer.join_us')}
            className="text-primary-300 dark:text-primary-400 flex items-center gap-2 transition-colors duration-200 hover:text-blue-300"
          >
            <FiUserPlus size={20} />
            <span>{t('footer.join_us')}</span>
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;