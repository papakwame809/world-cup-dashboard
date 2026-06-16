// src/App.jsx
import React from 'react';
import { TournamentProvider } from './context/TournamentContext';
import Navbar from './components/Navbar';
import GroupsGrid from './components/GroupsGrid';
import MetricDashboard from './components/MetricDashboard';

export default function App() {
  return (
    <TournamentProvider> 

      <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-red-600 selection: text-white">
      <Navbar/>

      <main className="pb-12">
        <MetricDashboard/>
        <GroupsGrid/>


      </main>

    </div>
    </TournamentProvider>
    
    

    

  );
    
}