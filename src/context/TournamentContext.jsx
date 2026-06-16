import React, { createContext, useReducer, useContext } from 'react';
import { groupsData } from '../data/groups';

const TournamentContext = createContext();

const initialState = {
    currentTab: 'groups', 
    groups: groupsData,
};

function tournamentReducer(state, action) {
    switch(action.type) {
        case 'SET_TAB': 
            return {
                ...state, 
                currentTab: action.payload,
            };

        case 'UPDATE_SCORE': {
            // 1. Extract raw updates out of the payload packet
            const { groupName, teamID, goalsFor, goalsAgainst, pointsWon } = action.payload;

            // 2. Target the specific .teams array deep inside that group object wrapper safely
            const targetTeams = state.groups[groupName]?.teams || [];

            // 3. Map to build a brand new updated array list
            const updatedTeamsList = targetTeams.map(team => {
                if (team.id === teamID) {
                    return {
                        ...team,
                        played: team.played + 1,
                        goalsFor: team.goalsFor + goalsFor,
                        goalsAgainst: team.goalsAgainst + goalsAgainst, // 🟢 Fixed spelling typo!
                        points: team.points + pointsWon,
                    };
                }
                return team;
            });

            // 4. Create a fresh array copy BEFORE sorting to protect data immutability rules
            const sortedTeamsList = [...updatedTeamsList].sort((a, b) => {
                if (b.points !== a.points) {
                    return b.points - a.points; // Higher points rank first
                }
                // Tiebreaker: Goal Difference calculations (Goals For minus Goals Against)
                const diffB = b.goalsFor - b.goalsAgainst;
                const diffA = a.goalsFor - a.goalsAgainst;
                return diffB - diffA;
            });

            // 5. Package everything back up cleanly into the global state warehouse shell
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [groupName]: {
                        ...state.groups[groupName],
                        teams: sortedTeamsList // Put sorted rows back where they belong
                    }
                }
            };
        }

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function TournamentProvider({ children }) {
    const [state, dispatch] = useReducer(tournamentReducer, initialState);

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