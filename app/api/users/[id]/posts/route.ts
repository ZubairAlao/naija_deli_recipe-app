import { connectToDB } from "@/utils/database";
import Post from "@/app/lib/models/posts";
import { NextRequest, NextResponse } from 'next/server';


type Params = {
    params: {
      id: string;
    };
};

export const GET = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
    try {
        await connectToDB();

        const posts = await Post.find({
            creator: params.id
        }).populate('creator');

        if (!posts) {
            return new NextResponse("Post not found", {status: 404});
        }

        return new NextResponse(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to fetch all posts", { status: 500 })
    }
}