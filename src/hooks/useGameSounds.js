// src/hooks/useGameSounds.js
import { useRef } from "react";

const useGameSounds = (isMuted = false) => {
  const sounds = useRef({
    error: new Audio(`${import.meta.env.BASE_URL}sounds/error-play.mp3`),
  cardPlay: new Audio(`${import.meta.env.BASE_URL}sounds/card-play.mp3`),
  background: new Audio(`${import.meta.env.BASE_URL}sounds/background-theme.mp3`),
  pickTwo: new Audio(`${import.meta.env.BASE_URL}sounds/pick-two.mp3`),
  pickThree: new Audio(`${import.meta.env.BASE_URL}sounds/pick-three.mp3`),
  generalMarket: new Audio(`${import.meta.env.BASE_URL}sounds/general-market.mp3`),
  youWin: new Audio(`${import.meta.env.BASE_URL}sounds/you-win.mp3`),
  congrats: new Audio(`${import.meta.env.BASE_URL}sounds/congrats.mp3`),
  reshuffle: new Audio(`${import.meta.env.BASE_URL}sounds/reshuffle.mp3`),
  drawCard: new Audio(`${import.meta.env.BASE_URL}sounds/draw-card.mp3`),
  holdOn: new Audio(`${import.meta.env.BASE_URL}sounds/hold-on.mp3`),
  suspension: new Audio(`${import.meta.env.BASE_URL}sounds/suspension.mp3`)
  });

  // Make background loop and adjust volume
  sounds.current.background.loop = true;
  sounds.current.background.volume = 0.3;

  const playSound = (name) => {
    if (!isMuted && sounds.current[name]) {
      sounds.current[name].currentTime = 0;
      sounds.current[name].play().catch(() => {});
    }
  };

  const stopBackground = () => {
    sounds.current.background.pause();
    sounds.current.background.currentTime = 0;
  };

  const startBackground = () => {
    if (!isMuted) {
      sounds.current.background.play().catch(() => {});
    }
  };

  return {
    playError: () => playSound("error"),
    playCard: () => playSound("cardPlay"),
    playPickTwo: () => playSound("pickTwo"),
    playPickThree: () => playSound("pickThree"),
    playGeneralMarket: () => playSound("generalMarket"),
    playYouWin: () => playSound("youWin"),
    playCongrats: () => playSound("congrats"),
    playReshuffle: () => playSound("reshuffle"),
    playDrawCard: () => playSound("drawCard"),
    playHoldOn: () => playSound("holdOn"),
    playSuspension: () => playSound("suspension"),
    startBackground,
    stopBackground,
  };
};

export default useGameSounds;
