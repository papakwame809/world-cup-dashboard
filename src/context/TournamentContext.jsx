import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { groupsData } from '../data/groups';

const TournamentContext = createContext();

const initialState = {
    currentTab: 'groups', 
    groups: groupsData, 
    loading: true       
};

function tournamentReducer(state, action) {
    switch(action.type) {
        case 'SET_TAB': 
            return {
                ...state, 
                currentTab: action.payload,
            };

        case 'SET_LIVE_DATA': 
            return {
                ...state,
                groups: action.payload,
                loading: false 
            };

        case 'UPDATE_SCORE': {
            const { groupName, teamID, goalsFor, goalsAgainst, pointsWon } = action.payload;
            const targetTeams = state.groups[groupName]?.teams || [];

            const updatedTeamsList = targetTeams.map(team => {
                if (team.id === teamID) {
                    return {
                        ...team,
                        played: team.played + 1,
                        goalsFor: team.goalsFor + goalsFor,
                        goalsAgainst: team.goalsAgainst + goalsAgainst,
                        points: team.points + pointsWon,
                    };
                }
                return team;
            });

            const sortedTeamsList = [...updatedTeamsList].sort((a, b) => {

                if (b.points !== a.points) {
                    return b.points - a.points;
                }

                const diffB = b.goalsFor - b.goalsAgainst;
                const diffA = a.goalsFor - a.goalsAgainst;
                return diffB - diffA;
            });

            return {
                ...state,
                groups: {
                    ...state.groups,
                    [groupName]: {
                        ...state.groups[groupName],
                        teams: sortedTeamsList
                    }
                }
            };
        }

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function TournamentProvider({ children }){

    const [state, dispatch] = useReducer(tournamentReducer, initialState);

    useEffect(() =>{
        async function fetchWorldCupData(){

            const API_URL = 'https://api.football-data.org/v4/competitions/WC/standings';
            
            const API_KEY = '880981a01e124d33ab7ba1378d01bd8d'; 

            try {
                const response = await fetch( API_URL,  {

                    headers: { 'X-Auth-Token': API_KEY }
                });

                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

                const rawData = await response.json();
                
                const formattedGroups = {};
                
                rawData.standings.forEach(groupBlock => {
                    const cleanName = groupBlock.group.replace('_', ''); 
                    
                    formattedGroups[cleanName] = {
                        teams: groupBlock.table.map(row => ({
                            id: row.team.id,
                            name: row.team.name,
                            played: row.played,
                            goalDifference: row.goalDifference,
                            points: row.points
                        }))
                    };
                });

                dispatch({ type: 'SET_LIVE_DATA', payload: formattedGroups });

            } catch (error) {
                console.error(error);
                dispatch({ type: 'SET_LIVE_DATA', payload: groupsData });
            }
        }

        fetchWorldCupData();
    }, []); 

    return (
        <TournamentContext.Provider value={{ state, dispatch }}> 
            {children}
        </TournamentContext.Provider>
    );
}

export function useTournament() {
    const context = useContext(TournamentContext);
    if (!context) {
        throw new Error('useTournament must be used within a TournamentProvider');
    }
    return context;
}