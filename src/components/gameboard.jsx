// Cleaned and functional GameBoard.js
// Imports
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerHand from './playerhand';
import Card from './card.jsx';
import CardBack from './cardback';
import Navbar from './navbar.jsx';
import HelpModal from './helpmodal.jsx';
import SettingsModal from './settingmodal.jsx';
import './gameboard.css';
import './playani.css';
import ScrollableHand from './scrollhand.jsx';
import ShapeSelectorModal from './shapeselector.jsx';
import GameAnalysis from './gameanalysis.jsx'
import CongratsPage from './congratepage.jsx'; 
import useGameSounds from "../hooks/useGameSounds.js";




// Utility: Create Deck
const createFullDeck = () => {
  const shapes = ['Circle', 'Square', 'Triangle', 'Cross'];
  const numbers = [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14];
  const whotCards = Array(5).fill({ number: 20, shape: 'WHOT' });
  let deck = [];

  shapes.forEach(shape => {
    numbers.forEach(number => {
      deck.push({ number, shape });
    });
  });

  [1, 2, 3, 4, 5, 7, 8].forEach(number => {
    deck.push({ number, shape: 'Star' });
  });

  return [...deck, ...whotCards];
};

const shuffle = (array) => {
  let currentIndex = array.length;
  const newArray = [...array];
  while (currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex--);
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
};

