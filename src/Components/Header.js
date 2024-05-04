import React from "react";

const Header = ({ showComponent }) => {
  return (
    <div className="bg-red-500 text-white p-4 text-center flex justify-between">
      <div>Header</div>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 rounded hover:bg-red-700"
          onClick={() => showComponent("First")}
        >
          First Component
        </button>
        <button
          className="px-4 py-2 rounded hover:bg-red-700"
          onClick={() => showComponent("Second")}
        >
          Second Component
        </button>
        <button
          className="px-4 py-2 rounded hover:bg-red-700"
          onClick={() => showComponent("Third")}
        >
          Third Component
        </button>
      </div>
    </div>
  );
};

export default Header;
