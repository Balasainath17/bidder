import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { isBidOver } from "@/util/bids";
import { getImageUrl } from "@/util/files";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";



export function ItemCard({ item }: { item: Item }) {
  return (
    <div
      key={item.id}
      className="border p-4 md:p-8 rounded-xl space-y-2 flex flex-col mx-auto bg-[#a8f1f6] shadow-2xl max-w-xs md:max-w-sm"
    >
     <div className="flex justify-center items-center m-auto">
     <Image
        className="rounded-lg object-cover w-[200px] h-[200px]"
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={200}
        height={200}
      />
     </div>
      <h2 className="text-lg md:text-xl font-bold rounded-lg flex justify-center">
        {" "}
        {item.name}
      </h2>
      <p className="text-base md:text-lg">
        Current Price:-{" "}
        <span className="font-bold">
          ₹{item.startingPrice + item.currentBid}
        </span>{" "}
      </p>
      <p className="text-base md:text-lg">Available at:- <span className="font-bold">{item.location}</span> </p>
      {isBidOver(item) ? <Badge className="flex justify-center py-2" variant='destructive'>Auction Over</Badge> :
      <p className="text-base md:text-lg">
        Ends On:-{" "}
        <span className="text-[#cd0202ee] font-bold">
          {format(item.endDate, "dd/MM/yy")}
        </span>
      </p>
      }
      <div className="flex justify-center">
        <Button asChild variant={isBidOver(item) ? "outline" : "default"} className="items-center flex">
          <Link href={`/items/${item.id}`}>Explore</Link>
        </Button>
      </div>
    </div>
  );
}
