import React from "react";

const Summary = () => {
  return (
    <div className="summary">
      <div className="summary-wrapper">
        <div className="el">
          <div className="social paypal">
            <img src="https://csgo-rep.com/icon/payment/usdt.svg" alt="USDT" />
          </div>
          <strong>Cash deals:</strong>
          <span>28</span>
        </div>
        <div className="el">
          <div className="social bitcoin">
            <img src="https://csgo-rep.com/icon/payment/btc.svg" alt="BTC" />
          </div>
          <strong>Crypto deals:</strong>
          <span>14</span>
        </div>
        <div className="el">
          <div className="social buff">
            <img src="https://csgo-rep.com/icon/social/buff.svg" alt="Buff" />
          </div>
          <strong>Balance deals:</strong>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
