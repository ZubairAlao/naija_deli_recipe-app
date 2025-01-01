import { connectToDB } from "@/utils/database";
import Post from "@/app/lib/models/posts";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectToDB();

        const posts = await Post.find({}).populate("creator");

          return new NextResponse(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new NextResponse("Failed to fetch all posts", { status: 500 })
    }
}