import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (	
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-center font-mono text-sm sm:flex flex-col gap-2">
        <h1 className="text-xl mb-2 sm:mb-0">Welcome to <span className="font-bold whitespace-nowrap underline">Next-Twitter</span>!</h1>
		<p className="mb-2 sm:mb-0">A Twitter clone using Next 13.4 App Router.</p>
		<Link href='/feed' className='underline text-indigo-500'>
			Check out the app!
		</Link>
      </div>
    </main>
  );
}
