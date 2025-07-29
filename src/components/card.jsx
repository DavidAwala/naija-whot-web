import React from 'react';

const ShapeIcon = ({ shape, number, color }) => {
    const mainColor = color || "#004d2c"; 

    switch (shape) {
        case 'Circle':
            return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill={mainColor} /></svg>;
        case 'Triangle':
            return <svg viewBox="0 0 100 100"><polygon points="50,5 95,95 5,95" fill={mainColor} /></svg>;
        case 'Cross':
            return <svg viewBox="0 0 100 100"><polygon points="30,5 70,5 70,30 95,30 95,70 70,70 70,95 30,95 30,70 5,70 5,30 30,30" fill={mainColor} /></svg>;
        case 'Square':
            return <svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill={mainColor} /></svg>;
        case 'Star':
       
            return (
                <svg viewBox="0 0 100 100">
                    <polygon points="50,5 61,40 98,40 68,62 79,96 50,75 21,96 32,62 2,40 39,40" fill={mainColor} />
                    <text x="50" y="60" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                        {number * 2}
                    </text>
                </svg>
            );
        default:
            return null;
    }
};


// --- The Main Card Component ---
export default function Card({ number, shape, onClick, isPlayable, animationClass = '', color }) {
    const isWhotCard = shape === 'WHOT';

    const dynamicColorStyle = {
        color: color || '#004d2c'
    };

    return (
        <>
            <style>{`
                /* Main card container */
                .card {
                  width: 100px;
                  height: 150px;
                  background-color: #800020.;
                  border: 1px solid #ccc;
                  border-radius: 12px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                  position: relative; /* Crucial for positioning the corners */
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                  font-family: 'Arial Black', Gadget, sans-serif;
                }

                .card:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }

                /* Highlight for playable cards from your GameBoard logic */
                .card.playable {
                  border: 3px solid #ffd700; /* A gold border to show it's playable */
                  box-shadow: 0 0 15px #ffd700;
                }


                /* Corner elements styling */

                .card-corner {
                  position: absolute;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  font-size: 18px;
                  font-weight: bold;
                }
                .corner{
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 20px;
                    font-weight: bold;
                }
                 .wbr{
                    top: 25px;
                    left: 12px;
                 }
                 .wbl{
                    bottom: 21px;
                    right: 12px;
                    transform: rotate(180deg); /* Flips it upside down */
                 }
                .card-corner.top-left {
                  top: 5px;
                  left: 8px;
                }

                .card-corner.bottom-right {
                  bottom: -2px;
                  right: 8px;
                  transform: rotate(180deg); /* Flips it upside down */
                }

                .corner-shape {
                  width: 15px;
                  height: 15px;
                }

                /* Main content in the center of the card */
                .card-main-content {
                  width: 60%;
                  height: 60%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                /* Styling for the text on the "WHOT?" card */
                /* The color is now applied via inline style for dynamic changes */
                .whot-text {
                  font-family: 'Brush Script MT', 'cursive';
                  font-size: 37px;
                  font-weight: bold;
                  text-align: center;
                  line-height: 1;
                }
                
                /* The color is now applied via inline style for dynamic changes */
                .corner-number {
                    /* The static color rule is removed from here */
                }

                .upside-down {
                  margin-bottom: 0px; 
                  transform: rotate(180deg);
                  display: inline-block; /* necessary for transform to work correctly */
                }
                
                @media (max-width: 768px) {
                  .whot-text {
                    font-size: 30px; /* Adjusted for smaller screens */
                    font-weight: bolder; /* Ensures the text is bold */
                    line-height: 0.8; /* Adjusted for better readability */
                  }
                }
            `}</style>
              <div 
                  className={`card ${isPlayable ? 'playable' : ''} ${animationClass}` }
                  onClick={onClick}
                  style={{ position: animationClass.includes('card-fly') ? 'absolute' : 'relative' }}
              >

                  {/* Top-left corner */}
                  <div className="card-corner top-left">
                      {/* The dynamic color style is applied here */}
                      <span className="corner-number" style={dynamicColorStyle}>{number}</span>
                      {/* The color prop is passed down to the ShapeIcon */}
                      {!isWhotCard && <div className="corner-shape"><ShapeIcon shape={shape} number={number} color={color} /></div>}
                  </div>

                  {/* Main content of the card */}
                  <div className="card-main-content">
                      {isWhotCard ? (
                          // The dynamic color style is applied to the WHOT text container
                          <div className="whot-text" style={dynamicColorStyle}>
                            <span className='corner wbl'>W</span> <span className='upside-down'>Whot</span> Whot <span className='corner wbr'>W</span>
                          </div>
                      ) : (
                          // The color prop is passed down to the main ShapeIcon
                          <ShapeIcon shape={shape} number={number} color={color} />
                      )}
                  </div>

                  {/* Bottom-right corner (rotated) */}
                  <div className="card-corner bottom-right">
                       {/* The dynamic color style is applied here */}
                      <span className="corner-number" style={dynamicColorStyle}>{number}</span>
                       {/* The color prop is passed down to the ShapeIcon */}
                      {!isWhotCard && <div className="corner-shape"><ShapeIcon shape={shape} number={number} color={color} /></div>}
                  </div>
              </div>
        </>
    );
}
