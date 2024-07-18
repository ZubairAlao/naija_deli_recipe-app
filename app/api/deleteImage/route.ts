import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';


// Configure Cloudinary credentials using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log the environment variables to ensure they are set
console.log('Cloudinary Configuration:', {
  CloudName: process.env.CLOUDINARY_CLOUD_NAME,
  APIKey: process.env.CLOUDINARY_API_KEY,
  APISecret: process.env.CLOUDINARY_API_SECRET
});

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const {public_id} = await request.json();
    try {
        const result = await cloudinary.uploader.destroy(public_id, {
            invalidate: true,
            resource_type: "image",
        })
        return new NextResponse("prompt Deleted sucessfully", { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to delete posts", { status: 500 })
    }
} 