import React from "react";
import { useTournament } from "../context/TournamentContext";


export default function Navbar() {

    const {state, dispatch } = useTournament();
    const {currentTab} = state;

    const tabs = [
        {id: 'groups', label: "Groups"},
        {id: 'teams', label: "Teams"},
        {id: 'players', label: "Players"},
        {id: 'fixtures', label: "Fixtures"},

    ]

    return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 w-full">
      <div className="max-w-6xl mx-auto pt-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 gap-2">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
              
            </div>
            <div>
              <h1 className="text-base font-black text-zinc-100 tracking-wide">
                World Cup 2026
              </h1>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                Canada · Mexico · United States
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono font-bold text-zinc-400 tracking-wide bg-zinc-800/40 border border-zinc-800 px-3 py-1 rounded-md self-end sm:self-auto">
            Jun 11 – Jul 19, 2026
          </div>
        </div>

        <div className="flex space-x-6 overflow-x-auto scrollbar-none">

          {tabs.map( (tab) => {

            const isActive = currentTab === tab.id;

            return (
              <button

                key={tab.id}
                onClick={() => dispatch({ type: 'SET_TAB', payload: tab.id })}

                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer relative whitespace-nowrap
                  
                    ${isActive 
                    ? 'text-zinc-100 font-black' 
                    : 'text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}