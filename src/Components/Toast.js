import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose, duration = 7000 }) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [onClose, duration]);

  const handleMouseEnter = () => {
    clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    setTimer(setTimeout(onClose, duration));
  };

  return (
    <div
      className="bg-black text-white px-4 py-2 rounded shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {message}
      <button onClick={onClose} className="text-red-500 ml-4">
        ✖
      </button>
    </div>
  );
};

export default Toast;
