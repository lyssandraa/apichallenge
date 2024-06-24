import React from "react";
import "./Modal.css";

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
      {/* function to close popup when overlay is clicked */}
      <div className="modal-overlay" onClick={onClose}>
        {/* exempting content of popup from the onclose function */}
        <div
          className="modal-content"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
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
