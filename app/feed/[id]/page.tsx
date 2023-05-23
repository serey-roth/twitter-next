import { deletePost, getPost, getPosts } from "@/app/lib/posts";
import PostActionButtons from "./PostActionButtons";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    params: { id: post.id },
  }));
}

export default async function PostRoute({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);
  return (
    <div>
      <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded-md">
        <h1 className="text-xl border-b-2 border-b-gray-200">
          {post?.title ?? "TITLE"}
        </h1>
        <p className="text-sm">{post?.content || "CONTENT"}</p>
      </div>
      <PostActionButtons postId={post?.id} />
    </div>
  );
}
