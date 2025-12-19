import React from 'react';
import { motion } from 'framer-motion';

const StatsCards = ({ vehicles }) => {
    const total = vehicles.length;
    const available = vehicles.filter(v => v.status === 'available').length;
    const busy = vehicles.filter(v => v.status === 'busy').length;
    const maintenance = vehicles.filter(v => v.status === 'maintenance').length;

    const stats = [
        {
            label: 'Всего машин',
            value: total,
            icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
            gradient: 'from-blue-500 to-indigo-600',
            bgLight: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            label: 'Свободно',
            value: available,
            icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            gradient: 'from-green-500 to-emerald-600',
            bgLight: 'bg-green-50 dark:bg-green-900/20'
        },
        {
            label: 'В пути',
            value: busy,
            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
            gradient: 'from-amber-500 to-orange-600',
            bgLight: 'bg-amber-50 dark:bg-amber-900/20'
        },
        {
            label: 'На ТО',
            value: maintenance,
            icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
            gradient: 'from-slate-500 to-slate-700',
            bgLight: 'bg-slate-100 dark:bg-slate-700/50'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">{stat.label}</p>
                            <motion.p
                                key={stat.value}
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                className="text-4xl font-extrabold text-gray-900 dark:text-white"
                            >
                                {stat.value}
                            </motion.p>
                        </div>
                        <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-2xl shadow-lg`}>
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                            </svg>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-slate-400">
                                {stat.label === 'Всего машин' ? 'Всего в системе' :
                                    stat.label === 'Свободно' ? `${total > 0 ? Math.round(available / total * 100) : 0}% от общего` :
                                        stat.label === 'В пути' ? 'Активных рейсов' : 'На обслуживании'}
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsCards;
