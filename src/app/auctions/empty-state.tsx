import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export function EmptyState() {
    return ( 
        <div className="space-y-8 flex flex-col items-center justify-center">
            <Image className="pt-8" src="/package.svg" width="300" height="300" alt="Package" />
            <h2>You have no Auctions</h2>
            <Button asChild>
                <Link href="/items/create">Create Auction</Link>
            </Button>
        </div>
     );
    
}