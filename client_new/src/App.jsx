import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import VehicleCard from './VehicleCard';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import StatsCards from './components/StatsCards';
import MapView from './components/MapView';
import FinancePage from './components/FinancePage';
import DriversPage from './components/DriversPage';
import LoginPage from './components/LoginPage';
import DriverDashboard from './components/DriverDashboard';
import NotificationCenter from './components/NotificationCenter';
import ThemeToggle from './components/ThemeToggle';
import { SkeletonCard, SkeletonStats } from './components/Skeleton';

function AppContent() {
  const { user, logout, loading: authLoading, isAdmin, isDriver } = useAuth();
  const { isDark } = useTheme();
  const { addNotification } = useNotifications();
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('fleet');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    if (user && isAdmin) {
      fetchVehicles();
      fetchDrivers();
    }
  }, [user]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/vehicles');
      const data = await response.json();
      setVehicles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/drivers');
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const updateStatus = async (id, status, driver, driverId = null) => {
    try {
      const response = await fetch(`http://localhost:3000/api/vehicles/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, driver, driverId }),
      });

      if (response.ok) {
        fetchVehicles();
        return true;
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
    return false;
  };

  const handleOpenAssignModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleAssignDriver = async (driverName) => {
    if (selectedVehicle) {
      const success = await updateStatus(selectedVehicle.id, 'busy', driverName);
      if (success) {
        toast.success('Рейс успешно открыт!', {
          description: `${selectedVehicle.name} назначен водителю ${driverName}`,
        });
        addNotification({
          type: 'success',
          title: 'Новый рейс',
          message: `${selectedVehicle.name} назначен водителю ${driverName}`
        });
      }
      setIsModalOpen(false);
      setSelectedVehicle(null);
    }
  };

  const handleReleaseVehicle = async (id) => {
    const vehicle = vehicles.find(v => v.id === id);
    const success = await updateStatus(id, 'available', '');
    if (success) {
      toast.success('Машина возвращена!', {
        description: `${vehicle?.name || 'Автомобиль'} снова доступен`,
      });
      addNotification({
        type: 'info',
        title: 'Рейс завершен',
        message: `${vehicle?.name} вернулся в парк`
      });
    }
  };

  const handleSendToMaintenance = async (id) => {
    const vehicle = vehicles.find(v => v.id === id);
    const success = await updateStatus(id, 'maintenance', '');
    if (success) {
      toast.info('Отправлено на ТО', {
        description: `${vehicle?.name || 'Автомобиль'} на техобслуживании`,
      });
      addNotification({
        type: 'warning',
        title: 'Техобслуживание',
        message: `${vehicle?.name} отправлен на ТО`
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (isDriver) {
    return (
      <div className="relative">
        <Toaster position="top-right" richColors closeButton theme={isDark ? 'dark' : 'light'} />
        <button
          onClick={logout}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
        >
          Выйти
        </button>
        <DriverDashboard user={user} />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <StatsCards vehicles={vehicles} />
            <div className="glass-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Добро пожаловать в FleetPro!</h3>
                  <p className="text-gray-500 dark:text-slate-400">Система управления автопарком нового поколения</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-slate-300">
                Используйте боковое меню для навигации. Отслеживайте машины на карте,
                управляйте водителями и анализируйте финансы в реальном времени.
              </p>
            </div>
          </motion.div>
        );
      case 'fleet':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <StatsCards vehicles={vehicles} />
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
              >
                {vehicles.map((vehicle, index) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    index={index}
                    onOpenAssignModal={handleOpenAssignModal}
                    onReleaseVehicle={handleReleaseVehicle}
                    onSendToMaintenance={handleSendToMaintenance}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        );
      case 'map':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-180px)]"
          >
            <MapView vehicles={vehicles} />
          </motion.div>
        );
      case 'finance':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FinancePage vehicles={vehicles} />
          </motion.div>
        );
      case 'drivers':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DriversPage />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    const titles = {
      overview: { title: 'Обзор', subtitle: 'Общая статистика и быстрый доступ' },
      fleet: { title: 'Автопарк', subtitle: 'Управление транспортными средствами' },
      map: { title: 'Карта', subtitle: 'Местоположение транспорта в Бишкеке' },
      finance: { title: 'Финансы', subtitle: 'Аналитика, расходы и отчеты' },
      drivers: { title: 'Водители', subtitle: 'Команда и производительность' },
    };
    return titles[currentPage] || titles.fleet;
  };

  const pageInfo = getPageTitle();

  return (
    <div className={`flex min-h-screen font-sans ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      <Toaster position="top-right" richColors closeButton theme={isDark ? 'dark' : 'light'} />
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      <main className="flex-1 ml-72 p-8">
        {/* Premium Header */}
        <header className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{pageInfo.title}</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">{pageInfo.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <ThemeToggle />
            <NotificationCenter />

            {currentPage === 'fleet' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Добавить авто
              </motion.button>
            )}
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleAssignDriver}
          title={selectedVehicle ? `Назначить рейс: ${selectedVehicle.name}` : 'Назначить рейс'}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
