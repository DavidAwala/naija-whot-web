
import React,{useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import useGameSounds from "../hooks/useGameSounds.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function CongratsPage({ didPlayerWin, onPlayAgain, gameHistory, initialTopCard, isMuted}) {
  const navigate = useNavigate();
   const {
      playCongrats,
      stopBackground,
    } = useGameSounds(isMuted);
    
    useEffect(() => {
      playCongrats();
      return stopBackground;
    }, [isMuted]);



  const handleAnalysis = () => {
    navigate('/analysis', {
      state: { gameHistory, initialTopCard }
    });
  };

  return (
    <>
    <style>
            {`
            /* congrats.css */
            body{
                background: rgba(0, 0, 0, 0.69);
                display: flex;
                justify-content: center;
                align-items: center;
            }
.congrats-container {
 display: flex;
 justify-content: center;
 align-items: center;
}

.congrats-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  z-index: 10;
  transition: transform 3s ease;
}

.congrats-card h1 {
  font-size: 2rem;
  color: #2e7d32;
  margin-bottom: 15px;
}

.congrats-card p {
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.congrats-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.congrats-buttons button {
  padding: 1px 10px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color:rgb(33, 243, 33);
  color: white;
  transition: transform 0.2s;
  z-index: 10;
}

.congrats-buttons button:hover {
  transform: scale(1.05);
  background-color:rgb(51, 153, 48);
}
  h5{
  font-size: 1.2rem;
  padding: 0px;
  margin: 15px;
  }
 @media (max-width: 768px) {
 h5{
 font-size: 1.5rem;
 padding: 0px;
 }
 .congrats-buttons{
 display: flex;
 flex-direction: column;
 }
 .congrats-buttons button{
    color: black;

 }
 }

/* Confetti (basic) */
.confetti {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
}
.confetti-piece {
    position: absolute;
    width: 10px;
    height: 30px;
    background: #ffd300;
    top: 0;
    opacity: 0;
}
.confetti-piece:nth-child(1) {
    left: 7%;
    -webkit-transform: rotate(-40deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 182ms;
    -webkit-animation-duration: 1116ms;
}
.confetti-piece:nth-child(2) {
    left: 14%;
    -webkit-transform: rotate(4deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 161ms;
    -webkit-animation-duration: 1076ms;
}
.confetti-piece:nth-child(3) {
    left: 21%;
    -webkit-transform: rotate(-51deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 481ms;
    -webkit-animation-duration: 1103ms;
}
.confetti-piece:nth-child(4) {
    left: 28%;
    -webkit-transform: rotate(61deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 334ms;
    -webkit-animation-duration: 708ms;
}
.confetti-piece:nth-child(5) {
    left: 35%;
    -webkit-transform: rotate(-52deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 302ms;
    -webkit-animation-duration: 776ms;
}
.confetti-piece:nth-child(6) {
    left: 42%;
    -webkit-transform: rotate(38deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 180ms;
    -webkit-animation-duration: 1168ms;
}
.confetti-piece:nth-child(7) {
    left: 49%;
    -webkit-transform: rotate(11deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 395ms;
    -webkit-animation-duration: 1200ms;
}
.confetti-piece:nth-child(8) {
    left: 56%;
    -webkit-transform: rotate(49deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 14ms;
    -webkit-animation-duration: 887ms;
}
.confetti-piece:nth-child(9) {
    left: 63%;
    -webkit-transform: rotate(-72deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 149ms;
    -webkit-animation-duration: 805ms;
}
.confetti-piece:nth-child(10) {
    left: 70%;
    -webkit-transform: rotate(10deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 351ms;
    -webkit-animation-duration: 1059ms;
}
.confetti-piece:nth-child(11) {
    left: 77%;
    -webkit-transform: rotate(4deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 307ms;
    -webkit-animation-duration: 1132ms;
}
.confetti-piece:nth-child(12) {
    left: 84%;
    -webkit-transform: rotate(42deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 464ms;
    -webkit-animation-duration: 776ms;
}
.confetti-piece:nth-child(13) {
    left: 91%;
    -webkit-transform: rotate(-72deg);
    -webkit-animation: makeItRain 1000ms infinite ease-out;
    -webkit-animation-delay: 429ms;
    -webkit-animation-duration: 818ms;
}
.confetti-piece:nth-child(odd) {
    background: #7431e8;
}
.confetti-piece:nth-child(even) {
    z-index: 1;
}
.confetti-piece:nth-child(4n) {
    width: 5px;
    height: 12px;
    -webkit-animation-duration: 2000ms;
}
.confetti-piece:nth-child(3n) {
    width: 3px;
    height: 10px;
    -webkit-animation-duration: 2500ms;
    -webkit-animation-delay: 1000ms;
}
.confetti-piece:nth-child(4n-7) {
  background: red;
}
@-webkit-keyframes makeItRain {
    from {opacity: 0;}
    50% {opacity: 1;}
    to {-webkit-transform: translateY(350px);}
}

            `}

    </style>
    <div className="congrats-container">
       <div class="confetti">
        <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
</div>
 <div class="confetti">
        <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
</div>
      

      <div className="congrats-card">
        
        <h1>{didPlayerWin ? '🎉 Congratulations, You Win!' : '🤖 Gemini Wins!'}</h1>
        <p>{didPlayerWin ? 'Well played! Good game' : 'Nice try 😅!'}</p>

        <div className="congrats-buttons">
          <button onClick={onPlayAgain}> <h5> Play Again <FontAwesomeIcon icon={faArrowRotateRight} /> </h5></button>
          <button onClick={handleAnalysis}> <h5> View Analysis <FontAwesomeIcon icon={faMagnifyingGlass} /> </h5></button>
        </div>
      </div>
    </div>
    </>
  );
}
