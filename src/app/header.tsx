"use client";

import { Button } from "@/components/ui/button";
import {
    NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const session = useSession();
  const userId = session?.data?.user?.id;


  return (
    <div className="bg-amber-600 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:text-[#ffff] flex items-center">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            <span className="font-[600] text-[25px] pt-3">Bidder</span>
          </Link>
          <div className="flex items-center gap-8 font-[400] text-[18px] pt-3 ">
            <Link
              href="/"
              className="hover:text-[#020000] text-[#ffff] flex items-center"
            >
              All Auctions
            </Link>
            {userId && (
              <>
                <Link
                  href="/items/create"
                  className="hover:text-[#020000] text-[#ffff] flex items-center"
                >
                  Create Auction
                </Link>
                <Link
                  href="/auctions"
                  className="hover:text-[#020000] text-[#ffff] flex items-center"
                >
                  My Auctions
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
        {userId && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => (
                  <NotificationCell {...props} item={item}>
                    <div className="rounded-xl">
                      <Link
                        className="text-blue-400 hover:text=blue-500"
                        onClick={() => {
                          setIsVisible(false);
                        }}
                        href={`/items/${item?.data?.itemId}`}
                      >
                        Someone outbidded you on{" "}
                        <span className="font-bold">{item?.data?.itemName}</span>{" "}
                        by ₹{item?.data?.bidAmount}
                      </Link>
                    </div>
                  </NotificationCell>
                )}
              />
            </>
          )}

        {session?.data?.user?.image && (
            <Image
              src={session.data.user.image}
              width="40"
              height="40"
              alt="user avatar"
              className="rounded-full"
            />
          )}
        
        
          <div className="pt-2 font-[400] text-[#f7fcf8]">
            {session?.data?.user?.name}
          </div>
          <div>
            {userId ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type="submit" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
