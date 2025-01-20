// src/pages/SocialDilemmas/SocialDilemmas.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import PropTypes from 'prop-types';
import gameService from './gameService';  // עדכון נתיב הייבוא
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import './SocialDilemmas.css';

// Modified scenarios with single role per scenario
const scenarios = [
  {
    id: 1,
    title: 'קבוצת הכיתה בווטסאפ',
    description: 'בקבוצת הווטסאפ הכיתתית, כמה תלמידים מתחילים להעליב תלמידה שלא נמצאת בקבוצה. הם משתפים תמונה שלה ועושים עליה בדיחות.',
    role: 'bystander',
    roleDescription: 'את/ה רואה את ההודעות בקבוצה. מה תעשה/י?',
    options: [
      {
        text: 'לדווח למורה/יועצת על המקרה',
        impact: 'עירוב מבוגר אחראי יכול לעצור את ההתנהגות הפוגענית ולספק תמיכה לנפגעת'
      },
      {
        text: 'לכתוב בקבוצה שזו התנהגות לא מקובלת',
        impact: 'עמידה פומבית נגד בריונות יכולה להשפיע על אחרים ולשנות את האווירה'
      },
      {
        text: 'לצאת מהקבוצה במחאה',
        impact: 'יציאה מהקבוצה מביעה התנגדות אך מפספסת הזדמנות להשפיע ולשנות'
      },
      {
        text: 'לשלוח הודעה פרטית לנפגעת ולהציע תמיכה',
        impact: 'תמיכה אישית חשובה אך לא מטפלת בבעיה המערכתית'
      }
    ]
  },
  {
    id: 2,
    title: 'הפצת תמונות פרטיות',
    description: 'גילית שחבר לכיתה מעביר תמונה אישית של תלמידה אחרת בלי ידיעתה.',
    role: 'target',
    roleDescription: 'קיבלת את התמונה לטלפון. מה תעשה/י?',
    options: [
      {
        text: 'למחוק את התמונה ולבקש מאחרים לעשות כך',
        impact: 'פעולה מיידית שיכולה לעצור את ההפצה'
      },
      {
        text: 'לדווח למורה או ליועצת',
        impact: 'מערב גורם מקצועי שיכול לטפל במצב'
      },
      {
        text: 'לפנות ישירות למפיץ התמונה',
        impact: 'עימות ישיר שעלול להסלים את המצב'
      },
      {
        text: 'להתעלם מהמצב',
        impact: 'התעלמות מאפשרת המשך הפגיעה'
      }
    ]
  },
  {
    id: 3,
    title: 'חרם ברשתות חברתיות',
    description: 'קבוצה של תלמידים החליטה להחרים תלמיד אחר ברשתות החברתיות ומשכנעת אחרים לחסום אותו.',
    role: 'bystander',
    roleDescription: 'את/ה עד/ה לחרם המתרחש. מה תעשה/י?',
    options: [
      {
        text: 'לעמוד לצד המוחרם בצורה גלויה',
        impact: 'תמיכה פומבית יכולה לעודד אחרים להתנגד לחרם'
      },
      {
        text: 'לשתף מבוגר אחראי',
        impact: 'ערוב גורם מקצועי יכול לטפל בשורש הבעיה'
      },
      {
        text: 'ליצור קבוצה אלטרנטיבית מכילה',
        impact: 'יצירת מרחב חברתי חיובי ומכיל'
      },
      {
        text: 'להישאר ניטרלי',
        impact: 'הימנעות מעימות אך גם מתמיכה'
      }
    ]
  }
];

