import { promises as fs } from "fs";
import path from "path";
import { Card } from "./Card";
import Link from "next/link";
import { Posts } from "../types";
import { getPosts } from "../lib/posts.server";

export default async function FeedRoute() {
  const data = await getPosts();

  return (
    <>
      <Link
        href="/feed/new"
        className="absolute right-0 bg-indigo-500 transition-all sm:rounded-l-full sm:rounded-r-full w-7 h-7 text-center rounded-full text-white drop-shadow-sm sm:w-fit sm:h-auto sm:px-3 sm:py-1"
      >
        <span className="sm:block hidden">Add Post</span>
        <span className="sm:hidden block text-lg">+</span>
      </Link>
      <div className="flex flex-col lg:grid grid-cols-3 auto-rows-fr gap-2 mt-4">
        {data.posts.map((post) => (
          <Card key={post.id} {...post}/>
        ))}
      </div>
    </>
  );
}
