"use server";

import path from "path";
import { promises as fs } from "fs";
import { Post, Posts } from "../types";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const jsonPath = path.join(process.cwd(), "/app/feed/posts.json");

export async function getPosts() {
  const data = await fs.readFile(jsonPath, "utf-8");
  return JSON.parse(data) as Posts;
}

export async function getPost(id: number) {
  const { posts } = await getPosts();
  return posts.find((post) => post.id === id);
}

export async function addPost(data: Post) {
  const fileData = await getPosts();
  await fs.writeFile(
    jsonPath,
    JSON.stringify({
      posts: [
        ...fileData.posts,
        {
          id: fileData.posts.length + 1,
          title: data.title,
          content: data.content,
        },
      ],
    })
  );
}

export async function deletePost(id: number) {
  const fileData = await getPosts();
  await fs.writeFile(
    jsonPath,
    JSON.stringify({
      posts: fileData.posts.filter((post) => post.id !== id),
    })
  );
}

export async function editPost(id: number, newPost: Post) {
  const { posts } = await getPosts();
  await fs.writeFile(
    jsonPath,
    JSON.stringify({
      posts: posts.map((post) =>
        post.id === id
          ? {
              ...post,
              ...newPost,
            }
          : post
      ),
    })
  );
}

// function withValidate<TValues, TErrors>(
//   action: (data: TValues) => Promise<void>,
//   verifyData: (data: FormData) => TErrors | undefined,
//   process: (data: FormData) => TValues
// ) {
//   return (data: FormData) => {
//     "use server";
//     const validationResult = verifyData(data);
//     if (validationResult !== undefined) {
//       return validationResult;
//     }
//     action(process(data));
//   };
// }

// export async function processPostFromFormData(data: FormData): Promise<Post> {
//   return {
//     title: data.get("title")?.toString() ?? "",
//     content: data.get("content")?.toString() ?? "",
//   };
// }

// export async function validatePost(post: Post): Promise<{
//   post: Post;
//   errors:
//     | {
//         title?: string;
//         content?: string;
//       }
//     | undefined;
// }> {
//   if (!post.title || !post.content) {
//     return {
//       post,
//       errors: {
//         title: !post.title ? "Title is required!" : undefined,
//         content: !post.content ? "Content is required" : undefined,
//       },
//     };
//   }
//   const errors: {
//     title: string | undefined;
//     content: string | undefined;
//   } = {
//     title: undefined,
//     content: undefined,
//   };
//   if (post.title.length < 5) {
//     errors.title = "Title must be at least 3 characters long!";
//   }
//   if (post.content.length > 50) {
//     errors.content = "Content must be at most 50 characters long!";
//   }
//   if (Object.values(errors).some(Boolean)) {
//     return {
//       post,
//       errors,
//     };
//   }
//   return {
//     post,
//     errors: undefined,
//   };
// }
