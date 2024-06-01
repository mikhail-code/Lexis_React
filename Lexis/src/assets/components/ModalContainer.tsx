import React from "react";
import LoginModalWindow from "./LoginModalWindow"; // Import modal
const ModalContainer: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition duration-200 ease-in-out ${
          isOpen ? "" : "opacity-0 hidden" // Combined opacity and hidden class
        }`}
      >
        <LoginModalWindow onClose={onClose} />
      </div>
    );
  };

export default ModalContainer;
