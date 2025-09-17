"use client";

import {motion, AnimatePresence} from "framer-motion";
import {useState, useEffect} from "react";
import {FaChevronLeft, FaChevronRight, FaHeart} from "react-icons/fa";

export default function PhotoSlider() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [direction, setDirection] = useState(0);
 const [isAutoPlaying, setIsAutoPlaying] = useState(true);

 // Ganti dengan path foto-foto Anda
 const photos = [
  "/foto1.jpeg",
  "/foto2.jpeg",
  "/foto3.jpeg",
  "/foto4.jpeg",
  "/foto5.jpeg",
 ];

 // Ganti dengan caption untuk setiap foto
 const captions = [
  "Momen yang paling baru niii",
  "Ini pas ngopi di Antre",
  "Ini sebelum bayi awal pulang",
  "ini pas di The Other Side abis Photobox",
  "I love u pokonyaa",
 ];

 const nextSlide = () => {
  setDirection(1);
  setCurrentIndex((prevIndex) =>
   prevIndex === photos.length - 1 ? 0 : prevIndex + 1
  );
  setIsAutoPlaying(false);
 };

 const prevSlide = () => {
  setDirection(-1);
  setCurrentIndex((prevIndex) =>
   prevIndex === 0 ? photos.length - 1 : prevIndex - 1
  );
  setIsAutoPlaying(false);
 };

 const goToSlide = (index) => {
  setDirection(index > currentIndex ? 1 : -1);
  setCurrentIndex(index);
  setIsAutoPlaying(false);
 };

 // Auto play slider
 useEffect(() => {
  if (isAutoPlaying) {
   const interval = setInterval(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
     prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
   }, 5000);

   return () => clearInterval(interval);
  }
 }, [isAutoPlaying, photos.length]);

 const slideVariants = {
  enter: (direction) => ({
   x: direction > 0 ? 300 : -300,
   opacity: 0,
   scale: 0.9,
  }),
  center: {
   x: 0,
   opacity: 1,
   scale: 1,
   transition: {
    duration: 0.5,
    ease: "easeOut",
   },
  },
  exit: (direction) => ({
   x: direction < 0 ? 300 : -300,
   opacity: 0,
   scale: 0.9,
   transition: {
    duration: 0.5,
    ease: "easeIn",
   },
  }),
 };

 return (
  <section className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-b from-purple-100 to-pink-50">
   <div className="max-w-4xl w-full mx-auto">
    <div className="relative max-w-md mx-auto">
     {/* Slider Container */}
     <div className="relative overflow-hidden shadow-2xl">
      <div
       className="relative"
       style={{paddingBottom: "177.78%"}} // Rasio 9:16
      >
       <AnimatePresence
        custom={direction}
        mode="wait">
        <motion.div
         key={currentIndex}
         custom={direction}
         variants={slideVariants}
         initial="enter"
         animate="center"
         exit="exit"
         className="absolute inset-0 w-full h-full">
         {/* Foto dengan half-rounded corners */}
         <div className="absolute inset-0 overflow-hidden">
          <img
           src={photos[currentIndex]}
           alt={`Foto kenangan ${currentIndex + 1}`}
           className="w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
         </div>

         {/* Caption */}
         <div className="absolute bottom-6 left-0 right-0 text-center px-4">
          <motion.p
           initial={{opacity: 0, y: 20}}
           animate={{opacity: 1, y: 0}}
           transition={{delay: 0.3, duration: 0.5}}
           className="text-white text-lg font-semibold drop-shadow-md">
           {captions[currentIndex]}
          </motion.p>
          <motion.div
           initial={{scale: 0}}
           animate={{scale: 1}}
           transition={{delay: 0.5, duration: 0.3}}
           className="flex justify-center mt-2 text-pink-400">
           <FaHeart />
          </motion.div>
         </div>
        </motion.div>
       </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <button
       onClick={prevSlide}
       className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg transition-all duration-200 z-10">
       <FaChevronLeft className="text-lg" />
      </button>

      <button
       onClick={nextSlide}
       className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg transition-all duration-200 z-10">
       <FaChevronRight className="text-lg" />
      </button>
     </div>

     {/* Dots indicator */}
     <div className="flex justify-center mt-6 space-x-2">
      {photos.map((_, index) => (
       <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
         index === currentIndex
          ? "bg-pink-600 scale-125"
          : "bg-pink-300 hover:bg-pink-400"
        }`}
       />
      ))}
     </div>

     {/* Slide counter */}
     <div className="text-center mt-4 text-gray-600">
      <span className="font-semibold text-pink-600">{currentIndex + 1}</span>
      <span className="mx-1">/</span>
      <span>{photos.length}</span>
     </div>
    </div>

    <motion.div
     initial={{opacity: 0, y: 20}}
     whileInView={{opacity: 1, y: 0}}
     transition={{duration: 0.8, delay: 0.4}}
     viewport={{once: true}}
     className="text-center mt-12 text-gray-700">
     <p className="text-lg italic">
      "Setiap gambar adalah cerita, setiap cerita adalah kenangan indah bareng
      kamu"
     </p>
    </motion.div>
   </div>
  </section>
 );
}
