import React, { useState } from 'react';

const BookingRegister = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    name: '',
    date: '',
    description: ''
  });
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleAddBooking = () => {
    if (!newBooking.name || !newBooking.date ) {
      return;
    }

    if (editing) {
      const updatedBookings = [...bookings];
      updatedBookings[editingIndex] = newBooking;
      setBookings(updatedBookings);
      setEditing(false);
      setEditingIndex(null);
    } else {
      setBookings([...bookings, newBooking]);
    }

    setNewBooking({ name: '', date: '', description: '' });
  };

  const handleEditBooking = (index) => {
    const bookingToEdit = bookings[index];
    setNewBooking(bookingToEdit);
    setEditing(true);
    setEditingIndex(index);
  };

  const handleDeleteBooking = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
  };

  const sortedBookings = bookings.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  return (
    <div className='booking'>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Event:
          <input
            type="text"
            name="name"
            value={newBooking.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <p></p>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newBooking.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <br />
        <label>
          Notes:
          <textarea
            name="description"
            value={newBooking.description}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <br />
        <br />
        <button type="submit" onClick={handleAddBooking}className='add' >
          {editing ? 'Save' : 'Add'}
        </button>
      </form>

      
      <h2>Booking Lists</h2>
      <ul className='bookingList'>

        {sortedBookings.map((booking, index) => (
          <li key={index}>
            <div>
              <strong>{booking.name} - <span>{booking.date}</span></strong> 
            </div>
            <p>{booking.description}</p>
            <button onClick={() => handleEditBooking(index)} className='edit'>Edit</button>
            <button onClick={() => handleDeleteBooking(index)} className='delete'>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default BookingRegister;
