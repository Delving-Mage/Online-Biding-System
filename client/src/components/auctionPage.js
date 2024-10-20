import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AuctionPage() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    axios.get(`https://online-biding-system.onrender.com/api/auctions/${id}`)
      .then(res => setAuction(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const placeBid = (bidAmount) => {
    const token = localStorage.getItem('token');
    axios.post(`https://online-biding-system.onrender.com/api/auctions/${id}/bid`, { amount: bidAmount }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAuction(res.data))
      .catch(err => console.error(err));
  };

  return (
    auction && (
      <div>
        <h1>{auction.title}</h1>
        <p>{auction.description}</p>
        <p>Highest Bid: {auction.highestBid}</p>
        <button onClick={() => placeBid(auction.highestBid + 10)}>Place Bid</button>
      </div>
    )
  );
}

export default AuctionPage;
