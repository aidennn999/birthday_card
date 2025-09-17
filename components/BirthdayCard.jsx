"use client";

import {motion} from "framer-motion";
import {FaHeart, FaGift, FaBirthdayCake} from "react-icons/fa";

export default function BirthdayCard() {
 return (
  <motion.div
   initial={{opacity: 0, scale: 0.8}}
   animate={{opacity: 1, scale: 1}}
   transition={{duration: 0.8}}
   className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden border-4 border-pink-200">
   {/* Dekorasi */}
   <div className="absolute -top-4 -right-4 text-5xl text-pink-300">
    <FaGift />
   </div>
   <div className="absolute -bottom-4 -left-4 text-5xl text-pink-300">
    <FaBirthdayCake />
   </div>

   <div className="text-center relative z-10">
    <motion.div
     animate={{rotate: [0, -10, 10, -10, 0]}}
     transition={{repeat: Infinity, duration: 4}}
     className="text-4xl text-pink-500 mb-4">
     🎂
    </motion.div>

    <h1 className="text-3xl font-bold text-pink-600 mb-2">
     Happy Birthday
    </h1>

    <h2 className="text-2xl font-semibold text-pink-500 mb-6">Bayikuuu!</h2>

    <motion.div
     initial={{y: 20, opacity: 0}}
     animate={{y: 0, opacity: 1}}
     transition={{delay: 0.5, duration: 0.8}}
     className="text-gray-700 mb-6 text-lg">
     <p className="mb-4">
      Di hari kamu ini, aku ucapin selamat ulang tahun buat orang paling
      berarti dalam hidupku.
     </p>
     <p className="mb-4">
      Semoga panjang umur, sehat selalu, dan bahagia dunia akhirat. Aku sayang terus sama bayi.
     </p>
     <p>Makasih udah mau ada terus buat aku.</p>
    </motion.div>

    <div
     className="flex justify-center items-center text-red-500 text-2xl mt-6">
     <FaHeart className="mr-2" />
     <span className="font-semibold">Selamat Ulang Tahun!</span>
     <FaHeart className="ml-2" />
    </div>

    <motion.div
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     transition={{delay: 1.5, duration: 1}}
     className="mt-8 text-sm text-gray-500">
     <p>With Love,</p>
     <p className="font-semibold">Iam</p>
    </motion.div>
   </div>
  </motion.div>
 );
}
