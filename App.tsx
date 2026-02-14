
import React, { useState } from 'react';
import { AppState } from './types';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>(AppState.SIGNUP);
  const [userProfile, setUserProfile] = useState({ name: '', phone: '', initialPhase: 'INITIAL' as any });

  const handleSignupComplete = (name: string, phone: string) => {
    // Check if user exists in storage
    const savedName = localStorage.getItem(`selar_name_${phone}`);
    const savedPhase = localStorage.getItem(`selar_phase_${phone}`);
    
    const finalName = savedName || name;
    const finalPhase = savedPhase || 'INITIAL';

    // Save/Update name if it's a new registration
    if (!savedName) {
      localStorage.setItem(`selar_name_${phone}`, name);
    }

    setUserProfile({ 
      name: finalName, 
      phone: phone, 
      initialPhase: finalPhase 
    });
    
    setCurrentPage(AppState.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentPage(AppState.SIGNUP);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {currentPage === AppState.SIGNUP ? (
        <SignupPage onComplete={handleSignupComplete} />
      ) : (
        <DashboardPage 
          onLogout={handleLogout} 
          userName={userProfile.name} 
          userPhone={userProfile.phone}
          initialPhase={userProfile.initialPhase}
        />
      )}
    </div>
  );
};

export default App;
