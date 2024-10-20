const mongoose = require('mongoose');

// Define the auction schema with timestamps
const auctionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Title of the auction
    description: { type: String, required: true }, // Description of the auction
    startingBid: { type: Number, required: true, min: 0 }, // Starting bid amount
    highestBid: { type: Number, default: 0 }, // Current highest bid amount
    bids: [
      {
        amount: { type: Number, required: true, min: 0 }, // Bid amount
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who placed the bid
        bidAt: { type: Date, default: Date.now }, // Timestamp when the bid was placed
      },
    ],
    endDate: { type: Date, required: true, validate: [date => date > Date.now(), 'End date must be in the future.'] }, // End date of the auction
    imageUrl: { type: String }, // URL of the auction item image
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Seller of the auction
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the auction model
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
