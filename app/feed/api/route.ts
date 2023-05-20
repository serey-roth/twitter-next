import { addPost } from "@/app/lib/posts.server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long!"),
  content: z.string().max(50, "Content must be at most 50 characters long!"),
});

export async function POST(request: NextRequest) {
  const result = PostSchema.safeParse(await request.json());
  if (result.success) {
    await addPost(result.data);
    revalidatePath("/feed");
    return new NextResponse(
      JSON.stringify({
        post: result.data,
        errors: undefined,
      }),
      {
        status: 200,
      }
    );
  } else {
    const error = result.error;
    return new NextResponse(
      JSON.stringify({
        post: undefined,
        errors: error.formErrors.fieldErrors,
      }),
      {
        status: 400,
      }
    );
  }
}
