import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'warning', title: 'Превышение скорости', message: 'BMW 5 Series превысил скорость на 20 км/ч', time: '5 мин назад', read: false },
        { id: 2, type: 'info', title: 'Рейс завершен', message: 'Hyundai Sonata завершил рейс', time: '15 мин назад', read: false },
        { id: 3, type: 'danger', title: 'Требуется ТО', message: 'Kia K5 требует технического обслуживания', time: '1 час назад', read: true },
        { id: 4, type: 'success', title: 'Заправка', message: 'Toyota Camry заправлен на 45л', time: '2 часа назад', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const addNotification = (notification) => {
        const newNotif = {
            id: Date.now(),
            time: 'Только что',
            read: false,
            ...notification
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            clearAll
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
