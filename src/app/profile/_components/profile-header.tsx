/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProfileHeader = ({
  user,
  user_id,
}: {
  user_id: string;
  user: {
    avatar: string;
    nickname: string;
  };
}) => {
  return (
    <div className="profile-header">
      <div className="header">
        <div className="stats-wrapper">
          <div className="rating">
            <div className="circle green">
              <div className="icon">
                <img src="https://csgo-rep.com/icon/arrow.svg" alt="Arrow" />
              </div>
              <span>42</span>
            </div>
            <div className="circle yellow">
              <div className="icon">
                <img src="https://csgo-rep.com/icon/dash.svg" alt="Dash" />
              </div>
              <span>0</span>
            </div>
          </div>
          <div className="avatar-placehold">
            <div className="inner positive">
              <img src={user.avatar} className="avatar" alt="User Avatar" />
            </div>
          </div>
        </div>
        <div className="info-wrapper">
          <h1 className="nickname">
            <span>{user.nickname}</span>
          </h1>
          <div className="profile-link">
            <input
              readOnly
              value={`https://steamcommunity.com/profiles/${user_id}/`}
            />
            <button>
              <img src="https://csgo-rep.com/icon/copy.svg" alt="Copy" />
            </button>
          </div>
          <div className="profile-link">
            <input readOnly value={`https://csgo-2rep.me/profile/${user_id}`} />
            <button>
              <img src="https://csgo-rep.com/icon/copy.svg" alt="Copy" />
            </button>
          </div>
          <div className="info">
            <div className="el">
              <img
                src="https://csgo-rep.com/icon/handshake.svg"
                alt="Handshake"
              />
              <strong>Done deals:</strong>
              <span>42</span>
            </div>
          </div>
          <div className="linked-accounts">
            <span>Linked accounts:</span>
            <a
              href={`https://steamcommunity.com/profiles/${user_id}`}
              rel="nofollow noopener"
              target="_blank"
            >
              <div className="social steam">
                <img src="https://csgo-rep.com/icon/social/steam.svg" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
