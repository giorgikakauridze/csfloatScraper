import React from "react";
import Transaction from "./transaction";
import trades from "../../../../trades.json";
import { formatDate, subDays } from "date-fns";

const TransactionList = () => {
  let totalDays = 0;

  return (
    <div className="records">
      <div className="list history">
        <div className="header">
          <h2>Transaction history:</h2>
          <div className="filter">
            <div className="select-box">
              <div className="header">
                <div className="title">Filter:</div>
              </div>
              <div className="buttons-wrapper">
                <div className="btn-select active">
                  <img src="https://csgo-rep.com/icon/cross.svg" alt="Cross" />
                  <span></span>
                </div>
                <div className="btn-select">
                  <img
                    src="https://csgo-rep.com/icon/social/buff.svg"
                    alt="Buff"
                  />
                  <span></span>
                </div>
                <div className="btn-select">
                  <img
                    src="https://csgo-rep.com/icon/payment/btc.svg"
                    alt="BTC"
                  />
                  <span></span>
                </div>
                <div className="btn-select">
                  <img
                    src="https://csgo-rep.com/icon/payment/cash.svg"
                    alt="Cash"
                  />
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="sort">
            <span>Sort by:</span>
            <select>
              <option value="id,DESC">date descending</option>
            </select>
          </div>
        </div>
        <div className="record-content">
          {trades.map((trade, index) => {
            const randomGap = Math.floor(Math.random() * (14 - 7 + 1)) + 7;

            totalDays += randomGap;
            const tradeDay =
              formatDate(subDays(new Date(), totalDays), "yyyy-MM-dd") +
              " | #" +
              Math.random().toString(36).substring(2, 7);

            return (
              <Transaction
                amount={trade.amount}
                payment_method={trade.payment_method}
                tradeTime={tradeDay}
                buyer_steamid64={trade.buyer_steamid64}
                buyer_nickname={trade.buyer_nickname}
                buyer_avatar={trade.buyer_avatar}
                key={index}
                comment={trade.comment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
