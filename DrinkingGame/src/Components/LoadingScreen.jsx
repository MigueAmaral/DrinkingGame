import "./LoadingScreen.css";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      exit={{ opacity:0.5, y: -2000 }}
      transition={{ duration: 4 }}
      id="myModal"
      className="modal"
    >
      <div className="modal-content">
        <h1>BARTHOLOMEW</h1>
        <motion.div
          animate={{ x: [0, 300, -300] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          className="loadingImg"
        >
          <img src="src/assets/Group 1-5.svg" alt="" srcset="" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="loading"
        >
          Loading up some nice beverages...
        </motion.h2>
      </div>
    </motion.div>
  );
}
