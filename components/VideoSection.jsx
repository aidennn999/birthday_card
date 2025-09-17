"use client";

import {motion} from "framer-motion";
import {
 FaPlay,
 FaPause,
 FaVolumeUp,
 FaVolumeMute,
 FaRedo,
 FaExpand,
} from "react-icons/fa";
import {useState, useRef, useEffect} from "react";

export default function VideoSection() {
 const [isPlaying, setIsPlaying] = useState(false);
 const [isMuted, setIsMuted] = useState(true); // Default muted untuk autoplay policies
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);
 const [currentTime, setCurrentTime] = useState(0);
 const [duration, setDuration] = useState(0);
 const [isFullscreen, setIsFullscreen] = useState(false);
 const [videoUrl, setVideoUrl] = useState("");
 const videoRef = useRef(null);
 const containerRef = useRef(null);
 const progressRef = useRef(null);

 // Load video source setelah component mount
 useEffect(() => {
  setVideoUrl("/IMG_8567.mp4");
 }, []);

 // Handle video load
 useEffect(() => {
  const video = videoRef.current;
  if (!video || !videoUrl) return;

  const handleLoadStart = () => {
   setIsLoading(true);
   setError(null);
  };

  const handleLoadedData = () => {
   setIsLoading(false);
  };

  const handleTimeUpdate = () => {
   setCurrentTime(video.currentTime);
  };

  const handleCanPlay = () => {
   setIsLoading(false);
  };

  const handleError = (e) => {
   console.error("Video error:", e);
   setIsLoading(false);
   setError(
    "Video tidak dapat dimuat. Pastikan file birthday-video.mp4 ada di folder public."
   );
  };

  const handleEnded = () => {
   setIsPlaying(false);
  };

  // Reset video source
  video.src = videoUrl;
  video.load();

  video.addEventListener("loadstart", handleLoadStart);
  video.addEventListener("loadeddata", handleLoadedData);
  video.addEventListener("timeupdate", handleTimeUpdate);
  video.addEventListener("canplay", handleCanPlay);
  video.addEventListener("error", handleError);
  video.addEventListener("ended", handleEnded);

  return () => {
   video.removeEventListener("loadstart", handleLoadStart);
   video.removeEventListener("loadeddata", handleLoadedData);
   video.removeEventListener("timeupdate", handleTimeUpdate);
   video.removeEventListener("canplay", handleCanPlay);
   video.removeEventListener("error", handleError);
   video.removeEventListener("ended", handleEnded);
  };
 }, [videoUrl]);

 useEffect(() => {
  if (progressRef.current && duration > 0) {
   const progress = (currentTime / duration) * 100;
   progressRef.current.style.width = `${progress}%`;
  }
 }, [currentTime, duration]);

 const togglePlay = async () => {
  const video = videoRef.current;
  if (!video) return;

  try {
   if (isPlaying) {
    video.pause();
    setIsPlaying(false);
   } else {
    // Untuk kebijakan autoplay, pastikan video dimulai dari user action
    if (video.ended || video.currentTime > 0) {
     video.currentTime = 0;
    }

    const playPromise = video.play();

    if (playPromise !== undefined) {
     await playPromise;
     setIsPlaying(true);
     setError(null);
    }
   }
  } catch (err) {
   console.error("Error playing video:", err);
   setError("Tidak dapat memutar video. Silakan klik lagi.");
   setIsPlaying(false);
  }
 };

 const toggleMute = () => {
  if (videoRef.current) {
   videoRef.current.muted = !isMuted;
   setIsMuted(!isMuted);
  }
 };

 const restartVideo = () => {
  if (videoRef.current) {
   videoRef.current.currentTime = 0;
   if (!isPlaying) {
    togglePlay();
   }
  }
 };

 const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
   if (containerRef.current.requestFullscreen) {
    containerRef.current.requestFullscreen();
    setIsFullscreen(true);
   }
  } else {
   if (document.exitFullscreen) {
    document.exitFullscreen();
    setIsFullscreen(false);
   }
  }
 };

 // Handle fullscreen change events
 useEffect(() => {
  const handleFullscreenChange = () => {
   setIsFullscreen(!!document.fullscreenElement);
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  return () => {
   document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
 }, []);

 // Debug: Log status video
 useEffect(() => {
  console.log("Video status:", {isPlaying, isLoading, error, videoUrl});
 }, [isPlaying, isLoading, error, videoUrl]);

 return (
  <section className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-b from-pink-50 to-purple-100">
   <div className="max-w-2xl w-full">
    <motion.h2
     initial={{opacity: 0, y: 20}}
     whileInView={{opacity: 1, y: 0}}
     transition={{duration: 0.8}}
     viewport={{once: true}}
     className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-8">
     Our Memory
    </motion.h2>

    <div
     ref={containerRef}
     className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto bg-black"
     style={{maxWidth: "360px"}}>
     {/* Video container dengan rasio 9:16 */}
     <div
      className="relative"
      style={{paddingBottom: "177.78%"}}>
      {/* Video element */}
      {videoUrl && (
       <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        preload="auto"
        onClick={togglePlay}
        playsInline>
        <source
         src={videoUrl}
         type="video/mp4"
        />
        Browser Anda tidak mendukung pemutaran video.
       </video>
      )}

      {/* Loading indicator */}
      {isLoading && (
       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="text-white text-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-2"></div>
         <p>Memuat video...</p>
        </div>
       </div>
      )}

      {/* Error message */}
      {error && (
       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 p-4">
        <p className="text-white text-center mb-4">{error}</p>
        <button
         onClick={() => window.location.reload()}
         className="bg-pink-500 text-white px-4 py-2 rounded-lg">
         Muat Ulang Halaman
        </button>
       </div>
      )}

      {/* Overlay dengan tombol play - selalu tampilkan jika tidak loading dan tidak error */}
      {!isLoading && !error && !isPlaying && (
       <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer"
        onClick={togglePlay}>
        <motion.div
         initial={{scale: 0.8}}
         animate={{scale: 1}}
         whileHover={{scale: 1.1}}
         transition={{type: "spring", stiffness: 400, damping: 10}}
         className="bg-pink-500 bg-opacity-80 rounded-full p-4">
         <FaPlay className="text-white text-3xl" />
        </motion.div>
       </motion.div>
      )}

      {/* Controls */}
      {!isLoading && !error && (
       <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-center">
         <div className="flex gap-2">
          <motion.button
           whileHover={{scale: 1.1}}
           whileTap={{scale: 0.9}}
           className="bg-white bg-opacity-20 text-pink-500 rounded-full p-2"
           onClick={togglePlay}>
           {isPlaying ? (
            <FaPause className="text-xl" />
           ) : (
            <FaPlay className="text-xl" />
           )}
          </motion.button>

          <motion.button
           whileHover={{scale: 1.1}}
           whileTap={{scale: 0.9}}
           className="bg-white bg-opacity-20 text-pink-500 rounded-full p-2"
           onClick={toggleMute}>
           {isMuted ? (
            <FaVolumeMute className="text-xl" />
           ) : (
            <FaVolumeUp className="text-xl" />
           )}
          </motion.button>
         </div>

         <div className="flex gap-2">
          <motion.button
           whileHover={{scale: 1.1}}
           whileTap={{scale: 0.9}}
           className="bg-white bg-opacity-20 text-pink-500 rounded-full p-2"
           onClick={restartVideo}>
           <FaRedo className="text-xl" />
          </motion.button>

          <motion.button
           whileHover={{scale: 1.1}}
           whileTap={{scale: 0.9}}
           className="bg-white bg-opacity-20 text-pink-500 rounded-full p-2"
           onClick={toggleFullscreen}>
           <FaExpand className="text-xl" />
          </motion.button>
         </div>
        </div>

        {/* Progress bar */}
        {duration > 0 && (
         <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-1.5">
          <div
           ref={progressRef}
           className="bg-pink-500 h-1.5 rounded-full transition-all duration-100"
           style={{width: `${(currentTime / duration) * 100}%`}}
          />
         </div>
        )}
       </div>
      )}
     </div>
    </div>

    <motion.div
     initial={{opacity: 0, y: 20}}
     whileInView={{opacity: 1, y: 0}}
     transition={{duration: 0.8, delay: 0.2}}
     viewport={{once: true}}
     className="mt-6 text-center text-gray-700 max-w-md mx-auto">
     <p className="text-lg">Video spesial buat hari spesial kamu</p>
     <p className="mt-2 text-sm">
      Klik tombol play buat ngeliat momen kita
     </p>
    </motion.div>
   </div>
  </section>
 );
}
