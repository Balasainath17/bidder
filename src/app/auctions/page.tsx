import { database } from "@/db/database";
import { ItemCard } from "@/app/item-card";
import { auth } from "@/auth";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EmptyState } from "./empty-state";
import { pageTitlestyles } from "@/styles";
import Image from "next/image";

export default async function MyAuctionsPage() {
    const session = await auth();

    if(!session || !session.user) {
        return (
            <div className="flex flex-col items-center justify-center space-y-8">
              <Image
                className="pt-8"
                src="/loggedout.png"
                width="300"
                height="300"
                alt="Package"
              />
              <h1 className={pageTitlestyles}>User found Logged Out</h1>
              <p className="text-[18px]">
                Kindly Sign In to view your Auctions.
              </p>
            </div>
          );
    }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!)
});

const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      <h1 className={pageTitlestyles}>Your Current Auctions</h1>
      {hasItems? (
      <div className="grid grid-cols-4 gap-8">
         { allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        ) : (
            <EmptyState />
        )}
        
     
    </main>
  );
}
