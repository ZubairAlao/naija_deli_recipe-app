"use client"

import Form from '@/app/ui/form';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


interface FormData {
  title: string;
  description: string;
  time: number;
  imageUrl: string | File;
  imagePublicId: string
  ingredients: string;
  walkthrough: string;
  categories: string;
}

export default function CreateRecipe() {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    time: 0,
    imageUrl: '',
    imagePublicId: '',
    ingredients: '',
    walkthrough: '',
    categories: ''
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'naija_deli_preset');

    const response = await fetch(`https://api.cloudinary.com/v1_1/dmdunfulm/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log(data);
    
    return { secure_url: data.secure_url, public_id: data.public_id };
  };

  const createRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = formData.imageUrl;
      let imagePublicId = formData.imagePublicId;

      if (formData.imageUrl instanceof File) {
        const uploadResult = await uploadImage(formData.imageUrl);
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } else {
        imageUrl = formData.imageUrl;
      }

      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user?.id ?? '',
          title: formData.title,
          description: formData.description,
          time: formData.time,
          imageUrl,
          imagePublicId,
          ingredients: formData.ingredients,
          walkthrough: formData.walkthrough,
          categories: formatCategories(formData.categories),
        })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  console.log(formData);

  const formatCategories = (categories: string) => {
    return categories
      .split(',')
      .map((category) =>
        category
          .replace('#', '') 
          .trim()
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())
      )
      .join(', ');
  }

  if (!session?.user) {
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center bg-gray-100 px-6'>
            <p className='animate-bounce text-2xl font-semibold text-gray-800 mb-4 text-center'>
                Oops! You are not signed in.
            </p>
            <p className='text-lg text-gray-600 mb-8'>
                Please sign in to access your account and continue.
            </p>
        </div>
    );
}


  return (
    <Form
      type="Create"
      formData={formData}
      setFormData={setFormData}
      submitting={submitting}
      handleSubmit={createRecipe}
      isEditMode={false}
    />
  );
}
