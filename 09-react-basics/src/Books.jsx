import { useState } from "react";
import ToRead from "./ToRead.jsx";

function Books() {
  const [to_reads, setItems] = useState([
    { key: 0, text: "Scholomance Book 3", read: false },
    { key: 1, text: "Best Served Cold", read: false },
    { key: 2, text: "The Tales from Earthsea", read: false },
    { key: 3, text: "Strength of the Few", read: false },
    { key: 4, text: "The Tide Child", read: true }
  ]);

  const [inputValue, setInputValue] = useState("");

  function addBook() {
    const newBook = {
      key: Date.now(),
      text: inputValue,
      read: false,
    };

    setItems([...to_reads, newBook]);
    setInputValue("");
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={addBook}>Add A Book</button>

      <ul>
        {to_reads.map((to_read) => (
          <ToRead key={to_read.key} toread={to_read} />
        ))}
      </ul>
    </div>
  );
}

export default Books;
