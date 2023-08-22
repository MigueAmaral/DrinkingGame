import { useContext, useEffect, useState } from "react";
import RecipeCard from "./Components/recipeCard";
import { motion } from "framer-motion";
import SavedRecipe from "./Components/SavedRecipes";
import { useNavigate } from "react-router-dom";
import { auth, db } from "/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "src/recipes.css";
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import RecipeCardFull from "./Components/recipeCardFull";
import axios from "axios";
import { DrinksContext } from "./DrinksProvider";

export default function Recipes() {
  const [user, loading] = useAuthState(auth);
  const [completeRecipe, setCompleteRecipe] = useState();
  const navigate = useNavigate();

  const storedDrinks = useContext(DrinksContext)

  function recipeFull(name) {
    let recipe = storedDrinks.filter(
      (i) => i.data.savedDrinks[0].strDrink === name
    );
    setCompleteRecipe(recipe);
  }

  function getIngredients() {
    const url =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka";
    axios.get(url).then((data) => {
      console.log(data.data.ingredients);
    });
  }

  useEffect(() => {
    getIngredients();
  }, [completeRecipe]);

  return (
    <div className="main">
      <div className="header">
        <h1 className="title">BARTHOLOMEW</h1>
      </div>
      <div className="holder2">
        <div className="recipeContainer">
          {storedDrinks &&
            storedDrinks.map((i) => {
              let key = i.id;
              let id = i.data.savedDrinks[0].idDrink;
              let name = i.data.savedDrinks[0].strDrink;
              let pic = i.data.savedDrinks[0].strDrinkThumb;
              let glass = i.data.savedDrinks[0].strGlass;
              let ingredients = Object.keys(i.data.savedDrinks[0])
                .filter((v) => v.startsWith("strIngredient"))
                .sort((a, b) => {
                  return a.localeCompare(b, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                })
                .map((e) => i.data.savedDrinks[0][e]);
              let measures = Object.keys(i.data.savedDrinks[0])
                .filter((v) => v.startsWith("strMeasure"))
                .sort((a, b) => {
                  return a.localeCompare(b, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                })
                .map((e) => i.data.savedDrinks[0][e]);
              let instructions = i.data.savedDrinks[0].strInstructions;
              return (
                <SavedRecipe
                  setCompleteRecipe={recipeFull}
                  key={key}
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
        <div className="recipeContent">
          <div className="user">
            <img src={user.photoURL} alt="" />
            <h1>{user.displayName}</h1>
            <button
              onClick={() => {
                auth.signOut();
                navigate("/");
              }}
            >
              Log Out
            </button>
            <button onClick={() => navigate("/")}>Return</button>
          </div>
          <div className="recipeFull">
            {completeRecipe && (
              <RecipeCardFull
                key={completeRecipe[0].id}
                name={completeRecipe[0].data.savedDrinks[0].strDrink}
                pic={completeRecipe[0].data.savedDrinks[0].strDrinkThumb}
                glass={completeRecipe[0].data.savedDrinks[0].strGlass}
                ingredients={Object.keys(completeRecipe[0].data.savedDrinks[0])
                  .filter((v) => v.startsWith("strIngredient"))
                  .sort((a, b) => {
                    return a.localeCompare(b, undefined, {
                      numeric: true,
                      sensitivity: "base",
                    });
                  })
                  .map((e) => completeRecipe[0].data.savedDrinks[0][e])}
                measures={Object.keys(completeRecipe[0].data.savedDrinks[0])
                  .filter((v) => v.startsWith("strMeasure"))
                  .sort((a, b) => {
                    return a.localeCompare(b, undefined, {
                      numeric: true,
                      sensitivity: "base",
                    });
                  })
                  .map((e) => completeRecipe[0].data.savedDrinks[0][e])}
                instructions={
                  completeRecipe[0].data.savedDrinks[0].strInstructions
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
