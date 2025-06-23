import React from "react";

import "../../globals.css";
import ProfileHeader from "../_components/profile-header";
import Summary from "../_components/Summary";
import TransactionFilter from "../_components/TransactionFilter";
import Header from "../_components/header";
import TransactionList from "../_components/TransactionList";
import users from "../../../../profiles.json";
type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const user_id = params.id;
  const user = users[user_id as keyof typeof users];

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div id="app">
      <Header />
      <main>
        <div className="ps ps--active-y">
          <div id="subpage-profile" className="subpage">
            <ProfileHeader user={user} user_id={user_id} />
            <Summary />
            <TransactionFilter />
            <TransactionList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
