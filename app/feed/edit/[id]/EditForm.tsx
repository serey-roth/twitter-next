"use client";

import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

async function editPost(id: string, newPost: Post) {
  const result = await fetch(`/feed/api/${id}`, {
    method: "put",
    body: JSON.stringify(newPost),
  }).then((res) => res.json());
  return result as {
    post?: Pick<Post, "title" | "id" | "content">;
    errors?: {
      title?: string[];
      content?: string[];
    };
  };
}

export default function EditForm({
  post,
}: {
  post: Pick<Post, "title" | "id" | "content"> | null;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Post>({
    defaultValues: {
      title: post?.title ?? "",
      content: post?.content ?? "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Post> = async (values) => {
    if (!post) return;
    const result = await editPost(post.id, values);
    if (!result.errors) {
      router.push("/feed");
    } else {
      if (result.errors.title) {
        setError(
          "title",
          {
            message: result.errors.title[0],
            type: "custom",
          },
          {
            shouldFocus: true,
          }
        );
      }
      if (result.errors.content) {
        setError(
          "content",
          {
            message: result.errors.content[0],
            type: "custom",
          },
          {
            shouldFocus: true,
          }
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-2 gap-1">
        <label className="font-medium underline" htmlFor="title">
          Title
        </label>
        <input
          className="rounded-md py-1 px-2"
          placeholder="Title"
          aria-invalid={
            errors.title ? Boolean(errors.title.message) : undefined
          }
          aria-errormessage={errors.title ? errors.title.message : undefined}
          {...register("title")}
        />
        {errors.title && (
          <span className="font-medium text-red-500 text-sm">
            {errors.title.message}
          </span>
        )}
      </div>
      <div className="flex flex-col mb-2 gap-1">
        <label className="font-medium underline" htmlFor="content">
          Content
        </label>
        <textarea
          rows={4}
          cols={20}
          className="rounded-md py-1 px-2"
          placeholder="Content..."
          aria-invalid={errors.content ? Boolean(errors.content) : undefined}
          aria-errormessage={
            errors.content ? errors.content.message : undefined
          }
          {...register("content")}
        />
        {errors.content && (
          <span className="font-medium text-red-500 text-sm">
            {errors.content.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-indigo-500 w-full p-2 rounded-md text-white mt-2"
      >
        {isSubmitting ? "Editing Post...." : "Edit Post"}
      </button>
    </form>
  );
}
