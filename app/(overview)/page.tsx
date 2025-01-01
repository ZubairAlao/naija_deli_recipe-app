import Feed from "@/app/ui/feed";
export const dynamic = 'force-dynamic';

export default async function Home() {

  try {
    // Fetch the data from the API
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
      cache: "no-store", // Use "no-store" for SSR or "force-cache" for SSG
    });

    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();

    return (
      <section className="mb-20 mt-[54px]">
        <div className="min-h-44 flex-col gap-2 flex-center bg-[#008000] text-white px-8 text-center md:text-left">
          <h1 className="text-2xl">Nigeria Delicious Dishes</h1>
          <p className="text-lg">NaijaDeli, World of Nigerian Popular Tribal Dishes.</p>
        </div>
          <Feed recipeData={posts} />
      </section>
    )
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
    
  return (
    <section className="flex justify-center items-center h-screen">
      <p className="text-red-500 font-semibold">Error loading posts.</p>
    </section>
  );
}  