import React from "react";
const Hero = () => {
  return (
    <div className="flex py-8 gap-3 flex-col items-center">
      <div>
        <h1 className="text-3xl">A Place where you can buy anything.</h1>
      </div>
      <div>{OverlapCards()}</div>
      <div className="mt-4">
        <p className="text-xl">Welcome to the world of e-commerce!</p>
      </div>
    </div>
  );
};

const OverlapCards = () => {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?q=80&w=2612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1612188842101-f976582906fc?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1640890959827-6307611b34a1?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative"
            style={{
              zIndex: index,
              marginLeft: index === 0 ? 0 : -60,
              transform: `rotate(${index * 2 - 6}deg)`,
            }}
          >
            <img
              src={image}
              alt={`img-${index}`}
              className="w-52 h-52 object-cover rounded-xl shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
