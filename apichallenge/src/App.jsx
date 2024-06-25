import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [bookData, setBookData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://potterhead-api.vercel.app/api/books"
      );
      if (!response.ok) {
        throw new Error("Oops! Something went wrong...");
      }
      const data = await response.json();
      console.log(data);
      setBookData(data);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };
  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Harry Potter Books Guide</h1>
      <p className="subtitle">
        API endpoint: "https://potterhead-api.vercel.app/api/books"
      </p>
      {errorMsg !== "" ? (
        <p>{errorMsg}</p>
      ) : (
        <>
          <div className="wrapper">
            {bookData.map((book, index) => (
              <div key={index} className="content">
                <img
                  src={book.cover}
                  alt={book.title}
                  onClick={() => handleOpenModal(book)}
                />
              </div>
            ))}
          </div>
          <Modal
            show={showModal}
            onClose={handleCloseModal}
            book={selectedBook}
          />
        </>
      )}
    </>
  );
};

export default App;
