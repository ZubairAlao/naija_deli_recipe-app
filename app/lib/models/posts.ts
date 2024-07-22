import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    likes: {
        type: Number,
        default: 0, // Default value if not provided
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    time: {
        type: Number,
        required: [true, 'Time is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required'],
    },
    imagePublicId: {
        type: String,
        required: [true, 'Image public IDs is required'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required'],
    },
    walkthrough: {
        type: String,
        required: [true, 'Walkthrough is required'],
    },
    categories: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
},

{ timestamps: true }

);

const Post = models.Post || model('Post', PostSchema);

export default Post;
