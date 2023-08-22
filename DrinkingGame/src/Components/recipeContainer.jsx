/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import RecipeCard from "./recipeCard";
import { motion } from "framer-motion";

export default function RecipeContainer({ drinks, match, handleOpen, openCards, saveDrinks}) {
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    if (drinks) {
      let matchDrinks = drinks.filter((i) =>
        match.includes(parseInt(i[0].idDrink))
      );
      let newMap = new Map();
      matchDrinks.forEach((item) => newMap.set(item[0].idDrink, item));
      let matchSorted = [...[...newMap.values()]];
      let matchDrinksSorted = matchSorted.sort((a, b) => {
        const indexA = match.findIndex(
          (type) => parseInt(a[0].idDrink) === type
        );
        const indexB = match.findIndex(
          (type) => parseInt(b[0].idDrink) === type
        );
        return indexA - indexB;
      });
      setFilteredDrinks(matchSorted.reverse());
    }
  }, [match]);

  return (
    <div className="recipesContainer">
      {filteredDrinks.map((i, index) => {
        let drinkID = i[0].idDrink;
        let drink = `${i[0].idDrink}${index}`;
        let name = i[0].strDrink;
        let pic = i[0].strDrinkThumb;
        let glass = i[0].strGlass;
        let ingredients = Object.keys(i[0])
          .filter((v) => v.startsWith("strIngredient"))
          .map((e) => i[0][e]);
        let measures = Object.keys(i[0])
          .filter((v) => v.startsWith("strMeasure"))
          .map((e) => i[0][e]);
        let instructions = i[0].strInstructions;
        return (
          <RecipeCard
            saved = {saveDrinks}
            handleOpen={handleOpen}
            openCards = {openCards}
            key={drink}
            name={name}
            pic={pic}
            glass={glass}
            ingredients={ingredients}
            measures={measures}
            instructions={instructions}
          />
        );
      })}
    </div>
  );
}
