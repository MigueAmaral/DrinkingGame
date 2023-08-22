/* eslint-disable react/prop-types */
import Cards from "./cards";
import { useState, useEffect, useContext } from "react";
import RecipeContainer from "./recipeContainer";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { auth, db } from "/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import { DrinksContext } from "../DrinksProvider";

export default function CardContainer({ drinks }) {
  const [firstChoice, setFirstChoice] = useState();
  const [secondChoice, setSecondChoice] = useState();
  const [match, setMatch] = useState([]);
  const [count, setCount] = useState(0);
  const [openCards, setOpenCards] = useState(true);
  const [savedDrinks, setSavedDrinks] = useState(null)

  const storedDrinks = useContext(DrinksContext)

  const [user, loading] = useAuthState(auth)

  function handleChoice(id) {
    firstChoice ? setSecondChoice(parseInt(id)) : setFirstChoice(parseInt(id));
  }

  function handleOpen() {
    setOpenCards(!openCards);
  }

  function saveDrinks (name) {
    let savedDrink = drinks.filter((i) => i[0].strDrink === name)
    let newMap = new Map();
      savedDrink.forEach((item) => newMap.set(item[0].idDrink, item));
      savedDrink = [...[...newMap.values()]];
      setSavedDrinks(savedDrink[0])
  }

  async function postDrink () {
    const collectionRef = collection(db, "drinks")
    await addDoc(collectionRef, {savedDrinks, timestamp: serverTimestamp(), user: user.uid, avatar: user.photoURL, username: user.displayName})
  }

  useEffect (() => {
    if (savedDrinks != null && user) {
      postDrink()
    }
    setSavedDrinks(null)
},[savedDrinks])


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
      {user && (<div className="savedDrinks">
     <Link to="recipes" className="recipesLink">Saved drinks</Link>
      </div>)}
      <RecipeContainer
        saveDrinks={saveDrinks}
        handleOpen={handleOpen}
        openCards={openCards}
        match={match}
        drinks={drinks}
      />
    </div>
  );
}
