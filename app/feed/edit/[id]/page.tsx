import { Post } from "@/app/types";
import EditForm from "./EditForm";
import { getPosts } from "@/app/lib/posts.server";

export async function generateStaticParams() {
  const { posts } = await getPosts();

  return posts.map((post) => ({
    params: { id: post.id },
  }));
}

async function getPost(id: string) {
  const { posts } = await getPosts();
  return posts.find((post) => post.id === Number.parseInt(id));
}

export default async function EditFeedRoute({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return <EditForm post={post} />;
}
