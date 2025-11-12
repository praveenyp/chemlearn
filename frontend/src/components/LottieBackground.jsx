import React from "react";
import Lottie from "lottie-react";

// Chemistry-themed animation (Atom orbit)
const animationURL = "https://lottie.host/ba5b3b63-0e1a-4e6e-a7c1-0b516d7c19f9/yiBq0TgCwM.json";

function LottieBackground() {
  return (
    <div className="absolute inset-0 opacity-10 z-0">
      <Lottie
        animationData={null}
        path={animationURL}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default LottieBackground;
