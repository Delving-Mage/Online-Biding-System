export const ProductDescription = ({ itemDescription }) => {
  return (
    <>
      <div>
        Description
        <p>{itemDescription}</p>
      </div>
      <div>
        Reviews
        {reviewData.map((data, i) => (
          <React.Fragment key={i}>
            {/* display stars as per number */}
            <div>{data.star}</div>
            <div>{data.review}</div>
            <div>
              {data.name} <p>{data.date}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        {bidHistory.map((e) => (
          <ul>
            <li>{e.bid}</li>
          </ul>
        ))}
        <button>{`Bid now >`}</button>
      </div>
    </>
  );
};
