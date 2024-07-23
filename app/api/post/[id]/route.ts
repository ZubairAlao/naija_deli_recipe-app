import { connectToDB } from "@/utils/database";
import Post from "@/app/lib/models/posts";
import { NextRequest, NextResponse } from 'next/server';


type Params = {
    params: {
      id: string;
    };
  };

// read
export const GET = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
    try {
        await connectToDB();

        const post = await Post.findById(params.id).populate('creator');

        if (!post) {
            return new NextResponse("post not found", {status: 404});
        }

        return new NextResponse(JSON.stringify(post), { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to fetch all posts", { status: 500 })
    }
}

// PATCH edit

export const PATCH = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
    const {title,
    description,
    time,
    imageUrl,
    imagePublicId,
    ingredients,
    walkthrough,
    categories} = await request.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id);

        if (!existingPost) {
            return new NextResponse("Prompt not found", {status: 404});
        }

        existingPost.title = title;
        existingPost.description = description
        existingPost.time = time
        existingPost.imageUrl = imageUrl
        existingPost.ingredients = ingredients;
        existingPost.walkthrough = walkthrough
        existingPost.categories = categories;
        existingPost.imagePublicId = imagePublicId;



        await existingPost.save();

        return new NextResponse(JSON.stringify(existingPost), { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to update the posts", { status: 500 })
    }
}


// DELETE (delete)
export const DELETE = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
    try {
        await connectToDB();

        await Post.findByIdAndDelete(params.id)

        return new NextResponse("prompt Deleted sucessfully", { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to delete posts", { status: 500 })
    }
} 