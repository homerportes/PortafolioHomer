import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          twinkleSpeed: Math.random() * 2 + 1,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none" 
      style={{ 
        minHeight: '100vh', 
        minWidth: '100vw',
        height: '100vh',
        width: '100vw'
      }}
    >
      {/* Night Sky Background */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-950 to-black" 
        style={{ 
          minHeight: '100vh', 
          minWidth: '100vw',
          height: '100vh',
          width: '100vw'
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/50 via-gray-950/30 to-gray-900/20"></div>
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.twinkleSpeed}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0">
        <div
          className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-bounce"
          style={{
            top: "20%",
            left: "10%",
            boxShadow: "0 0 6px #fff, 0 0 12px #fff, 0 0 18px #fff",
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full opacity-70 animate-ping"
          style={{
            top: "60%",
            left: "80%",
            boxShadow: "0 0 4px #bfdbfe, 0 0 8px #bfdbfe",
            animationDelay: "4s",
          }}
        />
        <div
          className="absolute w-0.5 h-0.5 bg-gray-300 rounded-full opacity-60 animate-pulse"
          style={{
            top: "30%",
            left: "50%",
            boxShadow: "0 0 4px #d1d5db, 0 0 8px #d1d5db",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-50 animate-ping"
          style={{
            top: "75%",
            left: "25%",
            boxShadow: "0 0 4px #fef3c7, 0 0 8px #fef3c7",
            animationDelay: "6s",
          }}
        />
        <div
          className="absolute w-1 h-1 bg-gray-200 rounded-full opacity-60 animate-pulse"
          style={{
            top: "15%",
            left: "70%",
            boxShadow: "0 0 4px #f3f4f6, 0 0 8px #f3f4f6",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Moon */}
      <div
        className="absolute top-16 right-16 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full opacity-80 animate-pulse"
        style={{
          boxShadow:
            "inset -8px -8px 0 rgba(0,0,0,0.1), 0 0 20px rgba(255,255,255,0.2)",
          animationDuration: "4s",
        }}
      >
        {/* Moon craters */}
        <div className="absolute top-4 left-6 w-2 h-2 bg-gray-400 rounded-full opacity-40"></div>
        <div className="absolute top-8 left-4 w-1 h-1 bg-gray-400 rounded-full opacity-30"></div>
        <div className="absolute top-12 left-10 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-35"></div>
      </div>
    </div>
  );
};

export default StarryBackground;
