"use client";
import Link from "next/link";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import Listing from "./_components/Listing";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CSFloatPage() {
  const [listings, setListings] = useState<any[]>([]);

  const {
    trigger: triggerScrape,
    isMutating,
    error,
  } = useSWRMutation("/api/scrape", fetcher, {
    onSuccess: (newData) => {
      if (newData?.data) {
        setListings((prev) => {
          const combined = [...newData.data, ...prev.slice(0, 100)];
          const unique = Array.from(
            new Map(combined.map((item) => [item.profileUrl, item])).values()
          );
          return unique.slice(0, 100);
        });
      }
    },
  });
  console.log(listings);
  return (
    <div className="p-6 h-full min-h-[100svh] px-40 bg-[url('https://csgo-rep.com/bg.jpg')] bg-cover bg-center">
      <button
        className="cursor-pointer text-4xl my-10 text-white"
        onClick={() => triggerScrape()}
        disabled={isMutating}
      >
        Refresh Listings
      </button>

      {isMutating && (
        <p className="text-xl text-white w-full h-full flex justify-center items-center">
          Loading...
        </p>
      )}

      <div className="flex flex-col w-full gap-4 text-gray-300">
        {listings.map((item: any) => (
          <Listing item={item} key={item.id || item.name + item.float} />
        ))}
      </div>
    </div>
  );
}
