"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { categories, sortedBlogs } from "@/data/blogs";

const BLOGS_PER_PAGE = 6;

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "all") return sortedBlogs;

    return sortedBlogs.filter((blog) => blog.categorySlug === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  const visibleBlogs = filteredBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#fbf7fa]">
      {/* Banner */}
      <section className="relative w-full overflow-hidden">
        <Image
          src="/images/contact-banner.png"
          alt="Royal Dutch Medical Centre Blog Banner"
          width={1920}
          height={800}
          priority
          sizes="100vw"
          className="block h-[600px] w-full object-cover object-center"
        />
      </section>

      {/* Blog Section */}
      <section className="relative overflow-visible px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute left-[-120px] top-[80px] h-[360px] w-[360px] rounded-full bg-[#8b1d72]/10 blur-[110px]" />
        <div className="pointer-events-none absolute right-[-120px] bottom-[120px] h-[360px] w-[360px] rounded-full bg-[#d6b981]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <motion.div
            className="mb-12 max-w-5xl"
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: smoothEase }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#9b1b7a]">
              Our Blogs
            </p>

            <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.3] tracking-[6px] text-[#0b153c] sm:text-[38px] md:text-[48px]">
              Expert Insights for Healthy, Radiant Skin
            </h1>

            <p className="mt-5 max-w-[980px] font-secondary text-[14px] font-medium leading-[1.85] tracking-[1.1px] text-[#807884] sm:text-[15px]">
              Stay updated with expert skincare tips, beauty treatments, and
              wellness insights from Royal Dutch Clinic. Explore helpful
              articles on advanced aesthetic care, skin health, facial
              therapies, and self-care guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_330px]">
            {/* Blog Grid */}
            <div>
              <motion.div
                className="grid grid-cols-1 gap-8 md:grid-cols-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.12,
                    },
                  },
                }}
              >
                {visibleBlogs.map((blog) => (
                  <motion.article
                    key={blog.id}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 34,
                        filter: "blur(8px)",
                      },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.85,
                          ease: smoothEase,
                        },
                      },
                    }}
                    className="group"
                  >
                    <Link
                      href={`/blog/${blog.categorySlug}/${blog.slug}`}
                      className="block overflow-hidden rounded-[34px] border border-[#ead9e6] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#8b1d72]/50"
                    >
                      {/* Image */}
                      <div className="relative m-3 h-[300px] overflow-hidden rounded-[26px] bg-[#f4edf3]">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-center transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#26001f]/60 via-[#26001f]/10 to-transparent opacity-80 transition duration-700 group-hover:opacity-55" />

                        <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/85 px-4 py-2 backdrop-blur-md">
                          <span className="font-secondary text-[11px] font-bold uppercase tracking-[2.4px] text-[#8b1d72]">
                            {blog.category}
                          </span>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5">
                          <p className="font-secondary text-[13px] font-medium text-white/85">
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}{" "}
                            <span className="mx-2 text-[#D6B981]">•</span>
                            {blog.author}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-7 pb-7 pt-3">
                        <h2 className="font-secondary text-[24px] font-semibold leading-[1.22] text-[#07133d] transition duration-300 group-hover:text-[#8b1d72]">
                          {blog.title}
                        </h2>

                        <p className="mt-4 line-clamp-2 font-secondary text-[15px] leading-[1.75] text-[#687082]">
                          {blog.excerpt}
                        </p>

                        <div className="mt-7 flex items-center justify-between border-t border-[#f0e3ec] pt-5">
                          <span className="font-secondary text-[13px] font-bold uppercase tracking-[2.5px] text-[#8b1d72]">
                            Read Article
                          </span>

                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7edf5] text-[#8b1d72] transition duration-500 group-hover:bg-[#8b1d72] group-hover:text-white">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    const active = page === pageNumber;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => goToPage(pageNumber)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full border font-secondary text-[14px] font-semibold transition duration-300 ${
                          active
                            ? "border-[#D6B981] bg-[#D6B981] text-white"
                            : "border-[#e2d4df] bg-white text-[#07133d] hover:border-[#8b1d72] hover:text-[#8b1d72]"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {page < totalPages && (
                    <button
                      type="button"
                      onClick={() => goToPage(page + 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2d4df] bg-white font-secondary text-[18px] font-semibold text-[#07133d] transition duration-300 hover:border-[#8b1d72] hover:text-[#8b1d72]"
                    >
                      →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Categories */}
            <motion.aside
              className="h-fit self-start rounded-[32px] border border-[#ead9e6] bg-white/90 p-8 backdrop-blur-md lg:sticky lg:top-[145px]"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: smoothEase }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <p className="font-secondary text-[12px] font-semibold uppercase tracking-[5px] text-[#9b1b7a]">
                Explore
              </p>

              <h2 className="mt-4 font-secondary text-[34px] font-bold leading-none text-[#07133d]">
                Categories
              </h2>

              <div className="mt-8 rounded-[28px] bg-gradient-to-br from-[#982086] via-[#7c126c] to-[#430037] p-4">
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className={`flex w-full items-center justify-between rounded-[20px] px-5 py-4 text-left font-secondary text-[18px] transition duration-300 ${
                    activeCategory === "all"
                      ? "bg-white text-[#8b1d72]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span>All Blogs</span>
                  <span
                    className={`rounded-full px-3 py-1 text-[14px] ${
                      activeCategory === "all"
                        ? "bg-[#f7edf5] text-[#8b1d72]"
                        : "bg-white/15 text-white"
                    }`}
                  >
                    {sortedBlogs.length}
                  </span>
                </button>

                <div className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`flex w-full items-center justify-between rounded-[20px] px-5 py-4 text-left font-secondary text-[18px] transition duration-300 ${
                        activeCategory === category.slug
                          ? "bg-white text-[#8b1d72]"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{category.name}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-[14px] ${
                          activeCategory === category.slug
                            ? "bg-[#f7edf5] text-[#8b1d72]"
                            : "bg-white/15 text-white"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}