import { Button } from "@/components/ui/button";
import { pageTitlestyles } from "@/styles";
import { getImageUrl } from "@/util/files";
import { format, formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { createBidAction } from "./actions";
import { getBidsforItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
import { auth } from "@/auth";
import { isBidOver } from "@/util/bids";
import { Badge } from "@/components/ui/badge";

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
          className="pt-8 object-cover w-[300px] h-[300px]"
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
          <Link href={`/allAuctions`}>View Auctions</Link>
        </Button>
      </div>
    );
  }

  const allBids = await getBidsforItem(item.id);

  const hasBids = allBids.length > 0;

  const canPlaceBid = session && item.userId !== session.user?.id;

  return (
    <main className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="space-y-4 w- h-min  lg:w-[40%] flex flex-col items-center p-4 bg-[#c4c4ef] shadow-2xl rounded-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-black text-center">
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <h2 className="text-md md:text-xl text-center">Available at <span className="font-bold">{item.location}</span> </h2>
         <div className="p-2">
         <Image
            className="bg-slate-200 rounded-xl"
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={250}
            height={250}
          />
         </div>
          <div className="text-lg md:text-xl space-y-2">
            <div>
              Current Price :-{" "}
              <span className="font-bold">
                ₹{item.startingPrice + item.currentBid}
              </span>
            </div>
            <div>
              Starting Price :-{" "}
              ₹{item.startingPrice}
            </div>
            <div>
              Bid Interval-{" "}
              <span className="font-bold">₹{item.bidInterval}</span>
            </div>
            <div>
              {isBidOver(item) ? (
               <Badge className="flex justify-center py-2" variant='destructive'>Auction Over</Badge>
              ) : (
                <p className="text-lg">
                  Ends On:-{" "}
                  <span className="text-[#cd0202ee] font-bold">
                    {format(item.endDate, "dd/MM/yy")}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold pt-2">Current Bids</h2>
            {canPlaceBid && !isBidOver(item) && (
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place a Bid</Button>
              </form>
            )}
          </div>

          {hasBids ? (
            <ul className="space-y-4">
              {allBids.map((bid) => (
                <li key={bid.id} className="bg-slate-400 rounded-xl p-4 ml-8">
                  <div className="flex items-center space-x-4">
                    {/* <div className="width-[50] height-[50] rounded-3xl">{bid.user.image}</div> */}
                    <div>
                      <span className="font-bold">₹{bid.amount}</span> by{" "}
                      <span className="font-bold">{bid.user.name}</span>
                    </div>
                    
                  </div>
                  <div>
                  <small className="pl-6"> • {formatTimeStamp(bid.timeStamp)}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center p-8">
              <Image
                className=""
                src="/package.svg"
                width="300"
                height="300"
                alt="Package"
              />
              <h2 className="text-lg md:text-xl font-semibold">No Bids Yet</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
