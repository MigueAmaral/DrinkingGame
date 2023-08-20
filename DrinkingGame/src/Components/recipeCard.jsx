import {motion} from "framer-motion"
import { useState } from "react";
/* eslint-disable react/prop-types */

export default function RecipeCard({
  pic,
  name,
  glass,
  ingredients,
  measures,
  instructions,
  handleOpen,
  openCards
}) {


  const [openCard, setOpenCard] = useState()


  return (
    <motion.div layout transition={{layout: {duration: 0.3}}} onClick={()=>{handleOpen()}} initial={{opacity:0, y:-50}} animate={{opacity: 1, y:0}} className="recipeCard">
      <img src={pic} alt="" className={`recipeImg ${openCards? "": "closedCardImg"}`} />
      <div className="instructions">
        <h3 className={`recipeTitle ${openCards? "": "closedCardTitle"}`}>{name}</h3>
        {openCards && (
        <motion.div layout initial={{opacity:0}} animate={{opacity: 1}} transition={{delay: 0.2}}>
        <p className="instructionsDescription">{instructions}</p>
        <ul>
          {ingredients.map((i, index) => {
            let quantities = measures[index]
            if (i != null) {
            return (
              <li key={i}><b>{i}</b>: {quantities}</li>
            )
            }
          })}
        </ul>
        <p>{glass}</p>
        </motion.div>
        )}
      </div>
    </motion.div>
  );
}
