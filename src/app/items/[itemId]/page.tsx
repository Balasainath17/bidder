import { Button } from "@/components/ui/button";
import { pageTitlestyles } from "@/styles";
import { getImageUrl } from "@/util/files";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { createBidAction } from "./actions";
import { getBidsforItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
import { auth } from "@/auth";


function formatTimeStamp(timeStamp: Date) {
   return formatDistance(timeStamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {

  const session = await auth();
  const item = await getItem(parseInt(itemId));

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

const allBids = await getBidsforItem(item.id);


const hasBids = allBids.length > 0;

const canPlaceBid = session && item.userId !== session.user?.id;

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
                Current Price :- {" "}
                <span className="font-bold">₹{item.startingPrice+item.currentBid}</span>
            </div>
            <div>
                Starting Price :- {" "}
                <span className="font-bold">₹{item.startingPrice}</span>
            </div>
            <div>
                Bid Interval- <span className="font-bold">₹{item.bidInterval}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-1">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Current Bids</h2>
              {canPlaceBid && (
                <form action={createBidAction.bind(null, item.id)}>
                  <Button>Place a Bid</Button>
                </form>
               )}
            </div>

    {hasBids ? (
         <ul className="space-y-4">
         {allBids.map((bid) => (
             <li key={bid.id} className="bg-slate-400 rounded-xl p-6">
                 <div className="flex gap-4">
                    {/* <div className="width-[50] height-[50] rounded-3xl">{bid.user.image}</div> */}
                     <div >
                         <span className="font-bold">₹{bid.amount}</span> by {" "}
                         <span className="font-bold">{bid.user.name}</span>
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
        </div>
     )}

           
        </div>
      </div>
    </main>
  );
}
