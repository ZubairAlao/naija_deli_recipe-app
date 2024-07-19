"use client"

import Form from '@/app/ui/form';
import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';



interface FormData {
  title: string;
  description: string;
  time: number;
  imageUrl: string | File;
  imagePublicId: string;
  ingredients: string;
  walkthrough: string;
  categories: string;
}

function EditRecipe() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id')

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

  useEffect(() => {
    // const getRecipeDetails = async() => {
    //   const response = await fetch(`/api/post/${recipeId}`)
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch recipe details');
    //   }

    //   const data = await response.json();

    //   setFormData({
    //     title: data.title,
    //     description: data.description,
    //     time: data.time,
    //     imageUrl: data.imageUrl,
    //     imagePublicId: data.imagePublicId,
    //     ingredients: data.ingredients,
    //     walkthrough: data.walkthrough,
    //     categories: data.categories
    //   })
    // }
    const getRecipeDetails = async () => {
      try {
        const response = await fetch(`/api/post/${recipeId}`);
        if (!response.ok) throw new Error('Failed to fetch recipe details');

        const data = await response.json();
        setFormData({
          title: data.title,
          description: data.description,
          time: data.time,
          imageUrl: data.imageUrl,
          imagePublicId: data.imagePublicId,
          ingredients: data.ingredients,
          walkthrough: data.walkthrough,
          categories: data.categories
        });
      } catch (error) {
        console.error(error);
      }
    };

    if(recipeId) getRecipeDetails();
    
    }, [recipeId])


  const editUploadedImage = async (file: File) => {
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
  
  const editRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = formData.imageUrl;
      let imagePublicId = formData.imagePublicId;

      if (formData.imageUrl instanceof File) {
        const cloudinaryDeleteImagePromise = fetch('/api/deleteImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ public_id: formData.imagePublicId })
        });

        const uploadImagePromise = editUploadedImage(formData.imageUrl);

        // Wait for both promises to resolve
        const [cloudinaryDeleteImage, uploadImageResult] = await Promise.all([cloudinaryDeleteImagePromise, uploadImagePromise]);

        if (!cloudinaryDeleteImage.ok) {
          throw new Error('Failed to delete image from Cloudinary');
        }

        imageUrl = uploadImageResult.secure_url;
        imagePublicId = uploadImageResult.public_id;
      }


      // Update the recipe with the new image data and other form data
      const response = await fetch(`/api/post/${recipeId}`,  {
        method: 'PATCH',
        body: JSON.stringify({
          userId: session?.user?.id ?? '',
          title: formData.title,
          description: formData.description,
          time: formData.time,
          imageUrl: imageUrl,  
          imagePublicId: imagePublicId,
          ingredients: formData.ingredients,
          walkthrough: formData.walkthrough,
          categories: formData.categories,
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

  if (!session?.user) {
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center bg-gray-100'>
            <p className='animate-bounce text-2xl font-semibold text-gray-800 mb-4'>
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
      type="Edit"
      formData={formData}
      setFormData={setFormData}
      submitting={submitting}
      handleSubmit={editRecipe}
      isEditMode={true}
    />
  );
}


export default function EditRecipePage() {
  return (
    <Suspense>
      <EditRecipe />
    </Suspense>
  );
}

