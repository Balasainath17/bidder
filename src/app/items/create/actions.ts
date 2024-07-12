'use server'

import { revalidatePath } from "next/cache";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function createIteAction(formData: FormData) {
    const session = await auth();

    if(!session) {
        throw new Error("unauthorized");
    }

    const user = session.user;
    if(!user || !user.id){
        throw new Error("unauthorized");
    }
  
        await database.insert(items).values({
          name: formData.get("name") as string,
          startingPrice: Number(formData.get("startingPrice")),
          userId: user.id,
        });
        redirect("/");
      }