export default function GameBoard() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [geminiHand, setGeminiHand] = useState([]);
  const [playedPile, setPlayedPile] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [didPlayerWin, setDidPlayerWin] = useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [pendingWHOTCard, setPendingWHOTCard] = useState(null);
  const [reshufflingCards, setReshufflingCards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [customAlert, setCustomAlert] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('player');
  const [chosenShape, setChosenShape] = useState(null);
  const [message, setMessage] = useState('Game started. Your turn!');
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [cardColor, setCardColor] = useState(''); 


 const {
    playError,
    playCard,
    playPickTwo,
    playPickThree,
    playGeneralMarket,
    playYouWin,
    playReshuffle,
    playDrawCard,
    playHoldOn,
    playSuspension,
    startBackground,
    stopBackground,
  } = useGameSounds(isMuted);
  
  useEffect(() => {
    startBackground();
    return stopBackground;
  }, [isMuted]);



 useEffect(() => {
    const hasSeenHelp = sessionStorage.getItem('hasSeenHelpModal');
    if (!hasSeenHelp) {
      setShowHelp(true);
      sessionStorage.setItem('hasSeenHelpModal', 'true');
    }
  }, []);


useEffect(() => {
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "Reloading this page will restart your game. Are you sure you want to continue?";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);

const handleColorChange = (newColor) => {
  setCardColor(newColor);
};
const handleShowHelp = () => setShowHelp(true);
const handleShowSettings = () => setShowSettings(true);
const toggleMute = () => setIsMuted(prev => !prev);


  const getTopPlayedCard = useCallback(() => playedPile.at(-1), [playedPile]);

  useEffect(() => restartGame(), []);

  const restartGame = () => {
    const shuffled = shuffle(createFullDeck());
    let firstPlayedIndex = shuffled.findIndex(c => ![1, 2, 5, 8, 14, 20].includes(c.number));
    if (firstPlayedIndex === -1) firstPlayedIndex = shuffled.length - 1;
    const firstPlayed = shuffled.splice(firstPlayedIndex, 1)[0];

    setPlayerHand(shuffled.slice(0, 6));
    setGeminiHand(shuffled.slice(6, 12));
    setPlayedPile([firstPlayed]);
    setDeck(shuffled.slice(12));
    setCurrentPlayer('player');
    setChosenShape(null);
    setMessage('♻️ Game Started. Your turn!');
    setGameHistory([]);
  };
useEffect(() => {
  console.log("Game History:", gameHistory);
}, [gameHistory]);

  const isActionCard = card => [1, 2, 5, 8, 14, 20].includes(card.number);

  const isPlayable = useCallback(card => {
    const top = getTopPlayedCard();
    if (!top) return true;
    if (top.number === 20 && chosenShape) return card.shape === chosenShape || card.number === 20;
    return card.number === top.number || card.shape === top.shape || card.number === 20;
  }, [getTopPlayedCard, chosenShape]);

  const switchTurn = (to) => {
    setCurrentPlayer(to);
    setMessage(to === 'player' ? 'Your turn!' : "Gemini's turn...");
  };

const reshuffleDeck = (callback = null) => {
  if (playedPile.length <= 1) {
    setMessage('No more cards. Stalemate!');
    return false;
  }

  const topCard = playedPile.at(-1);
  const toShuffle = playedPile.slice(0, -1);

  setReshufflingCards(toShuffle); // show animated cards
  setPlayedPile([topCard]);

  setTimeout(() => {
    const newDeck = shuffle(toShuffle);
    setDeck(newDeck);
    setReshufflingCards([]); // hide animation
    setMessage('♻️ Deck reshuffled!');
    if (callback) callback(); // continue draw after reshuffle
  }, 1500);

  return true;
};

const navigate = useNavigate();


const drawCards = (player, amount) => {
  if (deck.length < amount) {
    if (playedPile.length <= 1) {
      setMessage('No more cards. Stalemate!');
      return;
    }
    
    const reshufflingStarted = reshuffleDeck(() => {
      // Check again *after* reshuffle
      if (deck.length >= amount) {
        drawCards(player, amount);
      } else {
        setMessage('Not enough cards to draw,Card was reshuffled');
      }
    });

    if (reshufflingStarted) playReshuffle(); return; // Wait for reshuffle animation
  }

setGameHistory(prev => [
    ...prev,
    {
      player,
      action: 'draw',
      amount,
      handSizeBefore: player === 'player' ? playerHand.length : geminiHand.length,
      handSizeAfter: (player === 'player' ? playerHand.length : geminiHand.length) + drawn.length,
      drawnCards: drawn,
      playerHand: player === 'player' ? [...playerHand, ...drawn] : playerHand,
      geminiHand: player === 'gemini' ? [...geminiHand, ...drawn] : geminiHand,
    },
  ]);



  // Safe to draw
  const drawn = deck.slice(0, amount).map(c => ({ ...c, animation: 'slide-in' }));
  const remainder = deck.slice(amount);

  if (player === 'player') {
    setPlayerHand(prev => [...prev, ...drawn]);
  } else {
    setGeminiHand(prev => [...prev, ...drawn]);
  }

  setDeck(remainder);
};




const showCustomAlert = (msg, duration = 3000) => {
  setCustomAlert(msg);
  setTimeout(() => setCustomAlert(null), duration);
};


  const handlePlayCard = (index) => {
    
    if (currentPlayer !== 'player') return;
    const card = playerHand[index];
    if (playerHand.length === 1 && isActionCard(card)) return playError(),showCustomAlert("❌ You can't finish with an action card!");
    if (!isPlayable(card)) return playError(),showCustomAlert("You can't play that card!");
    if(isPlayable){playCard();}
    const updatedHand = [...playerHand];
    updatedHand.splice(index, 1);
    setPlayerHand(updatedHand);
setGameHistory(prev => [...prev, {
  player: 'player',
  action: 'play',
  card,
  handBeforeMove: playerHand,
  handSizeAfterMove: updatedHand.length,
  nextPlayerHandSize: geminiHand.length,
  playerHand: updatedHand,
  geminiHand: geminiHand
}]);


    setPlayedPile(prev => [...prev, { ...card, animation: 'slide-to-pile' }]);

    setTimeout(() => {
      setPlayedPile(prev => {
        const last = { ...prev.at(-1) };
        delete last.animation;
        return [...prev.slice(0, -1), last];
      });
    }, 1000);

    setChosenShape(null);
    if (updatedHand.length === 0) {
  setDidPlayerWin(true);
  playYouWin();
  return setGameOver(true);
}

    applyCardEffect(card, 'player');
  };

  const applyCardEffect = (card, playedBy) => {
    const opponent = playedBy === 'player' ? 'gemini' : 'player';
    switch (card.number) {
      case 1: case 8:
        setMessage(`${playedBy === 'player' ? 'You' : 'Gemini'} played ${card.number === 1 ? 'SUSPENSION' : 'HOLD ON'}. Go again.`);
        if(card.number===1){playSuspension()}else{playHoldOn()}
        setCurrentPlayer(playedBy);
        break;
      case 2: case 5:
        setMessage(`${playedBy === 'player' ? 'You' : 'Gemini'} make ${opponent} PICK ${card.number === 2 ? 2 : 3}`);
        drawCards(opponent, card.number === 2 ? 2 : 3);
        if(card.number===2){playPickTwo()}else{playPickThree()}
        setCurrentPlayer(playedBy);
        break;
      case 14:
        setMessage(`${playedBy === 'player' ? 'You' : 'Gemini'} played GENERAL MARKET.`);
        drawCards(opponent, 1);
        playGeneralMarket();
        setCurrentPlayer(playedBy);
        break;
    case 20: // WHOT
  if (playedBy === 'player') {
    setPendingWHOTCard(card);
    setShowShapeModal(true);
  } else {
    // Gemini chooses best shape
    const shapeCounts = geminiHand.reduce((acc, c) => {
      acc[c.shape] = (acc[c.shape] || 0) + 1;
      return acc;
    }, {});
    const bestShape = Object.keys(shapeCounts).reduce((a, b) =>
      shapeCounts[a] > shapeCounts[b] ? a : b,
      'Circle'
    );
   setChosenShape(best);
setMessage(`🤖 Gemini played WHOT and chose ${best}!`);

setTimeout(() => {
  setGameHistory(prev => [
    ...prev,
    {
      player: 'gemini',
      action: 'play',
      card,
      declaredShape: best, // ✅ will now be reliably captured
      handBeforeMove: geminiHand,
      handSizeAfterMove: newHand.length,
      nextPlayerHandSize: playerHand.length,
      playerHand,
      geminiHand: newHand
    }
  ]);

  switchTurn('player'); // ✅ delay ensures it waits until history logs properly
}, 100); // A short delay gives React time to stabilize

  }
  break;


      default:
        setChosenShape(null);
        switchTurn(opponent);
    }
  };

  const handlePickFromMarket = () => {
    if (currentPlayer !== 'player') return;
    drawCards('player', 1);
    playDrawCard();
    setMessage('You picked a card from the market.');
    switchTurn('gemini');
  };

  useEffect(() => {
    if (currentPlayer !== 'gemini' || geminiHand.length === 0) return;
    const timer = setTimeout(() => {
      let indexes = geminiHand.map((c, i) => isPlayable(c) ? i : -1).filter(i => i !== -1);
      if (indexes.length === 0) return drawCards('gemini', 1),playDrawCard(), switchTurn('player');

      let index = indexes[0];
      let card = geminiHand[index];

      if (geminiHand.length === 1 && isActionCard(card)) {
        indexes.shift();
        if (!indexes.length) return drawCards('gemini', 1), playDrawCard();
        index = indexes[0];
        card = geminiHand[index];
      }

      const newHand = geminiHand.filter((_, i) => i !== index);
      setGeminiHand(newHand);
      playCard();      


      setPlayedPile(prev => [...prev, { ...card, animation: 'slide-to-pile' }]);

      setTimeout(() => {
        setPlayedPile(prev => {
          const last = { ...prev.at(-1) };
          delete last.animation;
          return [...prev.slice(0, -1), last];
        });
      }, 1000);

      if (newHand.length === 0) {
  setDidPlayerWin(false);
  return setGameOver(true);
}


     if (card.number === 20) {
  const count = {};
  newHand.forEach(c => count[c.shape] = (count[c.shape] || 0) + 1);
  const best = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
  setChosenShape(best);
setMessage(`🤖 Gemini played WHOT and chose ${best}!`);

setTimeout(() => {
  setGameHistory(prev => [
    ...prev,
    {
      player: 'gemini',
      action: 'play',
      card,
      declaredShape: best, // ✅ will now be reliably captured
      handBeforeMove: geminiHand,
      handSizeAfterMove: newHand.length,
      nextPlayerHandSize: playerHand.length,
      playerHand,
      geminiHand: newHand
    }
  ]);

  switchTurn('player'); // ✅ delay ensures it waits until history logs properly
}, 100); // A short delay gives React time to stabilize

} else {
  // Normal move history (non-WHOT Gemini card)
  setGameHistory(prev => [...prev, {
    player: 'gemini',
    action: 'play',
    card,
    handBeforeMove: geminiHand,
    handSizeAfterMove: newHand.length,
    nextPlayerHandSize: playerHand.length
  }]);
}


      applyCardEffect(card, 'gemini');
    }, 1200);
    return () => clearTimeout(timer);
  }, [currentPlayer, geminiHand, deck, isPlayable]);

  if (gameOver) {
  return (
    <CongratsPage
      didPlayerWin={didPlayerWin}
      onPlayAgain={() => {
        setGameOver(false);
        restartGame();
      }}
      gameHistory={gameHistory}
      initialTopCard={playedPile?.[0]}
    />
  );
}
  return (
    
    <>

    {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
{showSettings && (
  <SettingsModal
    onClose={() => setShowSettings(false)}
    onRestartGame={restartGame}
    onChangeColor={handleColorChange}
    onContactDev={`ok`}
  />
)}

    {showShapeModal && (
  <ShapeSelectorModal
    color={cardColor}  
    onSelect={(shape) => {
      setChosenShape(shape);
      setMessage(`You chose ${shape}`);
      setShowShapeModal(false);
      setPendingWHOTCard(null);

        setGameHistory(prev => {
         const last = prev.at(-1);
         if (last?.card?.number === 20) {
          return [
          ...prev.slice(0, -1),
            {
             ...last,
        declaredShape: shape
      }
    ];
  }
  return prev;
});


      switchTurn('gemini'); // auto proceed
    }}
  />
)}
{customAlert && (
  <div className="custom-alert">
    {customAlert}
  </div>
)}


      <Navbar
  onShowHelp={handleShowHelp}
  onShowSettings={handleShowSettings}
  isMuted={isMuted}
  toggleMute={toggleMute}
  message={message}
/>

      <div className="game-board">
        <h2>Naija Whot</h2>

        <div className="gemini-hand-container">
        <ScrollableHand id="gemini" color={cardColor}>
  {geminiHand.map((card, i) => (
    <CardBack
      key={i}
      animationClass={
        card.animation === 'slide-in'
          ? 'card-slide-in-hand'
          : card.animation === 'slide-to-pile'
          ? 'card-slide-to-pile'
          : ''
      }
      color={cardColor}
    />
  ))}
</ScrollableHand>
        </div>

        <h3>Gemini's Hand ({geminiHand.length} cards)</h3>

        <div className="forrow">
          <div className="played-pile">
            {playedPile.length > 0 && (
              <Card
                number={playedPile.at(-1).number}
                shape={playedPile.at(-1).shape}
                animationClass={playedPile.at(-1).animation === 'slide-to-pile' ? 'card-slide-to-pile' : ''}
                color={cardColor}
              />
            )}
            {chosenShape && currentPlayer === 'player' && (
  <p className="chosen-shape">Need: {chosenShape}</p>
                )}
               {reshufflingCards.length > 0 && (
  <div className="reshuffle-fly-container">
    {reshufflingCards.map((card, i) => (
      <Card
        key={i}
        number={card.number}
        shape={card.shape}
        animationClass={`card-fly-to-deck card-fly-${i + 1}`}
        color={cardColor}
      />
    ))}
  </div>
)}
          </div>

            <div
  className={`market-stack ${currentPlayer !== 'player' ? 'disabled' : ''}`}
  onClick={currentPlayer === 'player' ? handlePickFromMarket : undefined}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && currentPlayer === 'player') handlePickFromMarket();
  }}
>
  {[...Array(3)].map((_, index) => (
    <div
      key={index}
      className="market-card-layer"
      style={{ top: `${index * 4}px`, left: `${index * 4}px`, zIndex: index }}
    >
      <CardBack color={cardColor} />
    </div>
  ))}
  <span className="market-text">Card(s)<br />({deck.length})</span>
</div>


 
          
        </div>

        <div className="player-section">
          <ScrollableHand id="player" color={cardColor}>
  {playerHand.map((card, i) => (
    <Card
      key={i}
      number={card.number}
      shape={card.shape}
      onClick={() => handlePlayCard(i)}
      isPlayable={isPlayable(card)}
      animationClass={
        card.animation === 'slide-in'
          ? 'card-slide-in-hand'
          : card.animation === 'slide-to-pile'
          ? 'card-slide-to-pile'
          : ''
      }
      color={cardColor}
    />
  ))}
</ScrollableHand>
<button
  onClick={() => navigate('/analysis', {
    state: {
      gameHistory,
      initialTopCard: playedPile?.[0] // Pass the very first card on the pile
    }
  })}
  style={{ display: 'none' }}
  className="analyze-btn" 
>📊 Analyze Game</button>

          <h3>Your Hand ({playerHand.length} cards)</h3>
        </div>
      </div>
      <footer style={{ textAlign: 'right', marginTop: '20px', color: 'white', backgroundColor: '#2b612a', padding: '10px', fontSize: '14px' }}>
        <p> &copy; 2025 Naija Whot Web</p>
        <p>Developed by <a target='_blank' href="https://mywebsiteagd.42web.io/?i=3">&lt;AGD/&gt;</a></p>
        <p>Version 1.0.0</p>
      </footer>
    </>
  );
}
