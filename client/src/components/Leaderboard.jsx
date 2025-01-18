import { useState, useEffect } from "react";
import { getScores } from "../services/score_api";

const Leaderboard = (props) => {
    const [scores, setScores] = useState([]);
    
    useEffect(() => {
        const fetchScores = async () => {
            const response = await getScores(props.gameName);
            setScores(response);
        };
        fetchScores();
    }, [props.gameName]);

    return (
        <table className="LeaderboardTable">
            <tbody>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
            {scores.map((score, index) => (
                <tr key={score.id}>
                    <td>{index + 1}</td>
                    <td>{score.playerName}</td>
                    <td>{score.score}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Leaderboard;