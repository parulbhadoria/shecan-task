import {
  FaSeedling,
  FaRocket,
  FaLightbulb
} from "react-icons/fa";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <motion.div
  className="hero-section"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>

      <h1 className="hero-title">
        Empowering Women Through Technology
      </h1>

      <p>
        She Can Foundation encourages students to
        explore technology and innovation through
        learning opportunities and collaboration.
      </p>

      <div className="tags">

        <span>
          <FaSeedling />
          Growth
        </span>

        <span>
          <FaRocket />
          Innovation
        </span>

        <span>
          <FaLightbulb />
          Learning
        </span>

      </div>

    </motion.div>
  );
}

export default HeroSection;