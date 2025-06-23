import React from "react";

const TransactionFilter = () => {
  return (
    <div className="feedback-type">
      <button className="btn-select active">Received feedback</button>
      <button className="btn-select">Given feedback</button>
    </div>
  );
};

export default TransactionFilter;
