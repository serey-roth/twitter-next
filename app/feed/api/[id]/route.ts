import { deletePost, editPost } from "@/app/lib/posts";
import { NextRequest, NextResponse } from "next/server";
import { PostSchema } from "../route";
import { revalidatePath } from "next/cache";

export async function DELETE(request: NextRequest) {
  const path = new URL(request.url).pathname;
  const id = path.split("/")[3];
  const post = await deletePost(id);
  revalidatePath("app/feed");
  revalidatePath("app/feed/[id]");
  return new NextResponse(JSON.stringify(post), {
    status: 200,
  });
}

export async function PUT(request: NextRequest) {
  const path = new URL(request.url).pathname;
  const id = path.split("/")[3];
  const result = PostSchema.safeParse(await request.json());
  if (result.success) {
    const newPost = await editPost(id, result.data);
    revalidatePath("app/feed");
    revalidatePath("app/feed/[id]");
    return new NextResponse(
      JSON.stringify({
        post: newPost,
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

export async function GET(request: NextRequest) {
  return NextResponse.json({});
}
