/* eslint-disable react/prop-types */
import Cards from "./cards";
import { useState, useEffect } from "react";
import RecipeContainer from "./recipeContainer";
import { motion, AnimatePresence } from "framer-motion";

export default function CardContainer({ drinks }) {
  const [firstChoice, setFirstChoice] = useState();
  const [secondChoice, setSecondChoice] = useState();
  const [match, setMatch] = useState([]);
  const [count, setCount] = useState(0);
  const [openCards, setOpenCards] = useState(true);

  function handleChoice(id) {
    firstChoice ? setSecondChoice(parseInt(id)) : setFirstChoice(parseInt(id));
  }

  function handleOpen() {
    setOpenCards(!openCards);
  }

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice === secondChoice) {
        setMatch((prev) => [...prev, firstChoice]);
        setFirstChoice(null);
        setSecondChoice(null);
        setCount(count + 1);
      } else {
        setFirstChoice(null);
        setSecondChoice(null);
        setCount(count + 1);
      }
    }
  }, [firstChoice, secondChoice, match]);

  return (
    <div className="holder">
      <div className="mainContainer">
        {count > 0 && <div className="count">{count}</div>}
        {drinks.map((i, index) => {
          let drinkID = i[0].idDrink;
          let drink = `${i[0].idDrink}${index}`;
          let name = i[0].strDrink;
          let pic = i[0].strDrinkThumb;
          return (
            <Cards
              handleChoice={handleChoice}
              key={drink}
              id={drinkID}
              name={name}
              pic={pic}
              match={match}
              firstChoice={firstChoice}
              secondChoice={secondChoice}
            />
          );
        })}
      </div>
      <RecipeContainer
        handleOpen={handleOpen}
        openCards={openCards}
        match={match}
        drinks={drinks}
      />
    </div>
  );
}
