/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <a href="https://csgo-rep.com" id="logo"></a>
      <nav>
        <a href="https://csgo-rep.com" className="browseBTN">
          Browse
        </a>
        <Link href="/" className="myprofile active">
          Profile
        </Link>
        <a href="https://csgo-rep.com/faq" className="FAQ">
          FAQ
        </a>
        <a href="https://csgo-rep.com/contact" className="nav-cont">
          Contact
        </a>
      </nav>
      <div className="hamburger-wrapper">
        <Link
          href="https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=https%3A%2F%2Fcsgo-rep.com%2Flogin&openid.realm=https%3A%2F%2Fcsgo-rep.com"
          className="signBtn"
        >
          <img
            src="https://csgo-rep.com/login.png"
            className="steam-login"
            alt="Login"
          />
        </Link>
        <button className="hamburger hamburger--spin" type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
