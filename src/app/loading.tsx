"use client";
import React, { useEffect, useState } from 'react';
import { FaCode, FaTerminal, FaLaptopCode, FaDatabase, FaCogs } from 'react-icons/fa'; // Coding-related icons
import { motion, useAnimation } from 'framer-motion'; // For animations
import { useInView } from 'react-intersection-observer'; // For scroll-based animations

const Loading = () => {
  const controls = useAnimation(); // Animation controls
  const [ref, inView] = useInView(); // Track if the component is in view
  const [codeLines, setCodeLines] = useState<{ id: number; text: string; color: string }[]>([]); // Simulated code lines with colors

  // Generate random code lines for the background
  useEffect(() => {
    const generateCodeLines = () => {
      const lines = [
        'const data = fetchAPI();',
        'function calculateSum(a, b) { return a + b; }',
        'class User { constructor(name) { this.name = name; } }',
        'import React from "react";',
        'console.log("Hello, World!");',
        'db.query("SELECT * FROM users");',
        'npm install react-icons',
        'git commit -m "Initial commit"',
        'const user = new User("John");',
        'const sum = calculateSum(5, 10);',
        'export default function App() { return <div>Hello</div>; }',
        'const apiKey = process.env.API_KEY;',
        'docker build -t my-app .',
        'kubectl apply -f deployment.yaml',
        'aws s3 cp file.txt s3://my-bucket/',
        'terraform apply -auto-approve',
        'const response = await axios.get("/api/data");',
        'const router = express.Router();',
        'const mongoose = require("mongoose");',
        'const redis = require("redis");',
      ];
      const colors = [
        'text-gray-500',
        'text-blue-500',
        'text-green-500',
        'text-yellow-500',
        'text-purple-500',
        'text-pink-500',
        'text-indigo-500',
        'text-teal-500',
      ];
      const newCodeLines = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        text: lines[Math.floor(Math.random() * lines.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setCodeLines(newCodeLines);
    };
    generateCodeLines();
  }, []);

  // Terminal cursor animation
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: [0, 1, 0], // Blinking effect
        transition: { duration: 0.8, repeat: Infinity },
      });
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden">
      {/* Simulated Code Lines in the Background */}
      {codeLines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: '100vw', opacity: 1 }}
          transition={{
            duration: Math.random() * 10 + 5, // Random speed
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className={`absolute text-sm font-mono whitespace-nowrap ${line.color}`}
          style={{ top: `${Math.random() * 100}%` }}
        >
          {line.text}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Loading Text with Typing Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-base-content mb-8 relative"
        >
          در حال بارگزاری
          {/* Typing Cursor */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="ml-1"
          >
            |
          </motion.span>
        </motion.h1>

        {/* Terminal Animation */}
        <motion.div
          ref={ref}
          className="flex items-center justify-center bg-base-100 p-4 rounded-lg shadow-lg"
        >
          <FaTerminal className="text-2xl text-secondary mr-2" />
          <motion.span
            animate={controls}
            className="text-secondary font-mono"
          >
            _
          </motion.span>
        </motion.div>

        {/* Progress Bar with Gradient */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '50%' }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="w-1/2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-8 mx-auto"
        />
      </div>

      {/* Floating Icons (Laptop, Database, Cogs) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 text-4xl text-accent"
      >
        <FaLaptopCode />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-1/4 text-4xl text-warning"
      >
        <FaDatabase />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-1/2 text-4xl text-success"
      >
        <FaCogs />
      </motion.div>
    </div>
  );
};

export default Loading;