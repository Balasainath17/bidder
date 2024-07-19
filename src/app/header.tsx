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
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const notifButtonRef = useRef(null);

  const session = useSession();
  const userId = session?.data?.user?.id;

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative mb-20">
      <div className="items-center justify-center fixed top-0 inset-x-0   w-full flex h-20 border-b   bg-[#081e3d] border-[#ffffff1c] z-[999] shadow  ">
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href="/"
                className="hover: text-[#ffff] flex items-center"
              >
                <span className="font-[600] text-[18px] md:text-[25px] text-gradient ">Bidder&apos;s Elite</span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="hidden 1000px:flex space-x-6">
                <Link
                  href="/"
                  className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
                >
                  Home
                </Link>
                <Link
                  href="/allAuctions"
                  className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
                >
                  All Auctions
                </Link>
                {userId && (
                  <>
                    <Link
                      href="/items/create"
                      className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
                    >
                      Create Auction
                    </Link>
                    <Link
                      href="/auctions"
                      className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
                    >
                      My Auctions
                    </Link>
                  </>
                )}

                {userId && (
                  <>
                   
                    <div className="pt-1.5 text-white hover:text-[#fff94bf7]">
                      <NotificationIconButton
                        ref={notifButtonRef}
                        onClick={(e) => setIsVisible(!isVisible)}
                      />
                    </div>
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
                              <span className="font-bold">
                                {item?.data?.itemName}
                              </span>{" "}
                              by ₹{item?.data?.bidAmount}
                            </Link>
                          </div>
                        </NotificationCell>
                      )}
                    />
                     {session?.data?.user?.image && (
                      <Image
                        src={session.data.user.image}
                        width="40"
                        height="40"
                        alt="user avatar"
                        className="rounded-full"
                      />
                    )}
                  </>
                )}

                {/* <div className="pt-2 font-[400] text-[#f7fcf8]">
                    {session?.data?.user?.name}
                    </div> */}
                <div>
                  {userId ? (
                    <Button className="bg-white text-black font-bold hover:bg-[#e13f2d]"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Button className="bg-white text-black font-bold hover:bg-[#92ef53]" type="submit" onClick={() => signIn()}>
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex p-4 space-x-4 1000px:hidden">
                {userId && (
                  <>
                   
                    <div className="pt-1.5 text-white hover:text-[#fff94bf7]">
                      <NotificationIconButton
                        ref={notifButtonRef}
                        onClick={(e) => setIsVisible(!isVisible)}
                      />
                    </div>
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
                              <span className="font-bold">
                                {item?.data?.itemName}
                              </span>{" "}
                              by ₹{item?.data?.bidAmount}
                            </Link>
                          </div>
                        </NotificationCell>
                      )}
                    />
                     {session?.data?.user?.image && (
                      <Image
                        src={session.data.user.image}
                        width="40"
                        height="40"
                        alt="user avatar"
                        className="rounded-full"
                      />
                    )}
                  </>
                )}
              </div>
              <div className="1000px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-white"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4"></div>
        </div>
      </div>

      {openSidebar && (
        <div
          className="fixed w-full h-screen top-0 left-0 z-[99999]   bg-[#00000024]"
          onClick={handleClose}
          id="screen"
        >
          <div className="w-[60%] max-w-[250px] 1000px:hidden fixed z-[999999999] mt-20 h-[350px] bg-[#081e3d]  rounded-b-3xl top-0px right-0">
            <div className="100px:hidden mt-12 px-12 space-y-4">
              <Link
                href="/"
                className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
              >
                Home
              </Link>
              <Link
                href="/allAuctions"
                className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
              >
                All Auctions
              </Link>
              {userId && (
                <>
                  <Link
                    href="/items/create"
                    className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
                  >
                    Create Auction
                  </Link>
                  <Link
                    href="/auctions/myAuctions"
                    className=" hover:text-[#fff94bf7]  text-[#ffff] flex items-center"
                  >
                    My Auctions
                  </Link>
                </>
              )}

              {/* {userId && (
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
                              <span className="font-bold">
                                {item?.data?.itemName}
                              </span>{" "}
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
                )} */}

              {/* <div className="pt-2 font-[400] text-[#f7fcf8]">
                    {session?.data?.user?.name}
                    </div> */}
              <div>
                {userId ? (
                  <Button className="bg-white text-black font-bold hover:bg-[#e13f2d]"
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button className="bg-white text-black font-bold hover:bg-[#92ef53]" type="submit" onClick={() => signIn()}>
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
