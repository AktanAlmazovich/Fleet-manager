import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const DriversPage = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDriver, setSelectedDriver] = useState(null);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/drivers');
            const data = await response.json();
            setDrivers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching drivers:', error);
            setLoading(false);
        }
    };

    const fetchDriverDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/drivers/${id}`);
            const data = await response.json();
            setSelectedDriver(data);
        } catch (error) {
            console.error('Error fetching driver details:', error);
        }
    };

    const getSkillData = (driver) => [
        { skill: 'Безопасность', value: Math.round(driver.rating * 20) },
        { skill: 'Скорость', value: Math.round(70 + Math.random() * 25) },
        { skill: 'Экономия', value: Math.round(60 + Math.random() * 35) },
        { skill: 'Пунктуальность', value: Math.round(75 + Math.random() * 20) },
        { skill: 'Опыт', value: Math.min(100, Math.round(driver.totalTrips / 2)) },
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < fullStars ? 'text-yellow-400' : 'text-gray-300 dark:text-slate-600'}>★</span>
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-5 shadow-lg"
                >
                    <p className="text-sm text-gray-500 dark:text-slate-400">Всего водителей</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{drivers.length}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-2xl p-5 shadow-lg"
                >
                    <p className="text-sm text-gray-500 dark:text-slate-400">Активных</p>
                    <p className="text-3xl font-bold text-green-600">{drivers.filter(d => d.status === 'active').length}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-2xl p-5 shadow-lg"
                >
                    <p className="text-sm text-gray-500 dark:text-slate-400">Общий заработок</p>
                    <p className="text-3xl font-bold text-blue-600">{drivers.reduce((sum, d) => sum + d.totalEarnings, 0).toLocaleString()} сом</p>
                </motion.div>
            </div>

            {/* Drivers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {drivers.map((driver, index) => (
                    <motion.div
                        key={driver.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        onClick={() => fetchDriverDetails(driver.id)}
                        className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl cursor-pointer transition-all"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="relative">
                                <img
                                    src={driver.avatar}
                                    alt={driver.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-lg"
                                />
                                <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${driver.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                    }`}></span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{driver.name}</h3>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{driver.phone}</p>
                                <div className="flex items-center mt-2 text-lg">
                                    {renderStars(driver.rating)}
                                    <span className="ml-2 text-sm text-gray-600 dark:text-slate-400">{driver.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-gray-100 dark:border-slate-700">
                            <div className="text-center">
                                <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Рейсов</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{driver.totalTrips}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Заработок</p>
                                <p className="text-2xl font-bold text-green-600">{(driver.totalEarnings / 1000).toFixed(0)}K</p>
                            </div>
                        </div>

                        {/* Achievement Badge */}
                        {driver.rating >= 4.8 && (
                            <div className="mt-4 flex items-center justify-center">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg">
                                    🏆 Лучший водитель
                                </span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Driver Detail Modal */}
            {selectedDriver && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setSelectedDriver(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={selectedDriver.avatar} alt={selectedDriver.name} className="w-16 h-16 rounded-full object-cover shadow-lg" />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedDriver.name}</h2>
                                        <p className="text-gray-500 dark:text-slate-400">{selectedDriver.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedDriver(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Stats */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-blue-600">{selectedDriver.totalTrips}</p>
                                            <p className="text-xs text-gray-600 dark:text-slate-400">Рейсов</p>
                                        </div>
                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-green-600">{(selectedDriver.totalEarnings / 1000).toFixed(0)}K</p>
                                            <p className="text-xs text-gray-600 dark:text-slate-400">Заработок</p>
                                        </div>
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-yellow-600">{selectedDriver.rating}</p>
                                            <p className="text-xs text-gray-600 dark:text-slate-400">Рейтинг</p>
                                        </div>
                                    </div>

                                    {/* Trips */}
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-3">Последние рейсы</h3>
                                        {selectedDriver.trips && selectedDriver.trips.length > 0 ? (
                                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                                {selectedDriver.trips.map((trip) => (
                                                    <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">{trip.vehicleName}</p>
                                                            <p className="text-xs text-gray-500 dark:text-slate-400">{trip.startDate}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-green-600">+{trip.earnings} сом</p>
                                                            <p className="text-xs text-gray-500 dark:text-slate-400">{trip.distance} км</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 dark:text-slate-400 text-center py-4">Нет данных</p>
                                        )}
                                    </div>
                                </div>

                                {/* Radar Chart */}
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">Навыки водителя</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={getSkillData(selectedDriver)}>
                                                <PolarGrid stroke="#374151" />
                                                <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                                                <Radar
                                                    name="Навыки"
                                                    dataKey="value"
                                                    stroke="#3b82f6"
                                                    fill="#3b82f6"
                                                    fillOpacity={0.4}
                                                />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default DriversPage;
