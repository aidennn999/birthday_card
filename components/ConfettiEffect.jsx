"use client";

import {motion} from "framer-motion";
import {useEffect, useState} from "react";

const ConfettiPiece = ({initialX, delay}) => {
 const colors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];
 const shapes = ["🎉", "🎊", "🌟", "❤️", "🎂", "🥳"];

 return (
  <motion.div
   initial={{
    x: initialX,
    y: -50,
    opacity: 1,
    rotate: 0,
   }}
   animate={{
    y: window.innerHeight,
    opacity: 0,
    rotate: 360,
   }}
   transition={{
    duration: Math.random() * 3 + 2,
    delay,
    ease: "easeOut",
   }}
   className="absolute text-2xl"
   style={{
    left: `${initialX}px`,
    color: colors[Math.floor(Math.random() * colors.length)],
   }}>
   {shapes[Math.floor(Math.random() * shapes.length)]}
  </motion.div>
 );
};

export default function ConfettiEffect() {
 const [confettiPieces, setConfettiPieces] = useState([]);
 const [isVisible, setIsVisible] = useState(true);

 useEffect(() => {
  // Hanya jalankan di client
  if (typeof window === "undefined") return;

  const pieces = [];
  for (let i = 0; i < 50; i++) {
   pieces.push({
    id: i,
    initialX: Math.random() * window.innerWidth,
    delay: Math.random() * 2,
   });
  }
  setConfettiPieces(pieces);

  // Set timeout untuk menyembunyikan confetti setelah beberapa detik
  const timer = setTimeout(() => {
   setIsVisible(false);
  }, 5000);

  return () => clearTimeout(timer);
 }, []);

 if (!isVisible) return null;

 return (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
   {confettiPieces.map((piece) => (
    <ConfettiPiece
     key={piece.id}
     initialX={piece.initialX}
     delay={piece.delay}
    />
   ))}
  </div>
 );
}
