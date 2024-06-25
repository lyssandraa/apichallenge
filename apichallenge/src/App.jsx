import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [bookData, setBookData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("null");

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    let sortedBooks = [...bookData];
    if (criteria === "newest") {
      sortedBooks.sort((a, b) => new Date(b.serial) - new Date(a.serial));
    } else if (criteria === "oldest") {
      sortedBooks.sort((a, b) => new Date(a.serial) - new Date(b.serial));
    } else if (criteria === "alphabetically") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "longest") {
      sortedBooks.sort((a, b) => b.pages - a.pages);
    } else if (criteria === "shortest") {
      sortedBooks.sort((a, b) => a.pages - b.pages);
    }
    setBookData(sortedBooks);
  };

  return (
    <>
      <h1>Harry Potter Books Guide</h1>
      <p className="subtitle">
        API endpoint: "https://potterhead-api.vercel.app/api/books"
      </p>
      <div className="sort-options">
        <label>Sort By: </label>
        <select
          value={sortCriteria}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="null">Select an Option</option>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="longest">Longest to Shortest</option>
          <option value="shortest">Shortest to Longest</option>
        </select>
      </div>
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
