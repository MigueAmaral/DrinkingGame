/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import CardContainer from "./Components/cardContainer";
import LoadingScreen from "./Components/LoadingScreen";
import axios, { all } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import _ from "lodash";

function App() {
  const [drinkCollection, setDrinkCollection] = useState([]);
  const [modal, setModal] = useState(true);

  let drinkCatalogue = [];

  useEffect(() => {
    getDrinkCollection();
    setTimeout(() => {
      let uniqueDrinks = [];
      let newMap = new Map();
      drinkCatalogue.forEach((item) => newMap.set(item[0].idDrink, item));
      uniqueDrinks = [...[...newMap.values()]];

      if (uniqueDrinks.length > 0 && uniqueDrinks.length < 8) {
        console.log("check");
        const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        setTimeout(() => {
          axios.get(url).then((data) => {
            uniqueDrinks.push(data.data.drinks);
          });
        }, "100");
      } else if (uniqueDrinks.length > 8) {
        console.log("check2");
        uniqueDrinks.length = 8;
      }
      setDrinkCollection([...uniqueDrinks, ...uniqueDrinks]);
    }, "2000");
  }, []);

  function getDrinkCollection() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "1");
    axios.get(url).then((data) => {
      drinkCatalogue = [...drinkCatalogue, data.data.drinks];
    }, "150");

    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "300");

    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "450");

    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "600");

    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "750");

    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "900");

    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "1050");

    setTimeout(() => {
      axios.get(url).then((data) => {
        drinkCatalogue = [...drinkCatalogue, data.data.drinks];
      });
    }, "1200");
  }

  useEffect(() => {
    setTimeout(() => {
      setModal(!modal);
    }, "3000");
  }, []);

  const shuffledDrinks = _.shuffle(drinkCollection);

  return (
    <div className="main">
      <AnimatePresence>
      {modal && <LoadingScreen key={"loading"} />}
      </AnimatePresence>
      <div className="header">
        <h1 className="title">BARTHOLOMEW</h1>
      </div>
      <CardContainer drinks={shuffledDrinks} />
    </div>
  );
}

export default App;
