import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { auth } from "/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import "src/Components/recipeCard.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/* eslint-disable react/prop-types */

export default function RecipeCard({
  pic,
  name,
  glass,
  ingredients,
  measures,
  instructions,
  handleOpen,
  openCards,
  saved,
}) {
  const [openCard, setOpenCard] = useState();
  const [login, setLogin] = useState(false);
  const [heart, SetHeart] = useState(false);

  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick() {
    saved(name);
  }

  useEffect(() => {
    if (login == true) {
      setLogin(false);
    }
  }, [user]);

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3 } }}
      onClick={() => {
        handleOpen();
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="recipeCard"
    >
      {login && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="smallModal"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              GoogleLogin;
            }}
          >
            Sign in with Google to save recipes
            <FcGoogle size={30} className="googleIcon" />
          </button>
        </motion.div>
      )}
      <img
        src={pic}
        alt=""
        className={`recipeImg ${openCards ? "" : "closedCardImg"}`}
      />
      <div className="instructions">
        <h3 className={`recipeTitle ${openCards ? "" : "closedCardTitle"}`}>
          {name}
        </h3>
        {openCards && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="instructionsDescription">{instructions}</p>
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
                <p>{glass}</p>
              </div>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  if (user) {
                    handleClick();
                    SetHeart(!heart);
                  } else {
                    setLogin(!login);
                  }
                }}
                className={
                  heart
                    ? "material-symbols-outlined heart"
                    : "material-symbols-outlined"
                }
              >
                favorite
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
