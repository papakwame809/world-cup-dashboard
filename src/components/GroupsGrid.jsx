import React from "react";
import { useTournament } from "../context/TournamentContext";

export default function GroupsGrid() {
  const { state } = useTournament();

  const groups = state.groups || {};

  const groupNames = Object.keys(groups);
  

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
      <h2 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4">
        Group Stage Standings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupNames.map((groupName) => {
          const groupTeams = groups[groupName]?.teams || [];

          return (
            <div
              key={groupName}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all"
            >
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-3">
                <h3 className="font-mono font-black text-lg text-zinc-100">
                  {groupName.replace('Group', 'Group ')}
                </h3>

                <span className="text-[10px] bg-red-950 text-red-400 border border-red-900/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Live
                </span>

              </div>

              <div className="grid grid-cols-12 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">

                <div className="col-span-6">Team</div>
                <div className="col-span-2 text-center">P</div>
                <div className="col-span-2 text-center">GD</div>
                <div className="col-span-2 text-center">Pts</div>
              </div>

              <div className="space-y-1">
                {groupTeams.map((team, index) => (
                  <div
                    key={team.id || index}
                    className="grid grid-cols-12 items-center text-xs text-zinc-300 py-1.5 px-1 hover:bg-zinc-800/30 rounded transition-colors"
                  >
                    <div className="col-span-6 font-medium truncate flex items-center gap-2">
                      <span className="text-zinc-500 font-mono text-[11px] w-3">{index + 1}</span>
                      <span>{team.name}</span>
                    </div>

                    <div className="col-span-2 text-center font-mono text-zinc-400">{team.played || 0}</div>
                    <div className="col-span-2 text-center font-mono text-zinc-400">{team.goalDifference || 0}</div>
                    <div className="col-span-2 text-center font-mono font-bold text-zinc-100">{team.points || 0}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 