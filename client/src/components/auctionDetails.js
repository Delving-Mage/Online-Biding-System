import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auctionDetail.css";  // Create a new CSS for the detailed view

export const AuctionDetail = () => {
  const { auctionId } = useParams();  // To get the auction ID from the URL
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/auctions/${auctionId}`);
        setAuction(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAuction();
  }, [auctionId]);

  const handleBidSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      };

      if (!bidAmount || isNaN(bidAmount)) {
        console.error("Invalid bid amount");
        return; // Prevent submission if the bid amount is invalid
      }

      await axios.post(`http://localhost:5001/api/auctions/${auctionId}/bid`, 
        { amount: bidAmount }, // Correctly structure the payload
        { headers }
      );

      // Optionally refresh auction details after bid submission
      const res = await axios.get(`http://localhost:5001/api/auctions/${auctionId}`);
      setAuction(res.data); // Update the auction state
    } catch (err) {
      console.error(err);
    }
  };

  if (!auction) return <div>Loading...</div>;

  return (
    <div className="auction-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        {'< Back to catalog'}
      </button>
      <div className="auction-detail">
        <img 
          src={`http://localhost:5001/${auction.imageUrl}`} 
          alt={auction.title} 
          className="auction-detail-image" 
        />
        <div className="auction-info">
          <h2>{auction.title}</h2>
          <p>Minimum Bid: ${auction.startingBid}</p>
          <p>Current Bid: ${auction.highestBid}</p>
          <p>Ends in: {new Date(auction.endDate).toLocaleString()}</p>
          <div className="bid-section">
            <input 
              type="number" 
              placeholder="Enter your bid" 
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <button onClick={handleBidSubmit}>Submit Bid</button>
          </div>
          <h3>Description</h3>
          <p>{auction.description}</p>
          <h3>Reviews</h3>
          <div className="reviews">
            <div className="review">
              <p><strong>Kristin Watson</strong></p>
              <p>These headphones are a game-changer for my daily commute. The noise-canceling feature works like a charm.</p>
              <p>March 14, 2021</p>
            </div>
            {/* Add more reviews here */}
          </div>
          <h3>Bid History</h3>
          <ul className="bid-history">
            {(auction.bidHistory || []).map((bid, index) => (
              <li key={index}>{`Bidder ${bid.bidderName} bids $${bid.amount}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
