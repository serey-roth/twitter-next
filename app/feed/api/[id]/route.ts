import { deletePost, editPost } from "@/app/lib/posts.server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { PostSchema } from "../route";

export async function DELETE(request: NextRequest) {
  const path = new URL(request.url).pathname;
  const id = path.split("/")[3];
  await deletePost(Number.parseInt(id));
  revalidatePath("/feed");
  return new NextResponse(JSON.stringify(true), {
    status: 200,
  });
}

export async function PUT(request: NextRequest) {
  const path = new URL(request.url).pathname;
  const id = path.split("/")[3];
  const result = PostSchema.safeParse(await request.json());
  if (result.success) {
    await editPost(Number.parseInt(id), result.data);
    revalidatePath("/feed");
    return new NextResponse(
      JSON.stringify({
        post: {
          ...result.data,
          id: Number.parseInt(id),
        },
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
