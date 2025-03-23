"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartButton from "./ui/CartButton";
import Logo from "./ui/Logo";
import HamburgerMenu from "./ui/HamburgerMenu";
import MobileDrawer from "./ui/MobileDrawer";
import { themeItems } from "@/data/data";
import { useCategoryStore } from '@/store/category.store'
import CartMenu from "./ui/CartMenu";

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { categories } = useCategoryStore();

  return (
    <div>
      {/* Top Navbar */}
      <motion.div
        className="lg:hidden flex items-center justify-between p-4 bg-base-300"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CartMenu cartOpen={cartOpen} setCartOpen={setCartOpen} position="right" />
        <Logo />
        <HamburgerMenu onClick={() => setDrawerOpen(!drawerOpen)} />
      </motion.div>

      {/* Mobile Drawer with Animation */}
      <AnimatePresence>
        {drawerOpen && (
          <MobileDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            menuRef={menuRef}
            menuItems={categories}
            themeItems={themeItems}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
