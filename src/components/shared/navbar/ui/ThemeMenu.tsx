import { IoIosColorPalette } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const ThemeMenu = ({
  themeMenuOpen,
  setThemeMenuOpen,
  themeItems,
  handleThemeChange,
  theme,
}: {
  themeMenuOpen: boolean;
  setThemeMenuOpen: (value: boolean) => void;
  themeItems: any[];
  handleThemeChange: (value: string) => void;
  theme: string;
}) => {
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setThemeMenuOpen(!themeMenuOpen)}
        className="btn btn-ghost text-white hover:text-primary transition-all duration-300"
      >
        <IoIosColorPalette className="text-xl text-base-content" />
      </motion.button>

      <AnimatePresence>
        {themeMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-52 shadow-xl rounded-xl z-10 menu menu-sm border bg-base-300 border-gray-700"
          >
            {themeItems.map((themeOption, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => handleThemeChange(themeOption.value)}
                  className={`flex items-center gap-3 px-4 py-3 text-base-content hover:bg-primary hover:text-white rounded-lg transition duration-300 ease-in-out ${
                    theme === themeOption.label ? "bg-primary text-white" : ""
                  }`}
                >
                  {themeOption.label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeMenu;