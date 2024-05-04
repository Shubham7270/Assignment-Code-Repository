import React, { useState } from "react";

const inputClasses =
  "border-2 border-zinc-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500";
const buttonClasses = "text-lg font-semibold";
const buttonPrimaryClasses =
  "mt-4 bg-green-400 text-white p-2 w-full rounded-lg hover:bg-green-500";

const SettingsPopup = ({
  customTimeout,
  setCustomTimeout,
  onClose,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(inputValue);

    onClose();
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Set Timeout:</h2>
        <button className={buttonClasses} onClick={onClose}>
          ✕
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter time in seconds"
        className={inputClasses}
        value={inputValue}
        onChange={handleChange}
      />
      <button className={buttonPrimaryClasses} onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default SettingsPopup;
