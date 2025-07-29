/**
 * Naija Whot Game Analysis Bot
 * 
 * Analyzes the history of moves in a Naija Whot game and highlights:
 * ✅ Good moves
 * ❌ Mistakes
 * 🧠 Strategic plays
 * 💡 Suggestions
 * 🃏 Draws
 * 🔔 Last card alerts
 * 📦 Market tracking
 * 🧩 Best move analysis
 */

const SHAPES = ['Circle', 'Triangle', 'Square', 'Cross', 'Star'];
const WHOT_CARD = 20;

const ACTION_CARDS = {
  HOLD_MARKET: 1,
  PICK_TWO: 2,
  PICK_THREE: 5,
  SUSPENSION: 8,
  GENERAL_MARKET: 14,
};

const ACTION_CARD_NAMES = {
  1: 'Hold Market',
  2: 'Pick Two',
  5: 'Pick Three',
  8: 'Suspension',
  14: 'General Market',
};

function isActionCard(card) {
  return card && Object.values(ACTION_CARDS).includes(card.number);
}

function countShapeInHand(hand, shape) {
  if (!Array.isArray(hand) || !shape) return 0;
  return hand.filter(card => card?.shape === shape).length;
}

function cardLabel(card) {
  if (!card) return '[Invalid Card]';
  return card.number === WHOT_CARD ? 'WHOT' : `${card.number} of ${card.shape}`;
}

function cardKey(card) {
  return card.number === WHOT_CARD ? `WHOT` : `${card.number}_${card.shape}`;
}

function getBestActionPlay(cards, topCard, requiredShape, opponentHandSize) {
  let best = null;

  for (let card of cards) {
    if (!card || typeof card.number !== 'number') continue;
    const isPlayable = card.number === topCard?.number || card.shape === topCard?.shape || card.number === WHOT_CARD || (requiredShape && card.shape === requiredShape);
    if (!isPlayable) continue;

    if (isActionCard(card)) {
      if (card.number === 14) return card;
      if ((card.number === 2 || card.number === 1) && opponentHandSize <= 2) return card;
      if (!best) best = card;
    }
  }
  return best;
}

export function analyzeGameHistory(gameHistory, initialTopCard = null) {
  if (!Array.isArray(gameHistory) || gameHistory.length === 0) {
    return {
      summary: 'No game history provided to analyze.',
      goodMoves: [],
      drawMoves: [],
      mistakes: [],
      suggestions: [],
      strategicPlays: [],
      lastCardAlerts: [],
      marketStats: {}
    };
  }

  const result = {
    summary: '',
    goodMoves: [],
    drawMoves: [],
    mistakes: [],
    strategicPlays: [],
    suggestions: [],
    lastCardAlerts: [],
    marketStats: {
      drawnCards: {},
      knownMarket: [],
      playerDrawn: 0,
      geminiDrawn: 0
    }
  };

  const suggest = msg => {
    if (!result.suggestions.includes(msg)) {
      result.suggestions.push(msg);
    }
  };

  let topCard = initialTopCard || null;
  let requiredShape = null;
  let knownCards = new Set();

  gameHistory.forEach((entry, i) => {
    const moveNum = `Move ${i + 1}`;
    const actor = entry.player || entry.actor || 'Unknown';

    const {
      card,
      handBeforeMove = [],
      handSizeAfterMove,
      declaredShape,
      nextPlayerHandSize,
      playerHand = [],
      geminiHand = [],
      amount = 1
    } = entry;

    if (entry.action === 'draw') {
      result.drawMoves.push(`${moveNum} (${actor}): Drew ${amount} card(s). 🃏`);
      if (actor === 'player') result.marketStats.playerDrawn += amount;
      else result.marketStats.geminiDrawn += amount;
      return;
    }

    if (!card || typeof card.number !== 'number' || !card.shape) {
      result.mistakes.push(`${moveNum} (${actor}): Invalid or missing card data. ❌`);
      suggest(`Check move ${i + 1} — card data is incomplete or missing.`);
      return;
    }

    const label = cardLabel(card);
    const key = cardKey(card);
    const handUsed = actor === 'player' ? playerHand || handBeforeMove : geminiHand || handBeforeMove;

    knownCards.add(key);

    // Smart move analysis: best move missed
    const bestPlay = getBestActionPlay(handUsed, topCard, requiredShape, nextPlayerHandSize);
    if (bestPlay && bestPlay.number !== card.number) {
      suggest(`${moveNum} (${actor}): Played ${label}, but ${cardLabel(bestPlay)} would have been a stronger move.`);
    }

    if (card.number === WHOT_CARD) {
      if (!declaredShape) {
        result.mistakes.push(`${moveNum} (${actor}): Played WHOT but did not declare a shape. ❌`);
        suggest(`Always declare a shape when playing WHOT.`);
      } else {
        const remaining = countShapeInHand(handUsed, declaredShape);
        if (remaining > 1) {
          result.strategicPlays.push(`${moveNum} (${actor}): Smart WHOT play! Declared '${declaredShape}' with ${remaining - 1} more in hand. 🧠`);
        } else {
          result.goodMoves.push(`${moveNum} (${actor}): Played WHOT and declared '${declaredShape}'. ✅`);
          suggest(`Try to declare a shape you have more of.`);
        }
      }

      topCard = card;
      requiredShape = declaredShape;
      return;
    }

    if (i === 0) {
      result.goodMoves.push(`${moveNum} (${actor}): Started game with ${label}. ✅`);
    } else {
      const isNumberMatch = card.number === topCard?.number;
      const isShapeMatch = card.shape === topCard?.shape;

      if (requiredShape && card.shape !== requiredShape) {
        result.mistakes.push(`${moveNum} (${actor}): Played ${label} but required shape was '${requiredShape}'. ❌`);
      } else if (!requiredShape && !isNumberMatch && !isShapeMatch) {
        result.mistakes.push(`${moveNum} (${actor}): Invalid play. ${label} does not match ${topCard?.number} or ${topCard?.shape}. ❌`);
      } else {
        result.goodMoves.push(`${moveNum} (${actor}): Played ${label}. ✅`);
      }
    }

    if (isActionCard(card) && handSizeAfterMove === 0) {
      result.mistakes.push(`${moveNum} (${actor}): Ended game with an action card (${ACTION_CARD_NAMES[card.number]}). ❌`);
      suggest(`Game must be ended with a non-action card.`);
    }

    if (isActionCard(card)) {
      if ((card.number === 2 || card.number === 1) && nextPlayerHandSize <= 2) {
        result.strategicPlays.push(`${moveNum} (${actor}): Used ${ACTION_CARD_NAMES[card.number]} when opponent had ${nextPlayerHandSize} card(s). 🎯`);
      }
      if (card.number === 14 && handSizeAfterMove > 1) {
        result.strategicPlays.push(`${moveNum} (${actor}): Great General Market timing — opponent likely disrupted. 🔥`);
      }
    }

    if (handSizeAfterMove === 1) {
      result.lastCardAlerts.push(`${moveNum} (${actor}): Now on LAST CARD! 👀`);
    } else if (handSizeAfterMove === 0 && !isActionCard(card)) {
      result.goodMoves.push(`${moveNum} (${actor}): Won the game with ${label}! 🎉`);
    }

    topCard = card;
    requiredShape = null;
  });

  result.marketStats.knownMarket = Array.from(knownCards);
  result.summary = `✅ ${result.goodMoves.length} good moves | ❌ ${result.mistakes.length} mistakes | 🧠 ${result.strategicPlays.length} smart plays | 🃏 ${result.drawMoves.length} draw(s)`;

  return result;
}
