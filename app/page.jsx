"use client";

import BirthdayCard from "@/components/BirthdayCard";
import ConfettiEffect from "@/components/ConfettiEffect";
import HeartAnimation from "@/components/HeartAnimation";
import PhotoSlider from "@/components/PhotoSlider";
import VideoSection from "@/components/VideoSection";

export default function Home() {
 return (
  <div className="relative">
   <ConfettiEffect />
   <HeartAnimation />

   {/* Section 1: Kartu Ucapan */}
   <section className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-gradient-to-b from-purple-100 to-pink-50">
    <BirthdayCard />
   </section>

   {/* Section 2: Video */}
   <VideoSection />

   {/*Section 3: PhotoSlider */}
   <PhotoSlider />
  </div>
 );
}
