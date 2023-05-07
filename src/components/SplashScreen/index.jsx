import { motion } from "framer-motion";

export default function SplashScreen({ isShow }) {
  return (
    <motion.div
      className="fixed inset-0 z-10 flex items-center justify-center bg-teal-500"
      animate={isShow ? "show" : "hide"}
      variants={{
        show: { y: 0 },
        hide: { y: "-100%", opacity: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      <div class="book">
        <div class="book__pg-shadow"></div>
        <div class="book__pg"></div>
        <div class="book__pg book__pg--2"></div>
        <div class="book__pg book__pg--3"></div>
        <div class="book__pg book__pg--4"></div>
        <div class="book__pg book__pg--5"></div>
      </div>
    </motion.div>
  );
}
