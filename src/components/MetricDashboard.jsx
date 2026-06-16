import React from "react";
import { useTournament } from "../context/TournamentContext";


export default function MetricDashboard() {

    const {state} = useTournament();

    const totalTeams = 48;
    const totalGroups = 12;
    const totalMatches = 104;
    const playedMatches = state.fixtures?.filter(f => f.status === 'FT').length || 0;


    const metrics = [
    { label: 'Total Teams', value: totalTeams, icon: '🏳️' },
    { label: 'Group Stages', value: `${totalGroups} Groups`, icon: '📊' },
    { label: 'Matches Played', value: `${playedMatches} / ${totalMatches}`, icon: '⚽' },
    { label: 'Tournament Status', value: 'Live', icon: '⚡' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:border-zinc-700 transition-colors duration-150"
          >
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                {metric.label}
              </p>

              <p className="text-2xl font-black text-zinc-100 font-mono mt-1">
                {metric.value}
              </p>

            </div>

            <div className="text-2xl bg-zinc-800/50 h-10 w-10 rounded-lg flex items-center justify-center border border-zinc-700/50">
              {metric.icon}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}