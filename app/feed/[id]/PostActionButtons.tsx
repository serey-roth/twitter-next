"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type PostActionButtonsProps = {
  postId?: number;
};

async function deletePost(id: number) {
  return fetch(`/feed/api/${id}`, {
    method: "delete",
  });
}

export default function PostActionButtons({ postId }: PostActionButtonsProps) {
  const router = useRouter();

  const handleDeletePost = async () => {
    if (!postId) return;
    await deletePost(postId);
    router.push("/feed");
  };

  return (
    <div className="flex items-center mt-2 gap-2">
      <Link href={`/feed/edit/${postId}`}>
        <button
          type="button"
          className="px-2 py-1 rounded-md bg-blue-500 text-white"
        >
          Edit
        </button>
      </Link>
      <button
        type="button"
        className="px-2 py-1 rounded-md bg-red-500 text-white"
        onClick={handleDeletePost}
      >
        Delete
      </button>
    </div>
  );
}
