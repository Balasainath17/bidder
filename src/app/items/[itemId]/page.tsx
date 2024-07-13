import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { pageTitlestyles } from "@/styles";
import { getImageUrl } from "@/util/files";
import { formatDistance, subDays } from "date-fns";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";


function formatTimeStamp(timeStamp: Date) {
   return formatDistance(timeStamp, new Date(), { addSuffix: true });
//=> "3 days ago"
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <Image
          className="pt-8"
          src="/package.svg"
          width="300"
          height="300"
          alt="Package"
        />
        <h1 className={pageTitlestyles}>Item not found</h1>
        <p className="text-[18px] text-justify">
          The item you&apos;re trying to view is invalid. Please search for a
          different auction item.
        </p>
        <Button asChild>
          <Link href={`/`}>View Auctions</Link>
        </Button>
      </div>
    );
  }

//   const bids =[
//     { id: 1, amount: 1000, bidder: "User 1", username: "user1",timeStamp: new Date(), },
//     { id: 2, amount: 1500, bidder: "User 2", username: "user2",timeStamp: new Date(), },
//     { id: 3, amount: 2000, bidder: "User 3", username: "user3",timeStamp: new Date(), },
//     { id: 4, amount: 2500, bidder: "User 4", username: "user4",timeStamp: new Date(), },
//     { id: 5, amount: 3000, bidder: "User 5", username: "user5",timeStamp: new Date(), },
//     { id: 6, amount: 3500, bidder: "User 6", username: "user6",timeStamp: new Date(), },
//     { id: 1, amount: 1000, bidder: "User 1", username: "user1",timeStamp: new Date(), },
//     { id: 2, amount: 1500, bidder: "User 2", username: "user2",timeStamp: new Date(), },
//     { id: 3, amount: 2000, bidder: "User 3", username: "user3",timeStamp: new Date(), },
//     { id: 4, amount: 2500, bidder: "User 4", username: "user4",timeStamp: new Date(), },
//     { id: 5, amount: 3000, bidder: "User 5", username: "user5",timeStamp: new Date(), },
//     { id: 6, amount: 3500, bidder: "User 6", username: "user6",timeStamp: new Date(), }
//   ]


const bids = [];

const hasBids = bids.length > 0;

  return (
    <main className="space-y-8">
      <div className="flex gap-12">
        <div className="space-y-4 w-[50%] flex flex-col items-center pt-8">
          <h1 className="text-4xl font-bold text-black">
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            className="bg-slate-200 rounded-xl"
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={300}
            height={300}
          />
          <div className="text-xl space-y-4">
            <div>
                Starting Price of{" "}
                <span className="font-bold">₹{item.startingPrice}</span>
            </div>
            <div>
                Bid Interval- <span className="font-bold">₹{item.bidInterval}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-bold">Current Bids</h2>

    {hasBids ? (
         <ul className="space-y-4">
         {bids.map((bid) => (
             <li key={bid.id} className="bg-slate-400 rounded-xl p-6">
                 <div className="flex gap-4">
                     <div >
                         <span className="font-bold">₹{bid.amount}</span> by {" "}
                         <span className="font-bold">{bid.username}</span>
                     </div>
                     <div> {formatTimeStamp(bid.timeStamp)}</div>
                 </div>
             </li>
         ))}
     </ul>
     ) : (
        <div className="gap-8 flex flex-col items-center  p-12">
            <Image className="" src="/package.svg" width="300" height="300" alt="Package" />
            <h2 className="text-xl font-semibold">No Bids Yet</h2>
            <Button>Place a Bid</Button>
        </div>
     )}

           
        </div>
      </div>
    </main>
  );
}
