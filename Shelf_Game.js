import React, { useState, useEffect } from 'react';
import axios from 'axios';

// The ShelfGame component is the main component that renders the shelves and books
const ShelfGame = () => {
  // We use the useState hook to manage the state of the shelves and updateData
  const [shelves, setShelves] = useState([]);
  const [updateData, setUpdateData] = useState({});

  // We use the useEffect hook to fetch the initial data from the server when the component mounts
  useEffect(() => {
    // We use axios to send a GET request to the server to fetch the initial data
    axios.get('http://localhost:4700/generate-shelves')
     .then(response => {
        // If the request is successful, we set the state of the shelves to the response data
        setShelves(response.data);
      })
     .catch(error => {
        // If there is an error, we log the error to the console
        console.error(error);
      });
  }, []);

  // We define a function to handle the update request to the server
  const handleUpdate = async () => {
    try {
      // We send a POST request to the server with the updateData in the request body
      await axios.post('http://localhost:4700/update-shelves', { updateData });
      // If the request is successful, we show an alert to the user
      alert('Shelves updated successfully!');
    } catch (error) {
      // If there is an error, we log the error to the console
      console.error(error);
    }
  };

  // We define a function to handle changes to the input fields for the book quantities
  const handleInputChange = (shelfIndex, bookIndex, event) => {
    // We update the state of the updateData with the new book quantity
    setUpdateData(prevState => {
      const newShelves = [...prevState.shelves];
      if (!newShelves[shelfIndex]) {
        newShelves[shelfIndex] = { books: [] };
      }
      newShelves[shelfIndex].books[bookIndex] = {
        ...newShelves[shelfIndex].books[bookIndex],
        quantity: event.target.value,
      };
      return { shelves: newShelves };
    });
  };

  // We define a function to handle the addition of a new book to a shelf
  const handleAddBook = (shelfIndex) => {
    // We update the state of the updateData with the new book
    setUpdateData(prevState => {
      const newShelves = [...prevState.shelves];
      if (!newShelves[shelfIndex]) {
        newShelves[shelfIndex] = { books: [] };
      }
      newShelves[shelfIndex].books.push({ title: '', quantity: 0 });
      return { shelves: newShelves };
    });
  };

  // We render the shelves and books using the state of the shelves and updateData
  return (
    <div>
      {shelves.map((shelf,shelfIndex) => ( // O(n) where n is the number of shelves
        <div key={shelf._id} className="shelf">
          <h2>Shelf {shelf.number}</h2>
          {shelf.books.map((book, bookIndex) => ( // O(m) where m is the number of books on a shelf
            <div key={book._id} className="book">
              <p>Book {book.title}</p>
              <input
                type="number"
                value={updateData.shelves && updateData.shelves[shelfIndex] && updateData.shelves[shelfIndex].books[bookIndex]? updateData.shelves[shelfIndex].books[bookIndex].quantity : book.quantity}
              onChange={event => handleInputChange(shelfIndex, bookIndex, event)}
              />
              <button type="button" onClick={() => handleAddBook(shelfIndex)}>Add Book</button>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleUpdate}>Update Shelves</button>
    </div>
  );
};

// We export the ShelfGame component as the default export
export default ShelfGame;