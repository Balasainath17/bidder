import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createIteAction } from "./actions";

export default async function CreatePage() {


  return (
     <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form className="flex flex-col  border p-8 rounded-xl space-y-4 max-w-lg"
        action={createIteAction}
        >
          <Input required className="max-w-lg" name="name" placeholder="Name your item" />
          <Input required className="max-w-lg" name="startingPrice" type="number" placeholder="starting Auction Price" ></Input>
          <Button className="self-end" type="submit">Post Item</Button>

        </form>
  </main>
  );
}
