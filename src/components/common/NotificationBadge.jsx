import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoNotificationsOutline } from "react-icons/io5";
import useNotificationStore from '../../stores/notificationStore';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBadge = () => {
  const { t } = useTranslation();
  const { notifications, fetchNotifications, getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();
  
  useEffect(() => {
    // Fetch notifications when component mounts
    if (notifications.length === 0) {
      fetchNotifications();
    }
  }, [fetchNotifications, notifications.length]);
  
  return (
    <Link 
      to="/notifications" 
      className="relative flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
      aria-label={t('navigation.notifications')}
      title={t('navigation.notifications')}
    >
      <IoNotificationsOutline className="text-xl" />
      
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-error-500 text-white text-xs flex items-center justify-center font-medium"
          >
            {unreadCount}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default NotificationBadge;