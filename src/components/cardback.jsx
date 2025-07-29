import React from 'react';

import './playani.css'; 

export default function CardBack({ animationClass = '', color }) {
  // Define default colors 
  const defaultColor1 = '#004d2c';
  const defaultColor2 = '#0a7c48';

  // Use the provided color for the main shade, or the default.
  // The second shade of the gradient will be the lighter default to maintain the pattern.
  const primaryColor = color || defaultColor1;

  // Create dynamic inline styles for the card back
  const cardBackStyle = {
    background: `repeating-linear-gradient(135deg, ${primaryColor} 0 8px, ${defaultColor2} 8px 16px)`,
    borderColor: primaryColor,
  };
  if(color==='#800020'){
    cardBackStyle.background = primaryColor;
     cardBackStyle.borderColor= defaultColor2;
  }
  return (
    <>
      <style>
        {`
          /* Base styles for the card back, assuming .cardb is similar to .card */
          .cardb {
            width: 100px;
            height: 150px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 1px solid; /* Border color will be set by inline style */
          }

          .back {
            /* background and border-color are now handled by inline styles */
            color: white; /* --nigeria-white is assumed to be white */
            font-size: 2rem;
            user-select: none;
          }
          
          .whot-tex {
            font-family: 'Brush Script MT', 'cursive';
            font-size: 30px;
            font-weight: bold;
            color: rgb(255, 255, 255);
            text-align: center;
            line-height: 1;
          }
          
          .upside-down {
            transform: rotate(180deg);
            display: inline-block; /* necessary for transform to work correctly */
          }

          @media (max-width: 768px) {
            .cardb {
              width: calc(100px * 0.8);
              height: calc(150px * 0.8);
            }
            .whot-tex {
              font-weight: bolder;
              font-size: 25px;
            }
          }
        `}
      </style>

      <span 
        className={`cardb card back ${animationClass}`} 
        style={cardBackStyle} 
      >
        <p className="whot-tex">
          <span className="upside-down">Whot</span><br /> Whot
        </p>
      </span>
    </>
  );
}
