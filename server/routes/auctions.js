const express = require('express');
const multer = require('multer');
const path = require('path');
const Auction = require('../models/Auction');
const authMiddleware = require('../middleware/auth');
const { io } = require('../app'); // Import the `io` instance from app.js
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;
const router = express.Router();



// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: './uploads/', // Folder to save uploaded images
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  },
});

// Fetch all auctions
router.get('/', async (req, res) => {
  console.log(`Received a request: ${req.method} ${req.originalUrl}`);
  try {
    const auctions = await Auction.find().populate('user', 'username');
    res.json(auctions);
  } catch (err) {
    console.error('Error fetching auctions:', err);
    res.status(500).json({ message: err.message });
  }
});
// Fetch auction by ID
router.get('/auctions/:id', async (req, res) => {
    const auctionId = req.params.id;
    console.log(`Fetching auction with ID: ${auctionId}`);

    // Validate auction ID format
    if (!mongoose.Types.ObjectId.isValid(auctionId)) {
        return res.status(400).json({ message: 'Invalid auction ID format' });
    }

    try {
        const auction = await Auction.findById(auctionId).populate('user', 'username');
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        res.json(auction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
// Create auction
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, description, startingBid, endDate } = req.body;

  // Validate incoming data
  if (!title || !description || !startingBid || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create auction data object
  const auctionData = {
    title,
    description,
    startingBid: Number(startingBid), // Ensure this is a number
    endDate,
    imageUrl: req.file.path, // Save the path of the uploaded image
    user: req.user.id,
  };

  try {
    const auction = await Auction.create(auctionData); // Save the auction to the database
    res.status(201).json(auction); // Send back the created auction
  } catch (error) {
    console.error('Error creating auction:', error);
    res.status(500).json({ message: 'Error creating auction item' });
  }
});

// Update auction
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    // Check if the user is authorized to update the auction
    if (auction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this auction' });
    }

    Object.assign(auction, req.body); // Update fields with the provided data
    await auction.save();
    res.json(auction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete auction
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    // Check if the user is authorized to delete the auction
    if (auction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this auction' });
    }

    await auction.remove();
    res.json({ message: 'Auction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Place a bid on an auction
router.post('/:id/bid', authMiddleware, async (req, res) => {
  const { amount } = req.body;

  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check if auction is still active
    if (new Date() > new Date(auction.endDate)) {
      return res.status(400).json({ message: 'Auction has ended' });
    }

    // Check if the bid is higher than the current highest bid
    if (amount <= auction.highestBid) {
      return res.status(400).json({ message: 'Bid must be higher than the current highest bid' });
    }

    // Add the new bid
    auction.bids.push({
      amount,
      user: req.user.id, // Get the authenticated user ID from JWT
      bidAt: Date.now(),
    });

    // Update the highest bid
    auction.highestBid = amount;

    await auction.save();

    // Emit real-time event to notify others about the new bid
    io.emit('new_bid', {
      auctionId: auction._id,
      highestBid: auction.highestBid,
      userId: req.user.id,
    });

    res.json({ message: 'Bid placed successfully', auction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error placing bid' });
  }
});

module.exports = router;
