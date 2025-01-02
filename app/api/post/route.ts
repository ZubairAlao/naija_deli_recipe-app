import { connectToDB } from "@/utils/database";
import Post from "@/app/lib/models/posts";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectToDB();

        const posts = await Post.find({}).populate("creator").sort({ createdAt: -1 });

        return new NextResponse(JSON.stringify(posts), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              Expires: "0",
              Pragma: "no-cache",
            },
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new NextResponse("Failed to fetch all posts", { status: 500 })
    }
}