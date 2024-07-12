import { items } from "@/db/schema";
import { database } from "@/db/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export default async function HomePage() {
const session = await auth();



const allItems = await database.query.items.findMany();

  return (
     <main className="container mx-auto py-12 space-y-8">

        <h1 className="text-4xl font-bold"> Items for Sale</h1>
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item) => (
            <div key={item.id} className="border p-8 rounded-xl">{item.name}
            startingPrice:-₹{item.startingPrice}</div>
          ))}
        </div>
       
  </main>
  );
}
