/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth, db } from "/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, orderBy, query, getDocs } from "firebase/firestore";

const DrinksContext = createContext();

export function DrinksProvider({ children }) {
  const [storedDrinks, setStoredDrinks] = useState();
  const [user, loading] = useAuthState(auth);

  async function getDrinks() {
    let result = [];
    const querySnapshot = await getDocs(collection(db, "drinks"));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, data: doc.data() });
    });
    setStoredDrinks(result);
  }

  useEffect(() => {
    if (user) {
    getDrinks();
    }
    console.log(storedDrinks)
  }, [user]);

  return (
    <DrinksContext.Provider value={storedDrinks}>
      {children}
    </DrinksContext.Provider>
  );
}

export {DrinksContext};


