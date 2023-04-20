import R0 from "../assets/cards-front/0R.png"; 
import R1 from "../assets/cards-front/1R.png"; 
import R2 from "../assets/cards-front/2R.png"; 
import R3 from "../assets/cards-front/3R.png"; 
import R4 from "../assets/cards-front/4R.png"; 
import R5 from "../assets/cards-front/5R.png"; 
import R6 from "../assets/cards-front/6R.png"; 
import R7 from "../assets/cards-front/7R.png"; 
import R8 from "../assets/cards-front/8R.png"; 
import R9 from "../assets/cards-front/9R.png"; 
import skipR from "../assets/cards-front/skipR.png"; 
import _R from "../assets/cards-front/_R.png"; 
import D2R from  "../assets/cards-front/D2R.png"; 

import G0 from "../assets/cards-front/0G.png"; 
import G1 from "../assets/cards-front/1G.png"; 
import G2 from "../assets/cards-front/2G.png"; 
import G3 from "../assets/cards-front/3G.png"; 
import G4 from "../assets/cards-front/4G.png"; 
import G5 from "../assets/cards-front/5G.png"; 
import G6 from "../assets/cards-front/6G.png"; 
import G7 from "../assets/cards-front/7G.png"; 
import G8 from "../assets/cards-front/8G.png"; 
import G9 from "../assets/cards-front/9G.png"; 
import skipG from "../assets/cards-front/skipG.png"; 
import _G from "../assets/cards-front/_G.png"; 
import D2G from  "../assets/cards-front/D2G.png"; 

import B0 from "../assets/cards-front/0B.png"; 
import B1 from "../assets/cards-front/1B.png"; 
import B2 from "../assets/cards-front/2B.png"; 
import B3 from "../assets/cards-front/3B.png"; 
import B4 from "../assets/cards-front/4B.png"; 
import B5 from "../assets/cards-front/5B.png"; 
import B6 from "../assets/cards-front/6B.png"; 
import B7 from "../assets/cards-front/7B.png"; 
import B8 from "../assets/cards-front/8B.png"; 
import B9 from "../assets/cards-front/9B.png"; 
import skipB from "../assets/cards-front/skipB.png"; 
import _B from "../assets/cards-front/_B.png"; 
import D2B from  "../assets/cards-front/D2B.png"; 

import Y0 from "../assets/cards-front/0Y.png"; 
import Y1 from "../assets/cards-front/1Y.png"; 
import Y2 from "../assets/cards-front/2Y.png"; 
import Y3 from "../assets/cards-front/3Y.png"; 
import Y4 from "../assets/cards-front/4Y.png"; 
import Y5 from "../assets/cards-front/5Y.png"; 
import Y6 from "../assets/cards-front/6Y.png"; 
import Y7 from "../assets/cards-front/7Y.png"; 
import Y8 from "../assets/cards-front/8Y.png"; 
import Y9 from "../assets/cards-front/9Y.png"; 
import skipY from "../assets/cards-front/skipY.png"; 
import _Y from "../assets/cards-front/_Y.png"; 
import D2Y from  "../assets/cards-front/D2Y.png"; 

import W from "../assets/cards-front/W.png"; 
import D4W from "../assets/cards-front/D4W.png"; 

interface IImageCards {
  [key: string]: string;
  // other properties...
}

export const imagecards = {
  '0R': R0,
  '1R': R1,
  '2R': R2,
  '3R': R3,
  '4R': R4,
  '5R': R5,
  '6R': R6,
  '7R': R7,
  '8R': R8,
  '9R': R9,
  skipR,
  _R,
  D2R,
  '0G': G0,
  '1G': G1,
  '2G': G2,
  '3G': G3,
  '4G': G4,
  '5G': G5,
  '6G': G6,
  '7G': G7,
  '8G': G8,
  '9G': G9,
  skipG,
  _G,
  D2G,
  '0B': B0,
  '1B': B1,
  '2B': B2,
  '3B': B3,
  '4B': B4,
  '5B': B5,
  '6B': B6,
  '7B': B7,
  '8B': B8,
  '9B': B9,
  skipB,
  _B,
  D2B,
  '0Y': Y0,
  '1Y': Y1,
  '2Y': Y2,
  '3Y': Y3,
  '4Y': Y4,
  '5Y': Y5,
  '6Y': Y6,
  '7Y': Y7,
  '8Y': Y8,
  '9Y': Y9,
  skipY,
  _Y,
  D2Y,
  
  W,
  D4W
} as IImageCards;

type Card = {
  src: string;
  color?: string;
};
export const isValidPlay = (card: string, topCard: Card): { valid: boolean, effect?: string } => {
  const color = card[card.length - 1];
  const value = card.substring(0, card.length - 1);

  const topColor = topCard.color || topCard.src[topCard.src.length - 1];
  const topValue = topCard.src.substring(0, topCard.src.length - 1);
  

  if (card === 'D4W') {
    return { valid: true, effect: 'D4' };
  }

  if (color === 'W' || color === topColor || value === topValue) {
    if (['skipR', 'skipG', 'skipB', 'skipY'].includes(card)) {
      return { valid: true, effect: 'Skip' };
    }
    if (['_R', '_G', '_B', '_Y'].includes(card)) {
      return { valid: true, effect: 'Reverse' };
    }
    if (['D2R', 'D2G', 'D2B', 'D2Y', 'D4'].includes(card)) {
      return { valid: true, effect: 'D2' };
    }
    return { valid: true };
  }

  if (['D2R', 'D2G', 'D2B', 'D2Y'].includes(topCard.src)) {
    if (value === 'D2') {
      return { valid: true, effect: 'D2' };
    } 
    else if (color === "G") {
      return { valid: true }
    }
    else {
      return { valid: false };
    }
  }

  if (['skipR', 'skipG', 'skipB', 'skipY'].includes(topCard.src)) {
    if (card === `skip${color}`) {
      return { valid: true, effect: 'skip' };
    } else {
      return { valid: false };
    }
  }

  if (topCard.src === `_${topColor}`) {
    if (card === `_${color}`) {
      return { valid: true, effect: 'reverse' };
    } else {
      return { valid: false };
    }
  }


  return { valid: false };
};
