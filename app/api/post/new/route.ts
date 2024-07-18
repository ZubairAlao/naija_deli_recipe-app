import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/utils/database";
import Post from "@/app/lib/models/posts";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        // Parse the request body
        const {
            userId,
            title,
            description,
            time,
            imageUrl,
            imagePublicId,
            ingredients,
            walkthrough,
            categories,
        } = await request.json();

        // Ensure all required fields are provided
        if (!userId || !title || !description || !time || !imageUrl || !ingredients || !walkthrough || !categories) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Connect to the database
        await connectToDB();

        // Create a new post instance
        const newPost = new Post({
            creator: userId,
            title,
            description,
            time,
            imageUrl,  // Ensure to use the correct field name
            imagePublicId,
            ingredients,
            walkthrough,
            categories,
        });

        // Save the new post to the database
        await newPost.save();

        // Return the newly created post as a JSON response
        return new NextResponse(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        console.error("Error creating a new post:", error);
        return new NextResponse("Failed to create a new post", { status: 500 });
    }
};
