import React from "react";
import "./Modal.css";

// a functional component with three props //
// show is a boolean to determine if the modal should show //
// onClose is a function called when the modal should close //
// children is the content displayed inside the modal //
const Modal = ({ show, onClose, book }) => {
  // if the props show is false, the function returns null so nothing gets rendered //
  if (!show || !book) {
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
          <div className="modal-header">
            <img src={book.cover} alt={book.title} className="modal-image" />
          </div>
          <div className="modal-body">
            <h2>{book.title}</h2>
            <p className="subinfo">
              {book.serial === "6" ? (
                <span className="bookdate"> 16 July 2005</span>
              ) : book.serial === "7" ? (
                <span className="bookdate"> 21 July 2007</span>
              ) : (
                <span className="bookdate"> {book.release_date}</span>
              )}{" "}
              | |<span className="bookpages">{book.pages} pages</span>
            </p>
            <p>{book.summary}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
