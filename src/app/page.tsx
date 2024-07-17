import { database } from "@/db/database";
import { pageTitlestyles } from "@/styles";

export default async function HomePage() {

  const allItems = await database.query.items.findMany();

  return (
    <div className="w-[100%]  hero_animation m-auto flex justify-center items-center min-h-screen translate-y-0 opacity-100 transition-all duration-1000 ease-in-out">
            <div className="w-[90%] 800px:w-[80%]">
                <h1 className=" text-[#000000c7] text-[30px] mx-auto w-full 1000px:text-[50px] font-[900] font-Josefin py-2 1000px:leading-[75px] text-center">
                Elevate Your Bidding Experience, 
                <br />
                Exclusively with <span className="hero_title">Bidder&apos;s Elite</span>..!
                </h1>
                <div className="w-full text-center">
                    <p className=" block font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[25px] font-normal  text-black  mt-5 mb-10">
                    Join our vibrant auction platform where you can easily sell your products to eager bidders and discover amazing items at unbeatable prices. Whether buying or selling, experience the excitement of auctions like never before!
                    </p>
                    <div className="flex w-full justify-center font-Poppins font-[600]">
                        <a href="/allAuctions">
                            <div className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#ff9421] min-h-[45px] w-full text-[16px] font-Poppins font-semibold">
                            Explore Auctions
                            </div>
                        </a>

                    </div>
                </div>

            </div>
        </div>

  );
}
