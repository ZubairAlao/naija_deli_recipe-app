import { connectToDB } from "@/utils/database";
import Post from "@/app/lib/models/posts";
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

interface RequestBody {
  userId: string;
}

export const POST = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id).populate('creator');

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const { userId } = await request.json() as RequestBody; // Assuming userId is sent in the request body

    if (!userId) {
      return new NextResponse("User ID not provided", { status: 400 });
    }

    const hasLiked = post.likedBy.includes(userId);

    if (hasLiked) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((id: any) => id.toString() !== userId);
    } else {
      post.likes += 1;
      post.likedBy.push(userId);
    }

    await post.save();

    return NextResponse.json(post); // Respond with the updated post data

  } catch (error) {
    console.error("Failed to update post likes:", error);
    return new NextResponse("Failed to update post likes", { status: 500 });
  }
};