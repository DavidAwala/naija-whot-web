import {useState} from 'react';
import ContactModal from './contactmodal.jsx';

const SettingsModal = ({ onClose, onRestartGame, onChangeColor, onContactDev }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Settings</h2>

        <div className="setting-section">
          <label>Card Color:</label>
          <div className="color-options">
            <button onClick={() => onChangeColor('green')} className="color-btn ori" />
            <button onClick={() => onChangeColor('#800020')} className="color-btn col" />
            <button onClick={() => onChangeColor('red')} className="color-btn red" />
            <button onClick={() => onChangeColor('#ffd700')} className="color-btn gold" />
            <button onClick={() => onChangeColor()} className="color-btn wa">Default</button>
          </div>
        </div>

        <div className="setting-section">
          <button onClick={() => {
  onRestartGame();
  onClose();
}}>Restart Game</button>

          <button className="settings-option" onClick={() => setIsContactModalOpen(true)}>
  📧 Contact Developer
</button>
{isContactModalOpen && (
  <ContactModal onClose={() => setIsContactModalOpen(false)} />
)}

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
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: #fefefe;
  border-radius: 15px;
  padding: 30px 25px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #444;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.2);
  color: #c0392b;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.6rem;
  color: #222;
}

.setting-section {
  margin-top: 20px;
  text-align: left;
}

.setting-section label {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  color: #333;
}

.color-options {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.color-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border 0.2s;
}

.color-btn:hover {
  transform: scale(1.1);
  border: 2px solid #444;
}

/* Example custom colors */
.color-btn.ori {
  background-color: green;
}

.color-btn.col {
  background-color: #800020;
}

.color-btn.red {
  background-color: red;
}

.color-btn.gold {
  background-color: #ffd700;
}

.setting-section button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  font-weight: bold;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.setting-section button:hover {
  background-color: #34495e;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

        `}
    </style>
  </div>
);
}
export default SettingsModal;
