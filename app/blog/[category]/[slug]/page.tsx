import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogs,
  categories,
  getBlogByRoute,
  getRelatedBlogs,
  sortedBlogs,
} from "@/data/blogs";

type BlogDetailsPageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({
    category: blog.categorySlug,
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const { category, slug } = await params;
  const blog = getBlogByRoute(category, slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Royal Dutch Medical Centre",
    };
  }

  return {
    title: `${blog.title} | Royal Dutch Medical Centre`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { category, slug } = await params;
  const blog = getBlogByRoute(category, slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog);

  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 font-secondary text-[12px] text-[#777]">
            <Link
              href={`/blog/${blog.categorySlug}`}
              className="transition hover:text-[#8b1d72]"
            >
              {blog.category}
            </Link>

            <span>•</span>

            <span>
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <span>•</span>

            <span>by {blog.author}</span>
          </div>

          <h1 className="mx-auto mt-5 max-w-4xl font-primary text-[26px] font-medium uppercase leading-[1.25] tracking-[3px] text-black sm:text-[36px] md:text-[44px]">
            {blog.title}
          </h1>
        </div>
      </section>

      <section className="relative h-[360px] overflow-hidden sm:h-[470px] md:h-[560px] lg:h-[640px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* <div className="absolute inset-0 bg-[#4b073f]/65" /> */}

        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="max-w-5xl">s
            {blog.heroLabel && (
              <span className="inline-block bg-white px-5 py-2 font-primary text-[18px] font-semibold uppercase tracking-[1px] text-[#4b073f] sm:text-[28px] md:text-[38px]">
                {blog.heroLabel}
              </span>
            )}

            {blog.heroText && (
              <p className="mx-auto mt-8 max-w-4xl font-secondary text-[24px] font-semibold leading-[1.5] text-white sm:text-[34px] md:text-[46px]">
                {blog.heroText}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          <article className="max-w-4xl">
            {blog.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="mt-10 font-primary text-[24px] font-medium leading-[1.35] tracking-[1.2px] text-black first:mt-0 sm:text-[30px]"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "list") {
                return (
                  <ul
                    key={index}
                    className="mt-5 list-disc space-y-3 pl-7 font-secondary text-[15px] leading-[1.9] tracking-[0.5px] text-[#666] sm:text-[16px]"
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "image") {
                return (
                  <div
                    key={index}
                    className="relative mt-10 h-[300px] w-full overflow-hidden bg-[#f4edf3] sm:h-[420px]"
                  >
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </div>
                );
              }

              return (
                <p
                  key={index}
                  className="mt-5 font-secondary text-[15px] font-medium leading-[1.95] tracking-[0.5px] text-[#666] sm:text-[16px]"
                >
                  {block.text}
                </p>
              );
            })}

            <div className="mt-14 border-t border-[#eadfd8] pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-primary text-[13px] font-semibold uppercase tracking-[3px] text-[#8b1d72] transition hover:text-[#D6B981]"
              >
                ← Back to Blogs
              </Link>
            </div>
          </article>

          <aside className="h-fit bg-[#f3f4f6] p-7 lg:sticky lg:top-[130px]">
            <h3 className="font-secondary text-[26px] font-bold text-[#07133d]">
              Categories
            </h3>

            <div className="mt-6 space-y-3">
              <Link
                href="/blog"
                className="block font-secondary text-[17px] text-[#07133d] transition hover:text-[#8b1d72]"
              >
                All Blogs ({sortedBlogs.length})
              </Link>

              {categories.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className={`block font-secondary text-[17px] transition hover:text-[#8b1d72] ${
                    item.slug === blog.categorySlug
                      ? "font-semibold text-[#8b1d72]"
                      : "text-[#07133d]"
                  }`}
                >
                  {item.name} ({item.count})
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="bg-[#f9f5f8] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-primary text-[28px] font-medium uppercase tracking-[4px] text-black">
              Related Blogs
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.categorySlug}/${item.slug}`}
                  className="group bg-white"
                >
                  <div className="relative h-[230px] overflow-hidden bg-[#f4edf3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="font-secondary text-[12px] text-[#777]">
                      {item.category}
                    </p>

                    <h3 className="mt-2 font-secondary text-[18px] font-semibold leading-[1.3] text-black group-hover:text-[#8b1d72]">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}