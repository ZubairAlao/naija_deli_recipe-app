import Feed from "@/app/ui/feed";

export default async function Home() {

  return (
    <section className="mb-20 mt-[54px]">
      <div className="min-h-44 flex-col gap-2 flex-center bg-[#008000] text-white px-8 text-center md:text-left">
        <h1 className="text-2xl">Nigeria Delicious Dishes</h1>
        <p className="text-lg">NaijaDeli, World of Nigerian Popular Tribal Dishes.</p>
      </div>
        <Feed />
    </section>
  )
}  