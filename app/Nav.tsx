import Link from "next/link";

export function Nav() {
  return (
    <div className="w-full flex items-center p-2 bg-white shadow-md shadow-gray-300">
      <h1 className="font-medium">Next-Twitter</h1>
      <nav className="sm:block hidden ml-auto">
        <ul className="flex items-center list-none gap-2">
          <li className="underline hover:text-indigo-500">
            <Link href="/">Home</Link>
          </li>
          <li className="underline hover:text-indigo-500">
            <Link href="/feed">Feed</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
