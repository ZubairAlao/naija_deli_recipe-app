export interface Creator {
    _id: string;
    email: string;
    username: string;
    image: string;
    __v: number;
    createdAt: string;
  }
  
  export interface Post {
    categories: string;
    creator: Creator;
    description: string;
    imageUrl: string;
    imagePublicId: string;
    ingredients: string;
    likes: number;
    time: number;
    title: string;
    walkthrough: string;
    __v: number;
    _id: string;
    createdAt: string;
    likedBy: string[];
  }