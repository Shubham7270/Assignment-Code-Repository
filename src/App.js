import React, { useState } from "react";
import Header from "./Components/Header";
import FirstComponent from "./Components/FirstComponent";
import SecondComponent from "./Components/SecondComponent";
import ThirdComponent from "./Components/ThirdComponent";
import Toast from "./Components/Toast";
import Footer from "./Components/Footer";

const App = () => {
  const [component, setComponent] = useState("First");
  const [toasts, setToasts] = useState([]);

  const showComponent = (componentName) => {
    setComponent(componentName);
  };

  const showToast = (message, timeout = 7000) => {
    const newToast = (
      <Toast
        key={Date.now()}
        message={message}
        onClose={() => removeToast(Date.now())}
      />
    );
    setToasts([...toasts, newToast]);
    setTimeout(() => removeToast(Date.now()), timeout);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.key !== id));
  };

  const renderComponent = () => {
    switch (component) {
      case "First":
        return <FirstComponent showToast={showToast} />;
      case "Second":
        return <SecondComponent showToast={showToast} />;
      case "Third":
        return <ThirdComponent showToast={showToast} />;
      default:
        return <FirstComponent showToast={showToast} />;
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header showComponent={showComponent} />
      <div style={{ flex: 1 }}>{renderComponent()}</div>
      <div className="toast-container bottom-0 mb-2 w-full flex justify-center">
        {toasts}
      </div>
      <Footer />
    </div>
  );
};

export default App;
