import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getBlogsByCategory,
  getCategoryBySlug,
  sortedBlogs,
} from "@/data/blogs";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: "Category Not Found | Royal Dutch Medical Centre",
    };
  }

  return {
    title: `${categoryData.name} Blogs | Royal Dutch Medical Centre`,
    description: `Read ${categoryData.name} blogs from Royal Dutch Medical Centre.`,
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const categoryBlogs = getBlogsByCategory(category);

  return (
    <main className="min-h-screen bg-[#f3f4f6] pt-[130px]">
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <Link
              href="/blog"
              className="font-secondary text-[12px] font-semibold uppercase tracking-[3px] text-[#8b1d72]"
            >
              ← Back to All Blogs
            </Link>

            <h1 className="mt-5 font-primary text-[30px] font-medium uppercase tracking-[5px] text-black sm:text-[44px]">
              {categoryData.name}
            </h1>

            <p className="mt-4 font-secondary text-[15px] text-[#777]">
              Showing {categoryBlogs.length} blog
              {categoryBlogs.length === 1 ? "" : "s"} in {categoryData.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_285px]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {categoryBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                >
                  <Link
                    href={`/blog/${blog.categorySlug}/${blog.slug}`}
                    className="block"
                  >
                    <div className="relative h-[280px] w-full overflow-hidden bg-[#f4edf3]">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 font-secondary text-[13px] text-[#777]">
                        <span>
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{blog.category}</span>
                      </div>

                      <h2 className="mt-3 font-secondary text-[22px] font-semibold leading-[1.25] text-[#07133d] transition group-hover:text-[#8b1d72]">
                        {blog.title}
                      </h2>

                      <p className="mt-4 line-clamp-2 font-secondary text-[15px] leading-[1.7] text-[#07133d]/80">
                        {blog.excerpt}
                      </p>

                      <div className="mt-6">
                        <span className="flex w-full items-center justify-center border-2 border-[#8b1d72] px-5 py-3 font-secondary text-[15px] font-bold text-[#8b1d72] transition duration-300 group-hover:bg-[#8b1d72] group-hover:text-white">
                          Read More
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <aside className="h-fit bg-white p-8 lg:sticky lg:top-[130px]">
              <h2 className="font-secondary text-[28px] font-bold text-[#07133d]">
                Categories
              </h2>

              <div className="mt-6 space-y-1 bg-[#8b1d72] p-3">
                <Link
                  href="/blog"
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-secondary text-[17px] text-white transition hover:bg-white/10"
                >
                  <span>All</span>
                  <span className="text-[13px] opacity-80">
                    {sortedBlogs.length}
                  </span>
                </Link>

                {categories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left font-secondary text-[17px] transition ${
                      item.slug === category
                        ? "bg-white text-[#8b1d72]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[13px] opacity-80">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}