import React from 'react';

const HelpModal = ({ onClose }) => (
    <>
 <div className="modal-overlay">
  <div className="modal-content help-modal">
    <button className="close-btn" onClick={onClose}>X</button>
    <h2>🎴 How to Play Naija Whot</h2>

    <div className="help-body">
      <p>
        <strong>Naija Whot</strong> is a fun, fast-paced Nigerian card game where your goal is to be the first to play all your cards.
      </p>

      <h4>🔢 Basic Rules</h4>
      <ul>
        <li>Match cards by number or shape.</li>
        <li>If you don't have card to play, draw from the market.</li>
        <li>you can't win with action cards.</li>
        <li>First to finish their cards wins!</li>
      </ul>

      <h4>🃏 Special Action Cards</h4>
      <ul>
        <li><strong>1 – Hold On:</strong> Play again.</li>
        <li><strong>2 – Pick Two:</strong> Next player draws 2.</li>
        <li><strong>5 – Pick Three:</strong> Next player draws 3.</li>
        <li><strong>8 – Suspension:</strong> Next player skips turn.</li>
        <li><strong>14 – General Market:</strong> Everyone draws 1 card.</li>
        <li><strong>20 – WHOT:</strong> Wild card. Choose a shape.</li>
      </ul>

      <h4>⭐ Tip</h4>
      <p>🔴 the <strong>WHOT Cards</strong> helps the most when cards are less than 3!</p>
      <p>🔴 the <strong>Action Cards</strong> are best played followed by it!</p>

      <h4>🎮 Game Modes</h4>
      <ul>
        <li><strong>Quick Game:</strong> 1v1 fast play.</li>
        <li><strong>Tournament:</strong> Play rounds, lowest points wins. <small><b>coming soon</b></small></li>
        <li><strong>Multiplayer:</strong> Play with family & friends offline or online. <small><b>coming soon</b></small></li>
      </ul>

      <p>Think fast, play smart — and don’t get caught with many cards!</p>
      <a target='_blank' href="https://www.youtube.com/watch?v=JmX6pMiPi4w&t=44">learn how to play</a>
    </div>

    <button className="modal-play-btn" onClick={onClose}>Play</button>
  </div>
      </div>

    <style>
        {`
            .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content.help-modal {
  background: #fff;
  color: #222;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 85vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.help-body {
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 8px;
  margin-bottom: 1rem;
}

.modal-content h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.modal-content ul {
  margin: 0.5rem 0 1rem 1.2rem;
  padding-left: 0.5rem;
}

.modal-content li {
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
}

.modal-content h4 {
  margin-top: 1rem;
  font-size: 1.05rem;
  color: #333;
}

.modal-play-btn {
  align-self: center;
  margin-top: 1rem;
  background-color: #009688;
  color: white;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.modal-play-btn:hover {
  background-color: #00796b;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
}
@media (max-width: 768px) {
  .modal-content.help-modal {
    background: rgba(255, 255, 255, 0.7);
  }
}

        `}
    </style>
</>
);

export default HelpModal;
