"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction, createUploadUrlAction } from "./actions";
import { pageTitlestyles } from "@/styles";
import { DatePickerDemo } from "@/components/date-picker";
import React, { useState } from "react";
import { isBefore, parseISO, startOfHour } from "date-fns";

export default function CreatePage() {
  const [date, setDate] = useState<Date | undefined>();

 



  return (
    <main className="space-y-8 container mx-auto py-12">
      <h1 className={pageTitlestyles}>Post an Item</h1>
      <form
        className="flex flex-col  border p-8 rounded-xl space-y-4 max-w-lg shadow-2xl bg-[#c4c4ef]"
        onSubmit={async (e) => {
          e.preventDefault();

          if(!date){
            return;
          }

          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
          });

          await createItemAction({
            name: formData.get("name") as string,
            location: formData.get("location") as string,
            startingPrice: Number(formData.get("startingPrice") as string),
            fileName: file.name,
            bidInterval: Number(formData.get("Bid Interval") as string),
            endDate: date,
          });
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
         <Input
          required
          className="max-w-lg"
          name="location"
          placeholder="Location of the item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          placeholder="Starting Auction Price"
        ></Input>
        <Input type="file" name="file"></Input>
        <Input
          required
          className="max-w-lg"
          name="Bid Interval"
          type="number"
          placeholder="Bid Interval Price"
        ></Input>
        <div  className={
          "flex h-10 w-full   py-2 text-sm   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}>
        <DatePickerDemo 
        date={date}  setDate={setDate} />
        </div>
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
