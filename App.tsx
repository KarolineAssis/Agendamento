
import React, { useState, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import Header from './components/Header';
import ClientView from './components/ClientView';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

type View = 'client' | 'adminLogin' | 'adminDashboard';

const AppContent: React.FC = () => {
  const [view, setView] = useState<View>('client');
  const { isAdminAuthenticated } = useAppContext();

  useEffect(() => {
    if (isAdminAuthenticated) {
      setView('adminDashboard');
    } else if (view === 'adminDashboard') {
        setView('client');
    }
  }, [isAdminAuthenticated, view]);
  
  const renderView = () => {
    switch(view) {
      case 'client':
        return <ClientView />;
      case 'adminLogin':
        return <AdminLogin onLoginSuccess={() => setView('adminDashboard')} onBack={() => setView('client')} />;
      case 'adminDashboard':
        return <AdminDashboard />;
      default:
        return <ClientView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <Header onAdminClick={() => setView(isAdminAuthenticated ? 'adminDashboard' : 'adminLogin')} />
        <div className="flex-grow">
            {renderView()}
        </div>
        <footer className="bg-white mt-auto py-4">
            <div className="container mx-auto text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Karoline Assis. Todos os direitos reservados.
            </div>
        </footer>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
