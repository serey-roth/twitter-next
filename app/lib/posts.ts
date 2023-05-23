import { prisma } from "@/prisma/database";
import { Post } from "@prisma/client";
import { cache } from "react";
import "server-only";

export const preload = (id: string) => {
  void getPost(id);
};

export const getPosts = cache(() => {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
});

export const getPost = cache((id: string) => {
  return prisma.post.findUnique({
    where: { id },
  });
});

export async function addPost(data: Pick<Post, "title" | "content">) {
  const post = await prisma.post.create({
    data,
  });
  return post;
}

export async function deletePost(id: string) {
  const post = await prisma.post.delete({ where: { id } });
  return post;
}

export async function editPost(
  id: string,
  newPost: Pick<Post, "title" | "content">
) {
  const post = await prisma.post.update({
    where: { id },
    data: newPost,
  });
  return post;
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
