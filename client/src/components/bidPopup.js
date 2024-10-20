import { useState } from "react";

export const BidPopup = ({ itemName, minBid, currBid, expiryTime,setBidPopFlag }) => {
  const [straightBid, setStraightBid] = useState(0);
  const [maxBid, setMaxBid] = useState(0);
  const [bidFlag, setBidFlag] = useState(false);
  return (
    <div>
      <div>
        <p>Submit Bid | {itemName}</p>
        <button onClick={()=> setBidPopFlag(false)}>x</button>
      </div>
      <hr />
      {!bidFlag ? (
        <div>
          <div>
            <label>Straight bid</label>
            <input onChange={(e)=>setStraightBid(parseInt(e.target.value))} value={straightBid} />
            <div>
              <button onClick={()=>setStraightBid((e)=>e-1)}>-</button>
              <button onClick={()=>setStraightBid((e)=>e+1)} >+</button>
            </div>
          </div>
          <div>
            <label>Maximum bid</label>
            <input value={`$${maxBid}`} />
            <div>
              <button>-</button>
              <button>+</button>
            </div>
          </div>
          <div>
            <div>Minimum bid</div>
            <div>{minBid}</div>
            <div>Current bid</div>
            <div>{currBid}</div>
            <div>Ends in :</div>
            <div>{expiryTime}</div>
          </div>
          <div>
            <button onClick={() => setBidFlag(true)}>{`Submit >`}</button>
          </div>
        </div>
      ) : (
        <div>
          {/* tick icon */}
          Bid submitted successfully!
          <p>Thank you!</p>
        </div>
      )}
    </div>
  );
};
