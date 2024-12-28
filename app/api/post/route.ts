// export const dynamic = 'force-dynamic'
import User from "@/app/lib/models/users";

import { connectToDB } from "@/utils/database";
import Post from "@/app/lib/models/posts";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectToDB();

        const posts = await Post.find({}).populate({
            path: "creator"
          });

          
          const response =  new NextResponse(JSON.stringify(posts), { status: 200 })

         // Add a unique identifier to the URL to force a cache-busting reload
        const url = new URL(request.url);
        url.searchParams.set("t", Date.now().toString());
        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Location", url.toString());

        return response;
    } catch (error) {
        return new NextResponse("Failed to fetch all posts", { status: 500 })
    }
}