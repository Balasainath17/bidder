import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";


export async function Header() {
const session = await auth();

    return <div className="bg-amber-600 py-2">
        <div className="container flex justify-between items-center">
            <div className="flex items-center gap-12">
                <Link href="/" className="hover:text-[#ffff] flex items-center">
                    <Image src="/logo.png" width="50" height="50" alt="Logo" />
                    <span className="font-[600] text-[25px] pt-3">Bidder</span>
                </Link>
                <div>
                    <Link href="/items/create" className="hover:text-[#020000] text-[#ffff] flex items-center">
                        <span className="font-[400] text-[18px] pt-3 ">Auction an Item</span>
                    </Link>
                </div>
                
            </div>
                
            <div className="pt-2 flex gap-4">
                <div className="pt-2 font-[400] text-[#f7fcf8]">{session?.user?.name}</div>
                <div>{session? <SignOut/> : <SignIn/>}</div>
            </div>
        </div>
    </div>
}