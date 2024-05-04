import React, { useState } from "react";
import Toast from "./Toast";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
