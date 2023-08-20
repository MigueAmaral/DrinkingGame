/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Cards({
  id,
  name,
  pic,
  handleChoice,
  match,
  firstChoice,
  secondChoice,
}) {
  const [show, setShow] = useState();
  const [disabled, setDisabled] = useState(false);

  function handleClick() {
    handleChoice(id);
  }

  function showCard() {
    setShow(true);
    setDisabled(true);
  }

  useEffect(() => {
    if (firstChoice === null) {
      setDisabled(false);
      setTimeout(() => {
        setShow(null);
      }, "1500");
    }
  }, [show, firstChoice]);

  return (
    <motion.div
      onClick={
        disabled
          ? () => {}
          : () => {
              showCard();
              handleClick();
            }
      }
      className={`card`}
      disabled={disabled}
    >
      <img
        src={pic}
        alt=""
        className={`${match.includes(parseInt(id)) ? "show" : ""} ${
          show ? "" : "hide"
        }`}
      />
      <div className={`${match.includes(parseInt(id)) ? "show" : "hide"}`}>
        <h1>{name}</h1>
      </div>
    </motion.div>
  );
}
