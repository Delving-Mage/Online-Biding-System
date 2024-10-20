import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import axios from "axios";
import CreateAuctionItem from "./createAuctionItem";
import Modal from "./modal"; // Import the Modal component
import Footer from "./footer";

export const Dashboard = ({ userName, isLoggedIn }) => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const { data } = await axios.get("https://online-biding-system.onrender.com/api/auctions");
        setAuctions(data);
      } catch (err) {
        if (err.response) {
          console.error("Error response:", err.response.data);
          console.error("Status code:", err.response.status);
          setError("Failed to fetch auctions. Please try again later.");
        } else if (err.request) {
          console.error("Error request:", err.request);
          setError("No response from the server. Please check your connection.");
        } else {
          console.error("Error message:", err.message);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAuctions();
  }, []);

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const difference = new Date(endDate) - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      return `${days}d ${hours}h ${minutes}m`;
    } else {
      return "Auction has ended";
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="dashboard-header">
          <p className="dashboard-p">{`Welcome ${userName}!`}</p>
          <select className="dashboard-select">
            <option>Showing all</option>
          </select>
        </div>
      ) : (
        <>
          <div className="dashboard-container">
            Explore <a className="dashboard_p">Auctions</a>
          </div>
          {isLoggedIn&&<button
            onClick={() => setShowModal(true)} // Show modal when clicked
            className="create-auction-btn"
          >
            Create Auction
          </button>}
        </>
      )}
      {loading ? (
        <p>Loading auctions...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : auctions.length === 0 ? (
        <p>No auctions available.</p>
      ) : (
        <div className="auction-grid">
          {auctions.map((item) => (
            <div className="auction-card" key={item._id}>
              <img
                src={`https://online-biding-system.onrender.com/${item.imageUrl}`}
                alt={item.title}
                className="auction-image"
              />
              <h2>{item.title}</h2>
              <p>Minimum Bid: ${item.startingBid}</p>
              <p>Current Bid: ${item.highestBid}</p>
              <p>Ends in: {calculateTimeLeft(item.endDate)}</p>
              <div>
                <button
                  className="auction-btn"
                  onClick={() =>{isLoggedIn ? navigate(`/auction/${item._id}`):navigate('/login')}}
                >
                  {`Bid now >`}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Creating Auction */}
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
  <CreateAuctionItem handleClose={() => setShowModal(false)} /> 
</Modal>
<Footer />
    </div>
  );
};
