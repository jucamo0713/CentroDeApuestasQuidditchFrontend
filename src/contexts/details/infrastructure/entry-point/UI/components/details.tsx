import React from 'react';
import './details.css';

interface MatchDetailsProps {
    highlights: { description: string; time: string }[];
    scoreA: number;
    scoreB: number;
    teamA: {
        image: string;
        name: string;
    };
    teamB: {
        image: string;
        name: string;
    };
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({ teamA, teamB, scoreA, scoreB, highlights }) => {
    return (
        <div className="match-details">
            <div className="teams">
                <div className="team">
                    <img src={teamA.image} alt={`${teamA.name} logo`} />
                    <h2>{teamA.name}</h2>
                    <p className="score">{scoreA}</p>
                </div>
                <span className="vs">VS</span>
                <div className="team">
                    <img src={teamB.image} alt={`${teamB.name} logo`} />
                    <h2>{teamB.name}</h2>
                    <p className="score">{scoreB}</p>
                </div>
            </div>

            <div className="highlights">
                <h3>Jugadas destacadas</h3>
                <ul>
                    {highlights.map((highlight, index) => (
                        <li key={index}>
                            <span className="time">{highlight.time}</span>
                            <span className="description"> - {highlight.description}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MatchDetails;
