/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import "src/Components/recipeCardFull.css";

export default function RecipeCardFull({
  name,
  pic,
  glass,
  ingredients,
  measures,
  instructions,
  setCompleteRecipe,
}) {
  function handleClick() {
    setCompleteRecipe(name);
  }

  return (
    <motion.div className="recipeCardFull" onClick={() => handleClick()}>
        <div className="headerFull">
      <img src={pic} alt="" className="recipeImgFull" />
      <h3 className="recipeTitleFull">{name}</h3>
      </div>
      <div className="instructionsFull">
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="instructionsDescriptionFull">{instructions}</p>
          <div className="instructionsExtraFull">
            <div>
              <ul>
                {ingredients.map((i, index) => {
                  let quantities = measures[index];
                  if (i != null) {
                    return (
                      <li key={i}>
                        <p><b>{i}</b>: {quantities}</p>
                        <img key={{i}*Math.random()} src={`https://www.thecocktaildb.com/images/ingredients/${i}.png`} alt=""/>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <p>{glass}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
