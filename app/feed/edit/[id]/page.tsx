import { Post } from "@/app/types";
import EditForm from "./EditForm";
import { getPost, getPosts } from "@/app/lib/posts";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    params: { id: post.id },
  }));
}

export default async function EditFeedRoute({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  return <EditForm post={post} />;
}
