import React, { useState } from "react";
import SettingsPopup from "./SettingsPopup";

const FirstComponent = ({ showToast }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [customTimeout, setCustomTimeout] = useState(7000);
  const [setInputValue] = useState("");

  const handleShowToast = () => {
    showToast("Default Message", customTimeout);
  };

  const handleSettingsClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirm = (timeout) => {
    setCustomTimeout(timeout);
    setShowPopup(false);
  };

  return (
    <div className="p-10">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleShowToast}
      >
        Show Toast Message
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        onClick={handleSettingsClick}
      >
        ⚙️
      </button>
      {showPopup && (
        <SettingsPopup
          customTimeout={customTimeout}
          setCustomTimeout={setInputValue}
          onClose={handleClosePopup}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default FirstComponent;
