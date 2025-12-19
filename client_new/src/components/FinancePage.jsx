import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const FinancePage = ({ vehicles }) => {
    const statusData = [
        { name: 'Свободно', value: vehicles.filter(v => v.status === 'available').length, color: '#22c55e' },
        { name: 'В рейсе', value: vehicles.filter(v => v.status === 'busy').length, color: '#ef4444' },
        { name: 'На ТО', value: vehicles.filter(v => v.status === 'maintenance').length, color: '#6b7280' },
    ].filter(d => d.value > 0);

    const fuelData = [
        { month: 'Июль', expense: 45000 },
        { month: 'Август', expense: 52000 },
        { month: 'Сентябрь', expense: 38000 },
        { month: 'Октябрь', expense: 61000 },
        { month: 'Ноябрь', expense: 48000 },
        { month: 'Декабрь', expense: 55000 },
    ];

    const transactions = [
        { id: 1, type: 'Заправка', vehicle: 'BMW 5 Series', amount: 4500, date: '2024-12-15' },
        { id: 2, type: 'Мойка', vehicle: 'Toyota Camry', amount: 800, date: '2024-12-14' },
        { id: 3, type: 'Ремонт', vehicle: 'Kia K5', amount: 25000, date: '2024-12-10' },
        { id: 4, type: 'Заправка', vehicle: 'Hyundai Sonata', amount: 3200, date: '2024-12-09' },
        { id: 5, type: 'Страховка', vehicle: 'Mercedes-Benz E-Class', amount: 15000, date: '2024-12-05' },
    ];

    const getTypeStyles = (type) => {
        switch (type) {
            case 'Заправка': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Мойка': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400';
            case 'Ремонт': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'Страховка': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Расходы за месяц</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">55 000 сом</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-rose-600">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Доход за месяц</p>
                            <p className="text-3xl font-bold text-green-600">124 500 сом</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Чистая прибыль</p>
                            <p className="text-3xl font-bold text-blue-600">69 500 сом</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card rounded-2xl p-6 shadow-lg"
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Статус автопарка</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-2xl p-6 shadow-lg"
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Расходы на топливо (сом)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={fuelData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    formatter={(value) => [`${value.toLocaleString()} сом`, 'Расходы']}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                        backgroundColor: 'rgba(255,255,255,0.95)'
                                    }}
                                />
                                <Bar dataKey="expense" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Transactions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6 shadow-lg"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Последние транзакции</h3>
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        Смотреть всё →
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-500 dark:text-slate-400 text-sm border-b border-gray-100 dark:border-slate-700">
                                <th className="pb-4 font-medium">Тип</th>
                                <th className="pb-4 font-medium">Автомобиль</th>
                                <th className="pb-4 font-medium">Сумма</th>
                                <th className="pb-4 font-medium">Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, index) => (
                                <motion.tr
                                    key={tx.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-gray-50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                                >
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeStyles(tx.type)}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-4 font-medium text-gray-900 dark:text-white">{tx.vehicle}</td>
                                    <td className="py-4 font-bold text-gray-900 dark:text-white">{tx.amount.toLocaleString()} сом</td>
                                    <td className="py-4 text-gray-500 dark:text-slate-400">{tx.date}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default FinancePage;
