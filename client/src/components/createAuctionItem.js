import React, { useState } from 'react';
import axios from 'axios';
import '../styles/createAuctionItem.css'; // Import your CSS file
import { API_BASE_URL } from '../constants';

const CreateAuctionItem = ({ handleClose }) => { // Accept handleClose as a prop
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingBid: '',
    endDate: '',
  });
  const [imageFile, setImageFile] = useState(null); // State for the uploaded image file
  const [message, setMessage] = useState({ text: '', type: '' }); // State for success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Get the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formDataToSend = new FormData(); // Create a FormData object

    // Append form fields to FormData
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('startingBid', Number(formData.startingBid)); // Convert to number
    formDataToSend.append('endDate', formData.endDate);
    
    if (imageFile) {
      formDataToSend.append('image', imageFile); // Append the image file
    }

    try {
      await axios.post(`${API_BASE_URL}/api/auctions`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
      });
      
      // Optionally reset form or show success message
      setFormData({
        title: '',
        description: '',
        startingBid: '',
        endDate: '',
      });
      setImageFile(null); // Reset image file
      setMessage({ text: "Auction item created successfully!", type: 'success' });
    } catch (error) {
      console.error('Error creating auction item:', error);
      setMessage({ text: 'Error creating auction item: ' + error.response.data.message, type: 'error' });
    }
  };

  return (
    <div className="auction-modal">
      {/* Close Icon */}
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>
      
      <form className="auction-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Auction Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-textarea"
          name="description"
          placeholder="Auction Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="number"
          name="startingBid"
          placeholder="Starting Bid"
          value={formData.startingBid}
          onChange={handleChange}
          required
        />
        <input
          className="form-file"
          type="file"
          name="image"
          accept="image/*" // Accept only image files
          onChange={handleFileChange}
          required
        />
        <input
          className="form-input"
          type="datetime-local" // For selecting the end date
          name="endDate"
          placeholder="End Date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <button className="form-button" type="submit">Create Auction Item</button>
        
        {/* Message Display */}
        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'success' : 'error'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateAuctionItem;
