import React from "react";

// a functional component with three props //
// show is a boolean to determine if the modal should show //
// onClose is a function called when the modal should close //
// children is the content displayed inside the modal //
const Modal = ({ show, onClose, children }) => {
  // if the props show is false, the function returns null so nothing gets rendered //
  if (!show) {
    return null;
  }

  // if show is true, the modal renders //
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          {/* renders an (x) to symbolise the option to close the modal  */}
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
