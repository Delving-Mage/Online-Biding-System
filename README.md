🛒 Online Bidding System (https://online-biding-system.netlify.app)

Welcome to the Online Bidding System! A fully responsive web application for participating in auctions in real-time. Sellers can list items for auction, and buyers can place bids until the auction ends, with notifications to ensure an engaging experience.

✨ Features
📅 Create and Manage Auctions: Sellers can list items for auction, including descriptions, images, and starting bids.
⚡ Real-Time Bidding: Buyers can place bids on auction items with real-time updates for all participants.
🛡️ User Authentication: Secure user login and registration using JWT.
🏷️ Bid History: Track all bid activity for each auction item.
📱 Responsive Design: Fully optimized for desktop and mobile use.


🚀 Setup and Installation

1. Clone the repository
git clone https://github.com/YourUsername/online-biding-system.git

3. Install dependencies for both client and server
Navigate to the client folder:
cd online-biding-system/client
npm install

Navigate to the server folder:
cd online-biding-system/server
npm install

3. Configure environment variables
Create a .env file in the server folder and add the following:
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-secret-key

5. Run the servers
Start the server:
cd server
npm start

Start the client:
cd client
npm start

5. Open the application
Frontend: http://localhost:3000
Backend: http://localhost:5001


📝 Usage
Register as a new user or log in to your account.
Browse auctions and place bids on your favorite items.
Create new auctions if you’re a seller, providing images, descriptions, and starting bids.
Get real-time notifications if your bid is outbid.


🤝 Contributing
We welcome contributions! Feel free to submit pull requests, and for major changes, please open an issue first to discuss what you would like to change.


📄 License
This project is licensed under the MIT License.
