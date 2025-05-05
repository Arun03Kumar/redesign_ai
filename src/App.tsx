import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";
import HowPage from "./components/HowPage";
import "./App.css";
import Layout from "./components/Layout";
import Filter_bubble from "./components/Filter_bubble";
import Product_buy from "./components/Product_buy";
import Emotion from "./components/Emotion";
import Quiz1 from "./components/quizzes/Quiz1";
import Cats from "./components/games/Cats";
import FilterBubble from "./components/games/Bubble/FilterBubble";
import Social from "./components/games/socail_media/Social";
import HomePage from "./components/HomePage";
import InteractiveModePage from "./components/InteractiveModeApp";

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route
            path="/interactive-app-mode"
            element={<InteractiveModePage />}
          />
          {/* <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 0 }} // Start with normal position
                animate={{ opacity: 1, y: 0 }} // Fade in to normal position
                exit={{ opacity: 0, y: -window.innerHeight }} // Slide up completely
                transition={{ duration: 1 }} // Set transition duration
              >
                <LandingPage />
              </motion.div>
            }
          /> */}
          <Route
            path="/how"
            element={
              // <motion.div
              //   initial={{ opacity: 0, y: window.innerHeight }} // Start from below the screen
              //   animate={{ opacity: 1, y: 0 }} // Fade in and move to normal position
              //   exit={{ opacity: 0, y: -window.innerHeight }} // Slide up completely
              //   transition={{ duration: 1 }} // Set transition duration
              // >
              <HowPage />
              // </motion.div>
            }
          />
          <Route
            path="/filter_bubble"
            element={
              // <motion.div
              //   initial={{ opacity: 0, y: window.innerHeight }} // Start from below the screen
              //   animate={{ opacity: 1, y: 0 }} // Fade in and move to normal position
              //   exit={{ opacity: 0, y: -window.innerHeight }} // Slide up completely
              //   transition={{ duration: 1 }} // Set transition duration
              // >
              <Filter_bubble />
              // </motion.div>
            }
          />
          <Route
            path="/product_buy"
            element={
              // <motion.div
              //   initial={{ opacity: 0, y: window.innerHeight }} // Start from below the screen
              //   animate={{ opacity: 1, y: 0 }} // Fade in and move to normal position
              //   exit={{ opacity: 0, y: -window.innerHeight }} // Slide up completely
              //   transition={{ duration: 1 }} // Set transition duration
              // >
              <Product_buy />
              // </motion.div>
            }
          />
          <Route
            path="/emotion"
            element={
              // <motion.div
              //   initial={{ opacity: 0, y: window.innerHeight }} // Start from below the screen
              //   animate={{ opacity: 1, y: 0 }} // Fade in and move to normal position
              //   exit={{ opacity: 0, y: -window.innerHeight }} // Slide up completely
              //   transition={{ duration: 1 }} // Set transition duration
              // >
              <Emotion />
              // </motion.div>
            }
          />
          <Route
            path="/quiz1"
            element={
              // <motion.div
              //   initial={{ opacity: 0, y: window.innerHeight }} // Start from below the screen
              //   animate={{ opacity: 1, y: 0 }} // Fade in and move to normal position
              //   exit={{ opacity: 0, y: -window.innerHeight }} // Slide up completely
              //   transition={{ duration: 1 }} // Set transition duration
              // >
              <Quiz1 />
              // </motion.div>
            }
          />
          <Route path="/game/cats" element={<Cats />} />
          <Route path="/game/filter_bubble" element={<FilterBubble />} />
          <Route path="/game/social_media" element={<Social />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
