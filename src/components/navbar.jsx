import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle,
  faGear,
  faVolumeMute,
  faVolumeUp,
  faTimes,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import SettingsModal from './settingmodal';

const Navbar = ({
  onShowHelp,
  onShowSettings,
  isMuted,
  toggleMute,
  message,
  onRestart,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const handleSettingsClick = () => {
    toggleMobileMenu(); // close mobile menu on open
    onShowSettings();
  };

  return (
    <>
      <nav className="game-navbar">
        {/* Hamburger for mobile */}
        <button className="hamburger" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
        </button>

        {/* Game message center */}
        <div className="game-navbar-message">{message}</div>

        {/* Nav items: responsive class toggle */}
        <div className={`navbar-items ${showMobileMenu ? 'active' : ''}`}>
          <button onClick={() => { toggleMobileMenu(); onShowHelp(); }} title="How to Play">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>

          <button onClick={handleSettingsClick} title="Settings">
            <FontAwesomeIcon icon={faGear} />
          </button>

          <button onClick={() => { toggleMobileMenu(); toggleMute(); }} title="Sound">
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </button>
        </div>
      </nav>

    

    <style>
      {`
  .game-navbar {
    position: sticky;
  width: 100%;
  top: 0px;
  left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  backdrop-filter: blur(2px);
  height: 100%; /* Or set a % height based on the game screen */
}

.game-navbar-message {
  font-size: 20px;
  text-align: center;
  background: #fff;
  margin-left: 300px;
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}


.game-navbar button {
  background: #fff;
  border: none;
  padding: 10px;
  margin: 0 5px;
  font-size: 22px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.game-navbar button:hover {
  transform: scale(1.2);
  background: #f0f0f0;
}
  .hamburger {
  display: none;
  background: none;
  border: none;
  color: black;
  font-size: 20px;
}
  /* Mobile Styles */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
  .game-navbar {
  gap: 0px;
  left: 0;
  align-items: center;
  padding: 5px;
  }
  .navbar-items {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: #2a2a2a;
    padding: 10px 0;
    display: none;
    gap: 10px;
    align-items: center;
    z-index: 999;
  }

  .navbar-items.active {
    display: flex;
  }

  .game-navbar-message {
    font-size: 17px;
    margin-left: 0;
  }
}

      `}
    </style>


    </>
  );
};

export default Navbar;
