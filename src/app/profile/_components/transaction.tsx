/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Transaction = ({
  tradeTime,
  amount,
  buyer_avatar,
  buyer_nickname,
  buyer_steamid64,
  comment,
  payment_method,
}: {
  amount: number;
  buyer_avatar: string;
  buyer_nickname: string;
  buyer_steamid64: string;
  comment: string;
  payment_method: string;
  tradeTime: string;
}) => {
  const svgSource =
    payment_method.includes("Paypal") || payment_method.includes("paypal")
      ? "https://csgo-rep.com/icon/payment/paypal.svg"
      : payment_method.includes("litecoin")
      ? "https://csgo-rep.com/icon/payment/ltc.svg"
      : payment_method.includes("e-transfer") || payment_method.includes("cash")
      ? "https://csgo-rep.com/icon/payment/cash.svg"
      : payment_method.includes("bitcoin")
      ? "https://csgo-rep.com/icon/payment/btc.svg"
      : payment_method.includes("USDT")
      ? "https://csgo-rep.com/icon/payment/usdt.svg"
      : payment_method.includes("bank wire")
      ? "https://csgo-rep.com/icon/payment/bank.svg"
      : payment_method.includes("Zelle")
      ? "https://csgo-rep.com/icon/payment/zelle.svg"
      : "https://csgo-rep.com/icon/payment/unknown.svg";

  return (
    <div className="el status_1">
      <div className="recommendations">
        <div className="nickname">{buyer_nickname}</div>
      </div>
      <div className="avatar">
        <Link
          href={`https://csgo-rep.com/profile/${buyer_steamid64}`}
          className="hover"
          target="_blank"
          rel="noreferrer"
        >
          View Profile
        </Link>
        <img src={buyer_avatar} className="positive" />
        <img
          className="trade-position position-1"
          src="https://csgo-rep.com/icon/trade_first.svg"
        />
      </div>
      <div className="status positive">
        <img src="https://csgo-rep.com/icon/arrow.svg" />
      </div>
      <div className="content">
        <div className="flex gap-1 transaction-title">
          <strong>Transaction:</strong>
          <span>Sold CS:GO item for</span>
          <span className="price-green">${amount}</span>
          <span> by</span>
          <span className="price-green">{payment_method}</span>
        </div>
        <p>{comment}</p>
      </div>
      <div className="icons">
        <img src={svgSource} />
      </div>
      <div className="details">
        <div className="comment-number">{tradeTime}</div>
      </div>
    </div>
  );
};

export default Transaction;
