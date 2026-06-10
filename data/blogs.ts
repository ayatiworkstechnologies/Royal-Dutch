import { mensGroomingContent } from "./blog-content/mens-grooming";
import { skinAt35Content } from "./blog-content/skin-at-35";
import { acneReturningContent } from "./blog-content/acne-returning";

export type BlogContentBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

export type Blog = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  image: string;
  heroLabel?: string;
  heroText?: string;
  content: BlogContentBlock[];
};

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const blogList = [
  {
    id: 1,
    title:
      "Men’s Grooming in UAE: Why Luxe Facials Are Becoming a Status Routine",
    excerpt:
      "Anti-aging without injectables: can luxe facials delay fine lines in your 30s and 40s?",
    slug: "mens-grooming-in-uae-why-luxe-facials-are-becoming-a-status-routine",
    category: "Beauty",
    date: "2026-06-05",
    author: "Admin",
    image: "/images/blogs/blog-1.jpg",
    heroLabel: "Elevate Your Presence",
    heroText:
      "Premium facials are redefining modern men's grooming in Ras Al-Khaimah and across the UAE.",
    content: mensGroomingContent,
  },
  {
    id: 2,
    title:
      "Your Skin at 35 Isn’t Aging Overnight, It’s Asking for Better Care",
    excerpt:
      "Anti-aging without injectables: can luxe facials delay fine lines naturally?",
    slug: "your-skin-at-35-isnt-aging-overnight",
    category: "Skin Care",
    date: "2026-05-22",
    author: "Admin",
    image: "/images/blogs/blog-2.jpg",
    heroLabel: "",
    heroText:
      "",
    content: skinAt35Content,
  },
  {
    id: 3,
    title:
      "Why Your Acne Keeps Returning in the UAE: 9 Daily Skincare Mistakes",
    excerpt:
      "The real reason your breakouts never fully go away and what habits may trigger them.",
    slug: "why-your-acne-keeps-returning-in-the-uae",
    category: "Dermatology",
    date: "2026-05-12",
    author: "Admin",
    image: "/images/blogs/blog-3.jpg",
    heroLabel: "Break The Breakout Cycle",
    heroText:
      "Discover everyday skincare habits silently triggering recurring acne.",
    content: acneReturningContent,
  },
] satisfies Omit<Blog, "categorySlug">[];

export const blogs: Blog[] = blogList.map((blog) => ({
  ...blog,
  categorySlug: createSlug(blog.category),
}));

export const sortedBlogs = [...blogs].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const categories = Array.from(
  new Map(
    sortedBlogs.map((blog) => [
      blog.categorySlug,
      {
        name: blog.category,
        slug: blog.categorySlug,
        count: sortedBlogs.filter(
          (item) => item.categorySlug === blog.categorySlug
        ).length,
      },
    ])
  ).values()
);

export function getBlogByRoute(categorySlug: string, slug: string) {
  return blogs.find(
    (blog) => blog.categorySlug === categorySlug && blog.slug === slug
  );
}

export function getCategoryBySlug(categorySlug: string) {
  return categories.find((category) => category.slug === categorySlug);
}

export function getBlogsByCategory(categorySlug: string) {
  return sortedBlogs.filter((blog) => blog.categorySlug === categorySlug);
}

export function getRelatedBlogs(currentBlog: Blog) {
  return sortedBlogs
    .filter((blog) => blog.id !== currentBlog.id)
    .filter((blog) => blog.categorySlug === currentBlog.categorySlug)
    .slice(0, 3);
}