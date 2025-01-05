import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';


interface FormProps {
    type: string;
    formData: {
        title: string;
        description: string;
        time: number;
        imageUrl: string | File;
        imagePublicId: string
        ingredients: string;
        walkthrough: string;
        categories: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        title: string;
        description: string;
        time: number;
        imageUrl: string | File;
        imagePublicId: string
        ingredients: string;
        walkthrough: string;
        categories: string;
    }>>;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isEditMode: boolean;
}

export default function Form({ type, formData, setFormData, submitting, handleSubmit, isEditMode }: FormProps) {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
          setFormData({
            ...formData,
            [name]: files[0],
          });
        }
    }

      // Determine the cancel button's destination
      const cancelDestination =
        typeof window !== 'undefined' && window.location.pathname === '/categories'
            ? '/categories'
            : '/';

    return (
        <section className="w-full max-w-3xl flex flex-col items-start p-6 bg-white shadow-lg rounded-lg my-20 mx-auto">
            <h1 className="text-3xl font-bold text-left mb-4">
                <span className="text-orange-500">
                    {type} Post
                </span>
            </h1>
            <p className="text-gray-700 text-left max-w-md mb-6">
                {type} World of Nigerian Popular Tribal Dishes.
            </p>

            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <input 
                        type="text" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time (minutes):</label>
                    <input 
                        type="number" 
                        name="time" 
                        value={formData.time} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 flex items-center">
                        Image - <span className='text-orange-500'> Picking new images override the previous image</span>
                    </label>
                    <div className='flex justify-center items-center'>
                    {formData.imageUrl && typeof formData.imageUrl === 'string' && (
                        <div className="mt-2">
                            <Image src={formData.imageUrl}  width={20}
                                height={20} alt={formData.title} className="w-32 h-32 object-cover rounded-md" />
                        </div>
                    )}
                    <PlusCircleIcon className="w-12 h-12 mr-4 text-orange-500" />
                    <input 
                        type="file" 
                        name="imageUrl" 
                        onChange={handleFileChange} 
                        required={!isEditMode}
                        className="flex-1 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (comma separated):</label>
                    <input 
                        type="text" 
                        name="ingredients" 
                        value={formData.ingredients} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="walkthrough" className="block text-sm font-medium text-gray-700">Walkthrough:</label>
                    <textarea 
                        name="walkthrough" 
                        value={formData.walkthrough} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-32"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories (one category allowed) e.g Igbo:</label>
                    <input 
                        type="text" 
                        name="categories" 
                        value={formData.categories} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Link href={cancelDestination} className="text-gray-500 hover:text-gray-700">
                        Cancel
                    </Link>

                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    );
}
