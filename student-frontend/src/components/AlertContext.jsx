// AlertContext.js
import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success", duration = 3000) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), duration);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: 9999,
            minWidth: "340px",
            maxWidth: "90vw",
            padding: "20px 40px",
            fontSize: "1.25rem",
            background: alert.type === "success" ? "#4ade80" : "#f87171",
            color: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  );
};
