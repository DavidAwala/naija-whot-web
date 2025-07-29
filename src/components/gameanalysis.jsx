import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyzeGameHistory } from './gamehistoryana.jsx';
import CardBack from './cardback';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import Card from './card'; 

export default function GameAnalysis({ ...props }) {
  const { state } = useLocation();
  const gameHistory = state?.gameHistory || [];
  const initialTopCard = state?.initialTopCard || null;
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [pileHistory, setPileHistory] = useState([]);

  const navigate = useNavigate();

  const handleReturnToGame = () => {
    navigate("/");
    window.location.reload(); 
  };

  useEffect(() => {
  if (gameHistory.length > 0) {
    const result = analyzeGameHistory(gameHistory, initialTopCard);
    setAnalysisResult(result);

    
    const pile = [];
    pile[0] = initialTopCard;

    for (let i = 0; i < gameHistory.length; i++) {
      const move = gameHistory[i];
      if (move.action !== 'draw' && move.card) {
        pile[i + 1] = move.card;
      } else {
        pile[i + 1] = pile[i] || { number: null, shape: null };
      }
    }

    setPileHistory(pile);
  }
}, [gameHistory, initialTopCard]);

  if (!analysisResult) {
    return <p>Loading analysis...</p>;
  }

  const currentMove = gameHistory[currentMoveIndex];
  const topCard = pileHistory[currentMoveIndex + 1] || pileHistory[currentMoveIndex];


  const renderHand = (hand = [], isPlayer = true) => (
    <div className={`hand ${isPlayer ? 'player-hand' : 'gemini-hand'}`}>
      {hand.length > 0 ? hand.map((card, i) => (
        <div key={i} style={{ marginLeft: i > 0 ? '-40px' : '0', zIndex: i }}>
          {card?.number && card?.shape ? (
            <Card
              number={card.number}
              shape={card.shape}
              isPlayable={false}
            />
          ) : (
            <div style={{ width: '100px', height: '150px', backgroundColor: '#ccc' }} />
          )}
        </div>
      )) : <div style={{ color: '#fff' }}>No cards</div>}
    </div>
  );

  const renderMiniBoard = () => {
   const getHand = (actor, type) => {
  if (currentMove?.actor === actor) {
    return currentMove?.handBeforeMove || [];
  }
  for (let i = currentMoveIndex; i >= 0; i--) {
    if (gameHistory[i]?.[type]?.length > 0) {
      return gameHistory[i][type];
    }
  }
  return [];
};

const playerHand = getHand('player', 'playerHand');
const geminiHand = getHand('gemini', 'geminiHand');

    return (
      <div className="mini-board">
      <button className="exit-analysis-btn" onClick={handleReturnToGame}>
        <FontAwesomeIcon icon={faArrowLeft} /> New Game
      </button>

        <div className="game-table">
          <div className="zone opponent-zone">
            <h4>Gemini</h4>
            {renderHand(geminiHand, false)}
          </div>

          <div className="zone center-zone">
            <div className="pile-info">
              <div className="top-card">
                <h5>Top Card</h5>
                {topCard?.number && topCard?.shape ? (
                  <Card
                    number={topCard.number}
                    shape={topCard.shape}
                    isPlayable={false}
                  />
                ) : (
                  <div style={{ width: '100px', height: '150px', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>N/A</div>
                )}
              </div>

              <div className='row'>
              {currentMove?.declaredShape && (
                <div className="declared-shape">
                  Declared Shape: <strong>{currentMove.declaredShape}</strong>
                </div>
              )}
              <div className="market-pile">
                <h5>Market</h5>
                <div style={{ width: '100px', height: '150px', backgroundColor: '#999', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   <CardBack
                     
                      />
                </div>
              </div>
              </div>

            </div>
          </div>

          <div className="zone player-zone">
            <h4>You</h4>
            {renderHand(playerHand, true)}
          </div>
        </div>

        <div className="move-description">
          <strong>Move {currentMoveIndex + 1}:</strong> {currentMove?.player || currentMove?.actor || 'Someone'} {currentMove?.action === 'draw'
            ? `drew ${currentMove?.amount || 1} card(s)`
            : `played ${currentMove?.card?.number === 20 ? 'WHOT' : `${currentMove?.card?.number} of ${currentMove?.card?.shape}`}`} 
          {currentMove?.declaredShape ? `and declared ${currentMove.declaredShape}` : ''}.
        </div>
      </div>
    );
  };


const moveFeedback = (index) => {
  const feedbacks = [
    ...analysisResult.goodMoves,
    ...analysisResult.mistakes,
    ...(analysisResult.missedOpportunities || []),
    ...analysisResult.strategicPlays,
    ...analysisResult.suggestions,
    ...analysisResult.drawMoves,
    ...analysisResult.lastCardAlerts
  ];

  const moveLabel = `Move ${index + 1}`;
  const pattern = new RegExp(`^${moveLabel}\\b`, 'i'); // \b ensures whole word match

  return feedbacks.filter(f => pattern.test(f));
};


  const handleNext = () => {
    if (currentMoveIndex < gameHistory.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };

 return (
  <div className="analysis-page">
    <div className="sidebar">
      <h2>🧠 Naija Whot Game Analysis</h2>
      <p><strong>{analysisResult.summary}</strong></p>

      <div className="feedback">
        {moveFeedback(currentMoveIndex).map((msg, i) => (
          <div key={i} className="feedback-msg">{msg}</div>
        ))}
      </div>

      <div className="nav-buttons">
        <button onClick={handlePrev} disabled={currentMoveIndex === 0}>⬅ Prev</button>
        <button onClick={handleNext} disabled={currentMoveIndex === gameHistory.length - 1}>Next ➡</button>
      </div>
    </div>

    <div className="preview-pane">
      {renderMiniBoard()}
    </div>

    <style>{`
      body{
      background: rgba(32, 28, 28, 0.88);;
      }
      .analysis-page {
        display: flex;
        height: 100vh;
        //overflow: hidden;
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f6f8;
      }

      .exit-analysis-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff4757;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease;
}

.exit-analysis-btn:hover {
  background-color: #e84118;
}

      .sidebar {
        width: 300px;
        background: #0a3d62;
        color: white;
        padding: 20px;
        box-shadow: 2px 0 10px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .sidebar h2 {
        font-size: 1.4rem;
        margin-bottom: 10px;
      }

      .sidebar p {
        font-size: 1rem;
        margin-bottom: 20px;
      }

      .feedback {
        flex-grow: 1;
        overflow-y: auto;
        margin-bottom: 20px;
      }

      .feedback-msg {
        background: #fff3cd;
        color: #000;
        padding: 10px;
        border-left: 4px solid #ffc107;
        border-radius: 6px;
        margin-bottom: 10px;
        font-size: 0.9rem;
      }

      .nav-buttons {
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }

      .nav-buttons button {
        flex: 1;
        padding: 10px;
        background: #145fa1;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .nav-buttons button:disabled {
        background: #888;
        cursor: not-allowed;
      }

      .preview-pane {
        flex: 1;
        padding: 3px;
        //overflow: hidden;
      }
      .pile-info{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      }
      .mini-board {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .game-table {
        flex: 1;
        padding: 5px;
        border-radius: 12px;
        background: linear-gradient(to right, #014421, #027d3f);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .hand {
        display: flex;
        align-items: center;
        height: 160px;
        overflow-x: auto;
        margin-top: 5px;
      }
   
      .hand > div {
        margin-right: -30px;
      }

      .move-description {
        background: #e3f2fd;
        padding: 10px;
        border-left: 5px solid #2196f3;
        border-radius: 6px;
        font-weight: 500;
        font-size: 0.95rem;
        color: #000;
      }
        @media (max-width: 768px) {
  .analysis-page {
    flex-direction: column;
    height: auto;
  }

  .sidebar {
    width: 100%;
    height: auto;
    padding: 15px;
    box-shadow: none;
    border-bottom: 1px solid #ccc;
  }

  .feedback-msg {
    font-size: 0.85rem;
  }

  .nav-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .nav-buttons button {
    font-size: 14px;
    padding: 8px;
  }

  .exit-analysis-btn {
    top: 10px;
    right: 10px;
    padding: 8px 12px;
    font-size: 14px;
  }

  .preview-pane {
    padding: 5px;
  }

  .hand {
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }
.card{
    width: calc(100px * 0.8);
    height: calc(150px * 0.8);
  }

  .top-card {
    width: calc(100px * 0.8);
    height: calc(150px * 0.8);
  }

  .zone {
    width: 100%;
    margin-bottom: 10px;
  }

  .zone h4 {
    font-size: 1.2rem;
    margin-bottom: 5px;
}
 

  .move-description {
    font-size: 0.85rem;
    padding: 8px;
  }

  .game-table {
    padding: 8px;
  }

  .pile-info {
    gap: 5px;
  }
  .player-hand{
    display: flex;
    flex-direction: row;
    }
}

    `}</style>
  </div>
);

  
}
