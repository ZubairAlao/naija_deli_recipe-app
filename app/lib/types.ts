// types.ts
export interface FormData {
    title: string;
    description: string;
    time: number;
    image: File | null;
    ingredients: string;
    walkthrough: string;
    categories: string;
  }
  
  export interface FormProps {
    type: string;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }
