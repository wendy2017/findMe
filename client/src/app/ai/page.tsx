import Image from "next/image";
import Logo from "../../../public/web3.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StoreWriter from "@/app/(components)/StoreWriter";

const AIShow = () => {
  return (
    <main className="flex flex-col">
      <section className="h-96 grid gird-1 gird-cols-1 lg:grid-cols-2 gap-4">
        <StoreWriter />

        {/* display the result of ai generate */}
        <div className="flex flex-col items-center justify-center space-y-4 bg-blue-50 pb-10">
          <Image src="/web3.png" alt="logo" width={120} height={120} />
          <Button asChild className="px-10 bg-blue-500 p-6 text-md">
            <Link href="stories">Explor Story Lib</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};
export default AIShow;
