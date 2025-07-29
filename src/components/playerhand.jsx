import React from 'react';
import Card from './card';
import './playerhand.css';

export default function PlayerHand({ cards, onPlayCard, playableCardIds = [] }) {
 
  return (
    <div className="player-hand">
      {cards.map((card, index) => {
        const isPlayable = playableCardIds.includes(index);

        return (
          <Card
  key={index}
  number={card.number}
  shape={card.shape}
  onClick={() => onPlayCard(index)}
  isPlayable={isPlayable}
  animationClass={
    card.animation === 'slide-in'
      ? 'card-slide-in-hand'
      : card.animation === 'slide-to-pile'
      ? 'card-slide-to-pile'
      : ''
  }
/>

        );
      })}
    </div>
  );
}
