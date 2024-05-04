import React, { useState } from "react";
import SettingsPopup from "./SettingsPopup";

const sharedClasses = {
  input:
    "mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
  button:
    "mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded",
  toast: "hidden mt-4 p-4 bg-zinc-800 text-white text-sm rounded-lg",
};

const SecondComponent = ({ showToast }) => {
  const [toastText, setToastText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [customTimeout, setCustomTimeout] = useState(7000);
  const [toastQueue, setToastQueue] = useState([]);

  const handleToastBtnClick = () => {
    const message = toastText || "Testing";
    const newToast = `${message}:${toastQueue.length + 1}`;
    const newQueue = [...toastQueue];
    if (newQueue.length === 3) {
      newQueue.shift();
    }
    newQueue.push(newToast);
    setToastQueue(newQueue);

    showToast(newToast, customTimeout);
    setToastText("");
  };

  const handleSettingsClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirm = (timeout) => {
    const newTimeout = timeout || 7000;
    setCustomTimeout(newTimeout);
    setShowPopup(false);
  };

  return (
    <div className="max-w-sm mx-12 p-8">
      <label
        htmlFor="toastInput"
        className="block text-sm font-medium text-zinc-700"
      >
        Enter Custom Toast Text
      </label>
      <input
        type="text"
        id="toastInput"
        className={sharedClasses.input}
        placeholder="Enter Here"
        value={toastText}
        onChange={(e) => setToastText(e.target.value)}
      />

      <button
        id="toastBtn"
        className={sharedClasses.button}
        onClick={handleToastBtnClick}
      >
        Show Custom Toast Message
      </button>

      {toastQueue.map((toast, index) => (
        <div key={index} id={`toast${index}`} className={sharedClasses.toast}>
          {toast}
        </div>
      ))}

      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSettingsClick}
      >
        ⚙️
      </button>

      {showPopup && (
        <SettingsPopup
          customTimeout={customTimeout}
          setCustomTimeout={setCustomTimeout}
          onClose={handleClosePopup}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default SecondComponent;
