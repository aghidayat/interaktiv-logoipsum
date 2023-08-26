import React, { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-black opacity-40 z-50"
    : "hidden";
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  // Close the modal when pressing the Escape key
  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [onClose]);

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        <div className="bg-white rounded-xl shadow-lg w-1/2  h-4/6 overflow-scroll py-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
