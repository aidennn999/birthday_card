"use client";

import {motion} from "framer-motion";
import {FaHeart} from "react-icons/fa";
import {useEffect, useState} from "react";

const FloatingHeart = () => {
 const initialX =
  Math.random() * (typeof window !== "undefined" ? window.innerWidth : 100);
 const size = Math.random() * 20 + 10;

 return (
  <motion.div
   initial={{
    x: initialX,
    y: typeof window !== "undefined" ? window.innerHeight + 50 : 0,
    opacity: 0.7,
    scale: 0,
   }}
   animate={{
    y: -100,
    opacity: 0,
    scale: 1,
   }}
   transition={{
    duration: Math.random() * 5 + 5,
    repeat: Infinity,
    delay: Math.random() * 5,
   }}
   className="absolute text-pink-400"
   style={{
    fontSize: `${size}px`,
   }}>
   <FaHeart />
  </motion.div>
 );
};

export default function HeartAnimation() {
 const [hearts, setHearts] = useState([]);

 useEffect(() => {
  // Hanya jalankan di client
  if (typeof window === "undefined") return;

  const heartCount = 15;
  const newHearts = [];
  for (let i = 0; i < heartCount; i++) {
   newHearts.push({id: i});
  }
  setHearts(newHearts);
 }, []);

 return (
  <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
   {hearts.map((heart) => (
    <FloatingHeart key={heart.id} />
   ))}
  </div>
 );
}
