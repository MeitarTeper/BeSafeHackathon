// src/pages/SocialDilemmas/SocialDilemmas.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import PropTypes from 'prop-types';
import gameService from './gameService';  // עדכון נתיב הייבוא
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';

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
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>דילמות חברתיות - משחק כיתתי</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        {isTeacher ? (
          <button
            onClick={handleCreateGame}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600"
          >
            צור משחק חדש
          </button>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value.toUpperCase())}
              placeholder="קוד משחק"
              className="w-full text-center text-2xl p-3 border-2 border-blue-300 rounded-lg"
              maxLength="6"
            />
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="שם משתתף/ת"
              className="w-full text-center text-2xl p-3 border-2 border-blue-300 rounded-lg"
            />
            <button
              onClick={handleJoinGame}
              disabled={!gameCode || !playerName}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 disabled:bg-gray-400"
            >
              הצטרף למשחק
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderGame = () => {
    const currentScenarioData = scenarios[currentScenario];
    
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-red-100 border-red-400 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Users className="w-6 h-6 text-blue-500" />
            <span>{players.length} משתתפים</span>
          </div>
          <div className="text-2xl font-bold">תרחיש {currentScenario + 1} מתוך {scenarios.length}</div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentScenarioData.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{currentScenarioData.description}</p>
            <p className="text-lg mb-6 font-medium">תפקיד שלך: {currentScenarioData.role === 'target' ? 'נפגע/ת' : 'עד/ה'}</p>
            <p className="text-lg mb-6">{currentScenarioData.roleDescription}</p>

            {!showResults ? (
              <div className="space-y-4">
                {currentScenarioData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !waitingForOthers && handleAnswer(index)}
                    disabled={waitingForOthers}
                    className={`w-full text-right p-4 rounded-lg transition-colors ${
                      waitingForOthers
                        ? 'bg-gray-100 cursor-not-allowed'
                        : 'bg-white hover:bg-blue-50 border-2 border-gray-200'
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
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentScenarioData.options.map((option, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-bold mb-2">אפשרות {index + 1}:</div>
                      <div>{option.text}</div>
                      <div className="text-gray-600 mt-2">{option.impact}</div>
                    </div>
                  ))}
                </div>

                {isTeacher && (
                  <button
                    onClick={handleNextScenario}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                  >
                    {currentScenario < scenarios.length - 1 ? 'המשך לתרחיש הבא' : 'סיים משחק'}
                  </button>
                )}
              </div>
            )}

            {waitingForOthers && (
              <div className="mt-4 text-center text-gray-600">
                ממתין לשאר המשתתפים...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCompleted = () => (
    <Card>
      <CardHeader>
        <CardTitle>המשחק הסתיים!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="font-bold">משתתפים</div>
              <div className="text-2xl">{players.length}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="font-bold">תרחישים</div>
              <div className="text-2xl">{scenarios.length}</div>
            </div>
          </div>

          {scenarios.map((scenario, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-bold text-xl mb-4">{scenario.title}</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenario.options.map((option, optIndex) => ({
                    option: `אפשרות ${optIndex + 1}`,
                    count: responses[index]?.filter(r => r.optionIndex === optIndex).length || 0
                  }))}>
                    <XAxis dataKey="option" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
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
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              התחל משחק חדש
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 text-right" dir="rtl">
      {gameState === 'lobby' && renderLobby()}
      {gameState === 'waiting' && (
        <Card>
          <CardHeader>
            <CardTitle>חדר המתנה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl mb-4">קוד משחק: {gameCode}</div>
              <div className="mb-4">
                <Users className="inline-block mr-2" />
                {players.length} משתתפים מחוברים
              </div>
              {players.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold mb-2">משתתפים:</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {players.map(player => (
                      <div key={player.id} className="bg-blue-100 px-3 py-1 rounded-full">
                        {player.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {isTeacher && (
                <button
                  onClick={handleStartGame}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  התחל משחק
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      {gameState === 'playing' && renderGame()}
      {gameState === 'completed' && renderCompleted()}
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