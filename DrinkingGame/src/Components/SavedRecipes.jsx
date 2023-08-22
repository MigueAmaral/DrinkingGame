/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function SavedRecipe({
  name,
  pic,
  glass,
  ingredients,
  measures,
  instructions,
  setCompleteRecipe,
}){

  function handleClick() {
    setCompleteRecipe(name)
  }

  return (
    <motion.div className="recipeCardSaved" onClick={() =>handleClick()}>
      <img src={pic} alt="" className="recipeImg" />
      <div className="instructions">
        <h3 className="recipeTitle">{name}</h3>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="instructionsExtra">
            <div>
              <ul>
                {ingredients.map((i, index) => {
                  let quantities = measures[index];
                  if (i != null) {
                    return (
                      <li key={i}>
                        <b>{i}</b>: {quantities}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
