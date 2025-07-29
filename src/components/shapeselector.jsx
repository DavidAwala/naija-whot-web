import {React} from 'react'
import './shapeselector.css';

const ShapeSelectorModal = ({ onSelect,color }) => {
  const shapes = ['Circle', 'Square', 'Triangle', 'Cross', 'Star'];
  const mainColor = color || '#004d2c';

  const ShapeIcon = ({ shape}) => {
    switch (shape) {
      case 'Circle':
        return <svg viewBox="0 0 100 100" width="50" height="50"><circle cx="50" cy="50" r="45" fill={mainColor} /></svg>;
      case 'Triangle':
        return <svg viewBox="0 0 100 100" width="50" height="50"><polygon points="50,5 95,95 5,95" fill={mainColor} /></svg>;
      case 'Cross':
        return <svg viewBox="0 0 100 100" width="50" height="50">
          <polygon points="30,5 70,5 70,30 95,30 95,70 70,70 70,95 30,95 30,70 5,70 5,30 30,30" fill={mainColor} />
        </svg>;
      case 'Square':
        return <svg viewBox="0 0 100 100" width="50" height="50"><rect x="10" y="10" width="80" height="80" fill={mainColor} /></svg>;
      case 'Star':
        return (
          <svg viewBox="0 0 100 100" width="50" height="50">
            <polygon points="50,5 61,40 98,40 68,62 79,96 50,75 21,96 32,62 2,40 39,40" fill={mainColor} />
            <text x="50" y="60" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
             
            </text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>🎯 Choose a Shape</h3>
        <div className="shape-grid">
          {shapes.map((shape) => (
            <div
              key={shape}
              className="shape-card"
              onClick={() => onSelect(shape)}
              title={`Choose ${shape}`}
              style={{borderColor: color}}
            >
              <ShapeIcon shape={shape} number={5} />
              <p className="shape-label" style={{color: color || '#004d2c'}}>{shape}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShapeSelectorModal;