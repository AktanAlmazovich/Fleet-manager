import React, { useState, useEffect } from 'react';

const DriverDashboard = ({ user }) => {
    const [driverData, setDriverData] = useState(null);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.driverId) {
            fetchDriverData();
            fetchTrips();
        }
    }, [user]);

    const fetchDriverData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/drivers/${user.driverId}`);
            const data = await response.json();
            setDriverData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching driver data:', error);
            setLoading(false);
        }
    };

    const fetchTrips = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/trips/driver/${user.driverId}`);
            const data = await response.json();
            setTrips(data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6 shadow-lg">
                <div className="flex items-center space-x-4">
                    <img
                        src={driverData?.avatar || user?.driverInfo?.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{driverData?.name || user?.driverInfo?.name}</h1>
                        <p className="text-blue-200">Водитель FleetPro</p>
                        <div className="flex items-center mt-2">
                            <span className="text-yellow-300 text-lg">★</span>
                            <span className="ml-1 font-semibold">{driverData?.rating || user?.driverInfo?.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Всего рейсов</p>
                            <p className="text-3xl font-bold text-gray-900">{driverData?.totalTrips || 0}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Общий заработок</p>
                            <p className="text-3xl font-bold text-green-600">{(driverData?.totalEarnings || 0).toLocaleString()} сом</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Этот месяц</p>
                            <p className="text-3xl font-bold text-blue-600">{trips.reduce((sum, t) => sum + t.earnings, 0).toLocaleString()} сом</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Trips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">История рейсов</h2>
                {trips.length > 0 ? (
                    <div className="space-y-3">
                        {trips.map((trip) => (
                            <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-xl">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{trip.vehicleName}</p>
                                        <p className="text-sm text-gray-500">{trip.startDate}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">+{trip.earnings} сом</p>
                                    <p className="text-sm text-gray-500">{trip.distance} км</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>У вас пока нет завершенных рейсов</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverDashboard;
