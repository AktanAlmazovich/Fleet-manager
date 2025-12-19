import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from './components/Skeleton';

const VehicleCard = ({ vehicle, onOpenAssignModal, onReleaseVehicle, onSendToMaintenance, index = 0 }) => {
    const isAvailable = vehicle.status === 'available';
    const isBusy = vehicle.status === 'busy';
    const isMaintenance = vehicle.status === 'maintenance';

    // Health calculation based on mileage (100k km = critical)
    const maxMileage = 100000;
    const healthPercent = Math.max(0, Math.min(100, 100 - (vehicle.mileage / maxMileage) * 100));
    const healthColor = healthPercent > 60 ? 'from-green-500 to-emerald-500' : healthPercent > 30 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-rose-500';

    const getStatusConfig = () => {
        if (isAvailable) return { text: 'Свободна', gradient: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/30' };
        if (isBusy) return { text: 'В рейсе', gradient: 'from-red-500 to-rose-600', glow: 'shadow-red-500/30' };
        return { text: 'На ТО', gradient: 'from-slate-500 to-slate-600', glow: 'shadow-slate-500/30' };
    };

    const status = getStatusConfig();

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`glass-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${isMaintenance ? 'ring-2 ring-amber-400/50' : ''
                }`}
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10`}></div>
                <motion.img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className={`w-full h-full object-cover ${isMaintenance ? 'grayscale' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg bg-gradient-to-r ${status.gradient} text-white ${status.glow}`}
                    >
                        {status.text}
                    </motion.span>
                </div>

                {/* Live indicator for busy vehicles */}
                {isBusy && (
                    <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-medium text-white drop-shadow-lg">LIVE</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title & Plate */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {vehicle.name}
                    </h3>
                    <p className="font-mono text-gray-500 dark:text-slate-400 text-sm font-medium tracking-wide bg-gray-100 dark:bg-slate-700 inline-block px-2 py-0.5 rounded">
                        {vehicle.plate}
                    </p>
                </div>

                {/* Health Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Здоровье
                        </span>
                        <span className="text-xs font-bold text-gray-700 dark:text-slate-300">{Math.round(healthPercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${healthPercent}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`bg-gradient-to-r ${healthColor} h-2 rounded-full`}
                        />
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {vehicle.mileage?.toLocaleString() || 0} км
                    </p>
                </div>

                {/* Driver Info */}
                {isBusy && vehicle.driver && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl mb-4 border border-amber-100 dark:border-amber-800/30"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mr-3 shadow-lg">
                            <span className="text-sm font-bold">{vehicle.driver.charAt(0)}</span>
                        </div>
                        <div>
                            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wide">Водитель</p>
                            <p className="text-sm font-bold text-gray-800 dark:text-white">{vehicle.driver}</p>
                        </div>
                    </motion.div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                    {isAvailable && (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onOpenAssignModal(vehicle)}
                                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 flex justify-center items-center transition-all"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Назначить рейс
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSendToMaintenance(vehicle.id)}
                                className="w-full py-2.5 px-4 rounded-xl font-medium text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 flex justify-center items-center transition-all"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                На ТО
                            </motion.button>
                        </>
                    )}
                    {isBusy && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onReleaseVehicle(vehicle.id)}
                            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-slate-600 to-slate-700 hover:from-red-600 hover:to-red-700 shadow-lg flex justify-center items-center transition-all"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Завершить рейс
                        </motion.button>
                    )}
                    {isMaintenance && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onReleaseVehicle(vehicle.id)}
                            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 flex justify-center items-center transition-all"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Завершить ТО
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default VehicleCard;
