import FoodCategories from "@/app/ui/categories/foodCategories";

// Fetch data on the server
export default async function Page() {
  try {
    // Fetch the data from the API
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
      cache: "no-store", // Use "no-store" for SSR or "force-cache" for SSG
    });

    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();

    return <FoodCategories recipeData={posts} />;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <section className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">Error loading posts.</p>
      </section>
    );
  }
}
