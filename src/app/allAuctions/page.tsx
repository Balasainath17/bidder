import { database } from "@/db/database";
import { ItemCard } from "../item-card";
import { pageTitlestyles } from "@/styles";

export default async function HomePage() {

  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8 container mx-auto py-12">
      <h1 className={pageTitlestyles}> Items for Sale</h1>
      <div className="grid grid-cols-1 600px:grid-cols-2 900px:grid-cols-3 lg:grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