const SocialDilemmas = ({ isTeacher }) => {
  const [gameState, setGameState] = useState('lobby'); // lobby, waiting, playing, completed
  const [gameCode, setGameCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [waitingForOthers, setWaitingForOthers] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    gameService.connect();

    gameService.onPlayerJoin((player) => {
      setPlayers(prev => [...prev, player]);
    });

    gameService.onGameStart(() => {
      setGameState('playing');
      setShowResults(false);
    });

    gameService.onAllAnswersSubmitted((data) => {
      setResponses(prev => ({...prev, [data.scenarioId]: data.answers}));
      setShowResults(true);
      setWaitingForOthers(false);
    });

    gameService.onNextScenario(() => {
      setCurrentScenario(prev => prev + 1);
      setShowResults(false);
    });

    gameService.onGameEnd((results) => {
      setGameState('completed');
    });

    return () => gameService.disconnect();
  }, []);

  const handleCreateGame = async () => {
    try {
      const response = await gameService.createGame('social-dilemmas');
      if (response.gameCode) {
        setGameCode(response.gameCode);
        setGameState('waiting');
      }
    } catch (err) {
      setError('Failed to create game');
    }
  };

  const handleStartGame = () => {
    if (players.length > 0) {
      gameService.startGame();
    }
  };

  const handleNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      gameService.forceNextScenario();
    } else {
      setGameState('completed');
    }
  };

  const handleJoinGame = async () => {
    try {
      setError('');
      await gameService.joinGame(gameCode, playerName);
      setGameState('waiting');
    } catch (err) {
      setError('שגיאה בהצטרפות למשחק. בדוק את הקוד ונסה שוב.');
    }
  };

  const handleAnswer = async (optionIndex) => {
    try {
      setError('');
      setWaitingForOthers(true);
      await gameService.submitAnswer({
        scenarioId: currentScenario,
        optionIndex
      });
    } catch (err) {
      setError('שגיאה בשליחת התשובה. נסה שוב.');
      setWaitingForOthers(false);
    }
  };

  const renderLobby = () => (
    <div className="game-card max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#1A659E] mb-4">דילמות חברתיות</h1>
        <p className="text-gray-600">משחק אינטראקטיבי ללמידה על התמודדות במצבים חברתיים</p>
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-400 text-red-700 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}
      
      {isTeacher ? (
        <button
          onClick={handleCreateGame}
          className="button-hover w-full bg-[#1A659E] text-white px-8 py-4 rounded-xl text-xl hover:bg-[#145180] transition-all"
        >
          צור משחק חדש
        </button>
      ) : (
        <div className="space-y-6">
          <input
            type="text"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            placeholder="קוד משחק"
            className="w-full text-center text-2xl p-4 border-2 border-[#1A659E] rounded-xl focus:ring-2 focus:ring-[#F7C59F] outline-none transition-all"
            maxLength="6"
          />
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="שם משתתף/ת"
            className="w-full text-center text-2xl p-4 border-2 border-[#1A659E] rounded-xl focus:ring-2 focus:ring-[#F7C59F] outline-none transition-all"
          />
          <button
            onClick={handleJoinGame}
            disabled={!gameCode || !playerName}
            className="button-hover w-full bg-[#1A659E] text-white px-8 py-4 rounded-xl text-xl hover:bg-[#145180] disabled:bg-gray-400 transition-all"
          >
            הצטרף למשחק
          </button>
        </div>
      )}
    </div>
  );

  const renderWaiting = () => (
    <div className="game-card max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#1A659E] mb-6">חדר המתנה</h2>
        <div className="text-2xl mb-6">קוד משחק: <span className="font-bold text-[#FF6B35]">{gameCode}</span></div>
        <div className="mb-8">
          <Users className="inline-block mr-2 text-[#1A659E]" />
          <span className="text-xl">{players.length} משתתפים מחוברים</span>
        </div>
        
        {players.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold mb-4">משתתפים:</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {players.map(player => (
                <div key={player.id} 
                     className="bg-[#EFEFD0] px-4 py-2 rounded-full text-[#1A659E] font-medium">
                  {player.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {isTeacher && (
          <button
            onClick={handleStartGame}
            className="button-hover bg-[#1A659E] text-white px-8 py-3 rounded-xl hover:bg-[#145180] transition-all"
          >
            התחל משחק
          </button>
        )}
      </div>
    </div>
  );

  const renderGame = () => {
    const currentScenarioData = scenarios[currentScenario];
    
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Users className="w-6 h-6 text-[#1A659E]" />
            <span className="text-[#1A659E]">{players.length} משתתפים</span>
          </div>
          <div className="text-2xl font-bold text-[#1A659E]">
            תרחיש {currentScenario + 1} מתוך {scenarios.length}
          </div>
        </div>

        <div className="game-card bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#1A659E] text-white p-6">
            <h2 className="text-2xl font-bold">{currentScenarioData.title}</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <p className="text-lg">{currentScenarioData.description}</p>
            <p className="text-lg font-medium">תפקיד שלך: {currentScenarioData.role === 'target' ? 'נפגע/ת' : 'עד/ה'}</p>
            <p className="text-lg">{currentScenarioData.roleDescription}</p>

            {!showResults ? (
              <div className="space-y-4">
                {currentScenarioData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !waitingForOthers && handleAnswer(index)}
                    disabled={waitingForOthers}
                    className={`w-full text-right p-4 rounded-xl transition-all ${
                      waitingForOthers
                        ? 'bg-gray-100 cursor-not-allowed'
                        : 'bg-[#EFEFD0] hover:bg-[#F7C59F] hover:text-white'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentScenarioData.options.map((option, index) => ({
                      option: `אפשרות ${index + 1}`,
                      count: responses[currentScenario]?.filter(r => r.optionIndex === index).length || 0
                    }))}>
                      <XAxis dataKey="option" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#1A659E" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentScenarioData.options.map((option, index) => (
                    <div key={index} className="p-4 bg-[#EFEFD0] rounded-xl">
                      <div className="font-bold mb-2">אפשרות {index + 1}:</div>
                      <div>{option.text}</div>
                      <div className="text-gray-600 mt-2">{option.impact}</div>
                    </div>
                  ))}
                </div>

                {isTeacher && (
                  <button
                    onClick={handleNextScenario}
                    className="button-hover w-full bg-[#1A659E] text-white px-6 py-3 rounded-xl hover:bg-[#145180] transition-all"
                  >
                    {currentScenario < scenarios.length - 1 ? 'המשך לתרחיש הבא' : 'סיים משחק'}
                  </button>
                )}
              </div>
            )}

            {waitingForOthers && (
              <div className="mt-4 text-center text-gray-600 animate-pulse">
                ממתין לשאר המשתתפים...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCompleted = () => (
    <div className="game-card bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-[#1A659E] text-white p-6 text-center">
        <h2 className="text-3xl font-bold">המשחק הסתיים!</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-[#EFEFD0] rounded-xl text-center">
              <Users className="w-12 h-12 mx-auto mb-2 text-[#1A659E]" />
              <div className="font-bold text-[#1A659E]">משתתפים</div>
              <div className="text-3xl font-bold text-[#FF6B35]">{players.length}</div>
            </div>
            <div className="p-6 bg-[#EFEFD0] rounded-xl text-center">
              <div className="font-bold text-[#1A659E]">תרחישים</div>
              <div className="text-3xl font-bold text-[#FF6B35]">{scenarios.length}</div>
            </div>
          </div>

          {scenarios.map((scenario, index) => (
            <div key={index} className="border-2 border-[#EFEFD0] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[#1A659E]">{scenario.title}</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenario.options.map((option, optIndex) => ({
                    option: `אפשרות ${optIndex + 1}`,
                    count: responses[index]?.filter(r => r.optionIndex === optIndex).length || 0
                  }))}>
                    <XAxis dataKey="option" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1A659E" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}

          {isTeacher && (
            <button
              onClick={() => {
                setGameState('lobby');
                setCurrentScenario(0);
                setResponses({});
                setPlayers([]);
                setShowResults(false);
                setWaitingForOthers(false);
              }}
              className="button-hover w-full bg-[#1A659E] text-white px-6 py-3 rounded-xl hover:bg-[#145180] transition-all"
            >
              התחל משחק חדש
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="social-dilemmas-container min-h-screen bg-gradient-to-b from-white to-[#EFEFD0] pt-32 pb-8 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto mt-24">
        {gameState === 'lobby' && renderLobby()}
        {gameState === 'waiting' && renderWaiting()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'completed' && renderCompleted()}
      </div>
    </div>
  );
};

SocialDilemmas.propTypes = {
  isTeacher: PropTypes.bool
};

SocialDilemmas.defaultProps = {
  isTeacher: false
};

export default SocialDilemmas;