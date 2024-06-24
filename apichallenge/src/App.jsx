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
};
